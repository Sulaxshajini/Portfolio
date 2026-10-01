'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { DURATION, EASE, VIEWPORT } from '@/lib/motion';

type Line = string | { text: string; className?: string };

type TextRevealProps = {
  /** A string → word-by-word mask reveal. An array → one masked line per entry. */
  text: string | Line[];
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  trigger?: 'view' | 'mount';
};

const MotionTags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p } as const;

const unit = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: DURATION.slow, ease: EASE.out } },
};

/**
 * Masked text reveal. Real text stays in the DOM in reading order (no
 * per-character spans), so headings remain semantic and accessible.
 */
export default function TextReveal({ text, as = 'h2', className, delay = 0, trigger = 'view' }: TextRevealProps) {
  const Tag = MotionTags[as];
  const container = useMemo(
    () => ({ hidden: {}, show: { transition: { staggerChildren: Array.isArray(text) ? 0.12 : 0.05, delayChildren: delay } } }),
    [text, delay],
  );

  // Padding/negative margin keeps descenders from being clipped by the mask.
  const mask = 'overflow-hidden pb-[0.14em] -mb-[0.14em]';

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      {...(trigger === 'mount' ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT })}
    >
      {Array.isArray(text)
        ? text.map((line, i) => {
            const { text: t, className: c } = typeof line === 'string' ? { text: line, className: undefined } : line;
            return (
              <span key={i} className={`block ${mask}`}>
                <motion.span variants={unit} className={`block ${c ?? ''}`}>
                  {t}
                </motion.span>
              </span>
            );
          })
        : text.split(' ').map((word, i, arr) => (
            <span key={i}>
              <span className={`inline-block ${mask} align-bottom`}>
                <motion.span variants={unit} className="inline-block">
                  {word}
                </motion.span>
              </span>
              {i < arr.length - 1 ? ' ' : null}
            </span>
          ))}
    </Tag>
  );
}
