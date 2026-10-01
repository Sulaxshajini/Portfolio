'use client';

import Reveal from '@/components/motion/Reveal';
import TextReveal from '@/components/motion/TextReveal';
import { Stagger } from '@/components/motion/Stagger';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { itemVariants } from '@/lib/motion';
import { skills } from '@/data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 bg-secondary-bg border-y border-border-subtle relative">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto relative z-10">
        <div className="mb-16">
          <TextReveal text="Technical Architecture" className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-text-primary mb-2" />
          <Reveal variant="line" delay={0.35} className="w-20 h-1 bg-gradient-to-r from-accent-primary to-mauve rounded-full mb-4" />
          <Reveal delay={0.2} distance={16}>
            <p className="text-text-secondary font-mono text-sm max-w-2xl">A structured breakdown of my technical capabilities.</p>
          </Reveal>
        </div>

        <Stagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => (
            <SpotlightCard
              key={category.category}
              variants={itemVariants}
              className="p-6 rounded-2xl bg-card-bg border border-border-subtle hover:border-accent-primary/30 group"
            >
              <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-primary/50 group-hover:bg-accent-primary transition-colors" />
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} tabIndex={0} className="relative group/item cursor-default outline-none focus-visible:ring-1 focus-visible:ring-accent-primary/50 rounded">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-primary text-xs opacity-50 group-hover/item:opacity-100 group-focus/item:opacity-100 transition-opacity">▹</span>
                      <span className="text-sm font-medium text-text-secondary group-hover/item:text-accent-primary transition-colors">
                        {item.name}
                      </span>
                    </div>
                    {/* Expands on hover, keyboard focus, or tap (focus) — smooth 0fr → 1fr, no jump */}
                    <div className="grid grid-rows-[0fr] opacity-0 group-hover/item:grid-rows-[1fr] group-hover/item:opacity-100 group-focus/item:grid-rows-[1fr] group-focus/item:opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out">
                      <div className="overflow-hidden min-h-0">
                        <p className="mt-2 pl-4 border-l border-border-subtle ml-1 text-xs text-text-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
