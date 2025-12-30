import { Metadata } from 'next'

const LOGO_URL = 'https://asija-three.vercel.app/logo.png'

export function generateSEO({
  title,
  description,
  keywords = [],
  url,
  image,
  type = 'website'
}: {
  title: string
  description: string
  keywords?: string[]
  url?: string
  image?: string
  type?: 'website' | 'article'
}): Metadata {
  const baseUrl = 'https://asija-three.vercel.app'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const imageUrl = image || LOGO_URL

  return {
    title,
    description,
    keywords: [
      'business consulting',
      'professional services',
      'corporate advisory',
      'international business',
      'global consulting',
      ...keywords
    ],
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: 'Asija - Global Business Solutions',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
    },
  }
}

export function generateServiceStructuredData(service: {
  name: string
  description: string
  url: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "url": `https://asija-three.vercel.app${service.url}`,
    "provider": {
      "@type": "Organization",
      "name": "Asija",
      "url": "https://asija-three.vercel.app"
    },
    ...(service.image && {
      "image": service.image
    })
  }
}

export function generateArticleStructuredData(article: {
  title: string
  description: string
  url: string
  image?: string
  author: string
  publishedTime: string
  modifiedTime?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image || LOGO_URL,
    "url": `https://asija-three.vercel.app${article.url}`,
    "datePublished": article.publishedTime,
    "dateModified": article.modifiedTime || article.publishedTime,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Asija",
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_URL
      }
    }
  }
}