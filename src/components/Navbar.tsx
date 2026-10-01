'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Menu, X, Sparkles } from 'lucide-react';
import { EASE, HERO } from '@/lib/motion';

const links = [
  { name: 'HOME', href: '#home' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'JOURNEY', href: '#journey' },
  { name: 'CONTACT', href: '#contact' },
];

const menuVariants = {
  hidden: { clipPath: 'circle(0% at calc(100% - 40px) 40px)', opacity: 0 },
  show: {
    clipPath: 'circle(150% at calc(100% - 40px) 40px)',
    opacity: 1,
    transition: { duration: 0.6, ease: EASE.inOut, when: 'beforeChildren', staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { clipPath: 'circle(0% at calc(100% - 40px) 40px)', opacity: 0, transition: { duration: 0.4, ease: EASE.inOut } },
};
const menuItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.out } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const lenis = useLenis();

  // Scroll direction: hide on the way down, reveal on the way up. State only flips on change.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 50);
    if (y < 120) setHidden(false);
    else if (y > prev + 4) setHidden(true);
    else if (y < prev - 4) setHidden(false);
  });

  // Active section via IntersectionObserver (no scroll listener).
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Lock scroll behind the mobile menu.
  useEffect(() => {
    if (mobileMenuOpen) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [mobileMenuOpen, lenis]);

  const openChatbot = () => {
    window.dispatchEvent(new CustomEvent('open-chatbot'));
  };

  return (
    <>
      <motion.nav
        initial={{ y: '-100%', opacity: 0 }}
        animate={{ y: hidden && !mobileMenuOpen ? '-100%' : '0%', opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE.out, delay: entered ? 0 : HERO.nav }}
        onAnimationComplete={() => setEntered(true)}
        onFocusCapture={() => setHidden(false)}
        className={`fixed top-0 w-full z-50 transition-[padding,background-color,border-color,backdrop-filter] duration-300 border-b ${
          scrolled
            ? 'py-3 bg-primary-bg/70 backdrop-blur-md border-border-subtle'
            : 'py-5 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl 2xl:max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" aria-label="Home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-card-bg border border-border-subtle flex items-center justify-center text-accent-primary font-mono font-bold tracking-wider group-hover:border-accent-primary/50 transition-colors">
              SK
            </div>
          </a>

          {/* Desktop Links - Floating Glass Pill */}
          <div className="hidden lg:flex items-center gap-1 bg-card-bg/60 backdrop-blur-md border border-border-subtle rounded-full px-4 py-2 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            {links.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`px-4 py-2 text-xs font-mono font-medium transition-colors relative group ${
                    isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 h-[1px] bg-accent-primary"
                      transition={{ duration: 0.4, ease: EASE.out }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-accent-primary/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={openChatbot}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/30 text-accent-primary text-xs font-mono hover:bg-accent-primary hover:text-primary-bg active:scale-[0.97] transition-[background-color,color,transform] group"
            >
              <Sparkles size={14} className="group-hover:animate-pulse" />
              <span>Ask Sulaxshajini AI</span>
            </button>

            <button
              className="lg:hidden text-text-primary p-2 -mr-2"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
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
            variants={menuVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-[100] bg-primary-bg/95 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-6 right-6 text-text-primary"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {links.map((link) => (
                <motion.a
                  key={link.name}
                  variants={menuItem}
                  href={link.href}
                  onClick={() => {
                    lenis?.start(); // un-lock first so the anchor scroll isn't swallowed
                    setMobileMenuOpen(false);
                  }}
                  className="text-2xl font-mono text-text-primary hover:text-accent-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.button
                variants={menuItem}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(openChatbot, 300);
                }}
                className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full bg-accent-primary text-primary-bg font-bold font-mono shadow-[0_0_20px_rgba(255,179,154,0.4)]"
              >
                <Sparkles size={18} />
                <span>AI Assistant</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
