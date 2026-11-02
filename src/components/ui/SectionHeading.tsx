"use client";
import { motion } from "framer-motion";

export default function SectionHeading({ index, eyebrow, title, className = "" }: { index: string; eyebrow: string; title: React.ReactNode; className?: string }) {
  return (
    <div className={`mb-14 md:mb-20 ${className}`}>
      <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="mb-5 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.35em] text-lavender">
        <span>{index}</span>
        <span className="h-px w-12 bg-gradient-to-r from-lavender to-transparent" />
        <span>{eyebrow}</span>
      </motion.div>
      <motion.h2 initial="h" whileInView="s" viewport={{ once: true, margin: "-40px" }} className="font-display overflow-hidden pb-[0.08em] text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold leading-[0.98]">
        <motion.span className="block" variants={{ h: { y: "105%" }, s: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }}>
          {title}
        </motion.span>
      </motion.h2>
    </div>
  );
}
