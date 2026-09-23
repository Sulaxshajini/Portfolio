'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';

const links = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'JOURNEY', href: '#journey' },
  { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openChatbot = () => {
    const event = new CustomEvent('open-chatbot');
    window.dispatchEvent(event);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-card-bg border border-border-subtle flex items-center justify-center text-accent-primary font-mono font-bold tracking-wider group-hover:border-accent-primary/50 transition-colors">
              SK
            </div>
          </a>

          {/* Desktop Links - Floating Glass Pill */}
          <div className="hidden md:flex items-center gap-1 bg-card-bg/60 backdrop-blur-md border border-border-subtle rounded-full px-4 py-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-xs font-mono font-medium text-text-secondary hover:text-text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={openChatbot}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-mono hover:bg-accent-primary hover:text-primary-bg transition-colors group"
            >
              <Sparkles size={14} className="group-hover:animate-pulse" />
              <span>Ask Sulaxshajini AI</span>
            </button>
            
            <button 
              className="md:hidden text-text-primary"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[100] bg-primary-bg/90 flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 text-text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-col items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-mono text-text-primary hover:text-accent-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(openChatbot, 300);
                }}
                className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary text-primary-bg font-bold font-mono shadow-[0_0_20px_rgba(56,189,248,0.4)]"
              >
                <Sparkles size={18} />
                <span>AI Assistant</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
