import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { AppProvider } from '@/lib/context'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'ShopHub',
  description: 'Discover amazing products across electronics, fashion, home, sports, books, and beauty. Shop with confidence at ShopHub.',
  generator: 'v0.app',
  icons: {
    icon: '/ShopHub2.png',
    apple: '/ShopHub2.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <AppProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  )
}
