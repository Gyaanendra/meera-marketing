'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { SpeakerCircle, VoiceArc } from '@/components/shapes/primitives'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-bg)' }}>
      <Navigation />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
        {/* Decorative shapes */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <svg viewBox="0 0 120 120" style={{ position: 'absolute', top: '10%', right: '15%', width: '80px', height: '80px', opacity: 0.06 }}>
            <VoiceArc cx={60} cy={60} r={50} stroke="#D6402C" width={2} startAngle={10} endAngle={170} />
          </svg>
          <svg viewBox="0 0 80 80" style={{ position: 'absolute', bottom: '20%', left: '10%', width: '60px', height: '60px', opacity: 0.05 }}>
            <SpeakerCircle cx={40} cy={40} r={32} color="#1F4EAD" />
          </svg>
        </div>
        <div style={{ textAlign: 'center', position: 'relative', maxWidth: '420px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(5rem, 15vw, 8rem)', color: 'var(--color-ink)', lineHeight: 1, marginBottom: '0.5rem' }}>
            404
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: 1.6, marginBottom: '2rem' }}>
            That page doesn&apos;t exist. Maybe it was never invited to the meeting.
          </p>
          <Link
            href="/"
            className="btn-primary"
            style={{ fontSize: '0.85rem', padding: '0.7rem 1.75rem', textDecoration: 'none', display: 'inline-block' }}
          >
            Back to Meera
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
