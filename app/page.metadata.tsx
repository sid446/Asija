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
    url: 'https://asija.org',
    siteName: 'Asija',
    images: [
      {
        url: 'https://res.cloudinary.com/db2qa9dzs/image/upload/v1767077176/Gemini_Generated_Image_qrix1rqrix1rqrix-removebg-preview_oqzzij.png',
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
    images: ['https://res.cloudinary.com/db2qa9dzs/image/upload/v1767077176/Gemini_Generated_Image_qrix1rqrix1rqrix-removebg-preview_oqzzij.png'],
  },
  alternates: {
    canonical: 'https://asija.org',
  },
}

export default function HomePage() {
  return null
}