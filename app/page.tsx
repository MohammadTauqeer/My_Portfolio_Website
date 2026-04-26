'use client'

import Hero from '@/components/sections/Hero'
import AboutExperience from '@/components/sections/AboutExperience'
import PortfolioGrid from '@/components/sections/PortfolioGrid'
import Skills from '@/components/sections/Skills'
import ProjectDiscovery from '@/components/sections/ProjectDiscovery'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <AboutExperience />

      <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Transforming ideas into high-performance digital experiences
          </p>
        </div>
        <PortfolioGrid />
      </section>

      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/30 scroll-mt-20">
        <Skills />
      </section>

      <section id="discovery" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <ProjectDiscovery />
      </section>

      <section id="resume" className="py-16 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Curriculum Vitae
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              View my detailed experience and technical journey
            </p>
          </div>

          {/* Thumbnail Container */}
          <div className="flex flex-col items-center justify-center gap-6">
            {/* Thumbnail Image */}
            <a
              href="/resume-new.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group block cursor-pointer"
            >
              <div className="relative max-w-[250px] mx-auto">
                {/* Decorative border with glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-br from-green-500/30 to-blue-500/30 rounded-lg blur-sm group-hover:from-green-500/50 group-hover:to-blue-500/50 transition-all duration-300"></div>
                
                {/* Thumbnail Image Container */}
                <div className="relative rounded-lg border-2 border-green-500/40 group-hover:border-green-500/70 transition-all duration-300 overflow-hidden hover:scale-105 shadow-xl shadow-green-500/10">
                  {/* Actual Thumbnail Image */}
                  <img
                    src="/resume-thumb-new.jpg"
                    alt="Resume Thumbnail - Click to view full CV"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Click hint overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/60 rounded-lg">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-xs text-green-300 font-medium">View</span>
                  </div>
                </div>
              </div>
            </a>

            {/* Download Button */}
            <a
              href="/resume-new.pdf"
              download="Touqeer_Mohammad_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-slate-950 font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-slate-800/50 text-center text-slate-400">
        <p>© 2026 My Portfolio. Created by Mohammad Tauqeer. All Rights Reserved.</p>
      </footer>
    </main>
  )
}
