'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import SystemFlowDiagram from '@/components/SystemFlowDiagram'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'

export default function SystemFlowSection() {
  const containerRef = useScrollReveal()

  return (
    <section ref={containerRef} style={{ padding: 'var(--space-9) var(--space-5)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <svg viewBox="0 0 80 80" style={{ position: 'absolute', top: '15%', right: '4%', width: '55px', height: '55px', opacity: 0.07 }}>
          <VoiceArc cx={40} cy={40} r={35} stroke="#1F4EAD" width={2} startAngle={0} endAngle={130} />
          <GridDots x={10} y={10} cols={2} rows={2} size={6} gap={6} color="#D6402C" />
        </svg>
        <svg viewBox="0 0 60 60" style={{ position: 'absolute', bottom: '20%', left: '2%', width: '40px', height: '40px', opacity: 0.06 }}>
          <OverlapZone cx={30} cy={30} r={25} color="#E8A93B" />
          <SpeakerCircle cx={20} cy={20} r={7} color="#1F4EAD" />
        </svg>
      </div>

      <div className="content-grid" style={{ position: 'relative' }}>
        <div className="eyebrow reveal" style={{ marginBottom: '0.5rem' }}>07 / system flow</div>
        <h2 className="text-h2 reveal" style={{ marginBottom: '0.75rem' }}>
          How it <span className="text-red">flows.</span>
        </h2>
        <p className="reveal" style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', maxWidth: '42ch', marginBottom: 'var(--space-6)' }}>
          You talk to Meera. Meera powers everything else.
        </p>

        <div className="reveal" style={{
          background: 'var(--color-bg-raised)',
          border: '1px solid var(--color-line)',
          padding: 'var(--space-6)',
          borderRadius: '6px',
        }}>
          <SystemFlowDiagram />
        </div>
      </div>
    </section>
  )
}
