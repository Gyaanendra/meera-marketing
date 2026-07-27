'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'

const ease = [0.76, 0, 0.24, 1] as const

export default function TransitionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<'idle' | 'drop' | 'lift'>('idle')
  const prevPath = useRef(pathname)

  useEffect(() => {
    if (prevPath.current === pathname) return

    // Route changed — start curtain drop
    setPhase('drop')

    const t1 = setTimeout(() => {
      // Content swap happens behind the curtain
      prevPath.current = pathname
      setPhase('lift')
    }, 500)

    const t2 = setTimeout(() => {
      setPhase('idle')
    }, 1000)

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [pathname])

  return (
    <>
      {/* Page content — dims when curtain is active */}
      <div style={{ opacity: phase === 'idle' ? 1 : 0.25, transition: 'opacity 0.2s ease' }}>
        {children}
      </div>

      {/* Curtain overlay — slides down then up */}
      <AnimatePresence>
        {phase !== 'idle' && (
          <motion.div
            key="curtain"
            initial={{ y: '-100%' }}
            animate={{ y: phase === 'drop' ? '0%' : '-100%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease }}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
              background: 'var(--color-ink-bg)', zIndex: 9999,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
