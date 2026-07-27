'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { CardIcon } from '@/components/shapes/VoicesComposition'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'

const items = [
  { title: 'Meetings', desc: 'Joins, records, and transcribes every team call automatically.' },
  { title: 'Action items', desc: 'Extracts commitments, action owners, and timelines dynamically.' },
  { title: 'Follow-ups', desc: 'Tracks what was promised and alerts when deadlines approach.' },
  { title: 'Team memory', desc: 'Answers historical questions about decisions and standups.' },
  { title: 'Resume automation', desc: 'Matches applicant resumes to roles and drafts offer letter PDFs.' },
  { title: 'Weekly digests', desc: 'Summarizes standalone syncs into an executive progress report.' },
]

/* ─── Filler card — SVG art, fully visible ─── */
function ShapeFiller({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="reveal" style={{
      background: 'rgba(241,238,228,0.03)',
      border: '1px solid rgba(241,238,228,0.08)',
      borderRadius: 'var(--radius-ui)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 'var(--space-2)',
      minHeight: wide ? '80px' : undefined,
      aspectRatio: wide ? undefined : 'auto',
    }}>
      {children}
    </div>
  )
}

export default function PhasesSection() {
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
    <section id="phases" ref={containerRef} className="section-dark" style={{ padding: 'var(--space-9) var(--space-5)', position: 'relative', overflow: 'hidden' }}>
      <div className="content-grid" style={{ position: 'relative' }}>
        <div className="eyebrow reveal" style={{ color: 'rgba(241,238,228,0.5)', marginBottom: '0.5rem' }}>
          05 / organizational memory
        </div>
        <h2 className="text-h2 reveal" style={{ marginBottom: '2.5rem' }}>
          What Meera <span className="text-red">manages.</span>
        </h2>

        {/* ── Asymmetric bento: 3 cols ── */}
        <div className="phases-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-3)',
        }}>
          {/* Row 1-2: Meetings (tall left) + vertical art filler */}
          <CardBlock item={items[0]} tall style={{ gridColumn: '1', gridRow: '1 / 3' }} />
          <CardBlock item={items[1]} style={{ gridColumn: '2', gridRow: '1' }} />
          <ShapeFiller>
            <svg viewBox="0 0 100 90" width="64" height="58" fill="none">
              <VoiceArc cx={50} cy={60} r={40} stroke="#D6402C" width={2.5} startAngle={10} endAngle={170} />
              <OverlapZone cx={30} cy={35} r={18} color="#1F4EAD" />
              <SpeakerCircle cx={72} cy={28} r={16} color="#E8A93B" />
            </svg>
          </ShapeFiller>

          {/* Row 2 cont: action items + follow-ups */}
          <CardBlock item={items[2]} style={{ gridColumn: '2', gridRow: '2' }} />
          <CardBlock item={items[3]} style={{ gridColumn: '3', gridRow: '1' }} />

          {/* Row 3: wide art filler (col 1-3) */}
          <ShapeFiller wide>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', width: '100%', padding: '0.25rem 0' }}>
              <svg viewBox="0 0 60 60" width="42" height="42" fill="none">
                <SpeakerCircle cx={30} cy={30} r={24} color="#D6402C" />
                <SpeakerCircle cx={22} cy={22} r={10} color="#F1EEE4" />
                <circle cx={22} cy={22} r={10} fill="none" stroke="#F1EEE4" strokeWidth={4} opacity={0.3} />
              </svg>
              <svg viewBox="0 0 80 40" width="56" height="28" fill="none">
                <GridDots x={8} y={8} cols={5} rows={3} size={5} gap={8} color="#1F4EAD" />
              </svg>
              <svg viewBox="0 0 60 60" width="42" height="42" fill="none">
                <OverlapZone cx={30} cy={30} r={16} color="#E8A93B" />
                <VoiceArc cx={30} cy={38} r={24} stroke="#D6402C" width={2} startAngle={30} endAngle={150} />
              </svg>
            </div>
          </ShapeFiller>

          {/* Row 4: resume + weekly (wide) */}
          <CardBlock item={items[4]} style={{ gridColumn: '1', gridRow: '4' }} />
          <CardBlock item={items[5]} wide style={{ gridColumn: '2 / 4', gridRow: '4' }} />
        </div>

        <style>{`
          @media (max-width: 768px) {
            .phases-grid { grid-template-columns: 1fr !important; }
            .phases-grid > * { grid-column: 1 !important; grid-row: auto !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

/* ─── Content card ─── */
function CardBlock({ item, tall, wide, style: extraStyle }: {
  item: typeof items[number]
  tall?: boolean
  wide?: boolean
  style?: React.CSSProperties
}) {
  return (
    <div className="reveal card-hover" style={{
      background: 'var(--color-ink-bg-raised)',
      border: '1px solid rgba(241,238,228,0.12)',
      borderRadius: 'var(--radius-ui)',
      padding: tall ? 'var(--space-6) var(--space-5)' : 'var(--space-4)',
      display: 'flex', flexDirection: 'column',
      justifyContent: tall ? 'center' : undefined,
      ...extraStyle,
    }}>
      <CardIcon size={tall ? 40 : 32} variant={['Meetings','Action items','Follow-ups','Team memory','Resume automation','Weekly digests'].indexOf(item.title) % 4} inverted />
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: tall ? '1rem' : '0.8rem', marginTop: '0.6rem', marginBottom: '0.2rem' }}>
        {item.title}
      </h3>
      <p style={{ fontSize: '0.72rem', color: 'rgba(241,238,228,0.6)', lineHeight: 1.45, maxWidth: tall ? '32ch' : undefined }}>
        {item.desc}
      </p>
    </div>
  )
}
