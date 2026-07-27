'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = (window as any).__lenis
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const inner = innerRef.current
    if (!inner) return

    // Set initial state (transparent overlay)
    gsap.set(inner, {
      width: '100%',
      maxWidth: '100%',
      borderRadius: 0,
      background: 'transparent',
      boxShadow: 'none',
      borderWidth: 0,
      marginTop: 0,
      padding: '1.25rem var(--space-5)',
    })

    const floating = {
      width: '100%',
      maxWidth: '1100px',
      borderRadius: '14px',
      background: 'rgba(241, 238, 228, 0.88)',
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      borderWidth: '1px',
      marginTop: '0.75rem',
      padding: '0.85rem 1.5rem',
    }

    const onScroll = () => {
      const y = window.scrollY
      const progress = Math.min(y / 120, 1)

      gsap.to(inner, {
        width: y > 10 ? floating.width : '100%',
        maxWidth: y > 10 ? floating.maxWidth : '100%',
        borderRadius: y > 10 ? floating.borderRadius : 0,
        background: y > 10 ? floating.background : 'transparent',
        boxShadow: y > 10 ? floating.boxShadow : 'none',
        borderWidth: y > 10 ? floating.borderWidth : 0,
        marginTop: y > 10 ? floating.marginTop : 0,
        padding: y > 10 ? floating.padding : '1.25rem var(--space-5)',
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={innerRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid transparent',
          borderColor: 'transparent',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          pointerEvents: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.png" alt="Meera" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem' }}>Meera</span>
        </div>
        <div className="hidden md:flex" style={{ gap: '2rem', fontSize: '0.8rem', color: 'var(--color-ink-soft)' }}>
          <button onClick={() => scrollTo('product')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-ink-soft)', transition: 'color 0.2s', padding: 0, fontFamily: 'inherit' }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-ink)'}
            onMouseLeave={e => (e.target as HTMLElement).style.color = ''}
          >Product</button>
          <button onClick={() => scrollTo('steps')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-ink-soft)', transition: 'color 0.2s', padding: 0, fontFamily: 'inherit' }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-ink)'}
            onMouseLeave={e => (e.target as HTMLElement).style.color = ''}
          >How it works</button>
          <button onClick={() => scrollTo('about')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--color-ink-soft)', transition: 'color 0.2s', padding: 0, fontFamily: 'inherit' }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-ink)'}
            onMouseLeave={e => (e.target as HTMLElement).style.color = ''}
          >About</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.45rem 1rem' }} onClick={() => scrollTo('contact')}>Book a call</button>
        </div>
      </div>
    </nav>
  )
}
