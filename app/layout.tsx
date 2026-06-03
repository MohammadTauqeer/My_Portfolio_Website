import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import CursorTrail from '@/components/sections/CursorTrail'

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
  title: "Mohammad Tauqeer | Full-Stack & Agentic AI Developer",
  description: "Portfolio of Mohammad Tauqeer, a professional software engineer based in Karachi specializing in Agentic AI, multi-agent frameworks, Next.js, and FastAPI.",
  openGraph: {
    title: "Mohammad Tauqeer | Full-Stack & Agentic AI Developer",
    description: "Explore my work in Agentic AI, Next.js, and Full-Stack Development.",
    url: "https://mohammad-touqeer-portfolio.vercel.app/", // Current live URL
    siteName: "Mohammad Tauqeer Portfolio",
    images: [
      {
        url: "/portfolio-preview.png",
        width: 1200,
        height: 630,
        alt: "Mohammad Tauqeer Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Tauqeer | Full-Stack & Agentic AI Developer",
    description: "Explore my work in Agentic AI and Full-Stack Development.",
    images: ["/portfolio-preview.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <CursorTrail />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
