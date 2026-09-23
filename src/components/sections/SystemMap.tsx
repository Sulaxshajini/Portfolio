'use client';

import { motion } from 'framer-motion';
import { User, Smartphone, Database, Server, Cpu, FileText, ArrowDown, Share2 } from 'lucide-react';
import { useState } from 'react';

const nodes = [
  { id: 'user', label: 'User Support', icon: User, desc: 'End-user communication & troubleshooting' },
  { id: 'app', label: 'Application', icon: Smartphone, desc: 'Frontend UI & Client-side logic' },
  { id: 'api', label: 'API', icon: Share2, desc: 'REST endpoints & Data routing' },
  { id: 'db', label: 'Database', icon: Database, desc: 'MySQL / SQLite Storage & Integrity' },
  { id: 'network', label: 'Network', icon: Server, desc: 'Connectivity & Client-Server architecture' },
  { id: 'system', label: 'System', icon: Cpu, desc: 'OS, Environment & Infrastructure' },
  { id: 'docs', label: 'Documentation', icon: FileText, desc: 'SOPs, Logs & Knowledge Base' },
];

export default function SystemMap() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className="py-24 px-6 bg-primary-bg relative overflow-hidden flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4">How Everything Connects</h2>
          <p className="text-text-secondary font-mono text-sm max-w-xl mx-auto">An interactive view of end-to-end system understanding.</p>
        </motion.div>

        <div className="relative w-full max-w-3xl mx-auto h-[600px] bg-card-bg/30 border border-border-subtle rounded-3xl p-8 backdrop-blur-sm">
          {/* Active Node Info Panel */}
          <div className="absolute top-6 left-6 right-6 h-20 bg-card-elevated border border-border-subtle rounded-xl flex items-center justify-center p-4">
            {activeNode ? (
              <p className="text-accent-primary font-mono text-sm text-center">
                <span className="text-text-primary font-bold mr-2">{nodes.find(n => n.id === activeNode)?.label}:</span>
                {nodes.find(n => n.id === activeNode)?.desc}
              </p>
            ) : (
              <p className="text-text-muted font-mono text-xs text-center">Hover over a node to inspect</p>
            )}
          </div>

          {/* Node Map */}
          <div className="absolute inset-0 flex items-center justify-center pt-24">
            {/* SVG Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M 50% 25% L 50% 45%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" strokeDasharray="4 4" fill="none" />
              <path d="M 50% 45% L 30% 65%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 50% 45% L 50% 65%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 50% 45% L 70% 65%" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="2" fill="none" />
              <path d="M 50% 65% L 50% 85%" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="2" fill="none" />
            </svg>

            <div className="relative w-full h-full max-w-lg mx-auto">
              {/* User Node */}
              <div 
                className="absolute top-[10%] left-1/2 -translate-x-1/2"
                onMouseEnter={() => setActiveNode('user')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Node icon={User} label="USER" active={activeNode === 'user'} />
              </div>

              {/* Application Node */}
              <div 
                className="absolute top-[35%] left-1/2 -translate-x-1/2"
                onMouseEnter={() => setActiveNode('app')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Node icon={Smartphone} label="APPLICATION" active={activeNode === 'app'} />
              </div>

              {/* DB Node */}
              <div 
                className="absolute top-[60%] left-[10%]"
                onMouseEnter={() => setActiveNode('db')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Node icon={Database} label="DATABASE" active={activeNode === 'db'} />
              </div>

              {/* API Node */}
              <div 
                className="absolute top-[60%] left-1/2 -translate-x-1/2"
                onMouseEnter={() => setActiveNode('api')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Node icon={Share2} label="API / NETWORK" active={activeNode === 'api'} />
              </div>

              {/* Docs Node */}
              <div 
                className="absolute top-[60%] right-[10%]"
                onMouseEnter={() => setActiveNode('docs')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Node icon={FileText} label="DOCUMENTATION" active={activeNode === 'docs'} />
              </div>

              {/* System Node */}
              <div 
                className="absolute top-[85%] left-1/2 -translate-x-1/2"
                onMouseEnter={() => setActiveNode('system')}
                onMouseLeave={() => setActiveNode(null)}
              >
                <Node icon={Cpu} label="SYSTEM" active={activeNode === 'system'} highlight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Node({ icon: Icon, label, active, highlight = false }: any) {
  return (
    <div className={`relative flex flex-col items-center gap-2 cursor-pointer transition-transform duration-300 ${active ? 'scale-110' : ''}`}>
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${
        active 
          ? highlight ? 'bg-accent-primary text-primary-bg shadow-[0_0_20px_rgba(56,189,248,0.5)]' : 'bg-card-elevated border border-accent-primary text-accent-primary'
          : highlight ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/50' : 'bg-card-bg border border-border-subtle text-text-secondary'
      }`}>
        <Icon size={24} />
      </div>
      <span className={`text-[10px] font-mono tracking-wider transition-colors duration-300 ${active ? 'text-accent-primary' : 'text-text-muted'}`}>
        {label}
      </span>
    </div>
  );
}
