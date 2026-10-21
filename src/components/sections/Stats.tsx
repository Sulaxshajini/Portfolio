'use client';

import { motion } from 'framer-motion';
import { Server, Database, MonitorSmartphone, Wrench } from 'lucide-react';

const stats = [
  { id: '01', title: 'IT SYSTEMS', icon: Server, desc: 'Infrastructure & Support' },
  { id: '02', title: 'DATABASES', icon: Database, desc: 'Relational Design & Admin' },
  { id: '03', title: 'CROSS-PLATFORM', icon: MonitorSmartphone, desc: 'Web, Desktop, Mobile' },
  { id: '04', title: 'PROBLEM SOLVING', icon: Wrench, desc: 'Methodical Troubleshooting' },
];

export default function Stats() {
  return (
    <section className="w-full bg-secondary-bg border-y border-border-subtle py-12 px-6 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-start gap-4 p-6 rounded-2xl bg-card-bg border border-border-subtle hover:border-accent-primary/30 hover:-translate-y-1 transition-all group"
          >
            <div className="text-accent-primary/50 group-hover:text-accent-primary transition-colors">
              <stat.icon size={24} />
            </div>
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-mono text-text-muted">{stat.id}</span>
                <h3 className="text-sm font-bold tracking-wider text-text-primary">{stat.title}</h3>
              </div>
              <p className="text-xs font-mono text-text-secondary">{stat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
