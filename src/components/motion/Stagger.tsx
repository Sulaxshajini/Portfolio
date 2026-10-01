'use client';

import { useMemo } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { itemVariants, staggerContainer, VIEWPORT } from '@/lib/motion';

type StaggerProps = Omit<HTMLMotionProps<'div'>, 'variants' | 'initial' | 'animate' | 'whileInView'> & {
  stagger?: number;
  delay?: number;
  trigger?: 'view' | 'mount';
};

/**
 * One viewport trigger for a whole group; children (StaggerItem or any
 * motion element given `variants={itemVariants}`) cascade in.
 */
export function Stagger({ stagger = 0.08, delay = 0, trigger = 'view', children, ...rest }: StaggerProps) {
  const variants = useMemo(() => staggerContainer(stagger, delay), [stagger, delay]);
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      {...(trigger === 'mount' ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT })}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: Omit<HTMLMotionProps<'div'>, 'variants'>) {
  return (
    <motion.div variants={itemVariants} {...rest}>
      {children}
    </motion.div>
  );
}
