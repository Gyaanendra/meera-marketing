'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import AmbientShapes from '@/components/AmbientShapes'
import { gsap } from '@/lib/gsap'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const daysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate()
const firstDay = (m: number, y: number) => new Date(y, m, 1).getDay()

export default function CTASection() {
  const containerRef = useScrollReveal()
  const router = useRouter()
  const artRef = useRef<SVGSVGElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState<number | null>(null)

  const prev = () => setMonth(m => m === 0 ? (setYear(y => y - 1), 11) : m - 1)
  const next = () => setMonth(m => m === 11 ? (setYear(y => y + 1), 0) : m + 1)

  const dim = daysInMonth(month, year)
  const start = firstDay(month, year)
  const days: (number | null)[] = Array(start).fill(null)
  for (let d = 1; d <= dim; d++) days.push(d)

  // Looping SVG art animation
  useEffect(() => {
    const art = artRef.current
    if (!art) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const circles = art.querySelectorAll<SVGCircleElement>('.pulse-circle')
    const arcs = art.querySelectorAll<SVGPathElement>('.spin-arc')
    const dots = art.querySelectorAll<SVGRectElement>('.orbit-dot')
    const glows = art.querySelectorAll<SVGCircleElement>('.glow-ring')

    gsap.to(circles, { scale: 1.06, transformOrigin: '50% 50%', duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.to(arcs, { rotation: 360, transformOrigin: '50% 50%', duration: 12, ease: 'none', repeat: -1 })
    gsap.to(glows, { scale: 1.2, opacity: 0.3, transformOrigin: '50% 50%', duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.7 })
    gsap.to(dots, { opacity: 0.3, scale: 0.85, transformOrigin: '50% 50%', duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.15 })
  }, [])

  // Arrow hover shoot-out effect
  const onEnter = () => {
    const el = arrowRef.current
    if (!el) return
    const tl = gsap.timeline({ overwrite: true })
    tl.to(el, { x: 8, opacity: 0, duration: 0.12, ease: 'power2.in' })
      .set(el, { x: -8, opacity: 0 })
      .to(el, { x: 0, opacity: 1, duration: 0.18, ease: 'power2.out' })
  }

  const onLeave = () => {
    gsap.set(arrowRef.current, { x: 0, opacity: 1, clearProps: 'x' })
  }

  return (
    <section id="contact" ref={containerRef} className="section-dark" style={{ padding: 'var(--space-9) var(--space-5)', position: 'relative', overflow: 'hidden' }}>
      <AmbientShapes dark density="medium" />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal cta-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-7)', alignItems: 'start',
        }}>
          {/* Left: Text */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '0.75rem', color: 'rgba(241,238,228,0.5)' }}>
              10 / book a call
            </div>
            <h2 className="text-h2" style={{ marginBottom: '1rem', maxWidth: '14ch' }}>
              Give your team a better way to capture <span className="text-red">meeting memory.</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(241,238,228,0.6)', lineHeight: 1.6, maxWidth: '42ch', marginBottom: 'var(--space-5)' }}>
              Pick a time that works for you and we&apos;ll show you what Meera can do.
              No commitment, no sales pitch — just a live walkthrough.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex' }}>
                {['harsh', 'gyanendra', 'rakshi'].map((name, i) => (
                  <img key={name} src={`/images/team/${name}.avif`} alt={name}
                    style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover',
                      border: '2px solid var(--color-ink-bg)', marginLeft: i === 0 ? 0 : '-8px' }} />
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(241,238,228,0.5)' }}>
                <strong style={{ color: 'rgba(241,238,228,0.85)' }}>Used daily</strong> by the Hypotenuse team
              </span>
            </div>
          </div>

          {/* Right: Calendar + CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div style={{
              position: 'relative', background: 'var(--color-ink-bg-raised)',
              border: '1px solid rgba(241,238,228,0.1)', borderRadius: 'var(--radius-ui)',
              overflow: 'hidden', padding: 'var(--space-5)',
            }}>
              {/* Animated SVG background */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
                <svg ref={artRef} viewBox="0 0 400 400" style={{ width: '100%', height: '100%', maxWidth: '300px' }}>
                  <defs>
                    <radialGradient id="gr" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#D6402C" stopOpacity="0.25" /><stop offset="100%" stopColor="#D6402C" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="gb" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#1F4EAD" stopOpacity="0.15" /><stop offset="100%" stopColor="#1F4EAD" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle className="glow-ring" cx="200" cy="200" r="180" fill="url(#gr)" opacity="0.5" />
                  <circle className="glow-ring" cx="200" cy="200" r="140" fill="url(#gb)" opacity="0.4" />
                  <g className="spin-arc"><path d="M 200 40 A 160 160 0 0 1 360 200" stroke="#D6402C" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" /></g>
                  <g className="spin-arc"><path d="M 200 360 A 160 160 0 0 1 40 200" stroke="#1F4EAD" strokeWidth="2" fill="none" opacity="0.3" strokeLinecap="round" /></g>
                  <g className="spin-arc"><path d="M 90 80 A 160 160 0 0 1 310 80" stroke="#E8A93B" strokeWidth="1.5" fill="none" opacity="0.25" strokeLinecap="round" /></g>
                  <circle className="pulse-circle" cx="200" cy="200" r="20" fill="#D6402C" opacity="0.6" />
                  <circle className="pulse-circle" cx="200" cy="200" r="8" fill="#F1EEE4" opacity="0.5" />
                  <g>
                    <rect className="orbit-dot" x="196" y="46" width="8" height="8" fill="#D6402C" rx="2" opacity="0.5" />
                    <rect className="orbit-dot" x="346" y="196" width="8" height="8" fill="#1F4EAD" rx="2" opacity="0.5" />
                    <rect className="orbit-dot" x="196" y="346" width="8" height="8" fill="#E8A93B" rx="2" opacity="0.5" />
                    <rect className="orbit-dot" x="46" y="196" width="8" height="8" fill="#D6402C" rx="2" opacity="0.5" />
                  </g>
                  <circle cx="200" cy="200" r="100" stroke="rgba(241,238,228,0.06)" strokeWidth="1" fill="none" strokeDasharray="6 14" />
                </svg>
              </div>

              {/* Calendar content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                  <button onClick={prev} style={{ background: 'none', border: '1px solid rgba(241,238,228,0.15)', color: 'rgba(241,238,228,0.6)', padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '1rem', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-ui)' }}>&larr;</button>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{months[month]} {year}</span>
                  <button onClick={next} style={{ background: 'none', border: '1px solid rgba(241,238,228,0.15)', color: 'rgba(241,238,228,0.6)', padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '1rem', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-ui)' }}>&rarr;</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                    <div key={d} style={{ fontSize: '0.75rem', color: 'rgba(241,238,228,0.4)', fontFamily: 'var(--font-mono)', padding: '0.5rem 0' }}>{d}</div>
                  ))}
                  {days.map((d, i) => (
                    <button key={i} disabled={d === null} onClick={() => d && setSelected(d)}
                      style={{
                        border: 'none', padding: '0.6rem 0', cursor: d ? 'pointer' : 'default',
                        fontSize: '0.85rem', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-ui)',
                        background: selected === d ? 'var(--color-red)' : 'transparent',
                        color: selected === d ? '#fff' : d ? 'rgba(241,238,228,0.75)' : 'transparent',
                        transition: 'background 0.15s, color 0.15s',
                      }}
                      onMouseEnter={e => { if (d && selected !== d) e.currentTarget.style.background = 'rgba(214,64,44,0.25)' }}
                      onMouseLeave={e => { if (d && selected !== d) e.currentTarget.style.background = 'transparent' }}
                    >{d}</button>
                  ))}
                </div>
                {selected && (
                  <div style={{ marginTop: 'var(--space-3)', fontSize: '0.7rem', color: 'rgba(241,238,228,0.5)', fontFamily: 'var(--font-mono)' }}>
                    ✓ {months[month]} {selected}, {year}
                  </div>
                )}
              </div>
            </div>

            <button onClick={() => router.push('/contact')} onMouseEnter={onEnter} onMouseLeave={onLeave} className="btn-primary btn-hover cta-btn" style={{ fontSize: '0.95rem', padding: '0.85rem 2rem', alignSelf: 'center' }}>
              Book a call <span ref={arrowRef} style={{ display: 'inline-block' }}>→</span>
            </button>
          </div>
        </div>
      </div>
      <style>{`.cta-btn{transition:box-shadow 0.25s ease,transform 0.25s ease;will-change:transform}.cta-btn:hover{box-shadow:0 4px 16px rgba(214,64,44,0.3);transform:translateY(-1px)}@media(max-width:767px){.cta-grid{grid-template-columns:1fr!important;gap:var(--space-6)!important}}`}</style>
    </section>
  )
}
