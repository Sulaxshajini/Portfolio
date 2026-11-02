"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCover from "@/components/ui/ProjectCover";
import Reveal from "@/components/ui/Reveal";

function TiltCover({ p }: { p: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 160, damping: 18 }), sy = useSpring(my, { stiffness: 160, damping: 18 });
  const rx = useTransform(sy, [-0.5, 0.5], [9, -9]), ry = useTransform(sx, [-0.5, 0.5], [-11, 11]);
  return (
    <div ref={ref} style={{ perspective: 1000 }} className="h-full w-full"
      onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="h-full w-full overflow-hidden rounded-[1.75rem] border border-line shadow-[0_30px_80px_-20px_rgba(91,33,182,.55)]">
        <ProjectCover project={p} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="04" eyebrow="Projects" title={<>Selected <span className="text-gradient">work</span></>} />
        <div className="space-y-8 md:space-y-12">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <article className="group glass relative grid gap-8 overflow-hidden rounded-[2.25rem] p-5 transition duration-500 hover:border-lavender/40 md:grid-cols-2 md:gap-12 md:p-8">
                <div className={`aspect-[4/3] md:aspect-auto md:min-h-[22rem] ${i % 2 ? "md:order-2" : ""}`}><TiltCover p={p} /></div>
                <div className="flex flex-col justify-center py-2 md:px-4">
                  <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-lavender">
                    <span>{p.id}</span><span className="h-px w-8 bg-lavender/50" /><span>{p.category}</span>
                  </div>
                  <h3 className="font-display mt-5 text-3xl font-extrabold leading-[1.02] sm:text-4xl lg:text-5xl">{p.title}</h3>
                  <p className="mt-5 text-muted">{p.tagline}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.technologies.map((t) => <li key={t} className="rounded-full border border-line bg-white/5 px-3 py-1 font-mono text-[11px] text-lilac">{t}</li>)}
                  </ul>
                  <Link href={`/projects/${p.slug}`} aria-label={`Explore project: ${p.title}`}
                    className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-violet to-blush px-7 py-3.5 font-mono text-xs uppercase tracking-[0.22em] text-white shadow-[0_0_30px_rgba(139,92,246,.45)] transition hover:gap-5 after:absolute after:inset-0 after:content-['']">
                    Explore project <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
