"use client";

// components/ScrollExpandMedia.tsx
//
// Pins a section and scrubs a media element from a small, rounded box to
// full-bleed and back — the effect demoed in index.html, ported to React.
// Works with either an <img> or <video>; pass whichever child you need.
//
// npm install gsap
// Usage:
//   <ScrollExpandMedia caption={<h2>Watch it work.</h2>} startWidthVW="40vw">
//     <video src="/product-demo.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
//   </ScrollExpandMedia>

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollExpandMediaProps = {
  children: React.ReactNode;
  caption?: React.ReactNode;
  startWidthVW?: string; // e.g. "40vw" for video, "32vw" for a portrait image
  aspectRatio?: string;  // e.g. "16 / 9", "4 / 5"
};

export default function ScrollExpandMedia({
  children,
  caption,
  startWidthVW = "40vw",
  aspectRatio = "16 / 9",
}: ScrollExpandMediaProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !stageRef.current || !mediaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinRef.current,
        },
      })
        .to(mediaRef.current, { width: "100vw", borderRadius: 0, ease: "power1.inOut" }, 0)
        .to(captionRef.current, { opacity: 0, ease: "power1.in" }, 0)
        .to(mediaRef.current, { width: startWidthVW, borderRadius: "12px", ease: "power1.inOut" }, 0.66)
        .to(captionRef.current, { opacity: 1, ease: "power1.out" }, 0.7);
    }, stageRef);

    return () => ctx.revert();
  }, [startWidthVW]);

  return (
    <section ref={stageRef} className="relative" style={{ height: "320vh" }}>
      <div
        ref={pinRef}
        className="h-screen flex flex-col items-center justify-center gap-10 overflow-hidden px-6"
      >
        <div ref={captionRef} className="text-center">
          {caption}
        </div>
        <div
          ref={mediaRef}
          className="relative overflow-hidden bg-white"
          style={{ width: startWidthVW, aspectRatio, borderRadius: "12px" }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
