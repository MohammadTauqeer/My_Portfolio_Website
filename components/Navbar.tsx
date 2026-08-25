'use client'

import { useState, useEffect } from 'react'

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
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b border-purple-500/20 ${
      isScrolled
        ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-purple-950/30'
        : 'bg-black/50 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold font-mono tracking-tight group">
            <span className="text-purple-400 group-hover:text-purple-300 transition-colors">&lt;</span>
            <span className="text-white">Tauqeer</span>
            <span className="text-purple-400 group-hover:text-purple-300 transition-colors">/&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-purple-500/10 hover:text-purple-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <MobileMenu navLinks={navLinks} />
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
        className="p-2 text-slate-300 hover:text-purple-400 transition-colors"
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
        <div className="absolute top-16 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-950/40 md:hidden">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-slate-300 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
