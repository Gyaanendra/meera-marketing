'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function DashboardSection() {
  const stageRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const img1Ref = useRef<HTMLDivElement>(null)
  const img2Ref = useRef<HTMLDivElement>(null)
  const img3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !stageRef.current || !mediaRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: pinRef.current,
        },
      })

      tl.to(mediaRef.current, { width: '55vw', borderRadius: 0, ease: 'power1.inOut' }, 0)
        .to(img1Ref.current, { opacity: 0, ease: 'power1.inOut' }, 0.18)
        .to(img2Ref.current, { opacity: 1, ease: 'power1.inOut' }, 0.18)
        .to(img2Ref.current, { opacity: 0, ease: 'power1.inOut' }, 0.38)
        .to(img3Ref.current, { opacity: 1, ease: 'power1.inOut' }, 0.38)
    }, stageRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={stageRef} style={{ height: '320vh', position: 'relative' }}>
      <div
        ref={pinRef}
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '0 var(--space-5)',
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '3rem',
          alignItems: 'center',
        }}>
          {/* Left: Text */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>
              03 / inside the workspace
            </div>
            <h2 className="text-h2" style={{ marginBottom: '0.75rem' }}>
              One thread, every <span className="text-red">decision.</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', lineHeight: 1.6, maxWidth: '42ch' }}>
              Every meeting, action, and follow-up lives in a single timeline. Search,
              filter, and jump between any moment — no more digging through folders.
            </p>
          </div>

          {/* Right: Expandable dashboard images */}
          <div
            ref={mediaRef}
            style={{
              width: '32vw',
              aspectRatio: '16 / 10',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'var(--color-bg-raised)',
              border: '1px solid var(--color-line)',
              position: 'relative',
              justifySelf: 'end',
            }}
          >
            <div ref={img1Ref} style={{ position: 'absolute', inset: 0 }}>
              <img src="/dashboards/1.png" alt="Dashboard overview" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div ref={img2Ref} style={{ position: 'absolute', inset: 0, opacity: 0 }}>
              <img src="/dashboards/2.png" alt="Dashboard detail" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            <div ref={img3Ref} style={{ position: 'absolute', inset: 0, opacity: 0 }}>
              <img src="/dashboards/3.png" alt="Dashboard expanded view" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
