'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightCardProps = HTMLMotionProps<'div'> & {
  /** Vertical lift on hover in px. Keep it small. */
  lift?: number;
};

/**
 * Card with a subtle cursor-following highlight and tiny hover lift.
 * The highlight position is written straight to CSS variables (no React
 * re-renders) and only for mouse pointers. Accepts `variants` so it can be a
 * child of <Stagger/>.
 */
export default function SpotlightCard({ className, children, lift = 3, onPointerMove, ...rest }: SpotlightCardProps) {
  return (
    <motion.div
      whileHover={{ y: -lift, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      onPointerMove={(e) => {
        onPointerMove?.(e);
        if (e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
      data-cursor="card"
      className={cn(
        'group/spot relative transition-[border-color,box-shadow] duration-300 hover:shadow-[0_12px_40px_-16px_rgba(255,179,154,0.25)]',
        className,
      )}
      {...rest}
    >
      <div aria-hidden className="gradient-ring opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: 'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(255,179,154,0.08), transparent 70%)',
        }}
      />
      {children as React.ReactNode}
    </motion.div>
  );
}
