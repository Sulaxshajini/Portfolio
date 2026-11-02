"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Check, ExternalLink, PlayCircle, FileText } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import type { Project } from "@/data/types";
import ProjectCover from "@/components/ui/ProjectCover";
import { useShell } from "@/components/providers/ShellContext";
import { pad } from "@/lib/utils";
import { scrollToId } from "@/lib/scroll";
import Gallery from "./Gallery";
import Lightbox from "./Lightbox";
import ProjectNav from "./ProjectNav";

const ease = [0.22, 1, 0.36, 1] as const;

interface Sec { id: string; title: string; body: React.ReactNode; wide?: boolean }

function Section({ s, n }: { s: Sec; n: number }) {
  return (
    <section id={s.id} className="scroll-mt-28 border-t border-line py-14 md:py-20">
      <motion.div initial="h" whileInView="s" viewport={{ once: true, margin: "-60px" }} className="mb-8 flex items-end gap-5 md:mb-10">
        <span className="block overflow-hidden">
          <motion.span variants={{ h: { y: "110%", opacity: 0 }, s: { y: 0, opacity: 1, transition: { duration: 0.9, ease } } }}
            className="font-display block text-6xl font-extrabold leading-none text-transparent md:text-8xl" style={{ WebkitTextStroke: "1.5px rgba(196,181,253,.55)" }}>{pad(n)}</motion.span>
        </span>
        <motion.h2 variants={{ h: { x: -24, opacity: 0 }, s: { x: 0, opacity: 1, transition: { duration: 0.8, delay: 0.15, ease } } }} className="font-display pb-1 text-2xl font-bold md:text-4xl">{s.title}</motion.h2>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, delay: 0.1, ease }}>{s.body}</motion.div>
    </section>
  );
}

function DrawLine() {
  return (
    <svg viewBox="0 0 400 24" className="mt-8 h-6 w-full max-w-sm" fill="none" aria-hidden>
      <motion.path d="M2 12 H340 M322 3 L342 12 L322 21" stroke="url(#dl)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeInOut" }} />
      <defs><linearGradient id="dl"><stop offset="0" stopColor="#8b5cf6" /><stop offset="1" stopColor="#f9a8d4" /></linearGradient></defs>
    </svg>
  );
}

