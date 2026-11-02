import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis() {
  return instance;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (instance) instance.scrollTo(el, { offset: -72, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}
