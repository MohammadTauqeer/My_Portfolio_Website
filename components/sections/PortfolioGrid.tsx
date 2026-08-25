'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Pause,
  Play,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Zap,
  MoveHorizontal
} from 'lucide-react'
import { projects, Project } from '@/lib/data'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Image from 'next/image'

const CATEGORIES = [
  'All Projects',
  'AI & Robotics',
  'E-Commerce & Fintech',
  'Web Apps & Platforms',
  'Productivity & Tools'
] as const

type CategoryType = (typeof CATEGORIES)[number]

export default function PortfolioGrid() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All Projects')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(false)
  const [isHoveredSection, setIsHoveredSection] = useState(false)

  // Drag to scroll states
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftStart, setScrollLeftStart] = useState(0)
  const [hasDragged, setHasDragged] = useState(false)

  // Filter projects by active category
  const filterProject = useCallback((project: Project, category: CategoryType) => {
    if (category === 'All Projects') return true
    const ind = project.industry.toLowerCase()
    const tags = project.tags.join(' ').toLowerCase()
    const title = project.title.toLowerCase()

    if (category === 'AI & Robotics') {
      return (
        ind.includes('ai') ||
        ind.includes('robotics') ||
        ind.includes('agentic') ||
        tags.includes('ai') ||
        tags.includes('robotics') ||
        tags.includes('openai')
      )
    }
    if (category === 'E-Commerce & Fintech') {
      return (
        ind.includes('e-commerce') ||
        ind.includes('fintech') ||
        tags.includes('e-commerce') ||
        tags.includes('fintech') ||
        tags.includes('shopping') ||
        tags.includes('catalog')
      )
    }
    if (category === 'Web Apps & Platforms') {
      return (
        ind.includes('health') ||
        ind.includes('fitness') ||
        ind.includes('human resources') ||
        ind.includes('web') ||
        ind.includes('platform') ||
        (ind.includes('education') && !ind.includes('utility') && !ind.includes('tech')) ||
        title.includes('gym') ||
        title.includes('school') ||
        title.includes('job board') ||
        title.includes('portfolio')
      )
    }
    if (category === 'Productivity & Tools') {
      return (
        ind.includes('utility') ||
        ind.includes('productivity') ||
        ind.includes('tech') ||
        tags.includes('planner') ||
        tags.includes('tracker') ||
        tags.includes('productivity') ||
        tags.includes('sockets') ||
        tags.includes('state management') ||
        tags.includes('real-time')
      )
    }
    return true
  }, [])

  const filteredProjects = projects.filter((p) => filterProject(p, activeCategory))

  // Update scroll status and indicators
  const updateScrollInfo = useCallback(() => {
    if (!sliderRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
    
    setCanScrollLeft(scrollLeft > 15)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15)

    const maxScroll = scrollWidth - clientWidth
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
    setScrollProgress(Math.min(100, Math.max(0, progress)))

    const card = sliderRef.current.querySelector<HTMLElement>('.project-slider-card')
    if (card) {
      const cardWidth = card.offsetWidth + 24 // including gap-6
      const calculatedIndex = Math.round(scrollLeft / cardWidth)
      setActiveIndex(Math.min(filteredProjects.length - 1, Math.max(0, calculatedIndex)))
    }
  }, [filteredProjects.length])

  // Attach scroll listener
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    updateScrollInfo()
    slider.addEventListener('scroll', updateScrollInfo, { passive: true })
    window.addEventListener('resize', updateScrollInfo)

    return () => {
      slider.removeEventListener('scroll', updateScrollInfo)
      window.removeEventListener('resize', updateScrollInfo)
    }
  }, [updateScrollInfo, activeCategory])

  // Reset scroll position on category change
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      setActiveIndex(0)
    }
  }, [activeCategory])

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay || isHoveredSection || isDown || selectedProject !== null) return

    const interval = setInterval(() => {
      if (!sliderRef.current) return
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      const card = sliderRef.current.querySelector<HTMLElement>('.project-slider-card')
      const cardWidth = card ? card.offsetWidth + 24 : 420

      if (scrollLeft >= scrollWidth - clientWidth - 20) {
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
      }
    }, 4500)

    return () => clearInterval(interval)
  }, [isAutoplay, isHoveredSection, isDown, selectedProject])

  // Navigation handlers
  const scrollPrev = () => {
    if (!sliderRef.current) return
    const card = sliderRef.current.querySelector<HTMLElement>('.project-slider-card')
    const cardWidth = card ? card.offsetWidth + 24 : 420
    sliderRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' })
  }

  const scrollNext = () => {
    if (!sliderRef.current) return
    const card = sliderRef.current.querySelector<HTMLElement>('.project-slider-card')
    const cardWidth = card ? card.offsetWidth + 24 : 420
    sliderRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' })
  }

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return
    const card = sliderRef.current.querySelector<HTMLElement>('.project-slider-card')
    const cardWidth = card ? card.offsetWidth + 24 : 420
    sliderRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    setIsDown(true)
    setHasDragged(false)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeftStart(sliderRef.current.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const distance = (x - startX) * 1.3
    if (Math.abs(distance) > 6) {
      setHasDragged(true)
    }
    sliderRef.current.scrollLeft = scrollLeftStart - distance
  }

  const handleMouseUp = () => {
    setIsDown(false)
    // Small timeout to prevent triggering click immediately after dragging
    setTimeout(() => {
      setHasDragged(false)
    }, 80)
  }

  const handleCardClick = (projectId: number) => {
    if (!hasDragged) {
      setSelectedProject(projectId)
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollNext()
    }
  }

  return (
    <div
      className="relative w-full focus:outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHoveredSection(true)}
      onMouseLeave={() => {
        setIsHoveredSection(false)
        if (isDown) handleMouseUp()
      }}
    >
      {/* Category Filter Pills & Carousel Controls Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-slate-900/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-lg shadow-purple-950/20 max-w-full overflow-x-auto">
          {CATEGORIES.map((category) => {
            const count = projects.filter((p) => filterProject(p, category)).length
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-emerald-600/80 rounded-xl border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
                <span
                  className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Slider Controls Toolbar */}
        <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg">
          {/* Item Counter */}
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 pr-2 border-r border-slate-800">
            <span className="text-emerald-400 font-bold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span>/</span>
            <span>{String(filteredProjects.length).padStart(2, '0')}</span>
          </div>

          {/* Autoplay Toggle Button */}
          <button
            onClick={() => setIsAutoplay(!isAutoplay)}
            className={`p-2 rounded-xl transition-all duration-300 text-xs flex items-center gap-1.5 ${
              isAutoplay
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
            }`}
            title={isAutoplay ? 'Pause auto-sliding' : 'Enable auto-sliding'}
            aria-label={isAutoplay ? 'Pause autoplay' : 'Start autoplay'}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px] font-medium">
              {isAutoplay ? 'Auto' : 'Slide'}
            </span>
          </button>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              className={`p-2 rounded-xl border transition-all duration-300 ${
                canScrollLeft
                  ? 'bg-slate-800 hover:bg-purple-600/30 text-white border-slate-700 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-95'
                  : 'bg-slate-900/40 text-slate-600 border-slate-800/40 cursor-not-allowed'
              }`}
              aria-label="Previous project slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollRight}
              className={`p-2 rounded-xl border transition-all duration-300 ${
                canScrollRight
                  ? 'bg-slate-800 hover:bg-emerald-600/30 text-white border-slate-700 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95'
                  : 'bg-slate-900/40 text-slate-600 border-slate-800/40 cursor-not-allowed'
              }`}
              aria-label="Next project slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Carousel Track with Side Edge Gradients */}
      <div className="relative group">
        {/* Left Fade Gradient Mask */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollLeft ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Right Fade Gradient Mask */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollRight ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Scrollable Container with Smooth Snapping & Mouse Drag */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          className={`flex gap-6 overflow-x-auto snap-x snap-mandatory py-4 px-2 select-none scroll-smooth scrollbar-none transition-all duration-150 ${
            isDown ? 'cursor-grabbing' : 'cursor-grab'
          } [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredProjects.map((project, index) => {
            const isHovered = hoveredProject === project.id
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="project-slider-card flex-shrink-0 snap-center w-[85vw] sm:w-[380px] md:w-[410px] lg:w-[430px] group/card relative bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-300 flex flex-col justify-between"
                onClick={() => handleCardClick(project.id)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Browser Mockup Header & Frame */}
                <div className="relative w-full p-4 pb-0">
                  <div className="bg-slate-800/90 rounded-t-xl shadow-2xl overflow-hidden border border-white/5">
                    {/* Browser Top Bar */}
                    <div className="bg-slate-700/80 px-4 py-2.5 flex items-center justify-between gap-2 border-b border-slate-600/30">
                      {/* Mac-style Window Dots */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                      </div>

                      {/* Address Bar */}
                      <div className="flex-1 max-w-[200px] sm:max-w-[240px] bg-slate-900/60 rounded px-2.5 py-1 text-[11px] text-slate-400 flex items-center gap-1.5 border border-slate-700/40">
                        <svg className="w-2.5 h-2.5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="truncate font-mono">{project.liveUrl.replace('https://', '')}</span>
                      </div>

                      {/* GitHub Icon Link */}
                      <a
                        href={project.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-600/50 transition-colors"
                        title="View GitHub Repository"
                        aria-label="View source code on GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Image Area with Zoom & Hover Actions */}
                    <div className="relative w-full h-48 sm:h-52 bg-slate-950 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 85vw, 430px"
                        className="object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out"
                      />

                      {/* Top Overlay Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-purple-300">
                          {project.industry}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/30 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          {project.performanceMetric.value}
                        </span>
                      </div>

                      {/* Hover Overlay with Quick Action Button */}
                      <div
                        className={`absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
                          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        <Button
                          variant="primary"
                          size="md"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(project.liveUrl, '_blank')
                          }}
                          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/30 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Launch Live App
                        </Button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedProject(project.id)
                          }}
                          className="text-xs text-slate-300 hover:text-white underline underline-offset-4 transition-colors"
                        >
                          Read Case Study & Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className="text-xl font-bold text-white group-hover/card:text-purple-300 transition-colors duration-300 line-clamp-1"
                        style={{ fontFamily: 'var(--font-jetbrains)' }}
                      >
                        {project.title}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-500">
                        #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-slate-800/70 border border-slate-700/60 group-hover/card:border-purple-500/30 rounded-md text-[11px] text-slate-300 group-hover/card:text-purple-300 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.liveUrl, '_blank')
                      }}
                      className="flex-1 bg-purple-500/10 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 font-semibold text-xs py-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedProject(project.id)
                      }}
                      className="flex-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold text-xs py-2"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Slider Footer Progress Bar & Interactive Dots */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        {/* Swipe / Drag gesture cue */}
        <div className="flex items-center gap-2 text-xs text-slate-500 order-2 sm:order-1">
          <MoveHorizontal className="w-4 h-4 text-purple-400 animate-pulse" />
          <span>Swipe, drag, or use arrow keys to navigate</span>
        </div>

        {/* Interactive Pagination Dots / Track */}
        <div className="flex items-center gap-1.5 order-1 sm:order-2 max-w-[280px] overflow-x-auto py-1">
          {filteredProjects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-7 bg-gradient-to-r from-purple-500 to-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                  : 'w-2 bg-slate-800 hover:bg-slate-600'
              }`}
              aria-label={`Jump to project slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div className="w-full sm:w-32 bg-slate-800/80 rounded-full h-1.5 overflow-hidden border border-slate-700/50 order-3 hidden md:block">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-violet-400 transition-all duration-150 rounded-full"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Comprehensive Modal for Project Details */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject !== null && (() => {
          const project = projects.find((p) => p.id === selectedProject)
          if (!project) return null

          return (
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="primary" className="bg-purple-500/20 border-purple-500/30 text-purple-300">
                    {project.industry}
                  </Badge>
                  <Badge variant="success" className="bg-emerald-500/20 border-emerald-500/30 text-emerald-300">
                    {project.performanceMetric.label}: {project.performanceMetric.value}
                  </Badge>
                </div>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-3 text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-jetbrains)' }}
                >
                  {project.title}
                </h2>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Challenge & Solution Cards */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Challenge */}
                <div className="bg-slate-900/80 border border-red-500/20 rounded-xl p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <h3 className="text-base font-bold text-red-400">The Challenge</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div className="bg-slate-900/80 border border-emerald-500/20 rounded-xl p-5 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-base font-bold text-emerald-400">The Solution</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="bg-slate-900/60 border border-white/10 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <h3 className="text-base font-bold text-white">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-purple-200">
                        Key Technical Features
                      </span>
                    </h3>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-300">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              <div>
                <h3 className="text-sm font-semibold mb-2.5 text-purple-300/80 uppercase tracking-wider">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-800/80 border border-purple-500/20 rounded-lg text-xs font-mono text-purple-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Live Demo
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.open(project.sourceUrl, '_blank')}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold"
                >
                  <Github className="w-5 h-5" />
                  View Source Code
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setSelectedProject(null)}
                  className="sm:w-auto px-6 text-slate-400 hover:text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}
