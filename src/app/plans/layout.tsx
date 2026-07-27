import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plans — Meera AI Chief of Staff',
  description: 'Simple, transparent plans for Meera AI. Start free at $0, upgrade to Growth at $29/mo, or go Enterprise. Unlimited meetings, transcription, search, and integrations.',
  keywords: ['Meera plans', 'Meera pricing', 'AI Chief of Staff pricing', 'meeting intelligence pricing', 'AI meeting assistant cost', 'Hypotenuse Analytics'],
  alternates: {
    canonical: 'https://meera.hyzen.tech/plans',
  },
  openGraph: {
    title: 'Plans — Meera AI Chief of Staff',
    description: 'Simple, transparent plans for Meera AI. Start free, upgrade when you need more.',
    url: 'https://meera.hyzen.tech/plans',
    siteName: 'Meera',
    locale: 'en_US',
    type: 'website',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
