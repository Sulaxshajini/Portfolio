import { skills } from '@/data/skills';

const FEATURED = ['Programming', 'Databases', 'APIs & Architecture', 'Tools'];

function MarqueeRow({ names, hidden }: { names: string[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3">
      {names.map((n) => (
        <li
          key={n}
          className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border-subtle bg-card-bg/60 px-4 py-2 font-mono text-xs text-text-secondary"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-accent-primary to-mauve" />
          {n}
        </li>
      ))}
    </ul>
  );
}

/** Infinite stack ticker built from the real skills data. CSS-only, pauses on hover. */
export default function TechMarquee() {
  const names = Array.from(
    new Set(skills.filter((c) => FEATURED.includes(c.category)).flatMap((c) => c.items.map((i) => i.name))),
  );

  return (
    <div
      aria-label="Technology stack"
      className="relative z-20 overflow-hidden border-y border-border-subtle bg-secondary-bg/80 py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <MarqueeRow names={names} />
        <MarqueeRow names={names} hidden />
      </div>
    </div>
  );
}
