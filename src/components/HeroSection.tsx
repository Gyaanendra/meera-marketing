'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'
import { HeroVoices } from '@/components/shapes/VoicesComposition'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = (window as any).__lenis
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth' })
}

const queries = [
  'Who owns the API migration?',
  'What did Q1 planning decide about pricing?',
]

/* ─── Widget sub-components (scaled up) ─── */

function CalendarWidget() {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--color-line)',
      borderRadius: '6px',
      padding: '1.1rem 1.25rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>May 2026</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-red)', fontWeight: 500 }}>12 events</span>
      </div>
      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', marginBottom: '0.4rem' }}>
        {['M','T','W','T','F','S','S'].map((d, i) => (
          <div key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-ink-soft)', textAlign: 'center', lineHeight: '1.2rem' }}>{d}</div>
        ))}
      </div>
      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
        {[null,null,null,null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((d, i) => (
          <div key={i} style={{ position: 'relative', textAlign: 'center', lineHeight: '1.6rem', fontSize: '0.6rem', fontFamily: 'var(--font-body)', color: d ? 'var(--color-ink)' : 'transparent' }}>
            {d || '--'}
            {/* Highlighted dates with swiggly underline */}
            {d && [6, 11, 12, 19, 25, 28].includes(d as number) && (
              <svg
                viewBox="0 0 28 6"
                style={{ position: 'absolute', bottom: '1px', left: '0', width: '100%', height: '6px', pointerEvents: 'none' }}
              >
                <path
                  d={`M 0 3 Q 3 0, 7 3 T 14 3 T 21 3 T 28 3`}
                  stroke={d === 12 ? '#D6402C' : '#E8A93B'}
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  opacity={d === 12 ? 0.9 : 0.5}
                />
              </svg>
            )}
            {/* Today's date */}
            {d === 12 && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                border: '1.5px solid var(--color-red)',
                width: '1.4rem', height: '1.4rem',
                margin: '0.1rem auto',
              }} />
            )}
          </div>
        ))}
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.6rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <svg width="20" height="6" viewBox="0 0 20 6"><path d="M 0 3 Q 3 0, 7 3 T 14 3 T 20 3" stroke="#E8A93B" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-ink-soft)' }}>Meeting</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <svg width="20" height="6" viewBox="0 0 20 6"><path d="M 0 3 Q 3 0, 7 3 T 14 3 T 20 3" stroke="#D6402C" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-ink-soft)' }}>Review</span>
        </div>
      </div>
    </div>
  )
}

function TasksWidget() {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--color-line)',
      borderRadius: '6px',
      padding: '1rem 1.1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-red)" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Actions</span>
      </div>
      {['Review PR #142', 'Prep Q2 budget', 'Schedule retro'].map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '1px', border: '1.5px solid var(--color-line)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t}</span>
        </div>
      ))}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-red)', marginTop: '0.3rem', textAlign: 'right' }}>+3 more</div>
    </div>
  )
}

function RecordingWidget() {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--color-line)',
      borderRadius: '6px',
      padding: '1rem 1.1rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.5rem' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-red)', display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-red)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Live</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '24px' }}>
        {[45, 65, 40, 80, 55, 85, 50, 60, 70, 35, 75, 50].map((h, i) => (
          <div key={i} style={{ width: '3px', height: `${h}%`, background: 'var(--color-ink)', opacity: 0.18, borderRadius: '1px' }} />
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-ink-soft)', marginTop: '0.35rem' }}>Sprint · 23:14</div>
    </div>
  )
}

function StatBadge() {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--color-line)',
      borderRadius: '6px',
      padding: '0.6rem 0.9rem',
      display: 'flex',
      alignItems: 'baseline',
      gap: '0.3rem',
    }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--color-red)', lineHeight: 1 }}>12M+</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--color-ink-soft)' }}>files</span>
    </div>
  )
}

function ChatBubble() {
  return (
    <div style={{
      background: 'var(--color-ink)',
      borderRadius: '6px',
      padding: '0.6rem 0.9rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    }}>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-bg)', fontWeight: 500, whiteSpace: 'nowrap' }}>Who owns API?</span>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-bg)" strokeWidth="2" strokeLinecap="round">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </div>
  )
}

/* ─── CollageShape with variable size ─── */

