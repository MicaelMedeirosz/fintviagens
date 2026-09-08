import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Fint Viagens | Passagens Parceladas para Residentes na Suíça',
  description: 'Viaje para qualquer destino pagando em até 12x. A melhor opção para residentes na Suíça voarem pelo mundo.',
  keywords: ['passagens aéreas', 'parcelado', 'Suíça', 'viagens', '12x ', 'internacional'],
  authors: [{ name: 'Fint Viagens' }],
  creator: 'Fint Viagens',
  publisher: 'Fint Viagens',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://fintviagens.ch',
    siteName: 'Fint Viagens',
    title: 'Fint Viagens | Passagens Parceladas para Residentes na Suíça',
    description: 'Viaje para qualquer destino pagando em até 12x.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Fint Viagens - Passagens Parceladas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fint Viagens | Passagens Parceladas',
    description: 'Viaje para qualquer destino pagando em até 12x.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A1628',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="bg-bg-dark text-white antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}