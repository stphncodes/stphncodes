"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { BotMessageSquare, Send, X } from "lucide-react";

import {
  getBotResponse,
  WELCOME_MESSAGE,
  type ChatMessage,
} from "@/lib/chat";
import { cn } from "@/lib/utils";

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Floating chat widget — a collapsible bubble (bottom-right) that opens a chat
 * panel with message history, a text input, and a send button. Bot replies come
 * from `getBotResponse` in lib/chat.ts (placeholder for now). Messages live in
 * React state only; there's no persistence in v1.
 */
export function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const reduceMotion = useReducedMotion();
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const nextId = () => `m${idRef.current++}`;

  // Client-only mount: avoids SSR/hydration mismatch on the timestamped
  // welcome message, and keeps this overlay out of the server HTML.
  useEffect(() => {
    setMounted(true);
    setMessages([
      {
        id: nextId(),
        role: "bot",
        content: WELCOME_MESSAGE,
        timestamp: Date.now(),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the conversation pinned to the latest message.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping, open]);

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = async () => {
    const text = input.trim();
    if (!text || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId(), role: "user", content: text, timestamp: Date.now() },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const reply = await getBotResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "bot", content: reply, timestamp: Date.now() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "bot",
          content: "Sorry, something went wrong. Please try again.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void send();
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Chat with STPHNCODES"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.96 }}
            transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ transformOrigin: "bottom right" }}
            className="glass-strong mb-3 flex h-[min(560px,72vh)] w-[min(384px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl shadow-glow-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-foreground/10 bg-foreground/[0.03] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <span className="absolute inset-0 animate-pulse-glow rounded-lg bg-primary/20 blur-md" />
                  <span className="relative font-mono text-xs">{"</>"}</span>
                </span>
                <div className="leading-tight">
                  <p className="font-display text-sm font-semibold tracking-tight">
                    STPHNCODES
                  </p>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Online
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages — data-lenis-prevent lets it scroll independently of the
                site's Lenis smooth scroll. */}
            <div
              ref={scrollRef}
              data-lenis-prevent
              className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-4"
            >
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={cn("flex", isUser ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[82%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                        isUser
                          ? "rounded-br-sm bg-primary text-primary-foreground"
                          : "glass rounded-bl-sm text-foreground/90"
                      )}
                    >
                      <p className="whitespace-pre-wrap break-words">{m.content}</p>
                      <time
                        className={cn(
                          "mt-1 block text-[10px]",
                          isUser ? "text-primary-foreground/60" : "text-muted-foreground/70"
                        )}
                      >
                        {formatTime(m.timestamp)}
                      </time>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass flex items-center gap-1 rounded-2xl rounded-bl-sm px-4 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                        animate={reduceMotion ? undefined : { opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{
                          duration: 0.9,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-foreground/10 bg-foreground/[0.02] p-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message…"
                aria-label="Message"
                className="min-w-0 flex-1 rounded-xl border border-foreground/10 bg-background/40 px-3.5 py-2.5 text-sm text-foreground caret-primary placeholder:text-muted-foreground/60 transition-colors focus:border-primary/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        whileTap={{ scale: 0.92 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow-sm transition-colors hover:bg-primary/90"
      >
        <span
          aria-hidden
          className="absolute inset-0 animate-pulse-glow rounded-full bg-primary/30 blur-md"
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: reduceMotion ? 0 : -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: reduceMotion ? 0 : 45, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="relative"
          >
            {open ? <X className="size-6" /> : <BotMessageSquare className="size-6" />}
          </motion.span>
        </AnimatePresence>

        {/* Attention ping while closed */}
        {!open && (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 flex h-3 w-3"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-emerald-400" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
