'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, RefreshCw } from 'lucide-react';
import { profile } from '@/data/profile';
import { themes } from '@/data/themes';
import Link from 'next/link';

export default function Footer() {
  const [currentTheme, setCurrentTheme] = useState<string>('midnight-cyan');

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme') || 'midnight-cyan';
    setCurrentTheme(theme);
  }, []);

  const handleShuffle = () => {
    const nextCandidates = themes.filter(t => t.id !== currentTheme);
    const nextTheme = nextCandidates[Math.floor(Math.random() * nextCandidates.length)];
    document.documentElement.setAttribute('data-theme', nextTheme.id);
    document.documentElement.style.colorScheme = nextTheme.mode;
    try {
      localStorage.setItem('portfolio_theme', nextTheme.id);
    } catch (e) {}
    setCurrentTheme(nextTheme.id);
  };

  return (
    <footer id="contact" className="w-full bg-primary-bg border-t border-border-subtle pt-24 pb-8 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-16 relative z-10">
        
        <div>
          <h2 className="text-3xl font-bold text-text-primary mb-2">Let's Connect</h2>
          <p className="text-text-secondary mb-8 max-w-md">
            Have a technical opportunity, support role, internship or project in mind? I'm always open to discussing new opportunities.
          </p>
          
          <div className="space-y-6">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-4 text-text-secondary hover:text-accent-primary transition-colors group">
              <div className="w-10 h-10 rounded-full bg-card-bg border border-border-subtle flex items-center justify-center group-hover:border-accent-primary/50 transition-colors">
                <Mail size={18} />
              </div>
              <span className="font-mono text-sm">{profile.email}</span>
            </a>
            <div className="flex items-center gap-4 text-text-secondary">
              <div className="w-10 h-10 rounded-full bg-card-bg border border-border-subtle flex items-center justify-center">
                <Phone size={18} />
              </div>
              <span className="font-mono text-sm">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-4 text-text-secondary">
              <div className="w-10 h-10 rounded-full bg-card-bg border border-border-subtle flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <span className="font-mono text-sm">{profile.location}</span>
            </div>
          </div>
        </div>

        <div className="bg-card-bg/50 backdrop-blur-sm border border-border-subtle p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-text-primary mb-6">Send Message</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! Form submission logged.'); }}>
            <input type="text" placeholder="Name" className="w-full bg-card-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-primary/50 transition-colors" required />
            <input type="email" placeholder="Email" className="w-full bg-card-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-primary/50 transition-colors" required />
            <textarea placeholder="Message" rows={4} className="w-full bg-card-elevated border border-border-subtle rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-primary/50 transition-colors resize-none" required />
            <button type="submit" className="w-full py-3 bg-accent-primary text-primary-bg font-bold font-mono text-sm rounded-lg hover:bg-highlight transition-colors cursor-pointer">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-border-subtle pt-8 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-text-muted relative z-10 gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-center md:text-left">
          <p className="text-text-primary font-sans font-bold">{profile.name}</p>
          <span className="hidden md:block">•</span>
          <p>IT Support & Infrastructure</p>
          <span className="hidden md:block">•</span>
          <p>{profile.location}</p>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href={profile.linkedin} target="_blank" className="hover:text-accent-primary transition-colors">LinkedIn</Link>
          <Link href={profile.github} target="_blank" className="hover:text-accent-primary transition-colors">GitHub</Link>
          <Link href={profile.portfolio} target="_blank" className="hover:text-accent-primary transition-colors">Old Portfolio</Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <span>© {new Date().getFullYear()}</span>
          <span className="text-border-subtle">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] tracking-wider">SYSTEM STATUS</span>
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span className="text-status-success font-semibold">ONLINE</span>
          </div>
          <span className="text-border-subtle">|</span>
          <button
            onClick={handleShuffle}
            type="button"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-card-elevated border border-border-subtle hover:border-accent-primary/50 text-accent-primary hover:text-text-primary transition-all text-[11px] group cursor-pointer"
            title="Randomize color theme (also changes automatically on every page refresh!)"
          >
            <span className="text-text-muted text-[10px]">THEME:</span>
            <span className="font-semibold">{themes.find(t => t.id === currentTheme)?.name || 'Theme'}</span>
            <RefreshCw size={11} className="group-hover:rotate-180 transition-transform duration-500 opacity-70 group-hover:opacity-100" />
          </button>
        </div>
      </div>
    </footer>
  );
}
