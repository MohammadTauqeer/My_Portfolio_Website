'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '@/lib/data'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import Image from 'next/image'

export default function PortfolioGrid() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={item}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all duration-300 ease-in-out"
            onClick={() => setSelectedProject(project.id)}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            {/* Browser Mockup Frame */}
            <div className="relative w-full p-4">
              <div className="bg-slate-800 rounded-t-lg shadow-2xl overflow-hidden">
                {/* Browser Top Bar */}
                <div className="bg-slate-700 px-4 py-3 flex items-center gap-2">
                  {/* Mac-style Dots */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  {/* Address Bar */}
                  <div className="flex-1 ml-4 bg-slate-600/50 rounded px-3 py-1.5 text-xs text-slate-400 flex items-center gap-2">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">{project.liveUrl.replace('https://', '')}</span>
                  </div>
                </div>

                {/* Browser Content Area with Image */}
                <div className="relative w-full h-52 bg-slate-900 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                  
                  {/* Hover Overlay with View Project Button */}
                  <div 
                    className={`absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(project.liveUrl, '_blank')
                      }}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold shadow-xl"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Project
                    </Button>
                  </div>
                </div>
              </div>

              {/* GitHub Icon Badge - Outside Browser */}
              <div className="absolute top-8 right-8 z-20 group/github">
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block bg-slate-900/90 p-2.5 rounded-full hover:bg-emerald-500 transition-colors duration-300 shadow-lg"
                  aria-label="View source code on GitHub"
                >
                  <Github className="w-5 h-5 text-slate-300 group-hover/github:text-white transition-colors duration-300" />
                </a>
                {/* Tooltip */}
                <div className="absolute top-full right-0 mt-2 opacity-0 group-hover/github:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-slate-900 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl border border-emerald-500/30 whitespace-nowrap">
                    View Code
                  </div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300" style={{ fontFamily: 'var(--font-jetbrains)' }}>
                {project.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-800/50 border border-emerald-500/20 rounded-md text-xs text-emerald-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Live Demo Button (Always Visible) */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(project.liveUrl, '_blank')
                  }}
                  className="w-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal for Challenge vs Solution */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (() => {
          const project = projects.find((p) => p.id === selectedProject)!
          return (
            <>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant="primary">
                    {project.industry}
                  </Badge>
                  <Badge variant="success">
                    {project.performanceMetric.label}: {project.performanceMetric.value}
                  </Badge>
                </div>
                    <h2 className="text-4xl font-bold mb-3">{project.title}</h2>
                    <p className="text-slate-400">{project.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Challenge */}
                    <div className="glass-effect p-6 rounded-xl border-red-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <h3 className="text-xl font-bold text-red-400">Challenge</h3>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="glass-effect p-6 rounded-xl border-green-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <h3 className="text-xl font-bold text-green-400">Solution</h3>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                  className="flex-1"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit Live Demo
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.open(project.sourceUrl, '_blank')}
                  className="flex-1"
                >
                  <Github className="w-5 h-5" />
                  View Source Code
                </Button>
              </div>
            </>
          )
        })()}
      </Modal>
    </>
  )
}
