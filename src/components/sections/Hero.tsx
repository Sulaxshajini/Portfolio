
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '@/data/profile';
import {
  Database,
  Server,
  Code2,
  Globe,
  Cpu,
} from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero scroll storytelling transformation
      gsap.to(leftContentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        opacity: 0,
        ease: 'none',
      });

      gsap.to(visualRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        scale: 1.2,
        y: 50,
        opacity: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

        {/* Left Content */}
        <div
          ref={leftContentRef}
          className="flex flex-col items-start pt-12 lg:pt-0"
        >
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full border border-border-subtle bg-card-bg/50 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />

            <span className="text-[11px] font-mono tracking-wider text-text-secondary">
              OPEN TO OPPORTUNITIES • {profile.location.toUpperCase()}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-[72px] leading-[1.1] font-bold text-text-primary tracking-tight mb-6"
          >
            Building Applications.
            <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
              Connecting Ideas.
            </span>
          </motion.h1>

          {/* Profile Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl font-mono text-text-secondary mb-2">
              {profile.name}
            </h2>

            <h3 className="text-sm md:text-base font-mono text-accent-primary mb-6">
              Full Stack Developer
            </h3>

            <p className="text-base md:text-lg text-text-muted leading-relaxed max-w-xl mb-10">
              {profile.shortDescription}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-accent-primary text-primary-bg font-bold font-mono text-sm rounded-lg hover:bg-highlight transition-colors shadow-[0_0_20px_var(--glow)]"
            >
              Explore My Work
            </a>

            <a
              href="/Sulaxshajini-Kumarakulasingam-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-card-bg border border-border-subtle text-text-primary font-bold font-mono text-sm rounded-lg hover:border-accent-primary/50 transition-colors"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right Content - Full Stack Visualization */}
        <div
          ref={visualRef}
          className="hidden lg:flex items-center justify-center relative h-[600px]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* SVG Connecting Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none text-accent-primary"
              style={{ zIndex: 0 }}
              viewBox="0 0 500 600"
              preserveAspectRatio="xMidYMid meet"
            >
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.35 }}
                transition={{ duration: 1.5, delay: 1 }}
                d="M 250 100 L 250 220 L 110 360 M 250 220 L 390 360 M 250 220 L 250 450"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />

              {/* Connection points */}
              <motion.circle
                cx="250"
                cy="220"
                r="5"
                fill="currentColor"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </svg>

            {/* Frontend Node */}
            <div className="absolute top-[45px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-card-bg border border-accent-primary/50 flex items-center justify-center text-accent-primary shadow-[0_0_30px_var(--glow)] group-hover:scale-110 transition-transform">
                <Code2 size={28} />
              </div>

              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">
                  Frontend Ready
                </span>
              </div>
            </div>

            {/* Backend Node */}
            <div className="absolute top-[185px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-card-bg border border-border-subtle flex items-center justify-center text-text-primary group-hover:border-accent-primary/50 transition-all group-hover:scale-110">
                <Server size={28} />
              </div>

              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">
                  Backend Services
                </span>
              </div>
            </div>

            {/* Database Node */}
            <div className="absolute top-[335px] left-[35px] flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-card-bg border border-border-subtle flex items-center justify-center text-text-primary group-hover:border-accent-primary/50 transition-all group-hover:scale-110">
                <Database size={28} />
              </div>

              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">
                  Database Layer
                </span>
              </div>
            </div>

            {/* API Integration Node */}
            <div className="absolute top-[335px] right-[35px] flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-card-bg border border-border-subtle flex items-center justify-center text-text-primary group-hover:border-accent-primary/50 transition-all group-hover:scale-110">
                <Globe size={28} />
              </div>

              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">
                  API Integration
                </span>
              </div>
            </div>

            {/* Full Stack Core Node */}
            <div className="absolute top-[430px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group">
              <div className="w-20 h-20 rounded-2xl bg-card-elevated border-2 border-accent-secondary/50 flex items-center justify-center text-accent-secondary shadow-[0_0_30px_var(--glow)] group-hover:scale-110 transition-transform">
                <Cpu size={36} />
              </div>

              <div className="flex items-center gap-1.5 bg-card-bg px-2 py-1 rounded border border-border-subtle">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                <span className="text-[10px] font-mono text-text-secondary">
                  Full Stack Architecture
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
