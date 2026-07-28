import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Meera AI Chief of Staff',
  description: 'Hypotenuse Analytics — an independent research and intelligence lab building Meera, our first product. 12M+ media files analyzed, 99.1% synthetic detection accuracy.',
  keywords: ['Hypotenuse Analytics', 'Meera AI', 'parent company', 'AI research lab', 'synthetic detection', 'media analysis', 'Zsure Reality Trust Center'],
  alternates: {
    canonical: 'https://meera.hyzen.tech/about',
  },
  openGraph: {
    title: 'About — Meera AI Chief of Staff',
    description: 'Hypotenuse Analytics — building autonomous agents and multi-modal inference systems for high-stakes environments.',
    url: 'https://meera.hyzen.tech/about',
    siteName: 'Meera',
    locale: 'en_US',
    type: 'website',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
