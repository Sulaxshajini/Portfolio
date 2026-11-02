"use client";
import { profile } from "@/data/profile";
import { education, languages } from "@/data/education";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const facts = [
  ["Education", education[0].institution],
  ["Degree", education[0].degree],
  ["Location", profile.location],
  ["Languages", languages.map((l) => l.name).join(" · ")],
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" eyebrow="About" title={<>Behind the <span className="text-gradient">systems</span></>} />
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-7 text-lg leading-relaxed text-muted md:text-xl">
            <Reveal><p>I am a <strong className="font-semibold text-ink">final-year Bachelor of Information Technology undergraduate</strong> at the University of Moratuwa with hands-on, end-to-end experience across databases, application systems, and technical troubleshooting.</p></Reveal>
            <Reveal delay={0.1}><p>My practical exposure includes setting up, administering, and maintaining relational databases (<span className="text-lilac">MySQL, SQL Server basics, SQLite</span>), diagnosing and resolving application and connectivity issues, and documenting technical workflows.</p></Reveal>
            <Reveal delay={0.2}><p>I am highly comfortable across Windows environments, version control, and cross-platform tools. As a fast, self-directed learner with strong written and spoken communication, I am well suited to structured IT training programs and <strong className="font-semibold text-ink">first-level technical / service-desk support roles.</strong></p></Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="glass relative overflow-hidden rounded-3xl p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/30 blur-3xl" />
              <dl className="relative space-y-6">
                {facts.map(([k, v]) => (
                  <div key={k} className="border-b border-line pb-5 last:border-0 last:pb-0">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender">{k}</dt>
                    <dd className="mt-1.5 text-lg font-medium">{v}</dd>
                  </div>
                ))}
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.3em] text-lavender">Focus</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {profile.focus.map((f) => <span key={f} className="rounded-full border border-line bg-white/5 px-3 py-1 font-mono text-xs text-lilac">{f}</span>)}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.strengths.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="group glass relative h-full overflow-hidden rounded-3xl p-7 transition duration-500 hover:-translate-y-1.5 hover:border-lavender/50">
                <span className="font-mono text-xs text-blush">0{i + 1}</span>
                <h3 className="font-display mt-4 text-xl font-bold leading-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.description}</p>
                <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-violet/0 blur-2xl transition duration-500 group-hover:bg-violet/40" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
