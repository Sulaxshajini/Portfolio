"use client";
import { education, languages } from "@/data/education";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { GraduationCap, Languages } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="relative scroll-mt-20 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="05" eyebrow="Education" title={<>Learning <span className="text-gradient">path</span></>} />
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <ol className="relative space-y-8 border-l border-line pl-8 md:pl-12">
            {education.map((e, i) => (
              <Reveal as="li" key={e.institution} delay={i * 0.1} className="relative">
                <span className="absolute -left-[2.55rem] top-7 grid h-4 w-4 place-items-center rounded-full bg-bg md:-left-[3.55rem]"><span className="h-3 w-3 rounded-full bg-gradient-to-br from-violet to-blush shadow-[0_0_14px_rgba(167,139,250,.9)]" /></span>
                <div className="glass rounded-3xl p-7 md:p-9">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-lavender"><GraduationCap size={16} />{e.status}</div>
                  <h3 className="font-display mt-4 text-2xl font-extrabold md:text-3xl">{e.degree}</h3>
                  <p className="mt-1 text-lg text-muted">{e.institution}</p>
                  {"description" in e && e.description && <p className="mt-3 text-sm text-muted">{e.description}</p>}
                  {"grade" in e && e.grade && <p className="mt-2 font-mono text-xs text-lilac">Grade: {e.grade}</p>}
                  {"coursework" in e && e.coursework && (
                    <ul className="mt-6 flex flex-wrap gap-2">{e.coursework.map((c) => <li key={c} className="rounded-full border border-line bg-white/5 px-3 py-1 font-mono text-[11px] text-lilac">{c}</li>)}</ul>
                  )}
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.15}>
            <div className="glass h-fit rounded-3xl p-7 md:p-9">
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-lavender"><Languages size={16} />Languages</div>
              <ul className="mt-6 space-y-5">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-baseline justify-between border-b border-line pb-4 last:border-0 last:pb-0">
                    <span className="font-display text-2xl font-bold">{l.name}</span>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted">{l.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
