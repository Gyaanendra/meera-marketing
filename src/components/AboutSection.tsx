'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'

const stats = [
  { value: '12M+', label: 'Media files analyzed' },
  { value: '99.1%', label: 'Synthetic detection accuracy' },
  { value: '<400ms', label: 'Detection latency' },
  { value: '3', label: 'Core intelligence platforms' },
]

const pillars = [
  {
    num: '01',
    title: 'Critical Infrastructure',
    desc: 'Sensor data and telemetry verification for real-world structural decisions. Fuses IoT, vibration, acoustic, and video signals into a unified health picture.',
    tag: 'SHM Platform',
    color: '#D6402C',
  },
  {
    num: '02',
    title: 'Surveillance Intelligence',
    desc: 'Search CCTV video libraries using plain-text prompts. Active video analytics and multi-camera path tracking for security operations.',
    tag: 'Vision Search',
    color: '#1F4EAD',
  },
  {
    num: '03',
    title: 'Zsure Reality Trust Center',
    desc: 'Defending enterprises against deepfakes, voice clones, and AI impersonation attacks. 99.1% synthetic detection accuracy with <400ms latency.',
    tag: 'zsure.in',
    color: '#E8A93B',
  },
]

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el as HTMLElement, start: 'top 85%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={containerRef} style={{ padding: 'var(--space-9) var(--space-5)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <svg viewBox="0 0 140 140" style={{ position: 'absolute', top: '20%', right: '-20px', width: '100px', height: '100px', opacity: 0.05, transform: 'rotate(-15deg)' }}>
          <VoiceArc cx={70} cy={70} r={60} stroke="#D6402C" width={2} startAngle={10} endAngle={170} />
          <SpeakerCircle cx={50} cy={50} r={15} color="#1F4EAD" />
        </svg>
        <svg viewBox="0 0 80 80" style={{ position: 'absolute', bottom: '10%', right: '5%', width: '55px', height: '55px', opacity: 0.06 }}>
          <OverlapZone cx={40} cy={40} r={35} color="#E8A93B" />
          <GridDots x={12} y={12} cols={3} rows={3} size={5} gap={5} color="#D6402C" />
        </svg>
        <div className="hidden md:block" style={{ position: 'absolute', top: '12%', left: '1%', opacity: 0.05 }}>
          <svg viewBox="0 0 80 80" width="60" height="60">
            <SpeakerCircle cx={40} cy={40} r={35} color="#1F4EAD" />
            <SpeakerCircle cx={28} cy={28} r={10} color="#D6402C" />
          </svg>
        </div>
      </div>

      <div className="content-grid" style={{ position: 'relative' }}>
        {/* Section header area — balance with shape on right */}
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-6)', gap: 'var(--space-5)' }}>
          <div style={{ flex: 1 }}>
            <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>08 / parent company</div>
            <h2 className="text-h2" style={{ marginBottom: '0.75rem' }}>
              Hypotenuse <span className="text-red">Analytics.</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', lineHeight: 1.7, maxWidth: '54ch' }}>
              An independent research and intelligence lab. We build autonomous agents,
              multi-modal inference systems, and enterprise-grade infrastructure
              for high-stakes environments. Meera is our first product on this stack.
            </p>
          </div>
          {/* Right-side decorative shape to visually balance left-aligned text */}
          <div className="hidden lg:block" style={{ flexShrink: 0, width: '100px', height: '100px', marginTop: '1rem' }}>
            <svg viewBox="0 0 100 100" width="100" height="100" style={{ opacity: 0.12 }}>
              <VoiceArc cx={50} cy={50} r={42} stroke="#1F4EAD" width={2} startAngle={0} endAngle={160} />
              <SpeakerCircle cx={50} cy={30} r={12} color="#D6402C" />
              <GridDots x={60} y={60} cols={3} rows={3} size={5} gap={5} color="#E8A93B" />
            </svg>
          </div>
        </div>

        {/* Three pillars */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
        }}>
          {pillars.map((p, i) => (
            <div key={i} style={{
              background: 'var(--color-bg-raised)',
              border: '1px solid var(--color-line)',
              borderLeft: `3px solid ${p.color}`,
              padding: 'var(--space-5)',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
              position: 'relative',
            }}>
              {/* Corner shape motif */}
              <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', opacity: 0.08, pointerEvents: 'none' }}>
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <GridDots x={4} y={4} cols={3} rows={3} size={4} gap={4} color={p.color} />
                </svg>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: p.color, fontWeight: 500 }}>{p.num}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem' }}>{p.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)', lineHeight: 1.5, flex: 1 }}>{p.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2.5" strokeLinecap="round">
                  <line x1="20" y1="12" x2="4" y2="12" />
                  <polyline points="16 16 20 12 16 8" />
                </svg>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: p.color, fontWeight: 500 }}>{p.tag}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="reveal" style={{
          borderTop: '3px solid var(--color-red)',
          padding: 'var(--space-5) 0 0 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 'var(--space-5)',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'left' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                color: 'var(--color-red)',
                lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', lineHeight: 1.3, marginTop: '0.25rem' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
