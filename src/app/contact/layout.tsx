import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Meera AI Chief of Staff',
  description: 'Book a call with the Meera team. Pick a time, tell us what you need, and we will show you how Meera can save your team 15+ hours a week.',
  keywords: ['contact Meera', 'book a call', 'AI meeting demo', 'meeting intelligence demo', 'Hypotenuse Analytics'],
  openGraph: {
    title: 'Contact — Meera AI Chief of Staff',
    description: 'Book a call. Pick a time, tell us what you need.',
    url: 'https://meera.hyzen.tech/contact',
    siteName: 'Meera',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}