function CollageShape({ name, size = 28, style }: { name: string; size?: number; style?: React.CSSProperties }) {
  const map: Record<string, React.ReactNode> = {
    SC: <SpeakerCircle cx={size / 2} cy={size / 2} r={size * 0.42} color="#D6402C" />,
    SC2: <SpeakerCircle cx={size / 2} cy={size / 2} r={size * 0.4} color="#1F4EAD" />,
    VA: <VoiceArc cx={size / 2} cy={size / 2} r={size * 0.42} stroke="#D6402C" width={size * 0.06} startAngle={10} endAngle={150} />,
    GD: <GridDots x={size * 0.12} y={size * 0.12} cols={4} rows={3} size={size * 0.12} gap={size * 0.12} color="#E8A93B" />,
    OZ: <OverlapZone cx={size / 2} cy={size / 2} r={size * 0.42} color="#1F4EAD" />,
  }
  return (
    <div style={{ pointerEvents: 'none', ...style }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
        {map[name] || map.SC}
      </svg>
    </div>
  )
}

/* ─── SVG filler shapes (larger, background texture) ─── */

function FillerShapes() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {/* Large background textures */}
      <svg viewBox="0 0 120 120" style={{ position: 'absolute', top: '-10%', right: '-5%', width: '150px', height: '150px', opacity: 0.04 }}>
        <VoiceArc cx={60} cy={60} r={50} stroke="#D6402C" width={2} startAngle={10} endAngle={170} />
        <SpeakerCircle cx={60} cy={60} r={40} color="#1F4EAD" />
      </svg>
      <svg viewBox="0 0 80 80" style={{ position: 'absolute', bottom: '5%', left: '-8%', width: '100px', height: '100px', opacity: 0.035 }}>
        <OverlapZone cx={40} cy={40} r={35} color="#E8A93B" />
        <GridDots x={10} y={10} cols={4} rows={4} size={5} gap={5} color="#D6402C" />
      </svg>
      <svg viewBox="0 0 60 60" style={{ position: 'absolute', top: '35%', left: '-2%', width: '70px', height: '70px', opacity: 0.03 }}>
        <SpeakerCircle cx={30} cy={30} r={25} color="#1F4EAD" />
        <VoiceArc cx={30} cy={30} r={20} stroke="#D6402C" width={1.5} startAngle={20} endAngle={140} />
      </svg>
      <svg viewBox="0 0 40 40" style={{ position: 'absolute', top: '55%', right: '2%', width: '50px', height: '50px', opacity: 0.04 }}>
        <GridDots x={5} y={5} cols={3} rows={3} size={5} gap={5} color="#E8A93B" />
      </svg>
      {/* Additional wide arcs */}
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', top: '10%', left: '-20%', width: '200px', height: '200px', opacity: 0.025 }}>
        <VoiceArc cx={100} cy={100} r={85} stroke="#D6402C" width={2} startAngle={5} endAngle={175} />
        <VoiceArc cx={100} cy={100} r={65} stroke="#1F4EAD" width={1.5} startAngle={30} endAngle={150} />
      </svg>
    </div>
  )
}

/* ─── Main ─── */

