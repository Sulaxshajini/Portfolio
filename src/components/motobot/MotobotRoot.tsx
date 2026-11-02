"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMotobot } from "./MotobotProvider";
import { useDingChat } from "./useDingChat";
import ChatPanel from "./ChatPanel";
import MotobotSVG from "./MotobotSVG";
import { getLenis, scrollToId } from "@/lib/scroll";
import type { Action } from "@/lib/knowledge";
import { profile } from "@/data/profile";

const LINES = ["Hey there! I'm DING MOTOBOT.", `I'm your personal guide to discovering everything about ${profile.name.split(" ")[0]}.`, "I can tell you about her education, projects, skills, experiences, and creative journey."];

export default function MotobotRoot() {
  const { open, openChat, closeChat, pendingPrompt, clearPrompt } = useMotobot();
  const chat = useDingChat();
  const router = useRouter();
  const pathname = usePathname();
  const [shown, setShown] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // greeting sequence
  useEffect(() => {
    if (dismissed || open || pathname !== "/") return;
    const timers = LINES.map((_, i) => setTimeout(() => setShown(i + 1), 1500 + i * 2400));
    return () => timers.forEach(clearTimeout);
  }, [dismissed, open, pathname]);

  // one-shot prompt from topic labels
  useEffect(() => {
    if (open && pendingPrompt) { chat.send(pendingPrompt); clearPrompt(); }
  }, [open, pendingPrompt, chat, clearPrompt]);

  // lock page scroll while chat is open
  useEffect(() => {
    if (!open) return;
    const l = getLenis();
    l?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { l?.start(); document.body.style.overflow = prev; };
  }, [open]);

  const navigate = useCallback((a: Action) => {
    if (a.kind === "external") { window.location.href = a.href; return; }
    closeChat();
    if (a.kind === "section") {
      const id = a.href.split("#")[1];
      if (pathname === "/") setTimeout(() => { scrollToId(id); history.replaceState(null, "", `#${id}`); }, 350);
      else router.push(a.href);
    } else router.push(a.href);
  }, [closeChat, pathname, router]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div className="fixed bottom-4 right-4 z-[55] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
            initial={{ opacity: 0, y: 40, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: 0.9, type: "spring", stiffness: 240, damping: 22 }}>
            <AnimatePresence>
              {!dismissed && shown > 0 && pathname === "/" && (
                <motion.div className="relative max-w-[16rem] rounded-3xl rounded-br-lg border border-lavender/30 bg-[#150c30] p-4 pr-9 shadow-[0_20px_60px_-15px_rgba(91,33,182,.7)] sm:max-w-xs"
                  initial={{ opacity: 0, y: 16, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss greeting" className="absolute right-3 top-3 text-muted transition hover:text-ink"><X size={14} /></button>
                  <div className="space-y-2 text-sm leading-snug">
                    {LINES.slice(0, shown).map((l, i) => (
                      <motion.p key={l} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={i === 0 ? "font-semibold text-ink" : "hidden text-muted sm:block"}>{l}</motion.p>
                    ))}
                  </div>
                  {shown >= LINES.length && (
                    <motion.button type="button" onClick={() => openChat()} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="mt-3 w-full rounded-full bg-gradient-to-r from-violet to-blush px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white">Chat with Ding →</motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <button type="button" onClick={() => openChat()} aria-label="Open chat with DING MOTOBOT"
              className="group relative grid h-[84px] w-[84px] place-items-center rounded-full border border-lavender/40 bg-[#140b2e]/90 shadow-[0_0_40px_rgba(139,92,246,.6)] backdrop-blur transition hover:scale-105">
              <span className="absolute inset-0 animate-ping rounded-full border border-lavender/40 [animation-duration:2.8s]" />
              <MotobotSVG mood={!dismissed && shown > 0 && shown < LINES.length + 1 ? "greeting" : "idle"} className="h-[74px] w-[60px] -translate-y-0.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <ChatPanel messages={chat.messages} status={chat.status} mode={chat.mode} suggestions={chat.suggestions}
            onSend={chat.send} onClear={chat.clear} onClose={closeChat} onAction={navigate} />
        )}
      </AnimatePresence>
    </>
  );
}
