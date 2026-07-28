'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'

const testimonials = [
  {
    name: 'Harsh Vardhan',
    role: 'Chief Vision Architect',
    initials: 'HV',
    color: '#D6402C',
    text: '@Meera joined our stack a year ago and honestly she is the most productive hire we have made — zero onboarding, works every hour, never drops a thread. She handles the entire recruitment pipeline on her own now and I do not think anyone on the team has touched a resume in months.',
  },
  {
    name: 'Devanshi Jaiswal',
    role: 'Co-Founder & Knowledge Explorer',
    initials: 'DJ',
    color: '#1F4EAD',
    text: '@Meera sits in on every meeting we have and her summaries are better than half the humans I have worked with. She catches follow-ups, flags decisions, and surfaces them before I even remember they happened.',
  },
  {
    name: 'Prakher',
    role: 'Product Alchemist',
    initials: 'P',
    color: '#E8A93B',
    text: 'I was sceptical at first — another AI tool, another dashboard. But @Meera does not need a dashboard. She just does the work. Onboarding, follow-ups, scheduling — I only get looped in when there is something I actually need to decide.',
  },
  {
    name: 'Anvesh Mishra',
    role: 'AI Systems Sorcerer',
    initials: 'AM',
    color: '#D6402C',
    text: '@Meera freed up literally 15+ hours of ops work per week for my team. The meeting bot alone captures everything and posts structured notes before the call even ends. Most reliable team member we have, hands down.',
  },
  {
    name: 'Rakshitha A.',
    role: 'Story Amplifier',
    initials: 'RA',
    color: '#1F4EAD',
    text: 'I work on multi-modal systems every day so I know how hard cross-input context is. @Meera does it across vision, audio, and calendar streams simultaneously without breaking a sweat. She is the engineer I wish I could clone.',
  },
  {
    name: 'Gyanendra Prakash',
    role: 'AI Systems Sorcerer',
    initials: 'GP',
    color: '#E8A93B',
    text: 'I built the pipeline orchestration that keeps @Meera running and even I forget she is not a person sometimes. She coordinates between calendar, queue workers, and memory store like a senior engineer who just happens to work at machine speed. Indispensable.',
  },
  {
    name: 'Vansh Malik',
    role: 'Story Amplifier',
    initials: 'VM',
    color: '#D6402C',
    text: 'The best stories come from real impact and @Meeras impact is impossible to miss. She runs recruitment end-to-end, joins every meeting, schedules everything. The team genuinely refers to her as "she" without thinking twice. That is when you know.',
  },
]

