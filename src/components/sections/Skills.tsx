"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { skills } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

export default function Skills() {
  const [active, setActive] = useState(0);
  const cat = skills[active];
  return (
    <section id="skills" className="relative scroll-mt-20 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="03" eyebrow="Skills" title={<>The technical <span className="text-gradient">toolkit</span></>} />
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <div role="tablist" aria-label="Skill categories" className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
            {skills.map((c, i) => (
              <button key={c.category} role="tab" aria-selected={i === active} type="button" onClick={() => setActive(i)}
                className={cn("group relative shrink-0 rounded-2xl px-5 py-4 text-left transition", i === active ? "text-ink" : "text-muted hover:text-ink")}>
                {i === active && <motion.span layoutId="skill-tab" className="glass absolute inset-0 -z-10 rounded-2xl border-lavender/40" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                <span className="block font-mono text-[10px] tracking-[0.3em] text-lavender">0{i + 1}</span>
                <span className="font-display mt-1 block whitespace-nowrap text-xl font-bold lg:whitespace-normal">{c.category}</span>
                <span className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-widest text-muted lg:block">{c.items.length} skills</span>
              </button>
            ))}
          </div>

          <div role="tabpanel" className="min-h-[26rem]">
            <AnimatePresence mode="wait">
              <motion.ul key={cat.category} className="grid gap-4 sm:grid-cols-2" initial="h" animate="s" exit="x"
                variants={{ h: {}, s: { transition: { staggerChildren: 0.07 } }, x: { transition: { staggerChildren: 0.02 } } }}>
                {cat.items.map((it) => (
                  <motion.li key={it.name} variants={{ h: { opacity: 0, y: 24, scale: 0.97 }, s: { opacity: 1, y: 0, scale: 1 }, x: { opacity: 0, y: -10 } }}
                    className="glass group relative overflow-hidden rounded-3xl p-6 transition duration-500 hover:-translate-y-1 hover:border-lavender/50">
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet/0 blur-2xl transition duration-500 group-hover:bg-blush/40" />
                    <h3 className="font-display text-xl font-bold">{it.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{it.description}</p>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
