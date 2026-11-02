"use client";
import { useEffect, useRef } from "react";

interface Props {
  /** 0..1 – ramps particle visibility/energy as initialization advances */
  energyRef: React.MutableRefObject<number>;
  count?: number;
}

/** Lightweight canvas particle field. Cleans up its rAF loop and listeners. */
export default function ParticleField({ energyRef, count = 70 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0, raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const n = window.innerWidth < 640 ? Math.round(count * 0.5) : count;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const palette = ["196,181,253", "233,213,255", "139,92,246", "249,168,212"];
    const ps = Array.from({ length: n }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(Math.random() * 0.35 + 0.08),
      a: Math.random() * 0.6 + 0.2,
      c: palette[Math.floor(Math.random() * palette.length)],
      ph: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const tick = () => {
      t += 0.016;
      const e = energyRef.current;
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx * (0.6 + e * 1.6);
        p.y += p.vy * (0.6 + e * 1.6);
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w; }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const tw = 0.6 + Math.sin(t * 1.5 + p.ph) * 0.4;
        const alpha = p.a * tw * (0.15 + e * 0.85);
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.c},${alpha})`;
        ctx.shadowColor = `rgba(${p.c},${alpha})`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, energyRef]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}
