'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { CalendarIcon } from '@animateicons/react/lucide'
import { RocketIcon } from '@animateicons/react/lucide'
import { MicIcon } from '@animateicons/react/lucide'
import { ChartBarIcon } from '@animateicons/react/lucide'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'

const steps = [
  { icon: <CalendarIcon size={28} color="#1F4EAD" />, title: 'Calendar event fires', desc: 'Google Calendar sends a webhook the moment a meeting is created.' },
  { icon: <RocketIcon size={28} color="#D6402C" />, title: 'Bot dispatched', desc: 'Meera deploys a recording bot into the Google Meet call.' },
  { icon: <MicIcon size={28} color="#E8A93B" />, title: 'Record & transcribe', desc: 'Audio and video captured, transcribed in real time by Deepgram.' },
  { icon: <ChartBarIcon size={28} color="#1F4EAD" />, title: 'Dashboard & Chat ready', desc: 'Transcripts indexed and ready for queries in the Meera workspace.' },
]

/* ─── Animated SVG art — GSAP loop ─── */
function AnimatedArt({ variant }: { variant: number }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = gsap.context(() => {
      const circles = el.querySelectorAll('.pulse-circle')
      const arcs = el.querySelectorAll('.sweep-arc')
      const dots = el.querySelectorAll('.drift-dot')
      const arms = el.querySelectorAll('.rotate-arm')

      circles.forEach((c) => {
        gsap.to(c, {
          scale: 1.25, opacity: 0.6, duration: 1.8, ease: 'sine.inOut',
          yoyo: true, repeat: -1,
          transformOrigin: 'center',
        })
      })

      arcs.forEach((a) => {
        gsap.fromTo(a,
          { strokeDashoffset: 180 },
          { strokeDashoffset: 0, duration: 3, ease: 'power2.inOut', repeat: -1, yoyo: true }
        )
      })

      dots.forEach((d, i) => {
        gsap.to(d, {
          y: '-=4', duration: 1.2 + i * 0.3, ease: 'sine.inOut',
          yoyo: true, repeat: -1,
        })
      })

      arms.forEach((a) => {
        gsap.to(a, { rotation: 25, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: 'center' })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <svg ref={svgRef} viewBox="0 0 100 100" width="70" height="70" fill="none" style={{ overflow: 'visible' }}>
      {variant === 0 && (
        <>
          <circle className="pulse-circle" cx={50} cy={50} r={36} fill="#D6402C" opacity={0.12} />
          <circle className="pulse-circle" cx={50} cy={50} r={24} fill="#D6402C" opacity={0.2} />
          <VoiceArc cx={50} cy={50} r={40} stroke="#D6402C" width={2} startAngle={10} endAngle={170} />
          <circle cx={50} cy={50} r={8} fill="#1F4EAD" />
          <SpeakerCircle cx={50} cy={50} r={42} color="#1F4EAD" />
        </>
      )}
      {variant === 1 && (
        <>
          <circle className="pulse-circle" cx={50} cy={50} r={32} fill="#1F4EAD" opacity={0.1} />
          <circle className="pulse-circle" cx={50} cy={50} r={18} fill="#E8A93B" opacity={0.15} />
          <GridDots x={18} y={22} cols={4} rows={4} size={4} gap={7} color="#1F4EAD" />
          <OverlapZone cx={50} cy={50} r={14} color="#D6402C" />
          <line x1={12} y1={85} x2={18} y2={75} stroke="#E8A93B" strokeWidth={2} strokeLinecap="round" className="rotate-arm" />
          <line x1={88} y1={85} x2={82} y2={75} stroke="#E8A93B" strokeWidth={2} strokeLinecap="round" className="rotate-arm" />
        </>
      )}
      {variant === 2 && (
        <>
          <circle className="pulse-circle" cx={50} cy={50} r={38} fill="#E8A93B" opacity={0.08} />
          <circle className="pulse-circle" cx={50} cy={50} r={22} fill="#D6402C" opacity={0.15} />
          <SpeakerCircle cx={28} cy={28} r={14} color="#1F4EAD" />
          <SpeakerCircle cx={72} cy={72} r={14} color="#D6402C" />
          <circle className="drift-dot" cx={50} cy={60} r={4} fill="#E8A93B" />
          <circle className="drift-dot" cx={40} cy={70} r={3} fill="#1F4EAD" />
          <circle className="drift-dot" cx={60} cy={70} r={3} fill="#D6402C" />
        </>
      )}
      {variant === 3 && (
        <>
          <circle className="pulse-circle" cx={50} cy={50} r={40} fill="#1F4EAD" opacity={0.08} />
          <circle className="pulse-circle" cx={50} cy={50} r={26} fill="#D6402C" opacity={0.1} />
          <VoiceArc cx={50} cy={50} r={36} stroke="#1F4EAD" width={2} startAngle={30} endAngle={330} />
          <GridDots x={30} y={40} cols={3} rows={2} size={4} gap={8} color="#D6402C" />
          <OverlapZone cx={50} cy={50} r={10} color="#E8A93B" />
          <circle className="drift-dot" cx={20} cy={30} r={3} fill="#E8A93B" />
          <circle className="drift-dot" cx={80} cy={70} r={3} fill="#D6402C" />
        </>
      )}
    </svg>
  )
}

/* ─── Art filler card ─── */
function ArtFill({ variant, style }: { variant: number; style?: React.CSSProperties }) {
  return (
    <div className="reveal" style={{
      background: 'var(--color-bg-raised)',
      border: '1px solid var(--color-line)',
      borderRadius: 'var(--radius-ui)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'var(--space-3)',
      minHeight: '60px',
      ...style,
    }}>
      <AnimatedArt variant={variant} />
    </div>
  )
}

/* ─── Content card ─── */
function StepCard({ step, index, style }: { step: typeof steps[number]; index: number; style?: React.CSSProperties }) {
  return (
    <div className="reveal card-hover" style={{
      background: 'var(--color-bg-raised)',
      border: '1px solid var(--color-line)',
      borderRadius: 'var(--radius-ui)',
      padding: 'var(--space-5)',
      ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        color: 'var(--color-ink-soft)', display: 'block', marginBottom: '0.6rem',
      }}>
        Step 0{index + 1}
      </span>
      <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem', lineHeight: 1 }}>{step.icon}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>
        {step.title}
      </h3>
      <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
        {step.desc}
      </p>
    </div>
  )
}

export default function StepsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="steps" ref={containerRef} style={{ padding: 'var(--space-9) var(--space-5)', position: 'relative', overflow: 'hidden' }}>
      <div className="content-grid" style={{ position: 'relative' }}>
        <div className="eyebrow reveal" style={{ marginBottom: '0.5rem' }}>06 / how meera works</div>
        <h2 className="text-h2 reveal" style={{ marginBottom: '2.5rem' }}>
          Four steps. <span className="text-red">Zero effort.</span>
        </h2>

        {/* ── Bento: 4 cols, interleaved step + art ── */}
        <div className="steps-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-3)',
        }}>
          <StepCard step={steps[0]} index={0} />
          <ArtFill variant={0} />
          <StepCard step={steps[1]} index={1} />
          <ArtFill variant={1} />

          <ArtFill variant={2} />
          <StepCard step={steps[2]} index={2} />
          <ArtFill variant={3} />
          <StepCard step={steps[3]} index={3} />
        </div>

        <style>{`
          @media (max-width: 768px) {
            .steps-grid { grid-template-columns: 1fr !important; }
          }
          @media (min-width: 540px) and (max-width: 768px) {
            .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  )
}
