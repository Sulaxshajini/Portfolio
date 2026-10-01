'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const LINES = [
  { text: '$ npm run dev', tone: 'text-text-primary' },
  { text: '▲ ready · responsive on every screen', tone: 'text-status-success' },
  { text: '$ git commit -m "ship: full stack feature"', tone: 'text-text-primary' },
  { text: '✓ API ↔ MySQL connected', tone: 'text-status-success' },
];
const GAP = 8; // virtual "pause" between lines, in characters
// Character index at which each line starts typing
const STARTS = LINES.map((_, i) => LINES.slice(0, i).reduce((n, l) => n + l.text.length + GAP, 0));

/** Looping typed-terminal graphic. Runs only while visible; shows static text under reduced motion. */
export default function CodeTerminal({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const total = LINES.reduce((n, l) => n + l.text.length + GAP, 0);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let t: ReturnType<typeof setTimeout>;
    const tick = (count: number) => {
      setN(count);
      t = setTimeout(() => tick(count >= total ? 0 : count + 1), count >= total ? 2600 : 42);
    };
    tick(n);
    return () => clearTimeout(t);
    // n intentionally omitted: the loop owns its counter once started
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, total]);

  return (
    <div ref={ref} aria-hidden className={`relative w-full max-w-md rounded-xl bg-card-bg/80 backdrop-blur-sm ${className}`}>
      <div className="gradient-ring" />
      <div className="flex items-center gap-1.5 border-b border-border-subtle px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-accent-primary/70" />
        <span className="h-2 w-2 rounded-full bg-accent-primary/40" />
        <span className="h-2 w-2 rounded-full bg-accent-primary/20" />
        <span className="ml-3 font-mono text-[10px] text-text-muted">~/portfolio</span>
      </div>
      <div className="min-h-[7.5rem] space-y-1 px-4 py-3 font-mono text-[11px] leading-relaxed sm:text-xs">
        {LINES.map((l, i) => {
          const shown = reduce ? l.text.length : Math.max(0, Math.min(l.text.length, n - STARTS[i]));
          const active = shown > 0 && shown < l.text.length;
          return (
            <p key={i} className={`${l.tone} min-h-[1.25em] whitespace-pre-wrap`}>
              {l.text.slice(0, shown)}
              {active && <span className="ml-px inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-accent-primary" />}
            </p>
          );
        })}
      </div>
    </div>
  );
}
