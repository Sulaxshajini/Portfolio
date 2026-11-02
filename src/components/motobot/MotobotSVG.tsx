"use client";
import { motion, type TargetAndTransition } from "framer-motion";
import type { Mood } from "./types";

/**
 * Lightweight animated DING MOTOBOT (pure SVG + Framer Motion). Used for the chat
 * avatar, the floating launcher, mobile devices and reduced-motion visitors.
 */
export default function MotobotSVG({ mood = "idle", className = "", still = false }: { mood?: Mood; className?: string; still?: boolean }) {
  const happy = mood === "excited" || mood === "greeting";
  const thinking = mood === "thinking";
  const talking = mood === "talking" || mood === "answering";
  const eyeRy = thinking ? 7 : mood === "listening" ? 17 : 14;
  const eyeShift = thinking ? { x: 5, y: -4 } : { x: 0, y: 0 };

  const loop = (extra: TargetAndTransition): TargetAndTransition => (still ? {} : extra);

  return (
    <svg viewBox="0 0 240 300" className={className} role="img" aria-label={`DING MOTOBOT robot mascot, ${mood}`} overflow="visible">
      <defs>
        <linearGradient id="mb-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" /><stop offset=".55" stopColor="#ece6ff" /><stop offset="1" stopColor="#c4b5fd" />
        </linearGradient>
        <linearGradient id="mb-visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1459" /><stop offset="1" stopColor="#0f0723" />
        </linearGradient>
        <radialGradient id="mb-glow"><stop offset="0" stopColor="#c4b5fd" stopOpacity=".9" /><stop offset="1" stopColor="#c4b5fd" stopOpacity="0" /></radialGradient>
        <filter id="mb-blur"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>

      {/* ground shadow */}
      <motion.ellipse cx="120" cy="286" rx="52" ry="7" fill="#8b5cf6" opacity=".35" filter="url(#mb-blur)" style={{ transformOrigin: "120px 286px" }}
        animate={loop({ scaleX: [1, 0.8, 1], opacity: [0.35, 0.2, 0.35] })} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />

      <motion.g animate={loop(mood === "excited" ? { y: [0, -16, 0, -10, 0] } : { y: [0, -9, 0] })}
        transition={{ duration: mood === "excited" ? 0.9 : 3.2, repeat: Infinity, ease: "easeInOut" }}>

        {/* floating mechanical details */}
        {[{ x: 22, y: 70, s: 6, d: 0 }, { x: 214, y: 150, s: 8, d: 0.8 }, { x: 28, y: 190, s: 5, d: 1.4 }].map((b, i) => (
          <motion.rect key={i} x={b.x} y={b.y} width={b.s} height={b.s} rx={1.5} fill="#e9d5ff" opacity=".85" transform={`rotate(45 ${b.x} ${b.y})`}
            animate={loop({ y: [b.y, b.y - 12, b.y], rotate: [45, 135, 45] })} transition={{ duration: 4 + i, repeat: Infinity, delay: b.d, ease: "easeInOut" }} />
        ))}
        <motion.circle cx="206" cy="58" r="7" fill="none" stroke="#f9a8d4" strokeWidth="1.6" animate={loop({ scale: [1, 1.5, 1], opacity: [0.9, 0.3, 0.9] })} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: "206px 58px" }} />

        {/* thinking orbit */}
        {thinking && (
          <motion.g animate={{ rotate: 360 }} transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "120px 95px" }}>
            {[0, 72, 144, 216, 288].map((a, i) => (
              <circle key={a} cx={120 + 108 * Math.cos((a * Math.PI) / 180)} cy={95 + 78 * Math.sin((a * Math.PI) / 180)} r={3 + (i % 2)} fill={i % 2 ? "#f9a8d4" : "#c4b5fd"} />
            ))}
          </motion.g>
        )}

        {/* back arm (left) */}
        <motion.g style={{ transformOrigin: "74px 180px" }} animate={loop(happy ? { rotate: [0, 40, 0] } : { rotate: [0, 3, 0] })} transition={{ duration: happy ? 0.7 : 3.2, repeat: Infinity }}>
          <rect x="44" y="172" width="26" height="62" rx="13" fill="url(#mb-body)" />
          <circle cx="57" cy="238" r="9" fill="#ddd2ff" />
        </motion.g>

        {/* body */}
        <rect x="72" y="156" width="96" height="104" rx="44" fill="url(#mb-body)" />
        <rect x="72" y="156" width="96" height="104" rx="44" fill="none" stroke="#fff" strokeOpacity=".7" />
        <circle cx="120" cy="204" r="22" fill="#1a0f33" />
        <motion.circle cx="120" cy="204" r="11" fill="#c4b5fd" style={{ transformOrigin: "120px 204px" }} animate={loop({ opacity: talking ? [0.5, 1, 0.5] : [0.7, 1, 0.7], scale: [0.9, 1.1, 0.9] })} transition={{ duration: talking ? 0.5 : 2.4, repeat: Infinity }} />
        <circle cx="120" cy="204" r="30" fill="url(#mb-glow)" opacity=".4" />
        <rect x="96" y="236" width="48" height="5" rx="2.5" fill="#c4b5fd" opacity=".6" />

        {/* front arm (right) – waves on greeting */}
        <motion.g style={{ transformOrigin: "166px 180px" }}
          animate={loop(mood === "greeting" ? { rotate: [-5, -70, -35, -70, -5] } : happy ? { rotate: [0, -45, 0] } : { rotate: [0, -3, 0] })}
          transition={{ duration: mood === "greeting" ? 1.2 : happy ? 0.7 : 3.2, repeat: Infinity }}>
          <rect x="170" y="172" width="26" height="62" rx="13" fill="url(#mb-body)" />
          <circle cx="183" cy="238" r="9" fill="#ddd2ff" />
        </motion.g>

        {/* head group */}
        <motion.g style={{ transformOrigin: "120px 150px" }} animate={loop(talking ? { rotate: [-2, 2, -1.5, 1.5, -2] } : mood === "listening" ? { rotate: [4, 6, 4] } : thinking ? { rotate: [-4, -6, -4] } : { rotate: 0 })} transition={{ duration: talking ? 0.9 : 2.4, repeat: Infinity, ease: "easeInOut" }}>
          {/* antenna */}
          <rect x="118.5" y="14" width="3" height="28" rx="1.5" fill="#c4b5fd" />
          <motion.circle cx="120" cy="12" r="7" fill="#f9a8d4" style={{ transformOrigin: "120px 12px" }} animate={loop({ opacity: [0.7, 1, 0.7], scale: [0.85, 1.15, 0.85] })} transition={{ duration: 1.6, repeat: Infinity }} />
          <circle cx="120" cy="12" r="16" fill="#f9a8d4" opacity=".25" filter="url(#mb-blur)" />
          {/* ear pods */}
          <circle cx="44" cy="96" r="13" fill="#ddd2ff" /><circle cx="44" cy="96" r="6" fill="#8b5cf6" />
          <circle cx="196" cy="96" r="13" fill="#ddd2ff" /><circle cx="196" cy="96" r="6" fill="#8b5cf6" />
          {/* head shell */}
          <rect x="50" y="40" width="140" height="116" rx="52" fill="url(#mb-body)" />
          <rect x="50" y="40" width="140" height="116" rx="52" fill="none" stroke="#fff" strokeOpacity=".8" />
          {/* visor */}
          <rect x="64" y="58" width="112" height="74" rx="34" fill="url(#mb-visor)" />
          <path d="M80 66 Q120 56 160 66" stroke="#fff" strokeOpacity=".18" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* eyes */}
          <g transform={`translate(${eyeShift.x} ${eyeShift.y})`}>
            {happy ? (
              <>
                <path d="M84 100 Q96 84 108 100" stroke="#e9d5ff" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M132 100 Q144 84 156 100" stroke="#e9d5ff" strokeWidth="6" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                {[96, 144].map((cx) => (
                  <g key={cx}>
                    <circle cx={cx} cy={97} r={20} fill="#8b5cf6" opacity=".3" filter="url(#mb-blur)" />
                    <motion.ellipse cx={cx} cy={97} rx={11} ry={14} fill="#e9d5ff" style={{ transformOrigin: `${cx}px 97px` }}
                      animate={still ? { scaleY: eyeRy / 14 } : { scaleY: thinking ? [0.5, 0.5, 0.2, 0.5] : [eyeRy / 14, eyeRy / 14, 0.1, eyeRy / 14, eyeRy / 14, eyeRy / 14] }}
                      transition={still ? { duration: 0.3 } : { duration: thinking ? 1.2 : 4.4, repeat: Infinity, times: thinking ? undefined : [0, 0.4, 0.44, 0.48, 0.8, 1] }} />
                    <circle cx={cx + 3} cy={92} r={3} fill="#fff" opacity=".9" />
                  </g>
                ))}
              </>
            )}
          </g>

          {/* cheeks */}
          <ellipse cx="78" cy="116" rx="9" ry="5" fill="#f9a8d4" opacity=".55" />
          <ellipse cx="162" cy="116" rx="9" ry="5" fill="#f9a8d4" opacity=".55" />

          {/* mouth */}
          {talking ? (
            <motion.ellipse cx="120" cy="121" rx="7" ry="7" fill="#f9a8d4" style={{ transformOrigin: "120px 121px" }} animate={{ scaleY: [0.3, 0.85, 0.45, 1, 0.3] }} transition={{ duration: 0.7, repeat: Infinity }} />
          ) : happy ? (
            <path d="M108 116 Q120 130 132 116 Z" fill="#f9a8d4" />
          ) : thinking ? (
            <path d="M112 121 H128" stroke="#f9a8d4" strokeWidth="3" strokeLinecap="round" />
          ) : (
            <path d="M110 118 Q120 126 130 118" stroke="#f9a8d4" strokeWidth="3" strokeLinecap="round" fill="none" />
          )}
        </motion.g>
      </motion.g>
    </svg>
  );
}
