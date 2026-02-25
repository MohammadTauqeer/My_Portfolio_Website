'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Hero() {
  // 🎨 CUSTOMIZATION: Change these values to personalize your hero section
  const PROFILE_IMAGE_URL = "/touqeer.png"
  const YOUR_NAME = "MOHAMMAD TOUQEER"
  const YOUR_ROLE = "Full-Stack Developer"
  const YOUR_BIO = "Specializing in building high-performance E-commerce platforms, AI-integrated solutions, and Fintech interfaces. I turn complex business requirements into scalable, user-centric digital products using the power of Next.js and Modern AI."
  
  // Social links
  const SOCIAL_LINKS = {
    github: "https://github.com/TouqeerChamp",
    linkedin: "https://www.linkedin.com/in/mohammed-touqeer-30a679203/",
    email: "mailto:touqeerchamp@gmail.com"
  }

  // Infinite Looping Typewriter effect state
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIndex, setTextIndex] = useState(0) // 0 for name, 1 for title
  const [isPaused, setIsPaused] = useState(false)

  const texts = [
    { text: YOUR_NAME, color: 'text-emerald-500', isBold: true, isRole: false },
    { text: YOUR_ROLE, color: 'text-slate-300', isBold: false, isRole: true }
  ]

  useEffect(() => {
    const currentTextObj = texts[textIndex]
    const currentFullText = currentTextObj.text
    const typingSpeed = 70 // milliseconds per character
    const deleteSpeed = 50 // faster deletion
    const pauseDuration = 2000 // 2 seconds pause

    let timeout: NodeJS.Timeout

    const handleTyping = () => {
      if (isPaused) {
        // Wait during pause, then start deleting
        timeout = setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, pauseDuration)
        return
      }

      if (!isDeleting) {
        // Typing forward
        if (displayedText.length < currentFullText.length) {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1))
          timeout = setTimeout(handleTyping, typingSpeed)
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true)
          timeout = setTimeout(handleTyping, 0)
        }
      } else {
        // Deleting backward
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
          timeout = setTimeout(handleTyping, deleteSpeed)
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
          timeout = setTimeout(handleTyping, 500) // small delay before next text
        }
      }
    }

    timeout = setTimeout(handleTyping, typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, textIndex, isPaused])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 lg:px-8 relative overflow-hidden scroll-mt-20 pt-20">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center lg:justify-end order-1 lg:order-1"
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              {/* Image container */}
              <div className="relative">
                <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] rounded-2xl overflow-hidden border-2 border-slate-700/50 group-hover:border-blue-500/50 transition-colors duration-500">
                  <Image
                    src={PROFILE_IMAGE_URL}
                    alt={`${YOUR_NAME} - Professional Profile`}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 384px, 450px"
                  />
                  
                  {/* Overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-blue-500/50 rounded-tl-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-purple-500/50 rounded-br-2xl"></div>
              </div>

              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2"
              >
                <Badge variant="success" className="shadow-lg">
                  Available for Projects
                </Badge>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col justify-center text-center lg:text-left order-2 lg:order-2"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-4"
            >
              <span className="text-blue-400 text-lg font-medium">Hello, I'm</span>
            </motion.div>

            {/* Name with Infinite Looping Typewriter Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-5xl sm:text-6xl lg:text-7xl mb-8 leading-tight min-h-[1.2em]"
              style={{ fontFamily: 'var(--font-jetbrains)' }}
            >
              <span 
                className={`${texts[textIndex].isBold ? 'font-extrabold tracking-tight' : 'font-semibold tracking-normal'}`}
                style={{
                  textShadow: textIndex === 0 ? '0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.15)' : 'none'
                }}
              >
                {texts[textIndex].isRole ? (
                  <>
                    <span className="text-white">
                      {displayedText.includes('Developer') 
                        ? displayedText.split('Developer')[0]
                        : displayedText}
                    </span>
                    {displayedText.includes('Developer') && (
                      <span className="text-emerald-500">
                        Developer{displayedText.split('Developer')[1] || ''}
                      </span>
                    )}
                  </>
                ) : (
                  <span className={texts[textIndex].color}>{displayedText}</span>
                )}
                <span 
                  className="inline-block ml-1"
                  style={{ animation: 'blink 1s step-end infinite' }}
                >
                  |
                </span>
              </span>
            </motion.h1>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              {YOUR_BIO}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('discovery')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hire Me
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {SOCIAL_LINKS.github && (
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-effect hover:bg-slate-800/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {SOCIAL_LINKS.linkedin && (
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full glass-effect hover:bg-slate-800/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {SOCIAL_LINKS.email && (
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="w-12 h-12 rounded-full glass-effect hover:bg-slate-800/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-blue-500/50"
                  aria-label="Email Contact"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <a 
            href="#portfolio" 
            className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Scroll to portfolio section"
          >
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
