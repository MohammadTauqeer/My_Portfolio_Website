'use client'

import { motion } from 'framer-motion'
import {
  Code2,
  Layers,
  Palette,
  Database,
  Server,
  Bot,
  Cpu,
  ShoppingCart,
  Smartphone,
  Layout,
  Brain,
  Cloud,
  Globe
} from 'lucide-react'

const skillsData = [
  {
    category: 'FRONTEND DEVELOPMENT',
    skills: [
      { name: 'Next.js', icon: Layers, level: 'Primary', link: 'https://nextjs.org/' },
      { name: 'React', icon: Code2, level: 'Expert', link: 'https://react.dev/' },
      { name: 'Tailwind CSS', icon: Palette, level: 'Expert', link: 'https://tailwindcss.com/' },
      { name: 'TypeScript', icon: Code2, level: 'Advanced', link: 'https://www.typescriptlang.org/' },
      { name: 'Bootstrap', icon: Globe, level: 'Advanced', link: 'https://getbootstrap.com/' },
    ]
  },
  {
    category: 'BACKEND & AI INTEGRATION',
    skills: [
      { name: 'OpenAI Agents SDK', icon: Brain, level: 'Expert', link: 'https://platform.openai.com/docs/guides/agents' },
      { name: 'MCP Server', icon: Server, level: 'Specialized', link: 'https://modelcontextprotocol.io/' },
      { name: 'Node.js', icon: Server, level: 'Advanced', link: 'https://nodejs.org/' },
      { name: 'FastAPI', icon: Cloud, level: 'Advanced', link: 'https://fastapi.tiangolo.com/' },
      { name: 'Python', icon: Code2, level: 'Advanced', link: 'https://www.python.org/' },
      { name: 'Firebase', icon: Cloud, level: 'Advanced', link: 'https://firebase.google.com/' },
      { name: 'PostgreSQL', icon: Database, level: 'Advanced' },
      { name: 'RAG Chatbots', icon: Bot, level: 'Specialized' },
      { name: 'AI Model CLI', icon: Cpu, level: 'Claude, Qwen, Gemini' },
    ]
  },
  {
    category: 'SPECIALIZATION',
    skills: [
      { name: 'Custom Websites', icon: Layout, level: 'Expert' },
      { name: 'E-commerce Solutions', icon: ShoppingCart, level: 'Expert' },
      { name: 'Responsive Design', icon: Smartphone, level: 'Expert' },
      { name: 'Web Applications', icon: Globe, level: 'Expert' },
    ]
  }
]

export default function Skills() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const categoryVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const skillVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ fontFamily: 'var(--font-jetbrains)' }}>
          SKILLS & EXPERTISE
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Cutting-edge technologies and specialized skills to bring your vision to life
        </p>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {skillsData.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            variants={categoryVariant}
            className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-300"
          >
            {/* Category Title */}
            <h3 
              className="text-xl font-extrabold text-emerald-400 mb-6 tracking-tight" 
              style={{ fontFamily: 'var(--font-jetbrains)' }}
            >
              {category.category}
            </h3>

            {/* Skills List */}
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => {
                const Icon = skill.icon
                const SkillContent = (
                  <motion.div
                    variants={skillVariant}
                    whileHover={{ scale: 1.05 }}
                    className="group flex items-center gap-4 p-3 bg-slate-800/30 border border-emerald-500/10 rounded-xl hover:bg-slate-800/50 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer"
                  >
                    {/* Icon */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative p-2 bg-slate-700/50 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                      </div>
                    </div>

                    {/* Skill Info */}
                    <div className="flex-1">
                      <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                        {skill.name}
                      </div>
                      <div className="text-xs text-slate-400 group-hover:text-emerald-400/70 transition-colors duration-300">
                        {skill.level}
                      </div>
                    </div>
                  </motion.div>
                )

                // Wrap in anchor tag if link exists
                if (skill.link) {
                  return (
                    <a
                      key={skillIndex}
                      href={skill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block no-underline"
                    >
                      {SkillContent}
                    </a>
                  )
                }

                return <div key={skillIndex}>{SkillContent}</div>
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
