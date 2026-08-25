import type { Metadata } from 'next'
import { Geist, Geist_Mono, Bodoni_Moda } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import IntroScreen from './components/IntroScreen'
import CookieConsent from './components/CookieConsent'
import { Providers } from './provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const bodoni = Bodoni_Moda({
  variable: '--font-bodoni',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AM:PM – Skincare for Morning & Night',
  description:
    'Dermatologist-inspired, science-first skincare. Simple, honest products for AM and PM routines.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoni.variable}`}
    >
      <body className="min-h-screen bg-[#F5F1E9] antialiased">
        <Providers>
          <IntroScreen />
          <Navbar />
          <main>{children}</main>
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}