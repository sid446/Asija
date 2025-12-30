import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Asija - Global Business & Professional Services | International Consulting',
  description: 'Leading global business consulting firm providing comprehensive professional services, corporate advisory, and international business solutions. Trusted partner for multinational corporations across Asia and beyond.',
  keywords: [
    'business consulting',
    'professional services',
    'corporate advisory',
    'international business',
    'global consulting',
    'business solutions',
    'corporate services',
    'international consulting',
    'business advisory',
    'professional consulting'
  ],
  openGraph: {
    title: 'Asija - Global Business & Professional Services',
    description: 'Leading global business consulting firm providing comprehensive professional services, corporate advisory, and international business solutions.',
    url: 'https://asija-three.vercel.app',
    siteName: 'Asija',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Asija - Global Business Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asija - Global Business & Professional Services',
    description: 'Leading global business consulting firm providing comprehensive professional services, corporate advisory, and international business solutions.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://asija-three.vercel.app',
  },
}

export default function HomePage() {
  return null
}