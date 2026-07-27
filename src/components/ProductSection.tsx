'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'
import { CardIcon } from '@/components/shapes/VoicesComposition'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'
import AmbientShapes from '@/components/AmbientShapes'

const features = [
  {
    title: 'Live transcription',
    desc: 'Every word transcribed with speaker segmentation, in real time.',
  },
  {
    title: 'Action items',
    desc: 'Commitments, owners, and timelines extracted automatically.',
  },
  {
    title: 'Team memory',
    desc: 'Ask questions across every past meeting in seconds.',
  },
  {
    title: 'Follow-ups',
    desc: 'Tracks what was promised and alerts when deadlines approach.',
  },
  {
    title: 'Weekly digests',
    desc: 'A rolled-up summary of decisions and action items, every week.',
  },
  {
    title: 'Hybrid search',
    desc: 'Keyword, semantic vector, and graph queries across all transcripts.',
  },
]

export default function ProductSection() {
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
    <section id="product" ref={containerRef} style={{ padding: 'var(--space-9) var(--space-5)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <AmbientShapes density="low" />
        <svg viewBox="0 0 160 160" style={{ position: 'absolute', top: '5%', left: '-20px', width: '120px', height: '120px', opacity: 0.07 }}>
          <VoiceArc cx={80} cy={80} r={70} stroke="#1F4EAD" width={2} startAngle={0} endAngle={140} />
          <VoiceArc cx={80} cy={80} r={50} stroke="#D6402C" width={1.5} startAngle={20} endAngle={120} />
        </svg>
        <svg viewBox="0 0 60 60" style={{ position: 'absolute', top: '30%', right: '2%', width: '45px', height: '45px', opacity: 0.08 }}>
          <GridDots x={5} y={5} cols={4} rows={4} size={5} gap={5} color="#E8A93B" />
        </svg>
        <svg viewBox="0 0 80 80" style={{ position: 'absolute', bottom: '20%', right: '8%', width: '60px', height: '60px', opacity: 0.06 }}>
          <SpeakerCircle cx={40} cy={40} r={30} color="#D6402C" />
          <SpeakerCircle cx={28} cy={28} r={12} color="#1F4EAD" />
        </svg>
      </div>

      <div className="content-grid" style={{ position: 'relative' }}>
        <div className="eyebrow reveal" style={{ marginBottom: '0.5rem' }}>04 / what meera does</div>
        <h2 className="text-h2 reveal" style={{ marginBottom: '0.75rem' }}>
          Your AI chief <span className="text-red">of staff.</span>
        </h2>
        <p className="text-lead reveal" style={{ color: 'var(--color-ink-soft)', maxWidth: '50ch', marginBottom: '3rem' }}>
          Meera handles the full meeting lifecycle — from joining calls to delivering insights.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
          {features.map((f, i) => (
            <div key={i} className="reveal card-hover" style={{
              background: 'var(--color-bg-raised)',
              border: '1px solid var(--color-line)',
              padding: 'var(--space-5)',
            }}>
              <CardIcon size={40} variant={i} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.75rem', marginBottom: '0.25rem' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