export default function CaseStudy({ project: p, prev, next }: { project: Project; prev: Project; next: Project }) {
  const { entered } = useShell();
  const hero = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll({ target: hero, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const deco1 = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const deco2 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const links = [
    p.links.live && { label: "Live website", href: p.links.live, icon: ExternalLink },
    p.links.github && { label: "GitHub repository", href: p.links.github, icon: Github },
    p.links.demo && { label: "Demo video", href: p.links.demo, icon: PlayCircle },
    p.links.docs && { label: "Documentation", href: p.links.docs, icon: FileText },
  ].filter(Boolean) as { label: string; href: string; icon: typeof Github }[];

  const sections: Sec[] = useMemo(() => {
    const list: Sec[] = [];
    list.push({ id: "overview", title: "Project Overview", body: <p className="text-xl leading-relaxed text-ink/90 md:text-2xl">{p.overview}</p> });
    list.push({ id: "challenge", title: "The Challenge", body: (<><p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{p.challenge}</p><DrawLine /></>) });
    if (p.objective) list.push({ id: "objective", title: "The Objective", body: <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{p.objective}</p> });
    list.push({
      id: "role", title: "My Role",
      body: (
        <>
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-lavender">{p.role}</p>
          <ul className="space-y-3">
            {p.responsibilities.map((r, i) => (
              <motion.li key={r} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.6 }} className="glass flex items-start gap-4 rounded-2xl p-5">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet to-blush"><Check size={14} /></span><span className="text-muted">{r}</span>
              </motion.li>
            ))}
          </ul>
        </>
      ),
    });
    list.push({ id: "solution", title: "The Solution", body: (<p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{p.solution}</p>) });
    if (p.designProcess?.length) list.push({ id: "design", title: "Design Process", body: <StepList items={p.designProcess} /> });
    if (p.developmentProcess?.length) list.push({ id: "development", title: "Development Process", body: <StepList items={p.developmentProcess} /> });
    list.push({
      id: "stack", title: "Technology Stack",
      body: (
        <ul className="flex flex-wrap gap-3">
          {p.technologies.map((t, i) => (
            <motion.li key={t} initial={{ opacity: 0, scale: 0.6, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.07 }} whileHover={{ y: -6, scale: 1.06 }}
              className="glass rounded-full px-6 py-3 font-mono text-sm text-lilac shadow-[0_0_30px_-8px_rgba(139,92,246,.6)]">{t}</motion.li>
          ))}
        </ul>
      ),
    });
    list.push({
      id: "features", title: "Key Features",
      body: (
        <ul className="grid gap-4 sm:grid-cols-2">
          {p.features.map((f, i) => (
            <motion.li key={f} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.08, duration: 0.7 }}
              className="glass group flex items-center gap-4 rounded-2xl p-5 transition hover:border-lavender/50">
              <span className="font-mono text-xs text-blush">{pad(i + 1)}</span><span className="font-display text-lg font-bold">{f}</span>
            </motion.li>
          ))}
        </ul>
      ),
    });
    if (p.screenshots.length) list.push({ id: "showcase", title: "Visual Showcase", wide: true, body: <Gallery shots={p.screenshots} onOpen={setLightbox} /> });
    list.push({
      id: "learnings", title: "Challenges & Learnings",
      body: (<blockquote className="relative rounded-3xl border border-line bg-gradient-to-br from-violet/15 to-transparent p-8 text-lg leading-relaxed md:p-10 md:text-xl"><span className="font-display absolute -top-5 left-8 text-7xl leading-none text-violet">“</span>{p.learnings}</blockquote>),
    });
    if (p.outcome) list.push({ id: "outcome", title: "Final Outcome", body: <p className="max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{p.outcome}</p> });
    if (links.length) list.push({
      id: "links", title: "Project Links",
      body: (
        <ul className="grid gap-3 sm:grid-cols-2">
          {links.map(({ label, href, icon: Icon }) => (
            <li key={label}><a href={href} target="_blank" rel="noreferrer" className="group glass flex items-center gap-4 rounded-2xl p-5 transition hover:border-lavender/60 hover:bg-white/[0.07]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet to-blush"><Icon size={18} /></span><span className="font-medium">{label}</span><span className="ml-auto text-lavender transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a></li>
          ))}
        </ul>
      ),
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p]);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-35% 0px -55% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const metaItems = [["Category", p.category], p.year ? ["Year", p.year] : null, ["Role", p.role]].filter(Boolean) as string[][];

  return (
    <main>
      {/* ───────── cinematic hero ───────── */}
      <section ref={hero} className="relative flex min-h-[100svh] items-end overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-24">
        <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}
          initial={{ clipPath: "inset(50% 28% 50% 28% round 3rem)" }} animate={entered ? { clipPath: "inset(0% 0% 0% 0% round 0rem)" } : {}} transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}>
          <ProjectCover project={p} className="h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614] via-[#0a0614]/60 to-[#0a0614]/20" />
        </motion.div>

        {/* floating decorative graphics */}
        <motion.svg style={{ y: deco1 }} className="pointer-events-none absolute right-[8%] top-[22%] hidden h-40 w-40 overflow-visible md:block" viewBox="0 0 100 100" fill="none" aria-hidden>
          <motion.polygon points="50,6 94,86 6,86" stroke="#f9a8d4" strokeWidth="1.2" initial={{ pathLength: 0 }} animate={entered ? { pathLength: 1, rotate: 360 } : {}} transition={{ pathLength: { duration: 2, delay: 1 }, rotate: { duration: 40, repeat: Infinity, ease: "linear" } }} style={{ transformOrigin: "50px 50px" }} />
        </motion.svg>
        <motion.div style={{ y: deco2 }} className="pointer-events-none absolute bottom-[26%] left-[6%] hidden h-24 w-24 rounded-full border border-lavender/40 md:block" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity }} aria-hidden />

        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={entered ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6, duration: 0.8 }}>
            <Link href="/#projects" className="group mb-10 inline-flex items-center gap-3 rounded-full border border-line bg-black/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] backdrop-blur transition hover:border-lavender">
              <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> Back to projects
            </Link>
          </motion.div>

          <motion.div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.3em] text-lavender" initial={{ opacity: 0 }} animate={entered ? { opacity: 1 } : {}} transition={{ delay: 0.9 }}>
            <span>Case study {p.id}</span><span>{p.category}</span>{p.year && <span>{p.year}</span>}
          </motion.div>

          <h1 className="font-display max-w-6xl text-[clamp(2.6rem,9.5vw,8.5rem)] font-extrabold leading-[0.94]">
            {p.title.split(" ").map((w, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                <motion.span className="inline-block" initial={{ y: "115%", rotate: 4 }} animate={entered ? { y: 0, rotate: 0 } : {}} transition={{ duration: 1, delay: 0.7 + i * 0.09, ease }}>{w}</motion.span>
              </span>
            ))}
          </h1>

          <motion.p className="mt-7 max-w-2xl text-lg text-ink/80 md:text-xl" initial={{ opacity: 0, y: 20 }} animate={entered ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.3, duration: 0.9 }}>{p.tagline}</motion.p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {p.technologies.map((t, i) => (
              <motion.li key={t} initial={{ opacity: 0, y: 16, scale: 0.8 }} animate={entered ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ delay: 1.45 + i * 0.07, type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs backdrop-blur">{t}</motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ───────── story ───────── */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-12 lg:grid-cols-[280px_1fr] lg:gap-20">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-8">
            <dl className="space-y-5">
              {metaItems.map(([k, v]) => (
                <div key={k}><dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>
              ))}
            </dl>
            <nav aria-label="Case study sections">
              <ol className="space-y-1 border-l border-line">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <button type="button" onClick={() => scrollToId(s.id)} className={`-ml-px flex w-full items-center gap-3 border-l py-1.5 pl-4 text-left text-sm transition ${active === s.id ? "border-lavender text-ink" : "border-transparent text-muted hover:text-ink"}`}>
                      <span className="font-mono text-[10px] text-lavender">{pad(i + 1)}</span>{s.title}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
            {links.length > 0 && (
              <div className="flex flex-col gap-2">
                {links.map(({ label, href, icon: Icon }) => (<a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-full border border-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] transition hover:border-lavender"><Icon size={14} />{label}</a>))}
              </div>
            )}
          </div>
        </aside>

        <div className="min-w-0">
          {sections.map((s, i) => <Section key={s.id} s={s} n={i + 1} />)}
          {p.screenshots.length === 0 && (
            <p className="border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted/70">Screenshots for this project haven’t been added yet.</p>
          )}
        </div>
      </div>

      <ProjectNav prev={prev} next={next} />
      <Lightbox shots={p.screenshots} index={lightbox} onIndex={setLightbox} />
      <AnimatePresence />
    </main>
  );
}

function StepList({ items }: { items: string[] }) {
  return (
    <ol className="space-y-4">
      {items.map((it, i) => (
        <li key={it} className="glass flex gap-5 rounded-2xl p-5"><span className="font-mono text-xs text-blush">{pad(i + 1)}</span><span className="text-muted">{it}</span></li>
      ))}
    </ol>
  );
}
