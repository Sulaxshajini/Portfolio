import { Bike, Database, ShoppingBag, Smartphone, Sparkles } from "lucide-react";
import type { Project } from "@/data/types";

const icons: Record<string, typeof Database> = {
  "sunnyside-dairy-management-system": Database,
  "sy-bicycle-management-system": Bike,
  "knowledge-knockout": Smartphone,
  minzo: ShoppingBag,
  "personal-portfolio": Sparkles,
};

/**
 * Designed cover art generated from the project's theme. It is deliberately
 * abstract (not a fake screenshot) – real screenshots live in project.screenshots.
 */
export default function ProjectCover({ project, className = "" }: { project: Project; className?: string }) {
  const Icon = icons[project.slug] ?? Sparkles;
  const { from, to, glow } = project.theme;
  return (
    <div className={`relative isolate overflow-hidden ${className}`} style={{ background: `linear-gradient(135deg, ${from}, #120a24 55%, ${to}55)` }} aria-hidden>
      <div className="grid-lines absolute inset-0 opacity-70" />
      <div className="absolute -right-[10%] -top-[20%] h-[80%] w-[80%] rounded-full blur-3xl" style={{ background: `${glow}66` }} />
      <div className="absolute -bottom-[30%] -left-[10%] h-[70%] w-[70%] rounded-full blur-3xl" style={{ background: `${to}33` }} />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" fill="none">
        {[60, 100, 140, 190].map((r, i) => (
          <circle key={r} cx="270" cy="150" r={r} stroke="white" strokeOpacity={0.12 - i * 0.02} strokeDasharray={i % 2 ? "2 8" : undefined} />
        ))}
        <path d="M0 240 C80 200 140 280 240 230 S360 190 400 220" stroke={glow} strokeOpacity=".55" strokeWidth="1.2" />
      </svg>
      <span className="font-display absolute bottom-[-6%] left-[4%] text-[clamp(6rem,20vw,15rem)] font-extrabold leading-none text-white/10">{project.id}</span>
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-[22%] min-h-16 aspect-square place-items-center rounded-[28%] border border-white/25 bg-white/10 shadow-[0_0_60px_rgba(255,255,255,.2)] backdrop-blur-md">
          <Icon className="h-1/2 w-1/2 text-white" strokeWidth={1.4} />
        </div>
      </div>
    </div>
  );
}
