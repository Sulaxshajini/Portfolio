'use client';

import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { education, languages } from '@/data/education';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-primary-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-2">Behind the Systems</h2>
          <div className="w-20 h-1 bg-accent-primary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-text-secondary leading-relaxed text-lg"
          >
            <p>
              I am a <strong className="text-accent-primary font-medium">Final-year Bachelor of Information Technology undergraduate</strong> at the University of Moratuwa with hands-on, end-to-end experience across databases, application systems, and technical troubleshooting.
            </p>
            <p>
              My practical exposure includes setting up, administering, and maintaining relational databases (<span className="text-text-primary">MySQL, SQL Server basics, SQLite</span>), diagnosing and resolving application and connectivity issues, and documenting technical workflows.
            </p>
            <p>
              I am highly comfortable across Windows environments, version control, and cross-platform tools. As a fast, self-directed learner with strong written and spoken communication, I am well suited to structured IT training programs and <strong className="text-accent-primary font-medium">first-level technical/service-desk support roles.</strong>
            </p>
          </motion.div>

          {/* Right: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-card-bg/80 backdrop-blur-md border border-border-subtle shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-1">EDUCATION</h4>
                <p className="text-text-primary font-medium">{education[0].institution}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-1">FIELD</h4>
                <p className="text-text-primary font-medium">{education[0].degree}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-1">LOCATION</h4>
                <p className="text-text-primary font-medium">{profile.location}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-1">LANGUAGES</h4>
                <p className="text-text-primary font-medium">{languages.map(l => l.name).join(' • ')}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-mono text-text-muted mb-2">FOCUS</h4>
                <div className="flex flex-wrap gap-2">
                  {profile.focus.map((f, i) => (
                    <span key={i} className="px-3 py-1 text-xs font-mono rounded bg-card-elevated border border-border-subtle text-accent-primary">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-primary/50 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-primary/50 rounded-br-xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
