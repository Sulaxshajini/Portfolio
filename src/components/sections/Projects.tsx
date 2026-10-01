'use client';

import { useState } from 'react';
import Reveal from '@/components/motion/Reveal';
import TextReveal from '@/components/motion/TextReveal';
import SpotlightCard from '@/components/motion/SpotlightCard';
import { revealVariants, VIEWPORT } from '@/lib/motion';
import { projects } from '@/data/projects';
import ProjectModal from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';

// Large cards: masked clip + rise (distinct from the small-card stagger used elsewhere)
const projectReveal = revealVariants('clip', 36, 0.8);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-16 sm:py-24 px-5 sm:px-8 lg:px-12 bg-primary-bg relative">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      
      <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto relative z-10">
        <div className="mb-16">
          <TextReveal text="Systems I've Built" className="text-3xl md:text-5xl 2xl:text-6xl font-bold text-text-primary mb-2" />
          <Reveal variant="line" delay={0.35} className="w-20 h-1 bg-gradient-to-r from-accent-primary to-mauve rounded-full mb-4" />
          <Reveal delay={0.2} distance={16}>
            <p className="text-text-secondary font-mono text-sm max-w-2xl">A selection of end-to-end applications and technical solutions.</p>
          </Reveal>
        </div>

        <div className="space-y-8">
          {projects.map((project) => (
            <SpotlightCard
              key={project.id}
              variants={projectReveal}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              lift={2}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer block relative rounded-2xl bg-card-bg border border-border-subtle p-8 overflow-hidden hover:border-accent-primary/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row gap-8 justify-between">
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-accent-primary font-mono text-xl font-bold">{project.id}</span>
                    <h3 className="text-2xl font-bold text-text-primary group-hover:text-accent-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-text-secondary mb-6 max-w-2xl leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-3 py-1 text-xs font-mono rounded-full border border-border-subtle text-text-muted bg-card-elevated group-hover:border-accent-primary/30 group-hover:text-text-secondary transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden lg:flex items-center justify-center p-8 border border-border-subtle rounded-xl bg-card-elevated flex-1 group-hover:border-accent-primary/30 transition-colors relative overflow-hidden">
                  {/* Abstract technical visualization placeholder */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-primary via-transparent to-transparent group-hover:opacity-20 transition-opacity" />
                  
                  <div className="flex items-center gap-4 text-text-muted group-hover:text-accent-primary transition-colors">
                    {project.highlights.slice(0, 3).map((h, index) => (
                      <div key={h} className="flex items-center gap-4">
                        <span className="font-mono text-xs text-center">{h}</span>
                        {index < 2 && <span>→</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-8 right-8 text-text-muted group-hover:text-accent-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
