"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import MotobotAvatar from "@/components/motobot/MotobotAvatar";
import { useMotobot } from "@/components/motobot/MotobotProvider";
import type { Mood } from "@/components/motobot/types";

const topics = [
  { label: "Education", prompt: "Tell me about her education", pos: "left-[4%] top-[12%]" },
  { label: "Projects", prompt: "Show me her best projects", pos: "right-[4%] top-[8%]" },
  { label: "Technology", prompt: "What technologies does she use?", pos: "left-[0%] top-[46%]" },
  { label: "Creativity", prompt: "How does she approach building things?", pos: "right-[0%] top-[44%]" },
  { label: "Experience", prompt: "What experience does she have?", pos: "left-[6%] bottom-[10%]" },
  { label: "Achievements", prompt: "What are her achievements?", pos: "right-[5%] bottom-[8%]" },
];

export default function Companion() {
  const { openChat } = useMotobot();
  const [mood, setMood] = useState<Mood>("idle");
  return (
    <section id="companion" className="relative scroll-mt-20 overflow-hidden px-6 py-28 md:px-12 md:py-40">
      <div className="aurora drift-b left-1/2 top-1/3 h-[40vmax] w-[40vmax] -translate-x-1/2 bg-violet/30" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading index="06" eyebrow="Meet my digital companion" title={<>Curious about me? <span className="text-gradient">Just ask.</span></>} />

        <div className="relative mx-auto h-[34rem] max-w-4xl max-md:hidden">
          <div className="absolute inset-0 rounded-[3rem] border border-line bg-gradient-to-b from-white/[0.05] to-transparent" />
          <div className="grid-lines absolute inset-0 rounded-[3rem]" />
          <MotobotAvatar mood={mood} className="absolute left-1/2 top-1/2 h-[92%] w-[46%] -translate-x-1/2 -translate-y-1/2" />
          {topics.map((t, i) => (
            <motion.button key={t.label} type="button" onClick={() => openChat(t.prompt)} onMouseEnter={() => setMood("excited")} onMouseLeave={() => setMood("idle")} onFocus={() => setMood("excited")} onBlur={() => setMood("idle")}
              className={`glass absolute ${t.pos} rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-lilac transition hover:border-lavender hover:bg-violet/30 hover:text-white`}
              animate={{ y: [0, i % 2 ? 10 : -10, 0] }} transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.1 }}>
              {t.label}
            </motion.button>
          ))}
        </div>

        {/* mobile: compact robot + topic grid */}
        <div className="md:hidden">
          <MotobotAvatar mood={mood} className="mx-auto h-72 w-56" />
          <div className="mt-6 grid grid-cols-2 gap-3">
            {topics.map((t) => (
              <button key={t.label} type="button" onClick={() => openChat(t.prompt)} className="glass rounded-2xl px-4 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-lilac">{t.label}</button>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <button type="button" onClick={() => openChat()} onMouseEnter={() => setMood("greeting")} onMouseLeave={() => setMood("idle")}
            className="rounded-full bg-gradient-to-r from-violet to-blush px-10 py-5 font-mono text-xs uppercase tracking-[0.25em] text-white shadow-[0_0_50px_rgba(139,92,246,.55)] transition hover:scale-105">
            Let&apos;s talk with Ding →
          </button>
        </div>
      </div>
    </section>
  );
}
