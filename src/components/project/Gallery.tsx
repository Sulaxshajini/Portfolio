"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Screenshot } from "@/data/types";

function Shot({ s, i, onOpen }: { s: Screenshot; i: number; onOpen: (i: number) => void }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 }), sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rx = useTransform(sy, [-0.5, 0.5], [7, -7]), ry = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  return (
    <motion.figure className="w-[82vw] shrink-0 snap-center sm:w-[56vw] lg:w-[38rem]" style={{ perspective: 1000 }}
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}>
      <motion.button ref={ref} type="button" onClick={() => onOpen(i)} aria-label={`Open screenshot: ${s.alt}`}
        onPointerMove={(e) => { const r = ref.current!.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); }}
        onPointerLeave={() => { mx.set(0); my.set(0); }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", aspectRatio: `${s.width}/${s.height}` }}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-line shadow-[0_30px_80px_-30px_rgba(91,33,182,.7)]">
        {!loaded && <div className="skeleton absolute inset-0" />}
        <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width:640px) 82vw, (max-width:1024px) 56vw, 608px" onLoad={() => setLoaded(true)} onError={() => setLoaded(true)}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`} />
      </motion.button>
      {s.caption && <figcaption className="mt-3 px-1 text-sm text-muted">{s.caption}</figcaption>}
    </motion.figure>
  );
}

export default function Gallery({ shots, onOpen }: { shots: Screenshot[]; onOpen: (i: number) => void }) {
  return (
    <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:-mx-12 md:px-12" data-lenis-prevent-wheel>
      {shots.map((s, i) => <Shot key={s.src} s={s} i={i} onOpen={onOpen} />)}
    </div>
  );
}
