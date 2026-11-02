"use client";
import { monogram, profile } from "@/data/profile";

const rings = [
  { inset: "6%", speed: 70, items: profile.focus.slice(0, 2), start: 20 },
  { inset: "22%", speed: 46, items: profile.focus.slice(2), start: 100 },
];

export default function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-[min(520px,86vw)]" aria-hidden>
      <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-violet via-violet-deep to-blush/60 opacity-90 shadow-[0_0_120px_30px_rgba(139,92,246,.45)]" />
      <div className="absolute inset-[30%] grid place-items-center rounded-full border border-white/30">
        <span className="font-display text-5xl font-extrabold text-white drop-shadow-[0_0_18px_rgba(255,255,255,.6)] sm:text-6xl">{monogram}</span>
      </div>
      {rings.map((r, ri) => (
        <div key={ri} className="absolute rounded-full border border-dashed border-lavender/25" style={{ inset: r.inset, animation: `orbit-fwd ${r.speed}s linear infinite ${ri ? "reverse" : ""}` }}>
          {r.items.map((label, i) => {
            const a = r.start + (i * 360) / Math.max(r.items.length, 1) + ri * 40;
            return (
              <div key={label} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" style={{ animation: `spin-rev ${r.speed}s linear infinite ${ri ? "reverse" : ""}` }}>
                  <div style={{ transform: `rotate(${-a}deg)` }}>
                    <span className="glass block whitespace-nowrap rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-lilac sm:text-[11px]">{label}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div className="absolute inset-0 rounded-full border border-line" />
    </div>
  );
}
