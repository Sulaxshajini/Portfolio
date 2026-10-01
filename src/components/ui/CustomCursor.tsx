'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

type Mode = 'default' | 'interactive' | 'card';

const SCALE: Record<Mode, number> = { default: 1, interactive: 3.5, card: 2.5 };
const OPACITY: Record<Mode, number> = { default: 1, interactive: 0.4, card: 0.25 };

/** Minimal dot cursor. Position is driven by motion values — no React re-render per mouse move. */
export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 600, damping: 40, mass: 0.4 });
  const y = useSpring(my, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setEnabled(mq.matches && !reduce);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mx.set(e.clientX - 4);
      my.set(e.clientY - 4);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el?.closest) return;
      if (el.closest('a, button, input, textarea, [role="button"], .interactive')) setMode('interactive');
      else if (el.closest('[data-cursor="card"]')) setMode('card');
      else setMode('default');
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[100] h-2 w-2 pointer-events-none rounded-full bg-accent-primary mix-blend-screen will-change-transform"
      style={{ x, y }}
      animate={{ scale: SCALE[mode], opacity: visible ? OPACITY[mode] : 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
