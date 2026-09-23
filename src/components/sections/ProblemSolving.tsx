'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, ShieldAlert, Stethoscope, CheckCircle, ListChecks, FileText } from 'lucide-react';

const steps = [
  { id: '01', title: 'Identify', desc: 'Understand the issue and reproduce the problem.', icon: Search },
  { id: '02', title: 'Isolate', desc: 'Separate application, database, connectivity and system-level causes.', icon: ShieldAlert },
  { id: '03', title: 'Diagnose', desc: 'Use structured testing and technical investigation.', icon: Stethoscope },
  { id: '04', title: 'Resolve', desc: 'Apply a controlled solution.', icon: CheckCircle },
  { id: '05', title: 'Verify', desc: 'Confirm functionality and data integrity.', icon: ListChecks },
  { id: '06', title: 'Document', desc: 'Record the solution and workflow for future reference.', icon: FileText },
];

export default function ProblemSolving() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Check if device is touch/mobile to disable horizontal scroll if needed, 
    // but GSAP horizontal scroll via pin works well generally.
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!scrollContainerRef.current || !wrapperRef.current) return;

      if (!isMobile) {
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const viewportWidth = wrapperRef.current.offsetWidth;

        gsap.to(scrollContainerRef.current, {
          x: -(scrollWidth - viewportWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-secondary-bg overflow-hidden md:h-screen flex flex-col justify-center py-24 md:py-0 border-y border-border-subtle">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-2">Troubleshooting, Structured.</h2>
        <div className="w-20 h-1 bg-accent-primary rounded-full mb-4" />
        <p className="text-text-secondary font-mono text-sm max-w-2xl">The methodology behind resolving complex system issues.</p>
      </div>

      <div ref={wrapperRef} className="w-full relative z-10">
        <div 
          ref={scrollContainerRef} 
          className="flex flex-col md:flex-row gap-6 md:gap-12 px-6 md:px-[10vw] w-full md:w-max"
        >
          {steps.map((step, i) => (
            <div 
              key={step.id} 
              className="flex-shrink-0 w-full md:w-[350px] p-8 rounded-2xl bg-card-bg border border-border-subtle relative group hover:border-accent-primary/50 transition-colors"
            >
              {/* Connector line for desktop */}
              {i !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-12 w-12 h-[2px] bg-border-subtle" />
              )}
              
              <div className="flex items-center justify-between mb-8">
                <span className="text-4xl font-black text-card-elevated">{step.id}</span>
                <div className="w-12 h-12 rounded-xl bg-card-elevated border border-border-subtle flex items-center justify-center text-accent-primary group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                  <step.icon size={24} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-text-primary mb-4">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">{step.desc}</p>

              {/* Status indicator */}
              <div className="absolute bottom-8 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono text-status-success uppercase tracking-wider">Phase Complete</span>
                <span className="w-2 h-2 rounded-full bg-status-success shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
