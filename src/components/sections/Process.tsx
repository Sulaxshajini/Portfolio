"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle, FileText, ListChecks, Search, ShieldAlert, Stethoscope } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const steps = [
  { title: "Identify", desc: "Understand the issue and reproduce the problem.", icon: Search },
  { title: "Isolate", desc: "Separate application, database, connectivity and system-level causes.", icon: ShieldAlert },
  { title: "Diagnose", desc: "Use structured testing and technical investigation.", icon: Stethoscope },
  { title: "Resolve", desc: "Apply a controlled solution.", icon: CheckCircle },
  { title: "Verify", desc: "Confirm functionality and data integrity.", icon: ListChecks },
  { title: "Document", desc: "Record the solution and workflow for future reference.", icon: FileText },
];

function Card({ s, i }: { s: (typeof steps)[number]; i: number }) {
  const Icon = s.icon;
  return (
    <div className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-8 md:p-10">
      <span className="font-display pointer-events-none absolute -right-4 -top-6 text-[9rem] font-extrabold leading-none text-white/[0.04]">0{i + 1}</span>
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet to-blush shadow-[0_0_30px_rgba(139,92,246,.5)]"><Icon size={26} className="text-white" /></div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lavender">Step 0{i + 1}</p>
        <h3 className="font-display mt-3 text-4xl font-extrabold md:text-5xl">{s.title}</h3>
        <p className="mt-4 max-w-sm text-muted">{s.desc}</p>
      </div>
    </div>
  );
}

export default function Process() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => track.current && setDist(Math.max(0, track.current.scrollWidth - window.innerWidth + 96));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="process" className="relative scroll-mt-20">
      <div className="px-6 pt-10 md:px-12">
        <div className="mx-auto max-w-7xl"><SectionHeading index="02" eyebrow="Process" title={<>How I <span className="text-gradient">solve</span> problems</>} /></div>
      </div>

      {/* desktop: pinned horizontal journey */}
      <div ref={wrap} className="relative hidden md:block" style={{ height: "380vh" }}>
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div ref={track} style={{ x }} className="flex w-max gap-6 px-12">
            {steps.map((s, i) => (<div key={s.title} className="h-[26rem] w-[min(34rem,70vw)] shrink-0"><Card s={s} i={i} /></div>))}
          </motion.div>
          <div className="absolute inset-x-12 bottom-14 h-px bg-line"><motion.div style={{ width: bar }} className="h-full bg-gradient-to-r from-violet to-blush shadow-[0_0_12px_rgba(167,139,250,.9)]" /></div>
        </div>
      </div>

      {/* mobile: stacked */}
      <div className="space-y-5 px-6 pb-24 md:hidden">
        {steps.map((s, i) => (<Reveal key={s.title}><div className="h-72"><Card s={s} i={i} /></div></Reveal>))}
      </div>
    </section>
  );
}
