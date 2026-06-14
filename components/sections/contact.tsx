"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { siteConfig, socialLinks } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

/** Public Web3Forms access key — safe to expose client-side. Set in .env.local. */
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const BOOT_LINES = [
  "$ ssh guest@stphncodes.dev",
  "Authenticating… ✓ access granted",
  "Booting contact interface v2.0…",
  "Type your message below — I read every one.",
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [bootCount, setBootCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasBooted = useRef(false);

  // Type out the boot lines once the terminal scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBooted.current) {
          hasBooted.current = true;
          BOOT_LINES.forEach((_, i) => {
            setTimeout(() => setBootCount(i + 1), 350 * (i + 1));
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isValid =
    form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.message.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New message from ${form.name} — STPHNCODES`,
          from_name: "STPHNCODES Portfolio",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="05 — Contact"
          title="Let's build something"
          description="Have a project, a role, or just an idea worth exploring? Open a connection."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Terminal */}
          <Reveal direction="up">
            <div className="glass-strong overflow-hidden rounded-2xl shadow-glow-sm">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  guest@stphncodes: ~/contact
                </span>
              </div>

              {/* Body */}
              <div className="space-y-3 p-5 font-mono text-sm">
                {BOOT_LINES.slice(0, bootCount).map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      i === 0 ? "text-emerald-300" : "text-muted-foreground"
                    )}
                  >
                    {line}
                  </motion.p>
                ))}

                {status === "sent" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1 pt-2"
                  >
                    <p className="text-emerald-300">
                      ✓ message transmitted successfully.
                    </p>
                    <p className="text-muted-foreground">
                      Thanks for reaching out — I&apos;ll reply within 48h.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-2 text-primary underline-offset-4 hover:underline"
                    >
                      $ send another →
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className={cn(
                      "space-y-4 pt-2 transition-opacity",
                      bootCount < BOOT_LINES.length && "pointer-events-none opacity-40"
                    )}
                  >
                    <TerminalField
                      label="name"
                      value={form.name}
                      onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                      placeholder="Ada Lovelace"
                    />
                    <TerminalField
                      label="email"
                      type="email"
                      value={form.email}
                      onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                      placeholder="you@domain.com"
                    />
                    <TerminalField
                      label="message"
                      multiline
                      value={form.message}
                      onChange={(v) => setForm((f) => ({ ...f, message: v }))}
                      placeholder="Tell me about your project…"
                    />

                    <div className="flex items-center gap-3 pt-1">
                      <Button
                        type="submit"
                        disabled={!isValid || status === "sending"}
                        className="font-mono"
                      >
                        {status === "sending" ? "transmitting…" : "$ send"}
                      </Button>
                      {status === "error" && (
                        <span className="text-xs text-red-400">
                          transmission failed — try again.
                        </span>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Reveal>

          {/* Side panel */}
          <Reveal direction="left" delay={0.1} className="flex flex-col gap-4">
            <div className="glass flex-1 rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold">Direct lines</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Prefer something async? Find me here.
              </p>
              <ul className="mt-5 space-y-2">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <span className="font-medium">{s.label}</span>
                      <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                        {s.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-muted-foreground">
                  Currently in{" "}
                  <span className="text-foreground">{siteConfig.location}</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface TerminalFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  multiline?: boolean;
}

function TerminalField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline,
}: TerminalFieldProps) {
  const shared =
    "w-full resize-none bg-transparent text-foreground caret-primary placeholder:text-muted-foreground/50 focus:outline-none";
  return (
    <label className="block">
      <span className="mb-1 flex items-center gap-2 text-xs text-primary">
        <span className="text-muted-foreground">{">"}</span>
        {label}
      </span>
      <div className="flex items-start gap-2 rounded-lg border border-white/10 bg-background/40 px-3 py-2 transition-colors focus-within:border-primary/50">
        <span aria-hidden className="select-none text-emerald-300">
          $
        </span>
        {multiline ? (
          <textarea
            required
            rows={3}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={shared}
          />
        ) : (
          <input
            required
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={shared}
          />
        )}
      </div>
    </label>
  );
}
