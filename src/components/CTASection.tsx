'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'
import AmbientShapes from '@/components/AmbientShapes'

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const daysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate()
const firstDay = (m: number, y: number) => new Date(y, m, 1).getDay()

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selected, setSelected] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [isMobile, setIsMobile] = useState(false)

  const prev = () => setMonth(m => m === 0 ? (setYear(y => y - 1), 11) : m - 1)
  const next = () => setMonth(m => m === 11 ? (setYear(y => y + 1), 0) : m + 1)

  const dim = daysInMonth(month, year)
  const start = firstDay(month, year)
  const days: (number | null)[] = Array(start).fill(null)
  for (let d = 1; d <= dim; d++) days.push(d)

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

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const inputStyle = {
    width: '100%', padding: '0.75rem', fontSize: '0.85rem',
    background: 'var(--color-ink-bg)', border: '1px solid rgba(241,238,228,0.15)',
    color: '#fff', outline: 'none', fontFamily: 'var(--font-body)',
    borderRadius: 'var(--radius-ui)',
  }

  return (
    <section id="contact" ref={containerRef} className="section-dark" style={{ padding: 'var(--space-9) var(--space-5)', position: 'relative', overflow: 'hidden' }}>
      <AmbientShapes dark density="medium" />
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr',
          gap: isMobile ? 'var(--space-6)' : 'var(--space-7)',
          alignItems: 'start',
        }}>
          {/* Left: Text + social proof */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '0.75rem', color: 'rgba(241,238,228,0.5)' }}>
              10 / book a call
            </div>
            <h2 className="text-h2" style={{ marginBottom: '1rem', maxWidth: '14ch' }}>
              Give your team a better way to capture <span className="text-red">meeting memory.</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(241,238,228,0.6)', lineHeight: 1.6, maxWidth: '42ch', marginBottom: 'var(--space-5)' }}>
              Pick a time that works for you and we&apos;ll show you what Meera can do.
              No commitment, no sales pitch — just a live walkthrough.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex' }}>
                {['harsh', 'gyanendra', 'rakshi'].map((name, i) => (
                  <img
                    key={name}
                    src={`/images/team/${name}.avif`}
                    alt={name}
                    style={{
                      width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover',
                      border: '2px solid var(--color-ink-bg)',
                      marginLeft: i === 0 ? 0 : '-8px',
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(241,238,228,0.5)' }}>
                <strong style={{ color: 'rgba(241,238,228,0.85)' }}>Used daily</strong> by the Hypotenuse team
              </span>
            </div>
          </div>

          {/* Right: Calendar + form side by side */}
          <div style={{
            background: 'var(--color-ink-bg-raised)',
            border: '1px solid rgba(241,238,228,0.1)',
            borderRadius: 'var(--radius-ui)',
            padding: isMobile ? 'var(--space-5)' : 'var(--space-7)',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? 'var(--space-4)' : 'var(--space-7)',
          }}>
            {/* Calendar */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: isMobile ? 'var(--space-3)' : 'var(--space-4)' }}>
                <button onClick={prev} style={{ background: 'none', border: '1px solid rgba(241,238,228,0.15)', color: 'rgba(241,238,228,0.6)', padding: isMobile ? '0.25rem 0.5rem' : '0.4rem 0.75rem', cursor: 'pointer', fontSize: isMobile ? '0.8rem' : '1rem', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-ui)' }}>&larr;</button>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: isMobile ? '0.9rem' : '1.1rem', color: '#fff' }}>
                  {months[month]} {year}
                </span>
                <button onClick={next} style={{ background: 'none', border: '1px solid rgba(241,238,228,0.15)', color: 'rgba(241,238,228,0.6)', padding: isMobile ? '0.25rem 0.5rem' : '0.4rem 0.75rem', cursor: 'pointer', fontSize: isMobile ? '0.8rem' : '1rem', fontFamily: 'var(--font-mono)', borderRadius: 'var(--radius-ui)' }}>&rarr;</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: isMobile ? '2px' : '4px', textAlign: 'center' }}>
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                  <div key={d} style={{ fontSize: isMobile ? '0.65rem' : '0.75rem', color: 'rgba(241,238,228,0.4)', fontFamily: 'var(--font-mono)', padding: isMobile ? '0.25rem 0' : '0.5rem 0' }}>{d}</div>
                ))}
                {days.map((d, i) => (
                  <button
                    key={i}
                    disabled={d === null}
                    onClick={() => d && setSelected(d)}
                    style={{
                      border: 'none', padding: isMobile ? '0.35rem 0' : '0.6rem 0', cursor: d ? 'pointer' : 'default',
                      fontSize: isMobile ? '0.75rem' : '0.85rem', fontFamily: 'var(--font-mono)',
                      borderRadius: 'var(--radius-ui)',
                      background: selected === d ? 'var(--color-red)' : 'transparent',
                      color: selected === d ? '#fff' : d ? 'rgba(241,238,228,0.75)' : 'transparent',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => { if (d && selected !== d) e.currentTarget.style.background = 'rgba(214,64,44,0.25)' }}
                    onMouseLeave={e => { if (d && selected !== d) e.currentTarget.style.background = 'transparent' }}
                  >
                    {d}
                  </button>
                ))}
              </div>

              {selected && (
                <div style={{ marginTop: 'var(--space-3)', fontSize: '0.7rem', color: 'rgba(241,238,228,0.5)', fontFamily: 'var(--font-mono)' }}>
                  {months[month]} {selected}, {year}
                </div>
              )}
            </div>

            {/* Contact form */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 'var(--space-3)' : 'var(--space-4)' }}>
              <input placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ ...inputStyle, padding: isMobile ? '0.75rem' : '1rem', fontSize: isMobile ? '0.85rem' : '0.95rem' }} />
              <input placeholder="Your email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={{ ...inputStyle, padding: isMobile ? '0.75rem' : '1rem', fontSize: isMobile ? '0.85rem' : '0.95rem' }} />
              <textarea placeholder="What would you like to discuss?" rows={isMobile ? 3 : 4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ ...inputStyle, padding: isMobile ? '0.75rem' : '1rem', fontSize: isMobile ? '0.85rem' : '0.95rem', resize: 'vertical' }} />
              <button className="btn-primary" style={{ fontSize: isMobile ? '0.85rem' : '0.95rem', padding: isMobile ? '0.75rem 1.5rem' : '0.85rem 2rem', alignSelf: 'flex-start' }}>
                Book a call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
