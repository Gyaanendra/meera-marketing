'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

export default function MicroInteractions({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const hoverCards = document.querySelectorAll('.card-hover')
    const hoverBtns = document.querySelectorAll('.btn-hover')

    hoverCards.forEach((card) => {
      const tl = gsap.to(card, {
        y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        duration: 0.3, ease: 'power2.out', paused: true, overwrite: 'auto',
      })
      card.addEventListener('mouseenter', () => tl.play())
      card.addEventListener('mouseleave', () => tl.reverse())
    })

    hoverBtns.forEach((btn) => {
      const tl = gsap.to(btn, {
        scale: 0.96, duration: 0.15, ease: 'power2.out', paused: true, overwrite: 'auto',
      })
      btn.addEventListener('mousedown', () => tl.play())
      btn.addEventListener('mouseup', () => tl.reverse())
      btn.addEventListener('mouseleave', () => tl.reverse())
    })

    return () => {
      hoverCards.forEach((card) => {
        card.removeEventListener('mouseenter', () => {})
        card.removeEventListener('mouseleave', () => {})
      })
      hoverBtns.forEach((btn) => {
        btn.removeEventListener('mousedown', () => {})
        btn.removeEventListener('mouseup', () => {})
        btn.removeEventListener('mouseleave', () => {})
      })
    }
  }, [])

  return <>{children}</>
}
