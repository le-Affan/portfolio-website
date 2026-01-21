import React from "react"
import type { Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Courier_Prime } from 'next/font/google'

const _pressStart2P = Press_Start_2P({ weight: '400', subsets: ["latin"] });
const _courierPrime = Courier_Prime({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Developer Portfolio | Retro Game Console',
  description: 'Interactive retro game console style portfolio website',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${_pressStart2P.className} antialiased bg-monitor text-monitor-text min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
