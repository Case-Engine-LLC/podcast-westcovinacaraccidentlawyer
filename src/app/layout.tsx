import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { MarkerWidget } from '@/components/MarkerWidget'
import SchemaJsonLd from '@/components/SchemaJsonLd'
import { Analytics } from '@/components/Analytics'
import { about, attorney, authorProfiles, contact, siteConfig } from '@/data/siteData'
import './globals.css'
import '@/themes/v1/variables.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
})

const SITE_URL =
  siteConfig.podcastUrl?.replace(/\/$/, '') ||
  contact.website?.replace(/\/$/, '') ||
  'https://podcast-westcovinacaraccidentlawyer.vercel.app'
const TITLE = siteConfig.podcastName
const DESCRIPTION = about.description
const hostProfile = Object.values(authorProfiles)[0]
const HOST_NAME = hostProfile?.name || attorney.name
const FIRM_NAME = attorney.firm

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  applicationName: TITLE,
  authors: [{ name: HOST_NAME, url: contact.website || SITE_URL }],
  keywords: [
    TITLE,
    HOST_NAME,
    FIRM_NAME,
    'West Covina car accident lawyer',
    'West Covina personal injury attorney',
    'San Gabriel Valley car accident attorney',
    'California personal injury podcast',
    'Oceanside car accident lawyer',
    'North County San Diego personal injury lawyer',
    'truck accident lawyer West Covina',
    'motorcycle accident attorney San Gabriel Valley',
    'dog bite lawyer West Covina',
    'rideshare accident lawyer Pasadena',
    'wrongful death attorney California',
  ],
  category: 'Legal Podcast',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: `${TITLE} — hosted by ${HOST_NAME}, ${FIRM_NAME}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/opengraph-image'],
  },
  // Next's file-convention `app/icon.tsx` + `app/apple-icon.tsx` auto-wire
  // `<link rel="icon" href="/icon">` and `<link rel="apple-touch-icon" href="/apple-icon">`.
  // Don't add an explicit `icons` block here — it overrides the auto-detection
  // with paths that don't exist (e.g. /icon.svg).
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#161E4C' },
    { media: '(prefers-color-scheme: dark)', color: '#161E4C' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <SchemaJsonLd />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <MarkerWidget />
      </body>
    </html>
  )
}
