'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function ProjectModal({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary-bg/80 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card-bg border border-border-subtle rounded-2xl shadow-2xl z-[101] p-6 md:p-10"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-text-muted hover:text-text-primary transition-colors">
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-accent-primary font-mono font-bold">{project.id}</span>
              <span className="w-1 h-1 rounded-full bg-border-subtle" />
              <span className="text-text-muted font-mono text-sm uppercase">{project.type}</span>
            </div>

            <h2 className="text-3xl font-bold text-text-primary mb-6">{project.title}</h2>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="px-3 py-1 text-xs font-mono rounded-full border border-border-subtle text-text-secondary bg-card-elevated">
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-text-primary mb-3">Overview</h3>
                <p className="text-text-secondary leading-relaxed">{project.overview}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-3">Problem</h3>
                  <p className="text-text-secondary leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary mb-3">Solution</h3>
                  <p className="text-text-secondary leading-relaxed">{project.solution}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text-primary mb-3">Technical Responsibilities</h3>
                <ul className="space-y-2">
                  {project.responsibilities.map((resp: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary">
                      <span className="text-accent-primary mt-1">▹</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-text-primary mb-3">Key Learning</h3>
                <div className="p-4 rounded-xl bg-card-elevated border border-border-subtle">
                  <p className="text-text-secondary italic">{project.learning}</p>
                </div>
              </div>
            </div>

            {(project.github || project.demo) && (
              <div className="mt-10 flex gap-4 pt-6 border-t border-border-subtle">
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-primary-bg font-bold font-mono text-sm rounded-lg hover:bg-highlight transition-colors">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-card-elevated border border-border-subtle text-text-primary font-bold font-mono text-sm rounded-lg hover:border-accent-primary/50 transition-colors">
                    <GithubIcon size={16} /> GitHub
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
