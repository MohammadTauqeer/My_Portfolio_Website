'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutExperience() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
        >
          About & Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto"
        >
          Discover my journey and professional experience
        </motion.p>
      </div>

      {/* Two-Column Layout */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* LEFT COLUMN: Bio Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h3
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              textShadow: '0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.15)'
            }}
          >
            <span className="text-emerald-500">My Journey</span>
            <span className="text-slate-100"> & Expertise</span>
          </h3>

          <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              As a dedicated Full-Stack and Agentic AI Developer based in Pakistan, I have spent the last few years mastering the art of building scalable digital solutions. My journey includes a rigorous 2-month Remote Internship at Aykays, where I excelled as a Frontend Developer, delivering high-quality user interfaces.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              I am currently an advanced student at the Governor Sindh Initiative (GIAIC), where I am now specializing in Agentic AI in Quarter 4. My hands-on experience is further solidified by participating in multiple Hackathons (Phase 0 to 5), where I built complex projects like AI Humanoid systems and real-time collaborative tools. As of April 2026, I am actively developing Agentic AI solutions using the OpenAI SDK and MCP Servers.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              "In my recent Hackathon 0 project, I developed 'My AI Employee,' an intelligent Agentic system designed to automate professional workflows. This AI employee can seamlessly interact with Gmail for smart email management, LinkedIn for automated networking, and Odoo ERP for business data handling. By integrating these platforms, I created a multi-functional AI assistant that can execute complex tasks across different business environments autonomously."
            </motion.p>
          </div>

          {/* Decorative accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 h-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full origin-left"
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        {/* RIGHT COLUMN: Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="relative group">
            {/* Neon-green glow effect */}
            <div className="absolute -inset-2 bg-gradient-to-br from-emerald-500/40 via-green-500/30 to-emerald-500/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            {/* Image container with neon border */}
            <div className="relative">
              {/* Outer border with glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500 to-green-400 rounded-2xl opacity-70 blur-sm"></div>
              
              {/* Main image container */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px] rounded-2xl overflow-hidden border-2 border-emerald-500/60 group-hover:border-emerald-400 transition-all duration-500 bg-slate-900/50">
                <Image
                  src="/touqeer.png"
                  alt="Mohammad Touqeer - About & Experience"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 384px, 450px"
                />

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Decorative corner accents with neon glow */}
              <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-emerald-500/70 rounded-tl-xl shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-emerald-500/70 rounded-br-xl shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
            >
              <div className="px-4 py-2 bg-slate-900/90 backdrop-blur-sm border border-emerald-500/50 rounded-full shadow-lg shadow-emerald-500/20">
                <span className="text-emerald-400 text-sm font-medium font-mono">
                  Agentic AI Developer
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
