'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { revealVariants, VIEWPORT, type RevealVariant } from '@/lib/motion';

type RevealProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  distance?: number;
  duration?: number;
  /** 'view' fires on scroll into view, 'mount' fires immediately (hero). */
  trigger?: 'view' | 'mount';
};

/** Fade / slide / scale / line / clip reveal. One component, one vocabulary. */
export default function Reveal({
  children,
  className,
  variant = 'up',
  delay = 0,
  distance,
  duration,
  trigger = 'view',
}: RevealProps) {
  const variants = useMemo(() => {
    const v = revealVariants(variant, distance, duration);
    if (delay) {
      const show = v.show as { transition?: object };
      show.transition = { ...(show.transition ?? {}), delay };
    }
    return v;
  }, [variant, distance, duration, delay]);

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      {...(trigger === 'mount'
        ? { animate: 'show' }
        : { whileInView: 'show', viewport: VIEWPORT })}
      style={variant === 'line' ? { originX: 0 } : undefined}
    >
      {children}
    </motion.div>
  );
}
