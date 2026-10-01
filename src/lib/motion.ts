import type { Transition, Variants } from 'framer-motion';

/** Premium easing curves shared by every animation on the site. */
export const EASE = {
  /** Fast start, long soft landing — default for reveals. */
  out: [0.22, 1, 0.36, 1] as const,
  /** Symmetric, for things that travel (panels, menus). */
  inOut: [0.76, 0, 0.24, 1] as const,
};

export const DURATION = { fast: 0.25, base: 0.7, slow: 0.9 };

/** Hero entrance choreography (seconds). Tweak here, the whole sequence follows. */
export const HERO = {
  bg: 0,
  nav: 0.2,
  badge: 0.4,
  heading: 0.55,
  text: 0.95,
  cta: 1.15,
  visual: 1.3,
};

export type RevealVariant = 'fade' | 'up' | 'left' | 'right' | 'scale' | 'line' | 'clip';

/** One variant factory so every reveal uses the same hidden/show vocabulary. */
export function revealVariants(variant: RevealVariant, distance = 32, duration: number = DURATION.base): Variants {
  const transition: Transition = { duration, ease: EASE.out };
  switch (variant) {
    case 'fade':
      return { hidden: { opacity: 0 }, show: { opacity: 1, transition } };
    case 'left':
      return { hidden: { opacity: 0, x: -distance }, show: { opacity: 1, x: 0, transition } };
    case 'right':
      return { hidden: { opacity: 0, x: distance }, show: { opacity: 1, x: 0, transition } };
    case 'scale':
      return { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1, transition } };
    case 'line':
      return { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { ...transition, duration: duration + 0.2 } } };
    case 'clip':
      return {
        // Ends with negative inset (same px units) so hover shadows aren't clipped afterwards.
        hidden: { opacity: 0, y: distance, clipPath: 'inset(0px 0px 40px 0px round 16px)' },
        show: { opacity: 1, y: 0, clipPath: 'inset(-60px -60px -60px -60px round 16px)', transition },
      };
    case 'up':
    default:
      return { hidden: { opacity: 0, y: distance }, show: { opacity: 1, y: 0, transition } };
  }
}

/** Child variants for Stagger groups. */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.out } },
};

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren } } };
}

/** Shared viewport config: fire once, slightly before the element is fully in view. */
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' } as const;
