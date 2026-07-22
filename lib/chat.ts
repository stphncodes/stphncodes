/**
 * Chat types + client for the floating chat widget.
 *
 * This module is the ONLY place the widget talks to the outside world. The UI
 * (components/chat/chat-widget.tsx) calls `streamBotResponse` and renders what
 * it receives — the model, prompt, and guardrails all live server-side in
 * `app/api/chat/route.ts` and `lib/chat-context.ts`.
 */

export type ChatRole = "user" | "bot";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  /** Epoch ms; formatted for display in the widget. */
  timestamp: number;
}

/** First message shown when the panel opens. */
export const WELCOME_MESSAGE =
  "Hi! 👋 I'm the STPHNCODES assistant. Ask me about websites, AI agents, or automation — or tell me what you're building.";

/** Shown when the request fails before any text arrives. */
export const FALLBACK_ERROR =
  "Sorry, I couldn't reach the assistant just now. Please try again, or email stphncodes@gmail.com.";

/** Matches the server's per-message cap in `app/api/chat/route.ts`. */
export const MAX_MESSAGE_CHARS = 2000;

/**
 * Streams a reply from `/api/chat`, invoking `onDelta` with each chunk of text
 * as it arrives.
 *
 * Resolves once the reply is complete. Rejects if the request fails *before*
 * any text was streamed — the route is built so that case always comes back as
 * a real HTTP error with a JSON body, never as a truncated stream. Once text
 * has started flowing, a mid-stream failure simply ends early and keeps what
 * was received.
 *
 * @param history  Full visible conversation. The server trims it, drops the
 *                 leading welcome message, and enforces its own limits.
 * @param onDelta  Called with each incremental chunk of reply text.
 * @param signal   Abort to cancel in flight (e.g. the visitor closed the panel).
 */
export async function streamBotResponse(
  history: ChatMessage[],
  onDelta: (delta: string) => void,
  signal?: AbortSignal
): Promise<void> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
    body: JSON.stringify({
      messages: history.map((m) => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.content,
      })),
    }),
  });

  if (!response.ok || !response.body) {
    let message = FALLBACK_ERROR;
    try {
      const data = (await response.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      // Non-JSON error body — keep the generic message.
    }
    throw new Error(message);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      // `stream: true` keeps multi-byte characters intact across chunk edges.
      const text = decoder.decode(value, { stream: true });
      if (text) onDelta(text);
    }
    const tail = decoder.decode();
    if (tail) onDelta(tail);
  } finally {
    reader.releaseLock();
  }
}
