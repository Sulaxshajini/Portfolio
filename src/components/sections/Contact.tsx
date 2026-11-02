"use client";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const links = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
  { icon: Github, label: "GitHub", href: profile.github },
];

const field = "w-full rounded-2xl border border-line bg-white/[0.04] px-5 py-4 text-ink placeholder:text-muted/60 transition focus:border-lavender focus:bg-white/[0.07] focus:outline-none";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // No backend mail service is configured, so the form composes an email in the visitor's own mail app.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden px-6 pb-12 pt-28 md:px-12 md:pt-40">
      <div className="aurora drift-a -bottom-[30%] left-[10%] h-[50vmax] w-[50vmax] bg-violet/30" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading index="07" eyebrow="Contact" title={<>Let&apos;s <span className="text-gradient">connect</span></>} />
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="max-w-md text-lg text-muted">Open to IT support, infrastructure and service-desk opportunities, and to training programs. Send a note — I read every message.</p>
            <ul className="mt-10 space-y-3">
              {links.map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group glass flex items-center gap-5 rounded-2xl px-5 py-4 transition hover:border-lavender/50 hover:bg-white/[0.07]">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet/80 to-blush/60"><Icon size={19} /></span>
                    <span className="font-medium">{label}</span>
                    <span className="ml-auto text-lavender transition-transform group-hover:translate-x-1">↗</span>
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3 px-2 pt-3 text-sm text-muted"><MapPin size={16} />{profile.location}</li>
            </ul>
          </Reveal>
          <Reveal delay={0.12}>
            <form onSubmit={onSubmit} className="glass space-y-4 rounded-[2rem] p-7 md:p-9">
              <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-lavender">Name</span><input name="name" required maxLength={80} className={field} placeholder="Your name" autoComplete="name" /></label>
              <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-lavender">Email</span><input name="email" type="email" required maxLength={120} className={field} placeholder="you@company.com" autoComplete="email" /></label>
              <label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em] text-lavender">Message</span><textarea name="message" required rows={5} maxLength={1500} className={field} placeholder="How can I help?" /></label>
              <button type="submit" className="w-full rounded-full bg-gradient-to-r from-violet to-blush py-4 font-mono text-xs uppercase tracking-[0.25em] text-white shadow-[0_0_30px_rgba(139,92,246,.45)] transition hover:brightness-110">Compose email →</button>
              <p className="text-center text-xs text-muted" role="status">{sent ? "Opening your email app — if nothing happens, write to " + profile.email : "This opens a pre-filled email in your mail app."}</p>
            </form>
          </Reveal>
        </div>

        <footer className="mt-28 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Designed &amp; built with Next.js · GSAP · Framer Motion</span>
        </footer>
      </div>
    </section>
  );
}
