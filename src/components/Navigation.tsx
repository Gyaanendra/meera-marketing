'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from '@/lib/gsap'

export default function Navigation() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showOverlay || !overlayRef.current || !itemsRef.current) return
    const overlay = overlayRef.current
    const items = itemsRef.current.children

    gsap.set(overlay, { clipPath: 'circle(0% at top right)' })
    gsap.set(items, { opacity: 0, y: 16 })

    gsap.to(overlay, {
      clipPath: 'circle(150% at top right)',
      duration: 0.5,
      ease: 'cubic-bezier(0.22,1,0.36,1)',
    })
    gsap.to(items, {
      opacity: 1, y: 0,
      duration: 0.4,
      ease: 'cubic-bezier(0.22,1,0.36,1)',
      stagger: 0.07,
    })
  }, [showOverlay])

  useEffect(() => {
    if (open) {
      setShowOverlay(true)
    } else if (overlayRef.current) {
      const overlay = overlayRef.current
      const items = itemsRef.current?.children
      if (items) {
        gsap.to(items, {
          opacity: 0, y: 16,
          duration: 0.4,
          ease: 'cubic-bezier(0.22,1,0.36,1)',
          stagger: { each: 0.07, from: 'end' },
        })
      }
      gsap.to(overlay, {
        clipPath: 'circle(0% at top right)',
        duration: 0.5,
        ease: 'cubic-bezier(0.22,1,0.36,1)',
        onComplete: () => setShowOverlay(false),
      })
    }
  }, [open])

  const go = useCallback((href: string) => {
    setOpen(false)
    router.push(href)
  }, [router])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50,
        display: 'flex', justifyContent: 'center',
      }}>
        <div style={{
          width: '100%', maxWidth: '1100px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.85rem 1.5rem', marginTop: '0.75rem',
          background: 'rgba(241, 238, 228, 0.88)',
          borderRadius: '14px', border: '1px solid var(--color-line)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => go('/')}>
            <img src="/logo.png" alt="Meera" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem' }}>Meera</span>
          </div>

          <div className="hidden sm:flex" style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
            <button onClick={() => go('/')} className="nav-line"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-ink-soft)', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >Home</button>
            <button onClick={() => go('/plans')} className="nav-line"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-ink-soft)', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >Plans</button>
            <button onClick={() => go('/about')} className="nav-line"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-ink-soft)', padding: 0, fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >About</button>
          </div>

          <div className="hidden sm:block">
            <button onClick={() => go('/contact')} className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.45rem 1rem' }}>
              Contact / Book a call
            </button>
          </div>

          <button aria-label="Menu" onClick={() => setOpen(o => !o)} className="sm:!hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px', zIndex: 1000, position: 'relative' }}>
            <span style={{ display: 'block', width: '20px', height: '2px', background: open ? '#fff' : 'var(--color-ink)', borderRadius: '1px', transition: 'background 0.3s' }} />
            <span style={{ display: 'block', width: '20px', height: '2px', background: open ? '#fff' : 'var(--color-ink)', borderRadius: '1px', transition: 'background 0.3s' }} />
            <span style={{ display: 'block', width: '20px', height: '2px', background: open ? '#fff' : 'var(--color-ink)', borderRadius: '1px', transition: 'background 0.3s' }} />
          </button>
        </div>
      </nav>

      {showOverlay && (
        <div ref={overlayRef} className="sm:hidden" style={{
          position: 'fixed', inset: 0, zIndex: 998,
          background: 'var(--color-ink-bg)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          clipPath: 'circle(0% at top right)',
        }}>
          <div ref={itemsRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-5)' }}>
            <button onClick={() => go('/')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'rgba(241,238,228,0.8)', padding: 0 }}
            >Home</button>
            <button onClick={() => go('/plans')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'rgba(241,238,228,0.8)', padding: 0 }}
            >Plans</button>
            <button onClick={() => go('/about')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'rgba(241,238,228,0.8)', padding: 0 }}
            >About</button>
            <button onClick={() => go('/contact')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-red)', padding: 0 }}
            >Contact / Book a call</button>
          </div>
          {/* Close button — same spot as hamburger */}
          <button aria-label="Close" onClick={() => setOpen(false)}
            style={{ position: 'fixed', top: 'calc(0.75rem + 0.85rem + 4px)', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#fff', lineHeight: 1, zIndex: 999, padding: '4px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      <style>{`
        .nav-line { position: relative; }
        .nav-line::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 100%; height: 1.5px;
          background: var(--color-ink);
          transform: scaleX(0);
          transform-origin: right center;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-line:hover::after {
          transform: scaleX(1);
          transform-origin: left center;
        }
      `}</style>
    </>
  )
}
