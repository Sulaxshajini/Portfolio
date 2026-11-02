"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_SUGGESTIONS, type Action } from "@/lib/knowledge";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: Action[];
  error?: boolean;
}

export type ChatStatus = "idle" | "thinking" | "streaming";

const WELCOME: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content: `Hey there! I'm DING MOTOBOT, your personal guide to ${profile.name.split(" ")[0]}'s portfolio. Ask me about her education, projects, skills or how to reach her — or pick a question below!`,
};

let n = 0;
const uid = () => `m${Date.now()}-${n++}`;

function decodeMeta(h: string | null): { actions?: Action[]; suggestions?: string[] } {
  if (!h) return {};
  try {
    const bytes = Uint8Array.from(atob(h), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch { return {}; }
}

/** Chat state lives for the current page session only (never persisted). */
export function useDingChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [mode, setMode] = useState<"unknown" | "ai" | "fallback">("unknown");
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const ctl = useRef<AbortController | null>(null);
  const reveal = useRef<ReturnType<typeof setInterval> | null>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Truthful capability badge: does the server actually have a provider key?
  useEffect(() => {
    let off = false;
    fetch("/api/chat").then((r) => r.json()).then((j) => !off && setMode(j.ai ? "ai" : "fallback")).catch(() => {});
    return () => { off = true; };
  }, []);

  const stopAll = useCallback(() => {
    ctl.current?.abort();
    if (reveal.current) clearInterval(reveal.current);
    reveal.current = null;
  }, []);
  useEffect(() => stopAll, [stopAll]);

  const patch = (id: string, p: Partial<ChatMessage>) => setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, ...p } : m)));

  const send = useCallback(async (raw: string) => {
    const text = raw.trim().slice(0, 400);
    if (!text || status !== "idle") return;
    const user: ChatMessage = { id: uid(), role: "user", content: text };
    const bot: ChatMessage = { id: uid(), role: "assistant", content: "" };
    const history = [...messagesRef.current.filter((m) => !m.error && m.content), user].slice(-10).map(({ role, content }) => ({ role, content }));
    setMessages((ms) => [...ms, user, bot]);
    setStatus("thinking");
    const c = new AbortController();
    ctl.current = c;

    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages: history }), signal: c.signal });
      if (res.status === 429) {
        patch(bot.id, { content: "Whoa, that's a lot of questions at once! Give me a minute to catch my breath, then ask again.", error: true });
        setStatus("idle");
        return;
      }
      if (!res.ok || !res.body) throw new Error("bad response");
      const m = res.headers.get("x-ding-mode") === "ai" ? "ai" : "fallback";
      const meta = decodeMeta(res.headers.get("x-ding-meta"));
      setMode(m);
      const reader = res.body.getReader();
      const dec = new TextDecoder();

      if (m === "fallback") {
        // Whole answer arrives at once; reveal it progressively so it feels alive.
        let full = "";
        for (;;) { const { done, value } = await reader.read(); if (done) break; full += dec.decode(value, { stream: true }); }
        setStatus("streaming");
        await new Promise<void>((resolve) => {
          let i = 0;
          reveal.current = setInterval(() => {
            i = Math.min(full.length, i + 3);
            patch(bot.id, { content: full.slice(0, i) });
            if (i >= full.length) { if (reveal.current) clearInterval(reveal.current); reveal.current = null; resolve(); }
          }, 14);
          c.signal.addEventListener("abort", () => { if (reveal.current) clearInterval(reveal.current); resolve(); });
        });
      } else {
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += dec.decode(value, { stream: true });
          setStatus("streaming");
          patch(bot.id, { content: acc });
        }
        if (!acc.trim()) throw new Error("empty");
      }
      patch(bot.id, { actions: meta.actions });
      if (meta.suggestions?.length) setSuggestions(meta.suggestions);
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
      patch(bot.id, { content: `Oops — my circuits hiccuped and I couldn't reach my brain just now. Please try again in a moment, or email her directly at ${profile.email}.`, error: true });
    } finally {
      setStatus("idle");
    }
  }, [status]);

  const clear = useCallback(() => {
    stopAll();
    setMessages([WELCOME]);
    setSuggestions([...DEFAULT_SUGGESTIONS, ...projects.slice(0, 2).map((p) => `Tell me about ${p.title}`)].slice(0, 10));
    setStatus("idle");
  }, [stopAll]);

  return { messages, status, mode, suggestions, send, clear };
}
