"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { sections, monogram } from "@/data/profile";
import { scrollToId } from "@/lib/scroll";
import { useMotobot } from "@/components/motobot/MotobotProvider";
import { useShell } from "@/components/providers/ShellContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const { entered } = useShell();
  const { openChat } = useMotobot();
  const [activeRaw, setActive] = useState("");
  const active = onHome ? activeRaw : "";
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  const go = (e: React.MouseEvent, id: string) => {
    setMenu(false);
    if (onHome) {
      e.preventDefault();
      scrollToId(id);
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <>
      <motion.header initial={{ y: -80, opacity: 0 }} animate={entered ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav aria-label="Primary"
          className={cn("flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500", solid ? "glass shadow-[0_10px_50px_rgba(10,6,20,.7)]" : "border border-transparent")}>
          <Link href="/" onClick={(e) => { if (onHome) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); } }}
            className="flex items-center gap-2 rounded-full pl-1 pr-3" aria-label="Home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet to-blush font-display text-sm font-extrabold text-white shadow-[0_0_20px_rgba(139,92,246,.6)]">{monogram}</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {sections.filter((s) => s.id !== "companion").map((s) => (
              <li key={s.id}>
                <Link href={`/#${s.id}`} onClick={(e) => go(e, s.id)}
                  className={cn("relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors", active === s.id ? "text-ink" : "text-muted hover:text-ink")}>
                  {active === s.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => openChat()}
              className="hidden rounded-full bg-gradient-to-r from-violet to-blush px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(139,92,246,.5)] transition hover:brightness-110 sm:block">
              Ask Ding
            </button>
            <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden" onClick={() => setMenu(true)} aria-label="Open menu" aria-expanded={menu}>
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div className="fixed inset-0 z-[70] flex flex-col bg-bg/95 px-8 pb-10 pt-6 backdrop-blur-xl"
            initial={{ clipPath: "circle(0% at 90% 5%)" }} animate={{ clipPath: "circle(150% at 90% 5%)" }} exit={{ clipPath: "circle(0% at 90% 5%)" }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <button type="button" className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-line" onClick={() => setMenu(false)} aria-label="Close menu"><X size={18} /></button>
            <ul className="mt-8 flex flex-1 flex-col justify-center gap-2">
              {sections.map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <Link href={`/#${s.id}`} onClick={(e) => go(e, s.id)} className="font-display flex items-baseline gap-4 py-1 text-4xl font-bold">
                    <span className="font-mono text-xs text-lavender">0{i + 1}</span>{s.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <button type="button" onClick={() => { setMenu(false); openChat(); }} className="rounded-full bg-gradient-to-r from-violet to-blush py-4 font-mono text-xs uppercase tracking-[0.25em] text-white">Chat with Ding →</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
