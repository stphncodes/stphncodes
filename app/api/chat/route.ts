/**
 * POST /api/chat — streams the site assistant's reply.
 *
 * Request body:  { messages: [{ role: "user" | "assistant", content: string }] }
 * Response:      a `text/plain` stream of the reply, token by token.
 * Errors:        JSON `{ error }` with a real HTTP status — always sent BEFORE
 *                the stream opens (see `pullFirstChunk` below), so the client
 *                never has to parse an error out of a half-finished stream.
 *
 * The Anthropic key is read server-side only and never reaches the browser.
 */

import Anthropic from "@anthropic-ai/sdk";
import { NextResponse, type NextRequest } from "next/server";

import { SYSTEM_PROMPT } from "@/lib/chat-context";
import { rateLimit } from "@/lib/rate-limit";

// The Anthropic SDK needs the Node runtime; streaming responses require the
// route to be dynamic (never statically cached).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MODEL = "claude-opus-4-8";

/** Replies are meant to be 2–3 sentences; this is a generous ceiling, not a target. */
const MAX_TOKENS = 1024;

// --- Guardrails -------------------------------------------------------------
/** Requests allowed per IP per window. */
const RATE_LIMIT = 12;
const RATE_WINDOW_MS = 60_000;
/** Longest single visitor message accepted. */
const MAX_MESSAGE_CHARS = 2_000;
/** Most turns kept from the conversation — older turns are dropped, oldest first. */
const MAX_TURNS = 20;

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

function isChatTurn(value: unknown): value is ChatTurn {
  if (typeof value !== "object" || value === null) return false;
  const turn = value as Record<string, unknown>;
  return (
    (turn.role === "user" || turn.role === "assistant") &&
    typeof turn.content === "string" &&
    turn.content.trim().length > 0
  );
}

/** Best-effort client IP. Vercel and most proxies set `x-forwarded-for`. */
function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function errorResponse(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

/**
 * Advances the stream to its first piece of text.
 *
 * This is what lets upstream failures (bad key, rate limit, 400) surface as a
 * real HTTP status: the request is actually in flight here, so anything that
 * throws does so before we've committed to a 200 + streaming body. It costs no
 * extra latency — it's exactly the time-to-first-token the client waits for
 * either way.
 */
async function pullFirstChunk(
  iterator: AsyncIterator<Anthropic.MessageStreamEvent>
): Promise<string | null> {
  while (true) {
    const { value, done } = await iterator.next();
    if (done) return null;
    if (
      value.type === "content_block_delta" &&
      value.delta.type === "text_delta"
    ) {
      return value.delta.text;
    }
  }
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    console.error("[chat] ANTHROPIC_API_KEY is not set");
    return errorResponse("The assistant isn't configured yet.", 503);
  }

  const limit = rateLimit(clientIp(request), RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return errorResponse(
      "You're sending messages a bit fast — give it a moment.",
      429,
      { "Retry-After": String(limit.retryAfter) }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  const rawMessages = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return errorResponse("`messages` must be a non-empty array.", 400);
  }
  if (!rawMessages.every(isChatTurn)) {
    return errorResponse("`messages` contains an invalid turn.", 400);
  }

  const turns = rawMessages as ChatTurn[];
  if (turns.some((t) => t.content.length > MAX_MESSAGE_CHARS)) {
    return errorResponse(
      `Messages are limited to ${MAX_MESSAGE_CHARS} characters.`,
      400
    );
  }

  // Keep the most recent turns, and make sure the window still starts on a
  // user turn — the API rejects a history that opens with an assistant message.
  let messages = turns.slice(-MAX_TURNS);
  const firstUser = messages.findIndex((t) => t.role === "user");
  if (firstUser === -1) {
    return errorResponse("`messages` must contain at least one user turn.", 400);
  }
  messages = messages.slice(firstUser);

  const client = new Anthropic({ apiKey });

  try {
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      // A chat bubble is latency-sensitive and the task is well-scoped, so we
      // trade reasoning depth for a fast first token. The system prompt carries
      // a final-answer-only instruction to keep reasoning out of the reply.
      thinking: { type: "disabled" },
      output_config: { effort: "low" },
      messages,
    });

    const iterator = stream[Symbol.asyncIterator]();
    const firstChunk = await pullFirstChunk(iterator);

    const encoder = new TextEncoder();
    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          if (firstChunk) controller.enqueue(encoder.encode(firstChunk));

          while (true) {
            const { value, done } = await iterator.next();
            if (done) break;
            if (
              value.type === "content_block_delta" &&
              value.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(value.delta.text));
            }
          }
        } catch (error) {
          // Headers are already flushed, so we can't change the status here.
          // Close cleanly and let the widget keep whatever text it received.
          console.error("[chat] stream interrupted", error);
        } finally {
          controller.close();
        }
      },
      cancel() {
        // Visitor closed the panel or navigated away — stop billing for tokens.
        stream.abort();
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        // Disable proxy buffering so tokens actually arrive incrementally.
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[chat] request failed", error);

    if (error instanceof Anthropic.RateLimitError) {
      return errorResponse("The assistant is busy — try again shortly.", 429);
    }
    if (error instanceof Anthropic.AuthenticationError) {
      return errorResponse("The assistant isn't configured correctly.", 503);
    }
    if (error instanceof Anthropic.APIConnectionError) {
      return errorResponse("Couldn't reach the assistant. Try again.", 502);
    }
    return errorResponse("Something went wrong. Please try again.", 500);
  }
}
