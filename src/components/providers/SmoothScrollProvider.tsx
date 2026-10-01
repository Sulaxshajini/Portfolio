'use client';

import { useEffect, useRef } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/** Keeps ScrollTrigger in step with Lenis' virtual scroll position. */
function ScrollTriggerSync() {
  useLenis(ScrollTrigger.update);
  return null;
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);
  const reduce = useReducedMotion();

  // Single RAF loop: GSAP's ticker drives Lenis (autoRaf is off), so there are no duplicate loops.
  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    // reducedMotion="user": Framer drops transform/layout animation for users who ask for less motion.
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        ref={lenisRef}
        autoRaf={false}
        options={{
          lerp: 0.1,
          // Reduced motion → native scrolling, no smoothing, no animated anchors.
          smoothWheel: !reduce,
          anchors: !reduce,
        }}
      >
        <ScrollTriggerSync />
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
