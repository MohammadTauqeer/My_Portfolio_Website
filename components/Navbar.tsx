'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'FEATURE', href: '#projects' },
    { name: 'SKILLS & EXPERTISE', href: '#skills' },
    { name: 'PROJECT DISCOVERY', href: '#discovery' },
    { name: 'RESUME', href: '#resume' },
    { name: 'CERTIFICATIONS', href: '#certifications' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/85 dark:bg-black/80 backdrop-blur-md border-purple-200/70 dark:border-purple-500/20 shadow-lg shadow-purple-500/5 dark:shadow-purple-950/30'
          : 'bg-white/60 dark:bg-black/50 backdrop-blur-sm border-purple-200/40 dark:border-purple-500/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold font-mono tracking-tight group">
            <span className="text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors">
              &lt;
            </span>
            <span className="text-slate-900 dark:text-white transition-colors">Tauqeer</span>
            <span className="text-purple-600 dark:text-purple-400 group-hover:text-purple-500 dark:group-hover:text-purple-300 transition-colors">
              /&gt;
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-xs lg:text-sm font-medium text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-purple-100/60 dark:hover:bg-purple-500/10 hover:text-purple-700 dark:hover:text-purple-200"
              >
                {link.name}
              </a>
            ))}

            {/* Desktop Theme Toggle */}
            <div className="pl-3 ml-2 border-l border-purple-200/60 dark:border-purple-500/20">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <MobileMenu navLinks={navLinks} />
          </div>
        </div>
      </div>
    </nav>
  )
}

function MobileMenu({ navLinks }: { navLinks: { name: string; href: string }[] }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors rounded-lg hover:bg-purple-100/60 dark:hover:bg-purple-500/10"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-purple-200/70 dark:border-purple-500/20 shadow-xl shadow-purple-500/10 dark:shadow-purple-950/40 md:hidden">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-slate-700 hover:text-purple-700 hover:bg-purple-100/60 dark:text-slate-300 dark:hover:text-purple-300 dark:hover:bg-purple-500/10 rounded-lg transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            {/* Mobile menu theme toggle row */}
            <div className="pt-3 border-t border-purple-200/50 dark:border-purple-500/20 flex items-center justify-between px-4 py-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Appearance
              </span>
              <ThemeToggle showLabel />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
