// lib/gsap.ts
// Central place to register GSAP plugins once. Import `gsap` and
// `ScrollTrigger` from HERE everywhere else, never from "gsap" directly,
// so you never end up registering the plugin twice (React strict mode
// will mount effects twice in dev and cause duplicate ScrollTriggers).

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
