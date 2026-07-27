import type { Metadata, Viewport } from 'next'
import { Syne, Archivo, JetBrains_Mono } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
import TransitionLayout from '@/components/TransitionLayout'
import MicroInteractions from '@/components/MicroInteractions'
import '@/styles/globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Meera — AI Chief of Staff | Hypotenuse Analytics',
    template: '%s — Meera AI',
  },
  description: 'Meera is the AI Chief of Staff that joins your meetings, transcribes conversations, extracts action items, and surfaces insights automatically.',
  keywords: ['AI Chief of Staff', 'meeting intelligence', 'meeting transcription', 'AI assistant', 'Hypotenuse Analytics', 'meeting bot', 'meeting notes AI', 'AI SDR', 'recruitment automation'],
  metadataBase: new URL('https://meera.hyzen.tech'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Meera — AI Chief of Staff',
    description: 'Your AI Chief of Staff that joins every meeting, captures every decision, and never drops a thread.',
    url: 'https://meera.hyzen.tech',
    siteName: 'Meera',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meera — AI Chief of Staff',
    description: 'Your AI Chief of Staff that joins every meeting, captures every decision, and never drops a thread.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F1EEE4',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${archivo.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#F1EEE4" />
        <link rel="canonical" href="https://meera.hyzen.tech" />
        <link rel="manifest" href="/manifest.json" />
        {/* Hreflang */}
        <link rel="alternate" href="https://meera.hyzen.tech" hrefLang="en" />
        <link rel="alternate" href="https://meera.hyzen.tech" hrefLang="x-default" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Meera',
              url: 'https://meera.hyzen.tech',
              description: 'AI Chief of Staff for meeting intelligence and team memory.',
              publisher: {
                '@type': 'Organization',
                name: 'Hypotenuse Analytics',
                url: 'https://hypotenuse.in',
              },
            }),
          }}
        />
      </head>
      <body>
        <SmoothScroll><TransitionLayout><MicroInteractions>{children}</MicroInteractions></TransitionLayout></SmoothScroll>
      </body>
    </html>
  )
}
