import { cn } from '@/lib/utils';

/**
 * Ambient colour-graded light: three soft radial gradients (plum / mauve / peach)
 * drifting slowly. Gradients instead of blur filters + transform-only animation keeps
 * it cheap on the GPU. Server component (no JS), static under prefers-reduced-motion.
 */
export default function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -top-[25%] -left-[10%] h-[70vmax] w-[70vmax] animate-aurora-a will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(84,42,82,0.75) 0%, transparent 62%)' }} />
      <div className="absolute top-[10%] -right-[15%] h-[55vmax] w-[55vmax] animate-aurora-b will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(181,85,122,0.20) 0%, transparent 62%)' }} />
      <div className="absolute -bottom-[30%] left-[25%] hidden h-[50vmax] w-[50vmax] animate-aurora-a will-change-transform md:block"
        style={{ background: 'radial-gradient(circle, rgba(255,179,154,0.12) 0%, transparent 62%)' }} />
    </div>
  );
}
