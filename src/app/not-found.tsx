'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { SpeakerCircle, VoiceArc, GridDots } from '@/components/shapes/primitives'
import { gsap } from '@/lib/gsap'

const EASTER_EGGS = [
  { text: 'Bruh. This page got lost in the sauce.', type: 'slang' },
  { text: '404 — wrong timeline bestie.', type: 'slang' },
  { text: 'This page ain\'t it chief.', type: 'slang' },
  { text: 'The link is giving... deleted energy.', type: 'slang' },
  { text: 'Sorry bestie, that page dipped.', type: 'slang' },
  { text: '404. That\'s a yikes from me.', type: 'slang' },
  { text: 'This page ghosted you. Let it go.', type: 'slang' },
  { text: 'Uh oh. That\'s not very demure of that link.', type: 'slang' },
  { text: 'Meera processes 47 meetings per day. This page? Zero.', type: 'fact' },
  { text: 'Fun fact: 90% of meeting notes are never read. Meera changes that.', type: 'fact' },
  { text: 'The average person spends 4 hours/week searching for notes.', type: 'fact' },
  { text: 'Meera\'s accuracy? 99%. This page? Not found.', type: 'fact' },
  { text: 'RIP this page. It had dreams. It had a 404.', type: 'slang' },
  { text: 'That page is in a better place called /dev/null.', type: 'slang' },
  { text: 'Click me again. I dare you.', type: 'easter' },
  { text: 'You found me! Now touch grass 🌿', type: 'easter' },
  { text: '404 — page is giving main character who forgot their lines.', type: 'slang' },
  { text: 'This page did a sidequest and never came back.', type: 'slang' },
  { text: 'No cap, this page is straight up not found.', type: 'slang' },
  { text: 'The Meera AI is confused too. And it\'s never confused.', type: 'fact' },
]

