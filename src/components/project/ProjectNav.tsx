"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Project } from "@/data/types";
import ProjectCover from "@/components/ui/ProjectCover";
import { useMotobot } from "@/components/motobot/MotobotProvider";
import { profile } from "@/data/profile";

function Panel({ p, dir }: { p: Project; dir: "prev" | "next" }) {
  const isNext = dir === "next";
  return (
    <Link href={`/projects/${p.slug}`} className={`group relative block min-h-[22rem] overflow-hidden rounded-[2rem] border border-line ${isNext ? "text-right" : ""}`}>
      <ProjectCover project={p} className="absolute inset-0 transition duration-1000 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614] via-[#0a0614]/55 to-transparent transition-opacity group-hover:opacity-90" />
      <motion.div className={`absolute inset-0 -z-0 bg-violet/0 mix-blend-screen transition duration-700 group-hover:bg-violet/25`} />
      <div className={`relative flex h-full min-h-[22rem] flex-col justify-end p-8 md:p-10 ${isNext ? "items-end" : "items-start"}`}>
        <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-lavender">
          {!isNext && <ArrowLeft size={16} className="transition-transform duration-500 group-hover:-translate-x-2" />}
          {isNext ? "Next project" : "Previous project"}
          {isNext && <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-2" />}
        </span>
        <h3 className={`font-display mt-3 max-w-md text-3xl font-extrabold leading-tight transition-transform duration-500 md:text-4xl ${isNext ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}>{p.title}</h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">{p.category}</p>
      </div>
    </Link>
  );
}

export default function ProjectNav({ prev, next }: { prev: Project; next: Project }) {
  const { openChat } = useMotobot();
  return (
    <section className="px-6 pb-10 pt-28 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 md:grid-cols-2"><Panel p={prev} dir="prev" /><Panel p={next} dir="next" /></div>
        <div className="relative mt-24 overflow-hidden rounded-[2.5rem] border border-line bg-gradient-to-br from-violet/25 via-transparent to-blush/15 px-6 py-20 text-center md:py-28">
          <div className="grid-lines absolute inset-0" />
          <h2 className="font-display relative mx-auto max-w-3xl text-[clamp(2rem,5.5vw,4.2rem)] font-extrabold leading-[1.02]">Interested in how I build things? <span className="text-gradient">Let&apos;s connect.</span></h2>
          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-gradient-to-r from-violet to-blush px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-white shadow-[0_0_40px_rgba(139,92,246,.5)] transition hover:scale-105">Email me</a>
            <button type="button" onClick={() => openChat()} className="rounded-full border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] transition hover:border-lavender hover:bg-white/5">Ask Ding</button>
            <Link href="/#contact" className="rounded-full border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] transition hover:border-lavender hover:bg-white/5">Contact section</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
