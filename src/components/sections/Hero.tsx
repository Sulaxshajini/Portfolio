"use client";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { useShell } from "@/components/providers/ShellContext";
import { useMotobot } from "@/components/motobot/MotobotProvider";
import { scrollToId } from "@/lib/scroll";
import OrbitVisual from "./OrbitVisual";

const ease = [0.22, 1, 0.36, 1] as const;
const [first, ...rest] = profile.name.split(" ");
const titleParts = profile.title.split("|").map((s) => s.trim());

function Line({ children, i, entered }: { children: React.ReactNode; i: number; entered: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span className="block" initial={{ y: "110%", rotate: 3 }} animate={entered ? { y: 0, rotate: 0 } : {}} transition={{ duration: 1.1, delay: 0.25 + i * 0.14, ease }}>
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const { entered } = useShell();
  const { openChat } = useMotobot();
  const fade = (d: number) => ({ initial: { opacity: 0, y: 24 }, animate: entered ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, delay: d, ease } });

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-32 md:px-12">
      <div className="aurora drift-a -left-[10%] top-[5%] h-[50vmax] w-[50vmax] bg-violet/40" />
      <div className="aurora drift-b -right-[10%] bottom-[-10%] h-[42vmax] w-[42vmax] bg-blush/25" />
      <div className="grid-lines absolute inset-0" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <motion.div {...fade(0.1)} className="glass mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-lilac">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
            {profile.status}
          </motion.div>

          <h1 className="font-display text-[clamp(2.1rem,9vw,5.2rem)] lg:text-[clamp(3rem,5.5vw,5.6rem)] font-extrabold leading-[0.95]">
            <Line i={0} entered={entered}>{first}</Line>
            <Line i={1} entered={entered}><span className="text-gradient">{rest.join(" ")}</span></Line>
          </h1>

          <motion.p {...fade(0.75)} className="mt-8 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-lavender sm:text-[13px]">
            {titleParts.map((t, i) => (<span key={t} className="flex items-center gap-3">{i > 0 && <span className="h-1 w-1 rounded-full bg-blush" />}{t}</span>))}
          </motion.p>

          <motion.p {...fade(0.9)} className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.shortDescription}</motion.p>

          <motion.div {...fade(1.05)} className="mt-10 flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => scrollToId("projects")}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-violet to-blush px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-white shadow-[0_0_40px_rgba(139,92,246,.5)] transition hover:scale-[1.03]">
              Explore projects <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </button>
            <button type="button" onClick={() => openChat()} className="rounded-full border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] transition hover:border-lavender hover:bg-white/5">Chat with Ding</button>
            <button type="button" onClick={() => scrollToId("contact")} className="rounded-full px-5 py-4 font-mono text-xs uppercase tracking-[0.22em] text-muted underline-offset-8 transition hover:text-ink hover:underline">Contact</button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.7, rotate: -20 }} animate={entered ? { opacity: 1, scale: 1, rotate: 0 } : {}} transition={{ duration: 1.5, delay: 0.5, ease }} className="hidden sm:block">
          <OrbitVisual />
        </motion.div>
      </div>

      <motion.button type="button" onClick={() => scrollToId("about")} {...fade(1.5)} aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        Scroll <ArrowDown size={14} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
