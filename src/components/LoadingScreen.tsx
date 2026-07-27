'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'

const curtainEase = [0.76, 0, 0.24, 1] as const

const slideUp = {
  initial: { top: 0 },
  exit: {
    top: '-100vh',
    transition: { duration: 0.9, ease: curtainEase, delay: 0.1 },
  },
}

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [isExiting, setIsExiting] = useState(false)
  const doneRef = useRef(false)
  const ringRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const startTime = performance.now()
    const duration = 1800

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const val = Math.round(eased * 100)
      setCount(val)

      // Update ring dashoffset
      if (ringRef.current) {
        const circ = 2 * Math.PI * 60
        ringRef.current.style.strokeDashoffset = String(circ * (1 - eased))
      }

      if (progress < 1) {
        requestAnimationFrame(tick)
      } else if (!doneRef.current) {
        doneRef.current = true
        setIsExiting(true)
      }
    }

    requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    if (!isExiting) return
    const t = setTimeout(() => onComplete(), 1100)
    return () => clearTimeout(t)
  }, [isExiting, onComplete])

  const initialPath =
    `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`

  const targetPath =
    `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`

  const curve = {
    initial: { d: initialPath, transition: { duration: 0.6, ease: curtainEase } },
    exit: { d: targetPath, transition: { duration: 0.6, ease: curtainEase, delay: 0.1 } },
  }

  const isAnimating = !isExiting

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate={isExiting ? 'exit' : 'initial'}
      style={{
        position: 'fixed', left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, background: 'var(--color-ink-bg)',
        top: 0,
      }}
    >
      {dimension.width > 0 && (
        <>
          {/* Background decorative shapes */}
          <svg
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              pointerEvents: 'none', opacity: isAnimating ? 1 : 0,
              transition: 'opacity 0.3s ease-out',
            }}
            viewBox={`0 0 ${dimension.width} ${dimension.height}`}
            preserveAspectRatio="none"
          >
            {/* Top-right cluster */}
            <g transform={`translate(${dimension.width * 0.85}, ${dimension.height * 0.12}) scale(1.8)`}>
              <VoiceArc cx={30} cy={30} r={26} stroke="rgba(214,64,44,0.15)" width={2} startAngle={10} endAngle={170} />
              <SpeakerCircle cx={45} cy={15} r={6} color="rgba(31,78,173,0.12)" />
            </g>
            {/* Bottom-left cluster */}
            <g transform={`translate(${dimension.width * 0.08}, ${dimension.height * 0.78}) scale(1.4)`}>
              <OverlapZone cx={30} cy={30} r={22} color="rgba(214,64,44,0.08)" />
              <GridDots x={12} y={16} cols={3} rows={2} size={4} gap={6} color="rgba(31,78,173,0.1)" />
            </g>
            {/* Top-left small */}
            <g transform={`translate(${dimension.width * 0.05}, ${dimension.height * 0.22}) scale(1)`}>
              <SpeakerCircle cx={20} cy={20} r={16} color="rgba(232,169,59,0.08)" />
            </g>
            {/* Bottom-right */}
            <g transform={`translate(${dimension.width * 0.78}, ${dimension.height * 0.82}) scale(1.2)`}>
              <GridDots x={8} y={10} cols={4} rows={3} size={3} gap={6} color="rgba(214,64,44,0.08)" />
              <circle cx={30} cy={30} r={4} fill="rgba(232,169,59,0.12)" />
            </g>
          </svg>

          {/* Curtain SVG — behind content */}
          <svg className="absolute top-0 w-full" style={{ height: 'calc(100% + 300px)', zIndex: 0 }}>
            <motion.path
              variants={curve}
              initial="initial"
              animate={isExiting ? 'exit' : 'initial'}
              fill="var(--color-ink-bg)"
            />
          </svg>

          {/* Center content */}
          <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
            {/* Progress ring */}
            <svg width={180} height={180} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <circle cx={90} cy={90} r={60} fill="none" stroke="rgba(241,238,228,0.06)" strokeWidth={2} />
              <circle
                ref={ringRef}
                cx={90} cy={90} r={60}
                fill="none"
                stroke="var(--color-red)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={2 * Math.PI * 60}
                transform="rotate(-90 90 90)"
                style={{ transition: 'stroke-dashoffset 0.05s linear' }}
              />
            </svg>

            {/* Counter */}
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(4.5rem, 12vw, 10rem)',
                color: 'var(--color-red)',
                lineHeight: 1,
                opacity: isAnimating ? 1 : 0,
                transition: 'opacity 0.2s ease-out',
                position: 'relative',
              }}
            >
              {count}
            </div>

            {/* Brand label with underline accent */}
            <div style={{ position: 'relative', marginTop: '0.5rem', opacity: isAnimating ? 1 : 0, transition: 'opacity 0.2s ease-out 0.05s' }}>
              <span className="eyebrow" style={{ fontSize: '0.75rem', color: 'rgba(241,238,228,0.4)', letterSpacing: '0.3em' }}>
                MEERA
              </span>
              <svg width="60" height="8" viewBox="0 0 60 8" style={{ margin: '0.25rem auto 0', display: 'block' }}>
                <path d="M 0 4 Q 15 0, 30 4 T 60 4" stroke="var(--color-red)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity={0.4} />
              </svg>
            </div>

            {/* Loading dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '1rem', opacity: isAnimating ? 1 : 0, transition: 'opacity 0.2s ease-out 0.1s' }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-red)' }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
