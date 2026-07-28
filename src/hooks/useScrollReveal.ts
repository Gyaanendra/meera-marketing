'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from '@/lib/gsap'

gsap.registerPlugin(useGSAP)

export interface ScrollRevealOptions {
  /** Distance to travel on the Y axis (px). 0 = no Y movement. */
  y?: number
  /** Distance on the X axis (px). Negative = left, positive = right. */
  x?: number
  /** Starting scale. 1 = no scale change. */
  scale?: number
  /** Duration in seconds. */
  duration?: number
  /** GSAP ease string. */
  ease?: string
  /** Stagger delay between multiple target elements (seconds). */
  stagger?: number
  /** ScrollTrigger start position. */
  start?: string
  /** Delay before animation starts (seconds). */
  delay?: number
  /** Selector for elements to reveal. Default '.reveal' */
  selector?: string
}

const DEFAULTS: ScrollRevealOptions = {
  y: 24,
  x: 0,
  scale: 1,
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0,
  start: 'top 85%',
  delay: 0,
  selector: '.reveal',
}

/**
 * Scroll-triggered reveal for elements matching `selector`.
 * Handles prefers-reduced-motion automatically (sets visible, no animation).
 * Cleans up on unmount.
 */
export function useScrollReveal(opts?: ScrollRevealOptions) {
  const ref = useRef<HTMLDivElement>(null)
  const options = { ...DEFAULTS, ...opts }

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = el.querySelectorAll<HTMLElement>(options.selector!)

    if (targets.length === 0) return

    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1 })
      return
    }

    targets.forEach((target) => {
      gsap.fromTo(target,
        { opacity: 0, y: options.y!, x: options.x!, scale: options.scale! },
        {
          opacity: 1, y: 0, x: 0, scale: 1,
          duration: options.duration,
          ease: options.ease,
          delay: options.delay,
          scrollTrigger: {
            trigger: target,
            start: options.start,
          },
        }
      )
    })
  }, { scope: ref, dependencies: [opts?.y, opts?.x, opts?.duration, opts?.start] })

  return ref
}