'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    period: 'free',
    desc: 'For individuals exploring what Meera can do.',
    features: ['5 meetings/month', 'Basic transcription & search', '1 user seat', '7-day history', 'Email support'],
    cta: 'Get started',
    red: false,
  },
  {
    name: 'Growth',
    price: '$29',
    period: '/month',
    desc: 'For small teams that need reliable meeting intelligence. Most popular.',
    features: ['Unlimited meetings', 'Full transcription + AI search', '5 user seats', '90-day history', 'Action item extraction', 'Slack integration', 'Follow-up tracking'],
    cta: 'Start free trial',
    red: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For organisations with advanced compliance, scale, and custom integration needs.',
    features: ['Unlimited everything', 'Unlimited user seats', 'Unlimited history', 'Custom integrations & SSO/SAML', 'Dedicated support manager', 'On-premise option', 'SLA guarantee'],
    cta: 'Contact sales',
    red: false,
  },
]

const planDetails = [
  {
    name: 'Starter',
    items: [
      { label: 'Meetings per month', value: 'Up to 5' },
      { label: 'Transcription', value: 'Basic (text only)' },
      { label: 'AI Search', value: '7-day index' },
      { label: 'Team seats', value: '1 user' },
      { label: 'Integrations', value: 'Google Calendar' },
      { label: 'Support', value: 'Email' },
    ],
  },
  {
    name: 'Growth',
    items: [
      { label: 'Meetings per month', value: 'Unlimited' },
      { label: 'Transcription', value: 'Full + speaker diarisation' },
      { label: 'AI Search', value: '90-day index' },
      { label: 'Team seats', value: 'Up to 5 users' },
      { label: 'Integrations', value: 'Calendar, Slack, Meet' },
      { label: 'Support', value: 'Priority email + chat' },
      { label: 'Action items', value: 'Auto-extracted' },
      { label: 'Follow-ups', value: 'Tracked & notified' },
    ],
  },
  {
    name: 'Enterprise',
    items: [
      { label: 'Meetings per month', value: 'Unlimited' },
      { label: 'Transcription', value: 'Full + custom vocab' },
      { label: 'AI Search', value: 'Unlimited history' },
      { label: 'Team seats', value: 'Unlimited' },
      { label: 'Integrations', value: 'Custom API, SSO/SAML' },
      { label: 'Support', value: 'Dedicated manager' },
      { label: 'Deployment', value: 'Cloud or on-premise' },
      { label: 'SLA', value: '99.9% uptime guarantee' },
    ],
  },
]

const faqs = [
  { q: 'How does Meera join my meetings?', a: 'Meera integrates with Google Calendar and joins any meeting you invite her to. She can also be added directly to a call via a link. No complex setup required.' },
  { q: 'What platforms does Meera work on?', a: 'Meera works with any platform that supports bot participants, and she can also process uploaded meeting recordings from Zoom, Teams, Meet, or any video platform.' },
  { q: 'Is my meeting data secure?', a: 'Yes. All data is encrypted at rest and in transit. Enterprise plans include SSO, access controls, and optional on-premise deployment for compliance-heavy organisations.' },
  { q: 'Can Meera replace my note-taker?', a: 'That is exactly what she is built for. She captures every word, extracts action items, and surfaces decisions — so your team can focus on the conversation, not the notes.' },
  { q: 'How long does setup take?', a: 'About 2 minutes. Connect your calendar, invite Meera to a meeting, and she starts working immediately. No training, no configuration, no onboarding calls.' },
]

