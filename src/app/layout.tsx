import type { Metadata, Viewport } from 'next'
import { Syne, Archivo, JetBrains_Mono } from 'next/font/google'
import SmoothScroll from '@/components/SmoothScroll'
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
  title: 'Meera — AI Chief of Staff | Hypotenuse Analytics',
  description: 'Meera is the AI Chief of Staff that joins your meetings, transcribes conversations, and surfaces insights automatically.',
  keywords: ['AI Chief of Staff', 'meeting intelligence', 'meeting transcription', 'AI assistant', 'Hypotenuse Analytics'],
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
      </head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
