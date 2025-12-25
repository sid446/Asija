
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Scroll } from "lucide-react";
import ScrollProvider from "./providers/ScrollProvider";
import { TranslationProvider } from "@/components/TranslationProvider";
import ThemeProvider from '@/components/ThemeProvider';
import { AuthProvider } from "@/components/AuthProvider";
import DisclaimerModal from "@/components/DisclaimerModal";
import { ReduxProvider } from "@/components/ReduxProvider";
import { Analytics } from '@vercel/analytics/react';
import DataInitializer from "@/components/DataInitializer";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: "Asija - Global Business & Professional Services | International Consulting",
    template: "%s | Asija - Global Business Solutions"
  },
  description: "Leading global business consulting firm providing comprehensive professional services, corporate advisory, and international business solutions. Trusted partner for multinational corporations across Asia and beyond.",
  keywords: [
    "business consulting",
    "professional services",
    "corporate advisory",
    "international business",
    "global consulting",
    "business solutions",
    "corporate services",
    "international consulting",
    "business advisory",
    "professional consulting",
    "corporate consulting",
    "business development",
    "strategic consulting",
    "management consulting",
    "business transformation"
  ],
  authors: [{ name: "Asija & Associates LLP" }],
  creator: "Asija & Associates LLP",
  publisher: "Asija & Associates LLP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://asija-three.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://asija-three.vercel.app',
    title: 'Asija - Global Business & Professional Services | International Consulting',
    description: 'Leading global business consulting firm providing comprehensive professional services, corporate advisory, and international business solutions.',
    siteName: 'Asija - Global Business Solutions',
    images: [
      {
        url: 'https://asija-three.vercel.app/logo.png',
        width: 1200,
        height: 630,
        alt: 'Asija - Global Business & Professional Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asija - Global Business & Professional Services | International Consulting',
    description: 'Leading global business consulting firm providing comprehensive professional services, corporate advisory, and international business solutions.',
    images: ['https://asija-three.vercel.app/logo.png'],
    creator: '@asija_services',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Asija",
              "alternateName": "Asija & Associates LLP",
              "url": "https://asija-three.vercel.app",
              "logo": "https://asija-three.vercel.app/logo.png",
              "description": "Leading global business consulting firm providing comprehensive professional services, corporate advisory, and international business solutions.",
              "foundingDate": "2026",
              "industry": "Business Consulting",
              "serviceType": [
                "Business Consulting",
                "Professional Services",
                "Corporate Advisory",
                "International Business Solutions",
                "Management Consulting",
                "Strategic Consulting",
                "Financial Advisory",
                "Business Development",
                "Corporate Strategy",
                "Market Research"
              ],
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "India"
                },
                {
                  "@type": "Continent",
                  "name": "Asia"
                },
                {
                  "@type": "Place",
                  "name": "Global"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service",
                "availableLanguage": "English",
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              },
              "sameAs": [
                "https://www.linkedin.com/company/asija-services",
                "https://twitter.com/asija_services",
                "https://www.facebook.com/asija.services"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Business Consulting Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Business Consulting",
                      "description": "Comprehensive business consulting services for corporate clients"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Corporate Advisory",
                      "description": "Strategic corporate advisory and business development services"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "International Business Solutions",
                      "description": "Global business solutions and international market expansion services"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <ReduxProvider>
          <DataInitializer />
          <AuthProvider>
            <ThemeProvider>
              <TranslationProvider>
                <ScrollProvider>
                  <DisclaimerModal />
                  {children}
                  <Analytics />
                </ScrollProvider>
              </TranslationProvider>
            </ThemeProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}