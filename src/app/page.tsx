'use client'

import { useState, useCallback, useEffect } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import HeroSection from '@/components/HeroSection'
import VideoSection from '@/components/VideoSection'
import DashboardSection from '@/components/DashboardSection'
import ProductSection from '@/components/ProductSection'
import PhasesSection from '@/components/PhasesSection'
import StepsSection from '@/components/StepsSection'
import SystemFlowSection from '@/components/SystemFlowSection'
import AboutSection from '@/components/AboutSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Home() {
  const [removeLoader, setRemoveLoader] = useState(false)
  const [heroRevealed, setHeroRevealed] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  const handleLoadingComplete = useCallback(() => {
    setRemoveLoader(true)
    setTimeout(() => setHeroRevealed(true), 150)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setContentReady(true), 10)
    return () => clearTimeout(t)
  }, [])

  // Handle hash navigation from other pages
  useEffect(() => {
    if (!removeLoader) return
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    // Small delay for sections to be in DOM
    const t = setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) {
        const lenis = (window as any).__lenis
        if (lenis) lenis.scrollTo(el)
        else el.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
    return () => clearTimeout(t)
  }, [removeLoader])

  return (
    <>
      <div style={{ opacity: contentReady ? 1 : 0, transition: 'opacity 0.01s' }}>
        <Navigation />
        <main>
          <HeroSection revealed={heroRevealed} />
          <VideoSection />
          <DashboardSection />
          <ProductSection />
          <PhasesSection />
          <StepsSection />
          <SystemFlowSection />
          <AboutSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>

      {!removeLoader && <LoadingScreen onComplete={handleLoadingComplete} />}
    </>
  )
}
