import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import CursorTrail from '@/components/sections/CursorTrail'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

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
  metadataBase: new URL('https://mohammad-touqeer-portfolio.vercel.app'),
  title: "Mohammad Tauqeer | Full-Stack & Agentic AI Developer",
  description: "Portfolio of Mohammad Tauqeer, a professional software engineer based in Karachi specializing in Agentic AI, multi-agent frameworks, Next.js, and FastAPI.",
  openGraph: {
    title: "Mohammad Tauqeer | Full-Stack & Agentic AI Developer",
    description: "Explore my work in Agentic AI, Next.js, and Full-Stack Development.",
    url: "https://mohammad-touqeer-portfolio.vercel.app/",
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
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('portfolio-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored === 'dark' || (!stored && true) || (stored === 'system' && prefersDark);
                  if (stored === 'light' || (stored === 'system' && !prefersDark)) {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                    document.documentElement.style.colorScheme = 'light';
                  } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider>
          <CursorTrail />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
