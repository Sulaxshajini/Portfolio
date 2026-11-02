"use client";
import { motion } from "framer-motion";

export default function Monogram({ draw, size = 180 }: { draw: number; size?: number }) {
  const d = Math.max(0, Math.min(1, draw));
  return (
    <svg viewBox="0 0 150 100" width={size} height={(size * 100) / 150} fill="none" aria-label="SK monogram" role="img"
      style={{ filter: "drop-shadow(0 0 14px rgba(167,139,250,.8))" }}>
      <defs>
        <linearGradient id="mono-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f3ff" />
          <stop offset=".55" stopColor="#c4b5fd" />
          <stop offset="1" stopColor="#f9a8d4" />
        </linearGradient>
      </defs>
      {["M50 24 C46 6 12 8 15 30 C18 47 49 45 51 65 C53 90 13 90 9 70", "M78 12 V88 M128 12 L80 52 L130 88"].map((p, i) => (
        <motion.path key={i} d={p} stroke="url(#mono-g)" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round"
          initial={false} animate={{ pathLength: d }} transition={{ duration: 0.5, ease: "easeOut" }} />
      ))}
    </svg>
  );
}
