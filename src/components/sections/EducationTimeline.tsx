'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Reveal from '@/components/motion/Reveal';
import TextReveal from '@/components/motion/TextReveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { education, languages } from '@/data/education';
import { GraduationCap, BookOpen, Languages } from 'lucide-react';

export default function EducationTimeline() {
  // Timeline line fills as you read down it (scroll-linked, transform-only).
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="journey" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 bg-secondary-bg border-t border-border-subtle relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Education Timeline */}
        <div>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-accent-primary" size={32} />
              <TextReveal text="Learning Journey" className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-text-primary" />
            </div>
            <Reveal variant="line" delay={0.35} className="w-20 h-1 bg-gradient-to-r from-accent-primary to-mauve rounded-full" />
          </div>

          <div ref={timelineRef} className="relative border-l border-border-subtle ml-4 space-y-12">
            <motion.div
              aria-hidden
              className="absolute -left-px top-0 bottom-0 w-px bg-accent-primary origin-top"
              style={{ scaleY: fill }}
            />
            {education.map((edu) => (
              <Reveal key={edu.degree} variant="left" distance={24} className="relative pl-8">
                {/* Timeline node */}
                <div className="absolute w-3 h-3 bg-accent-primary rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_rgba(255,179,154,0.8)]" />
                
                <SpotlightCard lift={2} className="p-6 rounded-2xl bg-card-bg border border-border-subtle hover:border-accent-primary/30 group">
                  <h3 className="text-xl font-bold text-text-primary mb-1">{edu.institution}</h3>
                  <p className="text-accent-primary font-medium mb-3">{edu.degree}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono text-text-muted bg-card-elevated px-2 py-1 rounded border border-border-subtle">
                      {edu.status}
                    </span>
                    {edu.grade && (
                      <span className="text-xs font-mono text-status-success bg-status-success/10 px-2 py-1 rounded border border-status-success/30">
                        {edu.grade}
                      </span>
                    )}
                  </div>
                  
                  {edu.description && <p className="text-text-secondary text-sm leading-relaxed">{edu.description}</p>}
                  
                  {edu.coursework && (
                    <div className="mt-4 pt-4 border-t border-border-subtle">
                      <h4 className="text-xs font-mono text-text-muted mb-3 flex items-center gap-2">
                        <BookOpen size={14} /> COURSEWORK
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map(course => (
                          <span key={course} className="text-xs text-text-secondary px-2 py-1 rounded bg-card-elevated">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Languages className="text-accent-primary" size={32} />
              <TextReveal text="Languages" className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-text-primary" />
            </div>
            <Reveal variant="line" delay={0.35} className="w-20 h-1 bg-gradient-to-r from-accent-primary to-mauve rounded-full" />
          </div>

          <Stagger stagger={0.1} className="space-y-4">
            {languages.map((lang) => (
              <StaggerItem
                key={lang.name}
                className="flex items-center justify-between p-6 rounded-xl bg-card-bg border border-border-subtle group hover:border-accent-primary/30 transition-colors"
              >
                <span className="text-lg font-bold text-text-primary">{lang.name}</span>
                <span className="font-mono text-sm text-accent-primary">{lang.proficiency}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

      </div>
    </section>
  );
}
