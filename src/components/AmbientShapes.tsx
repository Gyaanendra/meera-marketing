'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { SpeakerCircle, VoiceArc, GridDots, OverlapZone } from '@/components/shapes/primitives'

type Density = 'low' | 'medium' | 'high'

interface AmbientShapesProps {
  dark?: boolean
  density?: Density
  className?: string
}

/* Each "cluster" is a positioned SVG group with GSAP loop animation */
const clusters: {
  size: number
  top?: string
  bottom?: string
  left?: string
  right?: string
  anim: 'drift' | 'pulse' | 'rotate' | 'dance'
  dur: number
  shapes: (dark: boolean) => React.ReactNode
}[] = [
  {
    size: 80, top: '6%', right: '12%',
    anim: 'drift', dur: 18,
    shapes: (dark) => (
      <>
        <VoiceArc cx={40} cy={40} r={34} stroke={dark ? 'rgba(241,238,228,0.25)' : '#D6402C'} width={2} startAngle={10} endAngle={170} />
        <SpeakerCircle cx={60} cy={20} r={8} color={dark ? 'rgba(241,238,228,0.15)' : '#1F4EAD'} />
      </>
    ),
  },
  {
    size: 60, bottom: '12%', left: '5%',
    anim: 'pulse', dur: 14,
    shapes: (dark) => (
      <>
        <OverlapZone cx={30} cy={30} r={22} color={dark ? 'rgba(241,238,228,0.12)' : '#D6402C'} />
        <GridDots x={12} y={16} cols={3} rows={2} size={4} gap={6} color={dark ? 'rgba(241,238,228,0.2)' : '#1F4EAD'} />
      </>
    ),
  },
  {
    size: 70, top: '45%', right: '3%',
    anim: 'dance', dur: 20,
    shapes: (dark) => (
      <>
        <SpeakerCircle cx={35} cy={35} r={28} color={dark ? 'rgba(241,238,228,0.06)' : '#E8A93B'} />
        <VoiceArc cx={35} cy={35} r={22} stroke={dark ? 'rgba(241,238,228,0.15)' : '#D6402C'} width={1.5} startAngle={40} endAngle={320} />
      </>
    ),
  },
  {
    size: 50, bottom: '30%', right: '20%',
    anim: 'rotate', dur: 16,
    shapes: (dark) => (
      <>
        <GridDots x={8} y={10} cols={3} rows={3} size={4} gap={5} color={dark ? 'rgba(241,238,228,0.18)' : '#E8A93B'} />
        <circle cx={25} cy={25} r={3} fill={dark ? 'rgba(241,238,228,0.3)' : '#D6402C'} />
      </>
    ),
  },
  {
    size: 40, top: '25%', left: '2%',
    anim: 'drift', dur: 22,
    shapes: (dark) => (
      <>
        <VoiceArc cx={20} cy={20} r={16} stroke={dark ? 'rgba(241,238,228,0.2)' : '#1F4EAD'} width={1.5} startAngle={30} endAngle={150} />
        <SpeakerCircle cx={12} cy={12} r={5} color={dark ? 'rgba(241,238,228,0.1)' : '#D6402C'} />
      </>
    ),
  },
  {
    size: 90, bottom: '5%', left: '60%',
    anim: 'pulse', dur: 24,
    shapes: (dark) => (
      <>
        <OverlapZone cx={45} cy={45} r={30} color={dark ? 'rgba(241,238,228,0.05)' : '#1F4EAD'} />
        <GridDots x={20} y={26} cols={4} rows={2} size={3} gap={7} color={dark ? 'rgba(241,238,228,0.12)' : '#D6402C'} />
      </>
    ),
  },
]

function AnimatedCluster({ cluster, dark, index }: { cluster: typeof clusters[number]; dark: boolean; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      const dur = cluster.dur + index * 2
      switch (cluster.anim) {
        case 'drift':
          gsap.to(el, { y: 12, x: index % 2 === 0 ? 8 : -8, duration: dur, ease: 'sine.inOut', yoyo: true, repeat: -1 })
          break
        case 'pulse':
          gsap.to(el, { scale: 1.12, opacity: 0.7, duration: dur, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: 'center center' })
          break
        case 'rotate':
          gsap.to(el, { rotation: 20, duration: dur, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: 'center center' })
          break
        case 'dance':
          gsap.to(el, { x: 6, y: -6, duration: dur, ease: 'sine.inOut', yoyo: true, repeat: -1 })
          gsap.to(el.querySelector('svg')!, { rotation: 10, duration: dur * 0.6, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: 'center center' })
          break
      }
    }, el)
    return () => ctx.revert()
  }, [cluster, index])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        width: `${cluster.size}px`,
        height: `${cluster.size}px`,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      className={`ambient-cluster acluster-${index}`}
    >
      <svg viewBox={`0 0 ${cluster.size} ${cluster.size}`} width={cluster.size} height={cluster.size} style={{ overflow: 'visible' }}>
        {cluster.shapes(dark)}
      </svg>
    </div>
  )
}

export default function AmbientShapes({ dark = false, density = 'medium', className = '' }: AmbientShapesProps) {
  const count = density === 'low' ? 3 : density === 'high' ? clusters.length : Math.min(clusters.length, 4)

  return (
    <div className={`ambient-shapes ${className}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }} aria-hidden>
      {clusters.slice(0, count).map((c, i) => (
        <AnimatedCluster key={i} cluster={c} dark={dark} index={i} />
      ))}
      <style>{`
        .ambient-shapes { opacity: 1; }
        @media (max-width: 640px) {
          .ambient-shapes { opacity: 0.3; }
          .ambient-cluster { display: none; }
          .ambient-cluster:nth-child(-n+2) { display: block; }
        }
      `}</style>
    </div>
  )
}
