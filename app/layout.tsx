import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

// Body text - clean and readable
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Headings - modern, tech-oriented with coding vibe
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Premium Portfolio - Full Stack Developer',
  description: 'A premium portfolio showcasing world-class web development projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-slate-950 text-slate-100`}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
