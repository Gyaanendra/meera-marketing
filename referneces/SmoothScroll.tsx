"use client";

// components/SmoothScroll.tsx
//
// Wraps your app once (in app/layout.tsx) to give every scroll interaction
// the "buttery" easing awwwards sites are known for, and keeps GSAP's
// ScrollTrigger perfectly in sync with that eased scroll position.
//
// npm install lenis gsap

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // quart-out, feels "premium" not floaty
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;

    // Tell ScrollTrigger to use Lenis's scroll position instead of native
    // scroll, and to update on every Lenis tick.
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return <>{children}</>;
}
