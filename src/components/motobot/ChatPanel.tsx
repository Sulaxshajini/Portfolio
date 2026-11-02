"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, RotateCcw, X } from "lucide-react";
import MotobotSVG from "./MotobotSVG";
import type { Mood } from "./types";
import type { ChatMessage, ChatStatus } from "./useDingChat";
import type { Action } from "@/lib/knowledge";
import { cn } from "@/lib/utils";

interface Props {
  messages: ChatMessage[];
  status: ChatStatus;
  mode: "unknown" | "ai" | "fallback";
  suggestions: string[];
  onSend: (t: string) => void;
  onClear: () => void;
  onClose: () => void;
  onAction: (a: Action) => void;
}

export default function ChatPanel({ messages, status, mode, suggestions, onSend, onClear, onClose, onAction }: Props) {
  const [input, setInput] = useState("");
  const [focused, setFocused] = useState(false);
  const [intro, setIntro] = useState(true);
  const [pulse, setPulse] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const busy = status !== "idle";

  useEffect(() => { const t = setTimeout(() => setIntro(false), 2400); return () => clearTimeout(t); }, []);
  useEffect(() => { field.current?.focus(); }, []);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" }); }, [messages, status]);

  const mood: Mood = intro ? "greeting" : status === "thinking" ? "thinking" : status === "streaming" ? "talking" : pulse ? "excited" : focused && input ? "listening" : "idle";

  const submit = (t = input) => {
    if (!t.trim() || busy) return;
    setPulse(true); setTimeout(() => setPulse(false), 1200);
    onSend(t);
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
    if (e.key === "Tab" && dialog.current) {
      const f = Array.from(dialog.current.querySelectorAll<HTMLElement>("button:not([disabled]), textarea, a[href]"));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  const badge = mode === "ai" ? { t: "AI connected", c: "bg-emerald-400" } : mode === "fallback" ? { t: "Offline guide", c: "bg-amber-300" } : { t: "Ready", c: "bg-lavender" };

  return (
    <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-[#07040f]/70 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <motion.div ref={dialog} role="dialog" aria-modal="true" aria-label="Chat with DING MOTOBOT" onKeyDown={onKey}
        initial={{ opacity: 0, y: 60, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.97 }} transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden border border-line bg-[#0d0820] shadow-[0_40px_120px_-20px_rgba(91,33,182,.7)] sm:h-[min(720px,90vh)] sm:max-w-5xl sm:rounded-[2rem] md:grid md:grid-cols-[300px_1fr]">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-blush/15 blur-3xl" />

        {/* robot column (desktop) */}
        <aside className="relative hidden flex-col items-center justify-between border-r border-line bg-gradient-to-b from-violet/15 to-transparent p-6 md:flex">
          <div className="text-center">
            <p className="font-display text-2xl font-extrabold tracking-tight">DING MOTOBOT</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-lavender">Portfolio companion</p>
          </div>
          <MotobotSVG mood={mood} className="h-[320px] w-full max-w-[250px]" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">{mood}</p>
        </aside>

        <section className="relative flex min-h-0 flex-1 flex-col">
          <header className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-6">
            <MotobotSVG mood={mood} still className="h-11 w-9 shrink-0 md:hidden" />
            <div className="min-w-0">
              <h2 className="font-display truncate text-lg font-bold md:hidden">DING MOTOBOT</h2>
              <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted"><span className={cn("h-1.5 w-1.5 rounded-full", badge.c)} />{badge.t}</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button type="button" onClick={onClear} className="flex items-center gap-2 rounded-full border border-line px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted transition hover:border-lavender hover:text-ink" aria-label="Clear chat"><RotateCcw size={13} /><span className="hidden sm:inline">Clear</span></button>
              <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-line transition hover:border-lavender" aria-label="Close chat"><X size={16} /></button>
            </div>
          </header>

          <div ref={scroller} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6" aria-live="polite" data-lenis-prevent>
            {messages.map((m) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35 }}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[88%] sm:max-w-[80%]")}>
                  <div className={cn("whitespace-pre-wrap break-words rounded-3xl px-5 py-3.5 text-[15px] leading-relaxed",
                    m.role === "user" ? "rounded-br-lg bg-gradient-to-br from-violet to-[#6d28d9] text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,.8)]" : cn("rounded-bl-lg border border-line bg-white/[0.06] text-ink", m.error && "border-amber-300/40"))}>
                    {m.content || (m.role === "assistant" && status === "thinking" && m === messages[messages.length - 1] ? <TypingDots /> : null)}
                  </div>
                  {m.actions && m.actions.length > 0 && m.content && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.actions.map((a) => (
                        <button key={a.href} type="button" onClick={() => onAction(a)}
                          className="rounded-full border border-lavender/50 bg-violet/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-lilac transition hover:bg-violet/40">
                          {a.label} →
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-line px-4 pb-4 pt-3 sm:px-6">
            <div className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6" data-lenis-prevent role="list" aria-label="Suggested questions">
              <AnimatePresence initial={false}>
                {suggestions.map((s) => (
                  <motion.button key={s} role="listitem" layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} type="button" disabled={busy} onClick={() => submit(s)}
                    className="shrink-0 rounded-full border border-line bg-white/[0.04] px-4 py-2 text-[13px] text-lilac transition hover:border-lavender hover:bg-white/10 disabled:opacity-40">{s}</motion.button>
                ))}
              </AnimatePresence>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="flex items-end gap-2 rounded-3xl border border-line bg-white/[0.05] p-2 transition focus-within:border-lavender">
              <label htmlFor="ding-input" className="sr-only">Ask DING MOTOBOT a question</label>
              <textarea id="ding-input" ref={field} value={input} rows={1} maxLength={400} onChange={(e) => setInput(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
                placeholder="Ask about her education, projects, skills…"
                className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent focus-visible:outline-none px-4 py-3 text-[15px] text-ink outline-none placeholder:text-muted/70" />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send message"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-blush text-white transition enabled:hover:scale-105 disabled:opacity-40"><ArrowUp size={18} /></button>
            </form>
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <span className="flex h-5 items-center gap-1.5" aria-label="DING MOTOBOT is typing">
      {[0, 1, 2].map((i) => (<motion.span key={i} className="h-2 w-2 rounded-full bg-lavender" animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />))}
    </span>
  );
}
