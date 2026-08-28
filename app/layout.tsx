import type { Metadata } from 'next'
import { Poppins, Fahkwang } from 'next/font/google'
import './globals.css'

import Navbar from './components/Navbar'
import IntroScreen from './components/IntroScreen'
import CookieConsent from './components/CookieConsent'
import { Providers } from './provider'
import Footer from './components/Footer'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
})

const fahkwang = Fahkwang({
  variable: '--font-fahkwang',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
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
      className={`${poppins.variable} ${fahkwang.variable}`}
    >
      <body className="min-h-screen bg-[#F5F1E9] antialiased">
        <Providers>
          <IntroScreen />
          <Navbar />
          <main>{children}</main>
          <Footer/>
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}