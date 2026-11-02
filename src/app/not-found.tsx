import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="grid-lines absolute inset-0" />
      <p className="relative font-mono text-xs uppercase tracking-[0.4em] text-lavender">Error 404</p>
      <h1 className="font-display text-gradient relative mt-4 text-[clamp(4rem,16vw,11rem)] font-extrabold leading-none">Lost signal</h1>
      <p className="relative mt-4 max-w-md text-muted">That page doesn&apos;t exist in this portfolio. The project or route may have moved — let&apos;s get you back on track.</p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-violet px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white shadow-[0_0_30px_rgba(139,92,246,.5)] transition hover:bg-violet/80">Back home</Link>
        <Link href="/#projects" className="rounded-full border border-line px-7 py-3 font-mono text-xs uppercase tracking-[0.2em] transition hover:border-lavender">View projects</Link>
      </div>
    </main>
  );
}
