"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Reveal({ children, delay = 0, y = 32, className, as = "div" }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "li" | "p" | "span";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag className={cn(className)} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </Tag>
  );
}
