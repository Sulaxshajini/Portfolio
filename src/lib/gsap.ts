import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Single registration point — components import gsap/ScrollTrigger from here.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Avoid layout thrash when mobile browser UI bars show/hide.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
