'use client';

import { motion } from 'framer-motion';
import { education, languages } from '@/data/education';
import { GraduationCap, BookOpen, Languages } from 'lucide-react';

export default function EducationTimeline() {
  return (
    <section id="journey" className="py-24 px-6 bg-secondary-bg border-t border-border-subtle relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Education Timeline */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-accent-primary" size={32} />
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary">Learning Journey</h2>
            </div>
            <div className="w-20 h-1 bg-accent-primary rounded-full" />
          </motion.div>

          <div className="relative border-l border-border-subtle ml-4 space-y-12">
            {education.map((edu, i) => (
              <motion.div 
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="relative pl-8"
              >
                {/* Timeline node */}
                <div className="absolute w-3 h-3 bg-accent-primary rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                
                <div className="p-6 rounded-2xl bg-card-bg border border-border-subtle hover:border-accent-primary/30 transition-colors group">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Languages className="text-accent-primary" size={32} />
              <h2 className="text-3xl md:text-5xl font-bold text-text-primary">Languages</h2>
            </div>
            <div className="w-20 h-1 bg-accent-primary rounded-full" />
          </motion.div>

          <div className="space-y-4">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center justify-between p-6 rounded-xl bg-card-bg border border-border-subtle group hover:border-accent-primary/30 transition-colors"
              >
                <span className="text-lg font-bold text-text-primary">{lang.name}</span>
                <span className="font-mono text-sm text-accent-primary">{lang.proficiency}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
