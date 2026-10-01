'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import { HERO } from '@/lib/motion';
import Reveal from '@/components/motion/Reveal';
import TextReveal from '@/components/motion/TextReveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import Magnetic from '@/components/motion/Magnetic';
import MouseParallax from '@/components/motion/MouseParallax';
import Aurora from '@/components/motion/Aurora';
import CodeTerminal from '@/components/motion/CodeTerminal';
import { profile } from '@/data/profile';
import { Database, Server, User, Cpu, Network } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  // Scroll-out: hero content drifts up, visual eases back. matchMedia gives us
  // reduced-motion handling and automatic cleanup on unmount / breakpoint change.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { desktop: '(min-width: 1024px)', ok: '(prefers-reduced-motion: no-preference)' },
      (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };
        const scrollTrigger = { trigger: containerRef.current, start: 'top top', end: 'bottom top', scrub: 1 };

        gsap.to(leftContentRef.current, { scrollTrigger, y: desktop ? -100 : -40, opacity: 0, ease: 'none' });
        if (desktop) {
          gsap.to(visualRef.current, { scrollTrigger, scale: 1.12, y: 50, opacity: 0.2, ease: 'none' });
        }
      },
    );
    return () => mm.revert();
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef} 
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-28 pb-14 lg:pt-20 lg:pb-0"
    >
      {/* 1. Background appears */}
      <Reveal variant="fade" trigger="mount" duration={1.2} delay={HERO.bg} className="absolute inset-0 pointer-events-none">
        <Aurora />
        <div className="absolute inset-0 bg-grid-subtle" />
        <MouseParallax depth={-24} className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[120px] md:animate-drift will-change-transform" />
        </MouseParallax>
      </Reveal>

      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div ref={leftContentRef} className="flex flex-col items-start pt-12 lg:pt-0">
          <Reveal
            trigger="mount"
            distance={16}
            delay={HERO.badge}
            className="flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full border border-border-subtle bg-card-bg/50 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-text-secondary">
              {profile.status} • {profile.location.toUpperCase()}
            </span>
          </Reveal>

          {/* 4. Heading reveals line by line (masked) */}
          <TextReveal
            as="h1"
            trigger="mount"
            delay={HERO.heading}
            className="text-[clamp(2.25rem,8vw,4.5rem)] 2xl:text-[5.5rem] leading-[1.08] font-bold text-text-primary tracking-tight mb-6"
            text={[
              'Building Web Apps,',
              { text: 'End to End.', className: 'text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-mauve' },
            ]}
          />

          {/* 5. Supporting text */}
          <Reveal trigger="mount" delay={HERO.text} distance={20}>
            <h2 className="text-lg sm:text-xl md:text-2xl font-mono text-text-secondary mb-2">
              {profile.name}
            </h2>
            <h3 className="text-sm md:text-base font-mono text-accent-primary mb-6">
              {profile.title}
            </h3>
            <p className="text-base md:text-lg 2xl:text-xl text-text-muted leading-relaxed max-w-xl 2xl:max-w-2xl mb-8 sm:mb-10">
              {profile.shortDescription}
            </p>
          </Reveal>

          {/* 6. CTAs enter with a subtle stagger; primary CTA is magnetic */}
          <Stagger trigger="mount" delay={HERO.cta} stagger={0.1} className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4">
            <StaggerItem>
              <Magnetic>
                <a
                  href="#projects"
                  className="block text-center px-6 py-3.5 bg-gradient-to-r from-accent-primary to-highlight text-primary-bg font-bold font-mono text-sm rounded-lg hover:brightness-110 active:scale-[0.97] transition-[background-color,transform] shadow-[0_0_20px_rgba(255,179,154,0.2)]"
                >
                  View My Projects
                </a>
              </Magnetic>
            </StaggerItem>
            <StaggerItem>
              <a
                href="/Sulaxshajini-Kumarakulasingam-Resume.pdf"
                target="_blank"
                className="block text-center px-6 py-3.5 bg-card-bg border border-border-subtle text-text-primary font-bold font-mono text-sm rounded-lg hover:border-accent-primary/50 active:scale-[0.97] transition-[border-color,transform]"
              >
                Download Resume
              </a>
            </StaggerItem>
          </Stagger>

          {/* Phones: a compact motion graphic in place of the diagram */}
          <Reveal trigger="mount" delay={HERO.visual} className="mt-10 w-full md:hidden">
            <CodeTerminal />
          </Reveal>
        </div>

        {/* Right Content - System Visualization */}
        <div ref={visualRef} className="hidden md:flex items-center justify-center relative h-[470px] lg:h-[600px] 2xl:h-[680px]">
          {/* 7. Hero visual reveals; nodes cascade top-down after the frame */}
          <Reveal variant="scale" trigger="mount" delay={HERO.visual} duration={1} className="w-full h-full">
          <MouseParallax depth={10} className="relative w-full h-full flex items-center justify-center">
            <div className="relative w-[500px] h-[600px] shrink-0 scale-[0.78] lg:scale-100 2xl:scale-110">
            {/* SVG Connecting Lines */}
            <svg viewBox="0 0 500 600" className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="flow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ffd2c4" />
                  <stop offset="1" stopColor="#b5557a" />
                </linearGradient>
              </defs>
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1.5, delay: HERO.visual + 0.3, ease: [0.22, 1, 0.36, 1] }}
                d="M 250 100 L 250 250 L 100 400 M 250 250 L 400 400 M 250 250 L 250 450" 
                stroke="url(#flow)" 
                strokeWidth="2" 
                fill="none" 
              />
              {/* Data packets travelling the system; hidden for reduced motion */}
              <g className="motion-reduce:hidden" fill="#ffd2c4">
                {[
                  { d: 'M 250 100 L 250 250', begin: 3.2, dur: 1.8 },
                  { d: 'M 250 250 L 100 400', begin: 3.8, dur: 2.2 },
                  { d: 'M 250 250 L 400 400', begin: 4.4, dur: 2.2 },
                  { d: 'M 250 250 L 250 450', begin: 5.0, dur: 1.8 },
                ].map((p) => (
                  <circle key={p.d} r="3.5" opacity="0">
                    <animateMotion path={p.d} dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" />
                  </circle>
                ))}
              </g>
            </svg>

            {/* Nodes */}
            <Stagger trigger="mount" delay={HERO.visual + 0.2} stagger={0.14} className="absolute inset-0">
            <StaggerItem className="absolute top-[80px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-card-bg border border-accent-primary/50 flex items-center justify-center text-accent-primary shadow-[0_0_30px_rgba(255,179,154,0.2)] group-hover:scale-110 transition-transform">
                <User size={28} />
              </div>
              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">Frontend Ready</span>
              </div>
            </StaggerItem>

            <StaggerItem className="absolute top-[220px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-card-bg border border-border-subtle flex items-center justify-center text-text-primary group-hover:border-accent-primary/50 transition-colors group-hover:scale-110">
                <Server size={28} />
              </div>
              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">REST API</span>
              </div>
            </StaggerItem>

            <StaggerItem className="absolute top-[370px] left-[80px] flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-card-bg border border-border-subtle flex items-center justify-center text-text-primary group-hover:border-accent-primary/50 transition-colors group-hover:scale-110">
                <Database size={28} />
              </div>
              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">MySQL</span>
              </div>
            </StaggerItem>

            <StaggerItem className="absolute top-[370px] right-[80px] flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-card-bg border border-border-subtle flex items-center justify-center text-text-primary group-hover:border-accent-primary/50 transition-colors group-hover:scale-110">
                <Network size={28} />
              </div>
              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">Git Synced</span>
              </div>
            </StaggerItem>

            <StaggerItem className="absolute top-[450px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group">
              <div className="relative w-20 h-20 rounded-2xl bg-plum border-2 border-accent-primary/60 flex items-center justify-center text-accent-primary shadow-[0_0_30px_rgba(255,179,154,0.25)] group-hover:scale-110 transition-transform">
                <span aria-hidden className="absolute inset-0 rounded-2xl border border-accent-primary/50 animate-ring motion-reduce:hidden" />
                <Cpu size={36} />
              </div>
              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">Full Stack</span>
              </div>
            </StaggerItem>

            </Stagger>
            </div>
          </MouseParallax>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
