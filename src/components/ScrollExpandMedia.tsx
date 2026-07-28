"use client"

import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

type Props = {
  children: React.ReactNode
  caption?: React.ReactNode
  startWidthVW?: string
  aspectRatio?: string
  maxWidth?: string
  id?: string
}

export default function ScrollExpandMedia({
  children, caption, startWidthVW = "40vw",
  aspectRatio = "16 / 9", maxWidth = "85vw", id,
}: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.innerWidth < 768) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!stageRef.current || !mediaRef.current) return

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current, start: "top top",
          end: "bottom bottom", scrub: 1, pin: pinRef.current,
        },
      })
        .to(mediaRef.current, { width: maxWidth, borderRadius: 0, ease: "power1.inOut" }, 0)
        .to(captionRef.current, { opacity: 0, ease: "power1.in" }, 0)
    }, stageRef)

    return () => ctx.revert()
  }, [startWidthVW, maxWidth])

  return (
    <section id={id} ref={stageRef} className="scroll-expand-stage"
      style={{ height: "320vh", position: "relative" }}>
      <div ref={pinRef} className="scroll-expand-pin"
        style={{
          height: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2.5rem", position: "relative",
        }}>
        <div ref={captionRef} className="text-center">{caption}</div>
        <div ref={mediaRef} style={{
          width: startWidthVW, aspectRatio, borderRadius: "12px",
          overflow: "hidden", background: "#fff", position: "relative",
        }}>
          {children}
        </div>
      </div>
      <style>{`@media(max-width:767px){.scroll-expand-stage{height:auto!important}.scroll-expand-pin{height:auto!important;padding:var(--space-5) 0}.scroll-expand-pin>div:last-child{width:100%!important}}`}</style>
    </section>
  )
}