export default function PlansPage() {
  const containerRef = useScrollReveal()
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  return (
    <main ref={containerRef} style={{ paddingTop: '6rem' }}>
      <Navigation />

      {/* ── Hero ── */}
      <section style={{ padding: 'var(--space-9) var(--space-5)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <svg viewBox="0 0 100 100" style={{ position: 'absolute', top: '10%', right: '8%', width: '70px', height: '70px', opacity: 0.06 }}>
            <VoiceArc cx={50} cy={50} r={44} stroke="#D6402C" width={2} startAngle={10} endAngle={170} />
          </svg>
          <svg viewBox="0 0 60 60" style={{ position: 'absolute', bottom: '15%', left: '5%', width: '50px', height: '50px', opacity: 0.05 }}>
            <GridDots x={8} y={8} cols={3} rows={3} size={5} gap={6} color="#1F4EAD" />
          </svg>
        </div>
        <div className="content-grid" style={{ position: 'relative' }}>
          {/* Back link */}
          <div className="reveal" style={{ marginBottom: '1.5rem' }}>
            <Link href="/" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-ink-soft)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Back to home
            </Link>
          </div>
          <div className="eyebrow reveal" style={{ marginBottom: '0.5rem' }}>plans</div>
          <h1 className="text-h2 reveal" style={{ marginBottom: '0.75rem' }}>
            Simple plans. <span className="text-red">No surprises.</span>
          </h1>
          <p className="reveal" style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', maxWidth: '48ch', margin: '0 auto', lineHeight: 1.6 }}>
            Start free, upgrade when you need more. Every plan includes core transcription and search.
          </p>

          {/* Disclaimer */}
          <div className="reveal" style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-ui)', background: 'rgba(232,169,59,0.06)', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-ink-soft)', margin: 0, lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--color-ink)' }}>Note:</strong> This site is under active development. Plan details, pricing, and features are subject to change. Reach out for the most current information.
            </p>
          </div>
        </div>
      </section>

      {/* ── Plan cards ── */}
      <section style={{ padding: '0 var(--space-5) var(--space-9)' }}>
        <div className="content-grid">
          <div className="plans-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-4)',
            alignItems: 'start',
          }}>
          <style>{`
            @media (max-width: 768px) { .plans-grid { grid-template-columns: 1fr !important; } }
            @media (min-width: 769px) and (max-width: 1023px) { .plans-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          `}</style>
            {tiers.map((tier, i) => (
              <div key={i} className="reveal card-hover" style={{
                background: tier.red ? 'var(--color-ink-bg)' : 'var(--color-bg-raised)',
                border: `1px solid ${tier.red ? 'var(--color-red)' : 'var(--color-line)'}`,
                borderRadius: 'var(--radius-ui)',
                padding: 'var(--space-6)',
                position: 'relative',
                display: 'flex', flexDirection: 'column',
              }}>
                {tier.badge && (
                  <div style={{
                    position: 'absolute', top: '-0.6rem', left: '50%', transform: 'translateX(-50%)',
                    background: 'var(--color-red)', color: '#fff',
                    fontFamily: 'var(--font-mono)', fontSize: '0.55rem', fontWeight: 500,
                    padding: '0.2rem 0.75rem', borderRadius: '10px',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {tier.badge}
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.15rem' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', color: tier.red ? '#fff' : 'var(--color-ink)' }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)' }}>{tier.period}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem', color: tier.red ? '#fff' : 'var(--color-ink)' }}>
                  {tier.name}
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-soft)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  {tier.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                  {tier.features.map((f, j) => (
                    <li key={j} style={{ fontSize: '0.78rem', color: tier.red ? 'rgba(241,238,228,0.7)' : 'var(--color-ink-soft)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke={tier.red ? '#D6402C' : 'var(--color-red)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={tier.red ? 'btn-primary' : 'btn-secondary'} style={{ fontSize: '0.8rem', padding: '0.6rem 1.25rem', width: '100%' }}>
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Detailed comparison table ── */}
      <section style={{ padding: '0 var(--space-5) var(--space-9)' }}>
        <div className="content-grid">
          <div className="eyebrow reveal" style={{ marginBottom: '1rem', textAlign: 'center' }}>compare plans</div>
          <div className="reveal" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-line)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>Feature</th>
                  {planDetails.map(p => (
                    <th key={p.name} style={{ textAlign: 'center', padding: '0.75rem 1rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: p.name === 'Growth' ? 'var(--color-red)' : undefined }}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planDetails[0].items.map((_, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--color-line)' }}>
                    <td style={{ padding: '0.6rem 1rem', color: 'var(--color-ink)', fontWeight: 500 }}>{planDetails[0].items[i]?.label || planDetails[1].items[i]?.label || planDetails[2].items[i]?.label}</td>
                    {planDetails.map((p, j) => (
                      <td key={j} style={{ textAlign: 'center', padding: '0.6rem 1rem', color: 'var(--color-ink-soft)' }}>
                        {p.items[i]?.value || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '0 var(--space-5) var(--space-9)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <svg viewBox="0 0 80 80" style={{ position: 'absolute', top: '10%', right: '2%', width: '60px', height: '60px', opacity: 0.05 }}>
            <SpeakerCircle cx={40} cy={40} r={32} color="#D6402C" />
          </svg>
        </div>
        <div className="content-grid" style={{ position: 'relative' }}>
          <div className="eyebrow reveal" style={{ marginBottom: '0.5rem', textAlign: 'center' }}>faq</div>
          <h2 className="text-h2 reveal" style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            Questions? <span className="text-red">Answers.</span>
          </h2>

          <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {faqs.map((faq, i) => (
              <div key={i} className="reveal" style={{
                border: '1px solid var(--color-line)',
                borderRadius: 'var(--radius-ui)',
                overflow: 'hidden',
                background: 'var(--color-bg-raised)',
              }}>
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{
                    width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1rem 1.25rem',
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.85rem',
                    color: 'var(--color-ink)', textAlign: 'left',
                  }}
                >
                  {faq.q}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, transition: 'transform 0.25s ease', transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                    <line x1="8" y1="3" x2="8" y2="13" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="3" y1="8" x2="13" y2="8" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div style={{
                  overflow: 'hidden',
                  maxHeight: activeFaq === i ? '300px' : '0px',
                  transition: 'max-height 0.35s ease, padding 0.35s ease',
                  padding: activeFaq === i ? '0 1.25rem 1rem' : '0 1.25rem',
                }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)', lineHeight: 1.6, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '0 var(--space-5) var(--space-9)' }}>
        <div className="content-grid">
          <div className="reveal" style={{ textAlign: 'center', padding: 'var(--space-7)', background: 'var(--color-bg-raised)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-ui)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Not sure which plan fits?
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)', lineHeight: 1.5, marginBottom: '1.25rem', maxWidth: '40ch', marginLeft: 'auto', marginRight: 'auto' }}>
              Book a quick call and we will walk you through what works best for your team. No commitment, no pressure.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/#contact" className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.25rem', textDecoration: 'none' }}>Book a call</Link>
              <Link href="/" style={{ fontSize: '0.8rem', padding: '0.6rem 1.25rem', textDecoration: 'none', color: 'var(--color-ink)', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-ui)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
