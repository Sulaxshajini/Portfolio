import { skills } from "@/data/skills";

const words = Array.from(new Set(skills.flatMap((c) => c.items.map((i) => i.name)))).slice(0, 22);

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-white/[0.02] py-5" aria-hidden>
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl font-bold text-white/25 sm:text-4xl">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-10">{w}<span className="text-violet">✦</span></span>
        ))}
      </div>
    </div>
  );
}