/* ─── Animated SVG art ─── */
function AnimatedArt({ variant }: { variant: number }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      const pulses = el.querySelectorAll('.pulse')
      const drifts = el.querySelectorAll('.drift')
      const rotates = el.querySelectorAll('.rotate')
      const strokes = el.querySelectorAll('.stroke-draw')

      pulses.forEach(c => gsap.to(c, { scale: 1.3, opacity: 0.4, duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: 'center' }))
      drifts.forEach((d, i) => gsap.to(d, { y: '-=5', duration: 1.5 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
      rotates.forEach(r => gsap.to(r, { rotation: 30, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: 'center' }))
      strokes.forEach(s => gsap.fromTo(s, { strokeDashoffset: 200 }, { strokeDashoffset: 0, duration: 3, ease: 'power2.inOut', repeat: -1, yoyo: true }))
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 120 120" width="80" height="80" fill="none" style={{ overflow: 'visible' }}>
      {variant === 0 && (
        <>
          <circle className="pulse" cx={60} cy={60} r={48} fill="#D6402C" opacity={0.1} />
          <circle className="pulse" cx={60} cy={60} r={30} fill="#D6402C" opacity={0.15} />
          <VoiceArc cx={60} cy={60} r={50} stroke="#D6402C" width={2.5} startAngle={10} endAngle={170} />
          <circle cx={60} cy={60} r={10} fill="#1F4EAD" />
          <g className="drift">
            <circle cx={30} cy={30} r={5} fill="#E8A93B" opacity={0.6} />
            <circle cx={90} cy={30} r={4} fill="#1F4EAD" opacity={0.5} />
          </g>
        </>
      )}
      {variant === 1 && (
        <>
          <circle className="pulse" cx={60} cy={60} r={44} fill="#1F4EAD" opacity={0.08} />
          <circle className="pulse" cx={60} cy={60} r={22} fill="#E8A93B" opacity={0.12} />
          <GridDots x={20} y={25} cols={5} rows={4} size={5} gap={8} color="#1F4EAD" />
          <OverlapZone cx={60} cy={60} r={16} color="#D6402C" />
          <line x1={20} y1={100} x2={28} y2={88} stroke="#E8A93B" strokeWidth={2.5} strokeLinecap="round" className="rotate" />
          <line x1={100} y1={100} x2={92} y2={88} stroke="#E8A93B" strokeWidth={2.5} strokeLinecap="round" className="rotate" />
        </>
      )}
      {variant === 2 && (
        <>
          <circle className="pulse" cx={60} cy={60} r={52} fill="#E8A93B" opacity={0.06} />
          <circle className="pulse" cx={60} cy={60} r={34} fill="#D6402C" opacity={0.1} />
          <SpeakerCircle cx={35} cy={35} r={18} color="#1F4EAD" />
          <SpeakerCircle cx={85} cy={85} r={18} color="#D6402C" />
          <VoiceArc cx={60} cy={60} r={44} stroke="#1F4EAD" width={2} startAngle={40} endAngle={320} />
          <circle className="drift" cx={60} cy={45} r={5} fill="#E8A93B" />
          <circle className="drift" cx={45} cy={70} r={4} fill="#1F4EAD" />
          <circle className="drift" cx={75} cy={70} r={4} fill="#D6402C" />
        </>
      )}
      {variant === 3 && (
        <>
          <circle className="pulse" cx={60} cy={60} r={50} fill="#D6402C" opacity={0.06} />
          <circle className="pulse" cx={60} cy={60} r={28} fill="#1F4EAD" opacity={0.1} />
          <VoiceArc cx={60} cy={60} r={46} stroke="#E8A93B" width={2} startAngle={20} endAngle={200} />
          <GridDots x={35} y={50} cols={3} rows={2} size={5} gap={10} color="#D6402C" />
          <OverlapZone cx={60} cy={60} r={12} color="#E8A93B" />
          <circle className="drift" cx={25} cy={40} r={4} fill="#E8A93B" />
          <circle className="drift" cx={95} cy={80} r={4} fill="#D6402C" />
          <path className="stroke-draw" d="M 20 20 Q 40 10, 60 20 T 100 20" stroke="#1F4EAD" strokeWidth={2} strokeLinecap="round" fill="none" strokeDasharray={200} />
        </>
      )}
    </svg>
  )
}

/* ─── Art filler card ─── */
function ArtFill({ variant, style }: { variant: number; style?: React.CSSProperties }) {
  return (
    <div className="reveal" style={{
      background: 'rgba(241,238,228,0.4)',
      border: '1px solid var(--color-line)',
      borderRadius: 'var(--radius-ui)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'var(--space-3)',
      ...style,
    }}>
      <AnimatedArt variant={variant} />
    </div>
  )
}

/* ─── Testimonial card ─── */
function QuoteCard({ t, tall, wide, style }: {
  t: typeof testimonials[number]
  tall?: boolean
  wide?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div className="reveal card-hover" style={{
      background: '#fff',
      border: '1px solid var(--color-line)',
      borderTop: `3px solid ${t.color}`,
      borderRadius: 'var(--radius-ui)',
      padding: tall ? 'var(--space-6) var(--space-5)' : 'var(--space-4)',
      position: 'relative',
      display: 'flex', flexDirection: 'column',
      ...style,
    }}>
      {/* Corner shape motif */}
      <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', pointerEvents: 'none', opacity: 0.08 }}>
        <svg width={44} height={44} viewBox="0 0 44 44">
          <SpeakerCircle cx={22} cy={22} r={18} color={t.color} />
          <VoiceArc cx={14} cy={22} r={15} stroke="#16171B" width={1.5} startAngle={0} endAngle={140} />
        </svg>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.6rem' }}>
        <div style={{
          width: tall ? '2.8rem' : '2.5rem', height: tall ? '2.8rem' : '2.5rem',
          background: t.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0,
          position: 'relative',
        }}>
          {t.initials}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
            <svg width="44" height="44" viewBox="0 0 44 44">
              <VoiceArc cx={22} cy={22} r={20} stroke="#fff" width={2} startAngle={20} endAngle={160} />
            </svg>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: tall ? '0.9rem' : '0.85rem' }}>
            {t.name}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-ink-soft)' }}>
            {t.role}
          </div>
        </div>
      </div>

      <p style={{
        fontSize: tall ? '0.82rem' : '0.78rem',
        lineHeight: 1.6,
        color: 'var(--color-ink)',
        position: 'relative', zIndex: 1,
        flex: 1,
      }}>
        &ldquo;{t.text}&rdquo;
      </p>
    </div>
  )
}

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      /* Scroll reveals with varied directions + staggered timing */
      const cards = gsap.utils.toArray<HTMLElement>('.reveal')
      cards.forEach((el, i) => {
        const dir = i % 3
        const fromX = dir === 0 ? -40 : dir === 1 ? 40 : 0
        gsap.fromTo(el,
          { opacity: 0, y: 30, x: fromX, scale: 0.97 },
          {
            opacity: 1, y: 0, x: 0, scale: 1, duration: 0.5, ease: 'power2.out', delay: i * 0.04,
            scrollTrigger: { trigger: el, start: 'top 90%' },
          }
        )
      })

      /* Subtitle squiggle draw-in */
      const squiggles = containerRef.current?.querySelectorAll('.subtitle-squiggle path')
      if (squiggles?.length) {
        squiggles.forEach(s => gsap.fromTo(s, { strokeDashoffset: 80, strokeDasharray: 80 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut', scrollTrigger: { trigger: squiggles[0]?.closest('.subtitle-line'), start: 'top 85%' } }))
      }

      /* Background shapes slow drift */
      if (bgRef.current) {
        gsap.to(bgRef.current.querySelectorAll('.bg-shape'), {
          y: 20, duration: 20, ease: 'sine.inOut', yoyo: true, repeat: -1,
        })
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const [harsh, devanshi, prakher, anvesh, rakshitha, gyanendra, vansh] = testimonials

  return (
    <section ref={containerRef} style={{ padding: 'var(--space-9) var(--space-5)', background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
      {/* Animated background shapes */}
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <svg className="bg-shape" viewBox="0 0 160 160" style={{ position: 'absolute', top: '3%', right: '0%', width: '110px', height: '110px', opacity: 0.05 }}>
          <VoiceArc cx={80} cy={80} r={70} stroke="#D6402C" width={2} startAngle={10} endAngle={180} />
          <OverlapZone cx={55} cy={55} r={25} color="#1F4EAD" />
        </svg>
        <svg className="bg-shape" viewBox="0 0 60 60" style={{ position: 'absolute', top: '50%', left: '0%', width: '40px', height: '40px', opacity: 0.07 }}>
          <GridDots x={6} y={6} cols={3} rows={3} size={5} gap={5} color="#E8A93B" />
        </svg>
        <svg className="bg-shape" viewBox="0 0 80 80" style={{ position: 'absolute', bottom: '5%', right: '8%', width: '55px', height: '55px', opacity: 0.04 }}>
          <SpeakerCircle cx={40} cy={40} r={32} color="#D6402C" />
          <SpeakerCircle cx={26} cy={26} r={10} color="#1F4EAD" />
        </svg>
      </div>

      {/* ── Full-width bento ── */}
      <div style={{ position: 'relative' }}>
        <div className="reveal" style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>09 / how the team feels</div>
          <h2 className="text-h2" style={{ marginBottom: '1rem' }}>
            Life with <span className="text-red">Meera.</span>
          </h2>
          {/* Animated subtitle accent */}
          <div className="subtitle-line" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-ink-soft)' }}>
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="subtitle-squiggle">
              <path d="M 0 6 Q 10 0, 20 6 T 40 6" stroke="var(--color-ink-soft)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
            <span className="subtitle-text">7 voices, one story</span>
            <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="subtitle-squiggle">
              <path d="M 0 6 Q 10 12, 20 6 T 40 6" stroke="var(--color-ink-soft)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>

        {/* Bento grid: 4 columns */}
        <div className="t-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-3)',
        }}>
          {/* Row 1 */}
          <QuoteCard t={harsh} tall style={{ gridColumn: '1 / 3', gridRow: '1 / 3' }} />
          <QuoteCard t={devanshi} wide style={{ gridColumn: '3', gridRow: '1' }} />
          <ArtFill variant={0} style={{ gridColumn: '4', gridRow: '1' }} />

          {/* Row 2 */}
          <QuoteCard t={prakher} style={{ gridColumn: '3', gridRow: '2' }} />
          <QuoteCard t={vansh} style={{ gridColumn: '4', gridRow: '2' }} />

          {/* Row 3: wide art strip */}
          <ArtFill variant={1} style={{ gridColumn: '1 / 3', gridRow: '3', minHeight: '70px' }} />
          <QuoteCard t={anvesh} wide style={{ gridColumn: '3 / 5', gridRow: '3' }} />

          {/* Row 4 */}
          <QuoteCard t={rakshitha} wide style={{ gridColumn: '1 / 3', gridRow: '4' }} />
          <ArtFill variant={2} style={{ gridColumn: '3', gridRow: '4' }} />
          <QuoteCard t={gyanendra} style={{ gridColumn: '4', gridRow: '4' }} />
        </div>

        <style>{`
          .t-grid { grid-template-columns: repeat(4, 1fr); }
          @media (max-width: 900px) {
            .t-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .t-grid > * { grid-column: span 1 !important; grid-row: auto !important; }
          }
          @media (max-width: 540px) {
            .t-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
