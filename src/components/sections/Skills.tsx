'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-secondary-bg border-y border-border-subtle relative">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-2">Technical Architecture</h2>
          <div className="w-20 h-1 bg-accent-primary rounded-full mb-4" />
          <p className="text-text-secondary font-mono text-sm max-w-2xl">A structured breakdown of my technical capabilities.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card-bg border border-border-subtle hover:border-accent-primary/30 transition-colors group"
            >
              <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-primary/50 group-hover:bg-accent-primary transition-colors" />
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.name} className="relative group/item cursor-default">
                    <div className="flex items-center gap-2">
                      <span className="text-accent-primary text-xs opacity-50 group-hover/item:opacity-100 transition-opacity">▹</span>
                      <span className="text-sm font-medium text-text-secondary group-hover/item:text-accent-primary transition-colors">
                        {item.name}
                      </span>
                    </div>
                    {/* Hover tooltip/expansion */}
                    <div className="h-0 overflow-hidden opacity-0 group-hover/item:h-auto group-hover/item:opacity-100 group-hover/item:mt-2 transition-all duration-300 pl-4 border-l border-border-subtle ml-1">
                      <p className="text-xs text-text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
