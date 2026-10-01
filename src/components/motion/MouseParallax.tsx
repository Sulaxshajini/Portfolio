'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

type MouseParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Max travel in px. Negative values move opposite the cursor (depth). */
  depth?: number;
};

const SPRING = { stiffness: 60, damping: 20, mass: 0.6 };

/** Gentle pointer-driven drift for hero layers. Desktop (fine pointer) only. */
export default function MouseParallax({ children, className, depth = 12 }: MouseParallaxProps) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth - 0.5) * 2 * depth);
      y.set((e.clientY / window.innerHeight - 0.5) * 2 * depth);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [reduce, depth, x, y]);

  return (
    <motion.div className={className} style={{ x, y }}>
      {children}
    </motion.div>
  );
}
