'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  /** Max travel in px on each axis. */
  max?: number;
};

const SPRING = { stiffness: 220, damping: 18, mass: 0.3 };

/** Subtle cursor-attraction for primary CTAs. Mouse only; inert on touch and reduced-motion. */
export default function Magnetic({ children, className = 'inline-block', max = 10 }: MagneticProps) {
  const reduce = useReducedMotion();
  const rect = useRef<DOMRect | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const enter = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return;
    rect.current = ref.current?.getBoundingClientRect() ?? null; // measured once per hover, not per move
  };

  const move = (e: React.PointerEvent) => {
    const r = rect.current;
    if (!r || reduce || e.pointerType !== 'mouse') return;
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * max);
    y.set(Math.max(-1, Math.min(1, dy)) * max);
  };

  const leave = () => {
    rect.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerEnter={enter}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </motion.div>
  );
}
