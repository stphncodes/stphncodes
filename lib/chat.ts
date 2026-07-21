/**
 * Chat data + bot logic for the floating chat widget.
 *
 * This module is intentionally the ONLY place the "bot" lives. The widget UI
 * (components/chat/chat-widget.tsx) only ever calls `getBotResponse(message)`
 * and renders the result — so wiring in a real AI later is a change here, not
 * in the UI.
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

// ---------------------------------------------------------------------------
// TODO: replace with actual AI call.
//
// Swap the body below for a real request (e.g. `fetch('/api/chat', ...)` backed
// by the Claude API). Keep this signature exactly —
//   (message: string) => Promise<string>
// — and the widget will keep working unchanged (it already handles the async
// pending state / typing indicator and errors).
// ---------------------------------------------------------------------------
export async function getBotResponse(message: string): Promise<string> {
  // `message` is unused for now; it'll be forwarded to the model later.
  void message;

  // Simulated "thinking" delay so the typing indicator is visible end-to-end.
  await new Promise((resolve) => setTimeout(resolve, 900));

  return "Thanks for your message! (AI responses coming soon)";
}