export default function HeroSection({ revealed }: { revealed: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!revealed || animatedRef.current || !containerRef.current) return
    animatedRef.current = true

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } })
      tl.to('#hero-eyebrow', { opacity: 1, y: 0 }, 0)
        .to('#hero-title', { opacity: 1, y: 0 }, 0.08)
        .to('#hero-sub', { opacity: 1, y: 0 }, 0.16)
        .to('#hero-cta', { opacity: 1, y: 0 }, 0.24)
        .to('#hero-chips', { opacity: 1, y: 0 }, 0.32)
        .to('#hero-social', { opacity: 1, y: 0 }, 0.38)
        .to('#hero-shape', { opacity: 1, scale: 1 }, 0.2)
    })

    return () => ctx.revert()
  }, [revealed])

  return (
    <section ref={containerRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '7rem var(--space-5) 0' }}>
      <div className="content-grid" style={{ width: '100%', display: 'grid', gridTemplateColumns: '1.1fr 1.2fr', gap: '2rem', alignItems: 'center' }}>
        {/* ─── Left: Content ─── */}
        <div>
          <div id="hero-eyebrow" className="eyebrow" style={{ marginBottom: '0.75rem', opacity: 0, transform: 'translateY(8px)' }}>
            01 / smarter meetings with ai
          </div>
          <h1 id="hero-title" className="text-display" style={{ opacity: 0, transform: 'translateY(12px)' }}>
            Meet the <span className="text-red">AI</span><br />
            chief of staff
          </h1>
          <p id="hero-sub" className="text-lead" style={{ color: 'var(--color-ink-soft)', marginTop: '1.5rem', maxWidth: '46ch', opacity: 0, transform: 'translateY(12px)' }}>
            Meera records your meetings, transcribes them in real time, and turns talk into{' '}
            <span className="text-red">structured</span> action — so you can focus on what matters.
          </p>
          <div id="hero-cta" style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', opacity: 0, transform: 'translateY(12px)' }}>
            <button onClick={() => scrollTo('product-video')} className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.75rem 1.5rem', cursor: 'pointer' }}>See it in action</button>
            <button onClick={() => scrollTo('product')} className="btn-secondary" style={{ fontSize: '0.85rem', padding: '0.75rem 1.5rem', cursor: 'pointer' }}>Learn more</button>
          </div>

          <div id="hero-chips" style={{ marginTop: '2rem', opacity: 0, transform: 'translateY(12px)' }}>
            <div className="eyebrow" style={{ fontSize: '0.65rem', marginBottom: '0.5rem' }}>Try asking Meera:</div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {queries.map((q, i) => (
                <span key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.5rem 0.9rem',
                  background: 'var(--color-bg-raised)',
                  border: '1px solid var(--color-line)',
                  borderRadius: 'var(--radius-ui)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem', color: 'var(--color-ink)',
                  cursor: 'default',
                }}>
                  &ldquo;{q}&rdquo;
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              ))}
            </div>
          </div>

          <div id="hero-social" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem', opacity: 0, transform: 'translateY(12px)' }}>
            <div style={{ display: 'flex' }}>
              {['harsh', 'gyanendra', 'rakshi'].map((name, i) => (
                <img key={name} src={`/images/team/${name}.avif`} alt={name} style={{
                  width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover',
                  border: '2px solid var(--color-bg)',
                  marginLeft: i === 0 ? 0 : '-8px',
                }} />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)' }}>
              <strong style={{ color: 'var(--color-ink)' }}>Used daily</strong> by the Hypotenuse team
            </span>
          </div>
        </div>

        {/* ─── Right: Expanded collage — SVG filler art + bigger widgets ─── */}
        <div id="hero-shape" style={{
          width: '100%',
          minHeight: '520px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transform: 'scale(0.95)',
        }}>
          {/* Desktop collage */}
          <div className="hero-collage" style={{
            width: '100%',
            maxWidth: '460px',
            position: 'relative',
          }}>
            {/* Background filler shapes spanning the whole area */}
            <FillerShapes />

            {/* Mid-layer: grid + z-stacked art */}
            <div style={{ position: 'relative', zIndex: 1, minHeight: '360px' }}>
              {/* Large HeroVoices — behind everything */}
              <div style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '-2.2rem',
                width: '260px',
                height: '260px',
                opacity: 0.4,
                pointerEvents: 'none',
                zIndex: 0,
              }}>
                <HeroVoices size={260} />
              </div>

              {/* Art — centered in right-hand column, behind cards */}
              <div style={{
                position: 'absolute',
                left: '88%',
                top: '32%',
                transform: 'translate(-50%, -50%)',
                width: '340px',
                height: '340px',
                opacity: 0.8,
                pointerEvents: 'none',
                zIndex: 0,
              }}>
                <HeroVoices size={340} />
              </div>

              {/* Grid layout for widgets (z-index 1 so they sit above large art but below small art) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 0.45fr',
                gridTemplateRows: 'auto auto auto',
                gap: '0.75rem',
                alignItems: 'start',
                position: 'relative',
                zIndex: 1,
              }}>
                {/* Row 1: Calendar + StatBadge */}
                <div style={{ gridColumn: '1', gridRow: '1' }}><CalendarWidget /></div>
                <div style={{ gridColumn: '2', gridRow: '1', justifySelf: 'end' }}><StatBadge /></div>

                {/* Row 2: Tasks + Recording */}
                <div style={{ gridColumn: '1', gridRow: '2' }}><TasksWidget /></div>
                <div style={{ gridColumn: '2', gridRow: '2' }}><RecordingWidget /></div>

                {/* Row 3: Chat bubble (col 1 only) */}
                <div style={{ gridColumn: '1', gridRow: '3', marginTop: '0.3rem' }}>
                  <ChatBubble />
                </div>
              </div>

              {/* Scattered shape accents (above all) */}
              <CollageShape name="VA" size={36} style={{ position: 'absolute', top: '5.5rem', left: '-0.8rem', opacity: 0.12, zIndex: 4 }} />
              <CollageShape name="GD" size={32} style={{ position: 'absolute', top: '6rem', right: '-0.5rem', opacity: 0.1, zIndex: 4 }} />
              <CollageShape name="SC" size={38} style={{ position: 'absolute', top: '10.5rem', left: '40%', opacity: 0.1, zIndex: 4 }} />
              <CollageShape name="SC2" size={30} style={{ position: 'absolute', top: '12rem', right: '-0.6rem', opacity: 0.08, zIndex: 4 }} />
              <CollageShape name="OZ" size={34} style={{ position: 'absolute', top: '10rem', left: '-0.5rem', opacity: 0.08, zIndex: 4 }} />
              <CollageShape name="VA" size={40} style={{ position: 'absolute', bottom: '-0.5rem', right: '-0.3rem', opacity: 0.07, zIndex: 4 }} />
              <CollageShape name="GD" size={28} style={{ position: 'absolute', bottom: '0rem', left: '45%', opacity: 0.1, zIndex: 4 }} />
              <CollageShape name="SC" size={26} style={{ position: 'absolute', bottom: '-0.3rem', left: '-0.4rem', opacity: 0.09, zIndex: 4 }} />
            </div>
          </div>

          {/* Mobile fallback — stacked */}
          <div className="hero-collage-mobile" style={{
            width: '100%',
            maxWidth: '380px',
            display: 'none',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            <CalendarWidget />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <TasksWidget />
              <RecordingWidget />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <StatBadge />
              <ChatBubble />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', opacity: 0.08, pointerEvents: 'none' }}>
              <CollageShape name="SC" size={28} />
              <CollageShape name="VA" size={28} />
              <CollageShape name="GD" size={28} />
              <CollageShape name="OZ" size={28} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', opacity: 0.25, marginTop: '0.5rem' }}>
              <HeroVoices size={160} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .hero-collage { display: none !important; }
          .hero-collage-mobile { display: flex !important; }
        }
        @media (max-width: 768px) {
          section:has(#hero-shape) > .content-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