export default function NotFound() {
  const shapesRef = useRef<SVGGElement>(null)
  const idleArcsRef = useRef<(SVGGElement | null)[]>([])
  const floatRef = useRef<(HTMLDivElement | null)[]>([])
  const mainRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [msg, setMsg] = useState('')
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    setMsg(EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)].text)
  }, [])

  const cycleMsg = useCallback(() => {
    const next = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)]
    setMsg(next.text)
    setClickCount(c => c + 1)
    if (subtitleRef.current) {
      gsap.fromTo(subtitleRef.current, { scale: 1.08, opacity: 0.6 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'cubic-bezier(0.22,1,0.36,1)' })
    }
  }, [])

  // GSAP
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Stagger shapes entry
    const shapes = shapesRef.current?.children
    if (shapes) {
      gsap.fromTo(
        shapes,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'cubic-bezier(0.22,1,0.36,1)', stagger: 0.15 }
      )
    }

    // Idle slow rotations on multiple arcs
    idleArcsRef.current.forEach(el => {
      if (!el) return
      gsap.to(el, {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: Math.random() * 8 + 8,
        ease: 'none',
        repeat: -1,
      })
    })

    // Float widgets
    floatRef.current.forEach(el => {
      if (!el) return
      gsap.to(el, {
        y: `random(-8, 8)`,
        x: `random(-6, 6)`,
        rotation: `random(-3, 3)`,
        duration: Math.random() * 3 + 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })

    return () => {
      if (shapes) gsap.killTweensOf(shapes)
      idleArcsRef.current.forEach(el => { if (el) gsap.killTweensOf(el) })
      floatRef.current.forEach(el => { if (el) gsap.killTweensOf(el) })
    }
  }, [])

  return (
    <div ref={mainRef} style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)', overflow: 'hidden', position: 'relative' }}>
      <Navigation />

      {/* ── Floating widgets ── */}
      <div ref={el => { floatRef.current[0] = el }} style={{ position: 'absolute', top: '18%', left: '4%', zIndex: 2, pointerEvents: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-red)', padding: '4px 8px', border: '1px solid rgba(214,64,44,0.2)', borderRadius: '4px', background: 'var(--color-bg-raised)', opacity: 0.55 }}>status: 404</div>
      <div ref={el => { floatRef.current[1] = el }} style={{ position: 'absolute', top: '72%', right: '6%', zIndex: 2, pointerEvents: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--color-cobalt)', padding: '4px 8px', border: '1px solid rgba(31,78,173,0.2)', borderRadius: '4px', background: 'var(--color-bg-raised)', opacity: 0.45 }}>signal: unstable</div>
      <div ref={el => { floatRef.current[2] = el }} style={{ position: 'absolute', bottom: '25%', left: '2%', zIndex: 2, pointerEvents: 'none', width: '52px', height: '52px', fontFamily: 'var(--font-mono)', fontSize: '0.4rem', color: 'var(--color-ochre)', border: '1px solid rgba(232,169,59,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'var(--color-bg-raised)', opacity: 0.45 }}>⟳<br />lost</div>
      <div ref={el => { floatRef.current[3] = el }} style={{ position: 'absolute', top: '30%', right: '3%', zIndex: 2, pointerEvents: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.45rem', color: 'var(--color-ink-soft)', padding: '3px 7px', border: '1px solid var(--color-line)', borderRadius: '3px', background: 'var(--color-bg-raised)', opacity: 0.35 }}>✦ egg.exe</div>

      {/* ── Main content ── */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '1.5rem', position: 'relative', zIndex: 1 }}>

        {/* ── SVG illustration ── */}
        <div style={{ maxWidth: '660px', width: '100%', marginBottom: 'var(--space-5)' }}>
          <svg viewBox="0 0 660 340" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* 404 text — very subtle fill + thin stroke */}
            <text x="330" y="220" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="200"
              fill="var(--color-ink)" fillOpacity="0.08"
              stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="1.5"
            >404</text>

            {/* Second 404 layer for chromatic width feel — very faint */}
            <text x="328" y="218" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="200"
              fill="none" stroke="#D6402C" strokeOpacity="0.04" strokeWidth="2"
            >404</text>
            <text x="332" y="222" textAnchor="middle" fontFamily="var(--font-display)" fontWeight="800" fontSize="200"
              fill="none" stroke="#1F4EAD" strokeOpacity="0.04" strokeWidth="2"
            >404</text>

            {/* Shapes */}
            <g ref={shapesRef}>
              {/* 1. SpeakerCircle — perched on first 4 (red accent) */}
              <g transform="translate(190, 48)">
                <SpeakerCircle cx={0} cy={0} r={20} color="var(--color-red)" />
              </g>

              {/* 2. VoiceArc — wide arc through the 0 (ink outline) + idle rotation */}
              <g ref={el => { idleArcsRef.current[0] = el }} style={{ transformOrigin: '330px 180px' }}>
                <g transform="translate(330, 180)">
                  {(() => {
                    const r = 74
                    const d = ((a: number) => {
                      const s = ((a - 90) * Math.PI) / 180
                      const e = ((a + 300 - 90) * Math.PI) / 180
                      return `M ${+(r * Math.cos(s)).toFixed(4)} ${+(r * Math.sin(s)).toFixed(4)} A ${r} ${r} 0 1 1 ${+(r * Math.cos(e)).toFixed(4)} ${+(r * Math.sin(e)).toFixed(4)}`
                    })(20)
                    return <path d={d} stroke="var(--color-ink)" strokeOpacity={0.15} strokeWidth={3} fill="none" strokeLinecap="round" />
                  })()}
                </g>
              </g>

              {/* 3. SpeakerCircle — at the base of the 0 (red accent) */}
              <g transform="translate(330, 268)">
                <SpeakerCircle cx={0} cy={0} r={22} color="var(--color-red)" />
              </g>

              {/* 4. GridDots — near the second 4 base */}
              <g transform="translate(470, 252)" opacity={0.2}>
                <GridDots x={0} y={0} cols={4} rows={3} size={5} gap={6} color="var(--color-ink)" />
              </g>

              {/* 5. VoiceArc — cobalt arc arcing between the two red circles */}
              {(() => {
                const r = 95
                const s = ((30 - 90) * Math.PI) / 180
                const e = ((160 - 90) * Math.PI) / 180
                const x1 = +(190 + r * Math.cos(s)).toFixed(4)
                const y1 = +(48 + r * Math.sin(s)).toFixed(4)
                const x2 = +(190 + r * Math.cos(e)).toFixed(4)
                const y2 = +(48 + r * Math.sin(e)).toFixed(4)
                const la = 160 - 30 > 180 ? 1 : 0
                return <path d={`M ${x1} ${y1} A ${r} ${r} 0 ${la} 1 ${x2} ${y2}`} stroke="var(--color-cobalt)" strokeOpacity={0.25} strokeWidth={2.5} fill="none" strokeLinecap="round" />
              })()}

              {/* 6. OverlapZone */}
              <circle cx="330" cy="258" r="30" fill="var(--color-red)" fillOpacity="0.08" />

              {/* 7. Small grid dots — on top of the first 4 */}
              <g transform="translate(155, 55)" opacity={0.15}>
                <GridDots x={0} y={0} cols={3} rows={2} size={3} gap={5} color="var(--color-ink)" />
              </g>

              {/* 8. Extra voice arc — small, ochre, through the top of the second 4 */}
              {(() => {
                const r = 50
                const s = ((200 - 90) * Math.PI) / 180
                const e = ((340 - 90) * Math.PI) / 180
                const x1 = +(440 + r * Math.cos(s)).toFixed(4)
                const y1 = +(80 + r * Math.sin(s)).toFixed(4)
                const x2 = +(440 + r * Math.cos(e)).toFixed(4)
                const y2 = +(80 + r * Math.sin(e)).toFixed(4)
                const la = 340 - 200 > 180 ? 1 : 0
                return <path d={`M ${x1} ${y1} A ${r} ${r} 0 ${la} 1 ${x2} ${y2}`} stroke="var(--color-ochre)" strokeOpacity={0.18} strokeWidth={2} fill="none" strokeLinecap="round" />
              })()}

              {/* 9. A few scattered dots */}
              <circle cx="530" cy="100" r="9" fill="var(--color-ink)" fillOpacity="0.06" />
              <circle cx="100" cy="260" r="11" fill="var(--color-ink)" fillOpacity="0.06" />
              <circle cx="560" cy="270" r="7" fill="var(--color-ink)" fillOpacity="0.05" />

              {/* 10. Vertical speaker dots — like a bounce indicator */}
              <g opacity={0.12}>
                <circle cx="270" cy="40" r="4" fill="var(--color-cobalt)" />
                <circle cx="270" cy="56" r="4" fill="var(--color-cobalt)" />
                <circle cx="270" cy="72" r="4" fill="var(--color-cobalt)" />
              </g>

              {/* 11. Pen highlighter squiggle — through the first 4 */}
              <path d="M 140 165 Q 155 150, 170 165 T 200 165 T 230 165"
                stroke="var(--color-red)" strokeOpacity="0.18" strokeWidth="8"
                fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
              <path d="M 140 165 Q 155 150, 170 165 T 200 165 T 230 165"
                stroke="var(--color-red)" strokeOpacity="0.35" strokeWidth="3"
                fill="none" strokeLinecap="round" strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>

        {/* ── Easter egg ── */}
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          {msg && (
            <p
              ref={subtitleRef}
              onClick={cycleMsg}
              style={{ fontSize: '1.2rem', color: 'var(--color-ink-soft)', lineHeight: 1.6, marginBottom: '0.15rem', fontStyle: 'italic', cursor: 'pointer', fontWeight: 500, fontFamily: 'var(--font-display)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-ink)'}
              onMouseLeave={e => e.currentTarget.style.color = ''}
            >
              &ldquo;{msg}&rdquo;
            </p>
          )}
          <p style={{ fontSize: '0.65rem', color: 'var(--color-ink-soft)', fontFamily: 'var(--font-mono)', marginBottom: 'var(--space-5)', opacity: 0.5 }}>
            {clickCount + 1} hidden gems — click the 404 or the message for more
          </p>

          <Link href="/" className="btn-primary" style={{ fontSize: '0.85rem', padding: 'var(--space-3) var(--space-5)', textDecoration: 'none', display: 'inline-block' }}>
            Back to home
          </Link>
        </div>
      </main>

      {/* ── Subtle footer strip ── */}
      <div style={{ padding: '0.6rem 1.5rem', textAlign: 'center', fontSize: '0.55rem', color: 'var(--color-ink-soft)', fontFamily: 'var(--font-mono)', opacity: 0.3, borderTop: '1px solid var(--color-line)' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>meera.hyzen.tech</Link>
        <span style={{ margin: '0 0.4rem' }}>✦</span>
        {new Date().getFullYear()}
        <span style={{ margin: '0 0.4rem' }}>✦</span>
        even lost pages need a footer
      </div>
    </div>
  )
}
