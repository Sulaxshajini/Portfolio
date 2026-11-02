"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import type { Screenshot } from "@/data/types";
import { getLenis } from "@/lib/scroll";

interface Props { shots: Screenshot[]; index: number | null; onIndex: (i: number | null) => void; }

export default function Lightbox({ shots, index, onIndex }: Props) {
  const open = index !== null;
  const [zoom, setZoom] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target only exists after hydration
  useEffect(() => { setMounted(true); }, []);

  const go = useCallback((d: number) => {
    if (index === null) return;
    setZoom(false); setLoaded(false);
    onIndex((index + d + shots.length) % shots.length);
  }, [index, onIndex, shots.length]);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    getLenis()?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onIndex(null);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      getLenis()?.start();
      document.body.style.overflow = prev;
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, go, onIndex]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (zoom) return;
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  };

  const shot = index !== null ? shots[index] : null;
  const next = index !== null ? shots[(index + 1) % shots.length] : null;

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && shot && (
        <motion.div role="dialog" aria-modal="true" aria-label="Screenshot viewer" className="fixed inset-0 z-[95] flex flex-col bg-[#05030c]/95 backdrop-blur-xl"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="flex items-center justify-between px-5 py-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            <span>{String((index ?? 0) + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => setZoom((z) => !z)} aria-pressed={zoom} aria-label="Toggle zoom" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-lavender"><ZoomIn size={16} /></button>
              <button ref={closeRef} type="button" onClick={() => onIndex(null)} aria-label="Close viewer" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-lavender"><X size={16} /></button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 sm:px-16" onClick={(e) => e.target === e.currentTarget && onIndex(null)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={shot.src} className="relative max-h-full max-w-full" style={{ cursor: zoom ? "zoom-out" : "zoom-in" }}
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: zoom ? 2 : 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: "spring", stiffness: 260, damping: 30 }}
                drag={zoom ? true : "x"} dragElastic={zoom ? 0.1 : 0.4} dragConstraints={zoom ? { left: -400, right: 400, top: -300, bottom: 300 } : { left: 0, right: 0 }} onDragEnd={onDragEnd}
                onTap={() => setZoom((z) => !z)}>
                {!loaded && <div className="skeleton absolute inset-0 rounded-2xl" style={{ aspectRatio: `${shot.width}/${shot.height}` }} />}
                <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} priority sizes="100vw" onLoad={() => setLoaded(true)} draggable={false}
                  className="max-h-[72vh] w-auto select-none rounded-2xl object-contain shadow-[0_30px_100px_rgba(0,0,0,.7)]" />
              </motion.div>
            </AnimatePresence>
            {shots.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/40 backdrop-blur hover:border-lavender sm:left-5"><ChevronLeft /></button>
                <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/40 backdrop-blur hover:border-lavender sm:right-5"><ChevronRight /></button>
              </>
            )}
          </div>

          <div className="min-h-[4.5rem] px-6 pb-6 pt-3 text-center text-sm text-muted">{shot.caption ?? shot.alt}</div>
          {next && next.src !== shot.src && <Image src={next.src} alt="" width={next.width} height={next.height} className="hidden" aria-hidden />}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
