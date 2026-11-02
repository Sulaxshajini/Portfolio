"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import ParticleField from "./ParticleField";
import Cube from "./Cube";
import Monogram from "./Monogram";
import { profile, sections } from "@/data/profile";

/**
 * Cinematic intro. Shown on EVERY full page load (no storage of any kind).
 *
 * Progress model: the displayed percentage eases toward
 *   min(realReadiness, timeCap)
 * where realReadiness is the weighted sum of genuine milestones
 * (hydration, fonts ready, window load, first paint) and timeCap is a short
 * presentation curve so the sequence can be seen. A hard timeout forces 100%
 * so a failed asset can never block the site, and the visitor can always skip.
 */

const PRESENTATION_MS = 3800;
const TIMEOUT_MS = 7000;

const STAGES: { upTo: number; label: string }[] = [
  { upTo: 15, label: "Initializing background · particles awake" },
  { upTo: 35, label: "Revealing typography · geometry online" },
  { upTo: 55, label: "Loading portfolio identity" },
  { upTo: 75, label: "Preparing creative environment" },
  { upTo: 90, label: "Preparing main interface" },
  { upTo: 100, label: "Final lighting · almost there" },
];

interface Props {
  onEnter: () => void;
  onDone: () => void;
}

export default function IntroExperience({ onEnter, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const energy = useRef(0);
  const [pct, setPct] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [milestones, setMilestones] = useState({ hydrated: false, fonts: false, load: false, paint: false });
  const leavingRef = useRef(false);
  const ready = pct >= 100;

  // Real readiness milestones
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only media query, must run after hydration
    setReduced(rm);
    const set = (k: "hydrated" | "fonts" | "load" | "paint") => setMilestones((m) => (m[k] ? m : { ...m, [k]: true }));
    set("hydrated");

    let cancelled = false;
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready;
    (fontsReady ?? Promise.resolve()).then(() => !cancelled && set("fonts")).catch(() => !cancelled && set("fonts"));

    const onLoad = () => set("load");
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    requestAnimationFrame(() => requestAnimationFrame(() => !cancelled && set("paint")));

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
    };
  }, []);

  const real =
    (milestones.hydrated ? 0.2 : 0) + (milestones.fonts ? 0.3 : 0) + (milestones.load ? 0.3 : 0) + (milestones.paint ? 0.2 : 0);
  const realRef = useRef(0);
  useEffect(() => { realRef.current = real; }, [real]);

  // Progress animation loop
  useEffect(() => {
    const start = performance.now();
    let cur = 0, raf = 0, last = -1;
    const tick = (now: number) => {
      const elapsed = now - start;
      const timeCap = reduced ? 1 : Math.min(1, elapsed / PRESENTATION_MS);
      const eased = 1 - Math.pow(1 - timeCap, 2.2);
      const target = elapsed > TIMEOUT_MS ? 1 : Math.min(realRef.current, eased);
      cur += (target - cur) * 0.12;
      if (target - cur < 0.0015) cur = target;
      const v = Math.min(100, Math.round(cur * 100));
      energy.current = cur;
      if (v !== last) { last = v; setPct(v); }
      if (cur < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const enter = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || reduced) {
      onEnter();
      gsap.to(root, { opacity: 0, duration: 0.3, onComplete: onDone });
      return;
    }
    const tl = gsap.timeline({ onComplete: onDone });
    tl.to(content, { scale: 1.35, opacity: 0, filter: "blur(10px)", duration: 0.9, ease: "power3.in" }, 0)
      .call(onEnter, [], 0.45)
      .to(root, { clipPath: "circle(0% at 50% 50%)", duration: 1.15, ease: "power4.inOut" }, 0.25);
  }, [onEnter, onDone, reduced]);

  // Keyboard: Enter / Space activates once ready (button also focusable)
  useEffect(() => {
    if (!ready) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); enter(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready, enter]);

  useEffect(() => () => { gsap.killTweensOf([rootRef.current, contentRef.current]); }, []);

  const stage = STAGES.find((s) => pct <= s.upTo) ?? STAGES[STAGES.length - 1];
  const monoDraw = Math.min(1, pct / 15);

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio introduction"
      className="fixed inset-0 z-[100] overflow-hidden bg-[#07040f] text-ink"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      {/* atmosphere */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(1200px 700px at 50% 38%, #2a1458 0%, #130a2b 45%, #07040f 80%)" }} />
      <motion.div className="aurora drift-a left-[-10%] top-[-10%] h-[55vmax] w-[55vmax] bg-violet/50"
        initial={{ opacity: 0 }} animate={{ opacity: pct >= 15 ? 0.55 : 0 }} transition={{ duration: 1.2 }} />
      <motion.div className="aurora drift-b bottom-[-20%] right-[-10%] h-[50vmax] w-[50vmax] bg-blush/30"
        initial={{ opacity: 0 }} animate={{ opacity: pct >= 35 ? 0.5 : 0 }} transition={{ duration: 1.2 }} />
      <div className="grid-lines absolute inset-0 opacity-60" />
      {!reduced && <ParticleField energyRef={energy} />}

      {/* animated svg lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
        {[
          "M-20 480 C 220 380, 380 560, 560 440 S 860 300, 1020 380",
          "M-20 120 C 200 200, 360 40, 560 140 S 840 260, 1020 160",
        ].map((d, i) => (
          <motion.path key={i} d={d} stroke="rgba(196,181,253,.28)" strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: pct >= 15 ? 1 : 0, opacity: pct >= 15 ? 1 : 0 }}
            transition={{ duration: 2.2, delay: i * 0.3, ease: "easeInOut" }} />
        ))}
        <motion.circle cx="500" cy="270" r="210" stroke="rgba(167,139,250,.25)" strokeDasharray="2 10"
          initial={{ opacity: 0 }} animate={{ opacity: pct >= 35 ? 1 : 0, rotate: reduced ? 0 : 360 }}
          style={{ transformOrigin: "500px 270px" }}
          transition={{ opacity: { duration: 1 }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }} />
        <motion.circle cx="500" cy="270" r="275" stroke="rgba(249,168,212,.18)" strokeDasharray="1 14"
          initial={{ opacity: 0 }} animate={{ opacity: pct >= 55 ? 1 : 0, rotate: reduced ? 0 : -360 }}
          style={{ transformOrigin: "500px 270px" }}
          transition={{ opacity: { duration: 1 }, rotate: { duration: 90, repeat: Infinity, ease: "linear" } }} />
      </svg>

      {/* geometric objects */}
      {!reduced && (
        <motion.div className="pointer-events-none absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: pct >= 15 ? 1 : 0 }} transition={{ duration: 1 }}>
          <Cube size={96} style={{ position: "absolute", left: "12%", top: "22%" }} />
          <Cube size={56} duration={16} style={{ position: "absolute", right: "16%", top: "18%" }} />
          <Cube size={140} duration={34} style={{ position: "absolute", right: "9%", bottom: "16%" }} />
          <Cube size={44} duration={20} style={{ position: "absolute", left: "20%", bottom: "20%" }} />
        </motion.div>
      )}

      {/* ghost navigation reveals late */}
      <motion.nav aria-hidden className="absolute left-1/2 top-6 hidden -translate-x-1/2 gap-2 sm:flex"
        initial={{ opacity: 0, y: -14 }} animate={{ opacity: pct >= 75 ? 1 : 0, y: pct >= 75 ? 0 : -14 }} transition={{ duration: 0.8 }}>
        {sections.map((s, i) => (
          <motion.span key={s.id} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
            initial={false} animate={{ opacity: pct >= 75 ? 1 : 0 }} transition={{ delay: i * 0.06 }}>
            {s.label}
          </motion.span>
        ))}
      </motion.nav>

      <button type="button" onClick={enter}
        className="absolute right-5 top-5 z-10 rounded-full border border-line px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted transition hover:border-lavender hover:text-ink">
        Skip intro
      </button>

      {/* centre stack */}
      <div ref={contentRef} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <Monogram draw={monoDraw} size={170} />

        <motion.p className="mt-6 font-mono text-[11px] uppercase tracking-[0.42em] text-lavender sm:text-xs"
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: pct >= 15 ? 1 : 0, y: pct >= 15 ? 0 : 12 }} transition={{ duration: 0.7 }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={ready ? "ready" : "init"} className="inline-block"
              initial={{ opacity: 0, filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(6px)" }} transition={{ duration: 0.4 }}>
              {ready ? "Your experience is ready." : "Initializing creative experience"}
            </motion.span>
          </AnimatePresence>
        </motion.p>

        <motion.div className="relative mt-2 select-none" animate={{ scale: ready ? [1, 1.08, 1] : 1 }} transition={{ duration: 0.9 }}>
          <span className="font-display text-gradient block text-[clamp(5.5rem,22vw,13rem)] font-extrabold leading-none tabular-nums" aria-hidden>
            {pct}
          </span>
          <span className="font-display absolute left-full top-[0.15em] ml-2 text-[clamp(1.6rem,6vw,4rem)] font-semibold text-lavender/80" aria-hidden>%</span>
          {ready && (
            <motion.span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-violet/30 blur-3xl"
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1.2 }} transition={{ duration: 1.2 }} />
          )}
        </motion.div>

        {/* progress bar */}
        <div className="glass mt-4 w-[min(540px,84vw)] rounded-full p-1.5" role="progressbar" aria-label="Experience initialization" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/5">
            <div className="absolute inset-y-0 left-0 overflow-hidden rounded-full"
              style={{ width: `${pct}%`, background: "linear-gradient(90deg,#6d28d9,#a78bfa,#f9a8d4,#a78bfa,#6d28d9)", backgroundSize: "200% 100%", animation: "gradient-pan 2.4s linear infinite", boxShadow: "0 0 22px 2px rgba(167,139,250,.75)" }}>
              {!reduced && [0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="absolute inset-y-0 left-0 w-full"
                  style={{ animation: `dot-travel ${1.6 + i * 0.35}s linear ${i * 0.3}s infinite` }}>
                  <i className="absolute left-0 top-1/2 block h-1 w-1 -translate-y-1/2 rounded-full bg-white" style={{ boxShadow: "0 0 8px #fff" }} />
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-4 h-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted" aria-live="polite">
          {ready ? profile.name : stage.label}
        </p>

        <div className="mt-8 h-14">
          <AnimatePresence>
            {ready && !leaving && (
              <motion.button type="button" onClick={enter} autoFocus
                initial={{ opacity: 0, y: 18, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="group relative overflow-hidden rounded-full border border-lavender/60 bg-white/5 px-9 py-4 font-mono text-xs uppercase tracking-[0.3em] text-ink shadow-[0_0_40px_rgba(139,92,246,.45)] backdrop-blur">
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet/70 to-blush/50 transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative flex items-center gap-3">
                  Enter portfolio <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </span>
                <motion.span aria-hidden className="absolute inset-0 rounded-full border border-lavender" animate={{ scale: [1, 1.25], opacity: [0.6, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <p className="absolute bottom-5 px-6 font-mono text-[9px] uppercase tracking-[0.22em] text-muted/70">
          Loading reflects real font &amp; page readiness · stages are presentation milestones
        </p>
      </div>
    </div>
  );
}
