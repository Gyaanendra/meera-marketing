'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const daysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate()
const firstDay = (m: number, y: number) => new Date(y, m, 1).getDay()

export default function ContactPage() {
  const containerRef = useScrollReveal()
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const prev = () => setMonth(m => m === 0 ? (setYear(y => y - 1), 11) : m - 1)
  const next = () => setMonth(m => m === 11 ? (setYear(y => y + 1), 0) : m + 1)

  const dim = daysInMonth(month, year)
  const start = firstDay(month, year)
  const days: (number | null)[] = Array(start).fill(null)
  for (let d = 1; d <= dim; d++) days.push(d)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check(); window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass = "w-full px-4 py-3 text-sm bg-[var(--color-ink-bg)] text-white border border-[rgba(241,238,228,0.15)] outline-none rounded-[6px] font-body placeholder:text-[rgba(241,238,228,0.35)] focus:border-[var(--color-red)] transition-colors duration-200"

  return (
    <main ref={containerRef} style={{ paddingTop: '6rem' }}>
      <Navigation />

      {/* ── Hero ── */}
      <section style={{ padding: 'var(--space-8) var(--space-5) var(--space-6)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <svg viewBox="0 0 140 140" style={{ position: 'absolute', top: '5%', right: '-10px', width: '100px', height: '100px', opacity: 0.05 }}>
            <VoiceArc cx={70} cy={70} r={60} stroke="#D6402C" width={2} startAngle={10} endAngle={170} />
            <SpeakerCircle cx={50} cy={50} r={15} color="#1F4EAD" />
          </svg>
          <svg viewBox="0 0 80 80" style={{ position: 'absolute', bottom: '10%', left: '2%', width: '55px', height: '55px', opacity: 0.06 }}>
            <OverlapZone cx={40} cy={40} r={35} color="#E8A93B" />
            <GridDots x={12} y={12} cols={3} rows={3} size={5} gap={5} color="#D6402C" />
          </svg>
        </div>

        <div className="content-grid" style={{ position: 'relative', textAlign: 'center' }}>
          <div className="eyebrow reveal" style={{ marginBottom: '0.75rem', color: 'var(--color-ink-soft)' }}>
            ✦ book a call
          </div>
          <h1 className="text-h2 reveal" style={{ marginBottom: '0.75rem', maxWidth: '14ch', margin: '0 auto 0.75rem' }}>
            Let&apos;s make your meetings <span className="text-red">actually useful.</span>
          </h1>
          <p className="reveal" style={{ fontSize: '1rem', color: 'var(--color-ink-soft)', maxWidth: '46ch', margin: '0 auto', lineHeight: 1.7 }}>
            No sales pitch, no fluff. Just a live walkthrough of Meera doing what she does best — 
            turning chaotic meetings into <strong style={{ color: 'var(--color-ink)' }}>structured gold</strong>. Pick a slot below.
          </p>

          {/* Quick stats / social proof */}
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[
              { val: '15h+', label: 'saved per week' },
              { val: '99%', label: 'accuracy rate' },
              { val: '2 min', label: 'to set up' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-red)', lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--color-ink-soft)', marginTop: '0.2rem', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
            {['harsh', 'gyanendra', 'rakshi'].map((name, i) => (
              <img key={name} src={`/images/team/${name}.avif`} alt={name} style={{
                width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover',
                border: '2px solid var(--color-bg)',
                marginLeft: i === 0 ? 0 : '-8px',
              }} />
            ))}
            <span style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', marginLeft: '0.25rem', alignSelf: 'center' }}>
              <strong style={{ color: 'var(--color-ink)' }}>7 people</strong> on the other side, waiting to help
            </span>
          </div>
        </div>
      </section>

      {/* ── Calendar + Form ── */}
      <section style={{ padding: '0 var(--space-5) var(--space-9)' }}>
        <div className="content-grid">
          <div className="reveal" style={{
            background: 'var(--color-bg-raised)',
            border: '1px solid var(--color-line)',
            borderRadius: 'var(--radius-ui)',
            padding: isMobile ? 'var(--space-5)' : 'var(--space-7)',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 'var(--space-5)' : 'var(--space-7)',
          }}>
            {/* Left: Calendar */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-ink-soft)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Pick a date ✦
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <button onClick={prev} style={{ background: 'none', border: '1px solid var(--color-line)', color: 'var(--color-ink-soft)', padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '1rem', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-ui)' }}>&larr;</button>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1.1rem', color: 'var(--color-ink)' }}>
                  {months[month]} {year}
                </span>
                <button onClick={next} style={{ background: 'none', border: '1px solid var(--color-line)', color: 'var(--color-ink-soft)', padding: '0.4rem 0.75rem', cursor: 'pointer', fontSize: '1rem', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-ui)' }}>&rarr;</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                  <div key={d} style={{ fontSize: '0.7rem', color: 'var(--color-ink-soft)', fontFamily: 'var(--font-mono)', padding: '0.4rem 0' }}>{d}</div>
                ))}
                {days.map((d, i) => (
                  <button
                    key={i}
                    disabled={d === null}
                    onClick={() => d && setSelected(d)}
                    style={{
                      border: 'none', padding: '0.5rem 0', cursor: d ? 'pointer' : 'default',
                      fontSize: '0.8rem', fontFamily: 'var(--font-mono)',
                      borderRadius: 'var(--radius-ui)',
                      background: selected === d ? 'var(--color-red)' : 'transparent',
                      color: selected === d ? '#fff' : d ? 'var(--color-ink)' : 'transparent',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => { if (d && selected !== d) e.currentTarget.style.background = 'rgba(214,64,44,0.12)' }}
                    onMouseLeave={e => { if (d && selected !== d) e.currentTarget.style.background = 'transparent' }}
                  >
                    {d}
                  </button>
                ))}
              </div>
              {selected && (
                <div style={{ marginTop: '1rem', padding: '0.6rem 0.8rem', background: 'rgba(214,64,44,0.06)', border: '1px solid rgba(214,64,44,0.15)', borderRadius: 'var(--radius-ui)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-red)' }}>
                  ✓ {months[month]} {selected}, {year} — we&apos;ll confirm via email
                </div>
              )}
            </div>

            {/* Right: Form */}
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-ink-soft)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Your details ✦
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                Tell us who you are and what you are trying to solve. We will come prepared.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <input required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
                <input required type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
                <input placeholder="Company name (optional)" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className={inputClass} />
                <textarea required placeholder="What is the one thing you wish your meetings had?" rows={3} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className={inputClass + ' resize-y'} />
                
                {submitted ? (
                  <div style={{ padding: '1rem', background: 'rgba(214,64,44,0.06)', border: '1px solid rgba(214,64,44,0.15)', borderRadius: 'var(--radius-ui)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>✓</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-ink)' }}>You are on the list.</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', marginTop: '0.2rem' }}>
                      We will ping you within 24 hours. No spam, just answers.
                    </div>
                  </div>
                ) : (
                  <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', fontSize: '0.85rem', padding: '0.75rem 1.5rem' }}>
                    Send &nbsp;→
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── What happens next ── */}
      <section style={{ padding: '0 var(--space-5) var(--space-9)' }}>
        <div className="content-grid">
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 'var(--space-4)' }}>
            {[
              { step: '01', title: 'We read your note', desc: 'No generic demo. We actually look at what you wrote so the call is worth your time.', icon: '👀' },
              { step: '02', title: 'Live walkthrough', desc: '15 minutes. We show you Meera inside a real meeting — join, transcribe, extract, done.', icon: '⚡' },
              { step: '03', title: 'You decide', desc: 'If it clicks, we set you up in 2 minutes. If not, you walk away — no hard feelings.', icon: '🤝' },
            ].map(s => (
              <div key={s.step} style={{
                padding: 'var(--space-5)',
                background: 'var(--color-bg-raised)',
                border: '1px solid var(--color-line)',
                borderRadius: 'var(--radius-ui)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--color-red)', display: 'block', marginBottom: '0.25rem' }}>{s.step}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{s.title}</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--color-ink-soft)', lineHeight: 1.5 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ-ish bottom ── */}
      <section style={{ padding: '0 var(--space-5) var(--space-9)' }}>
        <div className="content-grid" style={{ textAlign: 'center' }}>
          <div className="reveal" style={{
            padding: 'var(--space-6)',
            background: 'var(--color-bg-raised)',
            border: '1px solid var(--color-line)',
            borderRadius: 'var(--radius-ui)',
          }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-ink-soft)', marginBottom: '0.5rem' }}>Still on the fence?</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
              Fair. Here is the honest truth.
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-soft)', maxWidth: '50ch', margin: '0 auto', lineHeight: 1.6 }}>
              Meera saves our team <strong style={{ color: 'var(--color-ink)' }}>15+ hours a week</strong>. She never misses a meeting, 
              never forgets a follow-up, and never asks for a raise. If that sounds like something 
              your team needs, you know where to find us.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link href="/" className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.25rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
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