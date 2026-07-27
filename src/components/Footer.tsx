'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'

const LINK_COLUMNS = [
  { heading: 'Product', links: ['Features', 'Preview', 'Chat memory', 'Platform'] },
  { heading: 'Company', links: ['About', 'Careers', 'Hypotenuse Analytics', 'Contact'] },
  { heading: 'Get started', links: ['Book a call', 'Contact sales', 'Team login'] },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const arcPathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      // draw-on divider
      if (arcPathRef.current) {
        const length = arcPathRef.current.getTotalLength()
        gsap.set(arcPathRef.current, { strokeDasharray: length, strokeDashoffset: reduceMotion ? 0 : length })
        if (!reduceMotion) {
          gsap.to(arcPathRef.current, {
            strokeDashoffset: 0, duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
          })
        }
      }

      // staggered column reveal
      gsap.from('.footer-col', {
        opacity: 0, y: 16, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} style={{
      position: 'relative', overflow: 'hidden',
      background: 'var(--color-ink-bg)', color: 'var(--color-paper, #F1EEE4)',
      padding: '5rem var(--space-5) 2rem',
    }}>
      {/* Decorative shape-motif background elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.12 }}>
        {/* Large voice arc top-left */}
        <svg viewBox="0 0 200 200" style={{ position: 'absolute', top: '-30px', left: '-20px', width: '200px', height: '200px' }}>
          <VoiceArc cx={100} cy={100} r={80} stroke="#D6402C" width={3} startAngle={10} endAngle={170} />
        </svg>

        {/* Grid dots top-right */}
        <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '40px', right: '60px', width: '80px', height: '80px' }}>
          <GridDots x={10} y={10} cols={4} rows={4} size={8} gap={8} color="#1F4EAD" />
        </svg>

        {/* Speaker circles bottom-left */}
        <svg viewBox="0 0 120 120" style={{ position: 'absolute', bottom: '20px', left: '40px', width: '100px', height: '100px' }}>
          <SpeakerCircle cx={60} cy={60} r={45} color="#E8A93B" />
          <SpeakerCircle cx={45} cy={45} r={18} color="#D6402C" />
        </svg>

        {/* Overlap zone + voice arc bottom-right */}
        <svg viewBox="0 0 160 160" style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '140px', height: '140px' }}>
          <OverlapZone cx={80} cy={80} r={60} color="#D6402C" />
          <VoiceArc cx={80} cy={80} r={50} stroke="#1F4EAD" width={2} startAngle={30} endAngle={150} />
        </svg>

        {/* Small grid dots mid-right */}
        <svg viewBox="0 0 60 60" style={{ position: 'absolute', top: '50%', right: '30%', width: '40px', height: '40px' }}>
          <GridDots x={6} y={6} cols={3} rows={3} size={6} gap={6} color="#D6402C" />
        </svg>

        {/* ── Desktop-only extras ── */}
        {/* Large voice arc cluster left-center */}
        <svg viewBox="0 0 240 240" className="hidden md:block" style={{ position: 'absolute', top: '30%', left: '-40px', width: '180px', height: '180px' }}>
          <VoiceArc cx={120} cy={120} r={100} stroke="#1F4EAD" width={2} startAngle={0} endAngle={120} />
          <VoiceArc cx={120} cy={120} r={75} stroke="#D6402C" width={1.5} startAngle={20} endAngle={100} />
          <SpeakerCircle cx={60} cy={60} r={12} color="#E8A93B" />
        </svg>

        {/* Grid 5x5 cluster top-center-right */}
        <svg viewBox="0 0 120 120" className="hidden lg:block" style={{ position: 'absolute', top: '15%', right: '35%', width: '60px', height: '60px' }}>
          <GridDots x={10} y={10} cols={5} rows={5} size={6} gap={8} color="#E8A93B" />
        </svg>

        {/* Triple speaker circles mid-left */}
        <svg viewBox="0 0 100 100" className="hidden lg:block" style={{ position: 'absolute', top: '60%', left: '25%', width: '70px', height: '70px' }}>
          <SpeakerCircle cx={50} cy={50} r={30} color="#D6402C" />
          <SpeakerCircle cx={35} cy={35} r={14} color="#1F4EAD" />
          <SpeakerCircle cx={68} cy={38} r={8} color="#E8A93B" />
        </svg>

        {/* Overlap zone mid-right */}
        <svg viewBox="0 0 80 80" className="hidden xl:block" style={{ position: 'absolute', top: '25%', right: '12%', width: '50px', height: '50px' }}>
          <OverlapZone cx={40} cy={40} r={30} color="#E8A93B" />
          <VoiceArc cx={40} cy={40} r={25} stroke="#D6402C" width={1.5} startAngle={40} endAngle={140} />
        </svg>

        {/* Small voice arc bottom-center-right */}
        <svg viewBox="0 0 80 80" className="hidden xl:block" style={{ position: 'absolute', bottom: '30%', right: '6%', width: '50px', height: '50px' }}>
          <VoiceArc cx={40} cy={40} r={32} stroke="#1F4EAD" width={1.5} startAngle={10} endAngle={130} />
          <GridDots x={12} y={12} cols={2} rows={2} size={5} gap={5} color="#D6402C" />
        </svg>

        {/* Extra grid dots bottom-left */}
        <svg viewBox="0 0 40 40" className="hidden lg:block" style={{ position: 'absolute', bottom: '25%', left: '18%', width: '30px', height: '30px' }}>
          <GridDots x={4} y={4} cols={3} rows={3} size={4} gap={4} color="#1F4EAD" />
        </svg>
      </div>

      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: '2.5rem',
          paddingBottom: '3.5rem',
        }}>
          {/* Brand column */}
          <div className="footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <img src="/logo.png" alt="Meera" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.125rem' }}>Meera</span>
            </div>
            <p style={{ fontSize: '0.85rem', maxWidth: '32ch', color: 'rgba(241,238,228,0.6)' }}>
              Your AI chief of staff — every meeting captured, structured, and searchable.
            </p>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((col) => (
            <div className="footer-col" key={col.heading}>
              <div className="eyebrow" style={{ fontSize: '0.7rem', marginBottom: '0.75rem', color: 'rgba(241,238,228,0.4)' }}>
                {col.heading}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{
                      fontSize: '0.85rem', color: 'rgba(241,238,228,0.75)',
                      transition: 'opacity 0.2s', textDecoration: 'none',
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                      onMouseLeave={e => e.currentTarget.style.opacity = ''}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Voice-arc divider */}
        <svg viewBox="0 0 1280 20" style={{ width: '100%', height: '1.25rem' }} preserveAspectRatio="none">
          <path ref={arcPathRef} d="M0 10 Q 320 -6, 640 10 T 1280 10" stroke="#D6402C" strokeWidth="1.5" fill="none" />
        </svg>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '1.5rem', fontSize: '0.7rem', color: 'rgba(241,238,228,0.4)',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <span>&copy; 2026 Meera, a Hypotenuse Analytics product</span>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="#" style={{ transition: 'opacity 0.2s', textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = ''}
            >LinkedIn</a>
            <a href="#" style={{ transition: 'opacity 0.2s', textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = ''}
            >Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
