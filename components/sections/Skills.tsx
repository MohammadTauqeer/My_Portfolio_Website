'use client'

import React, { useState, useRef, MouseEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Brain, Sparkles, LayoutGrid, CheckCircle2, ChevronRight, Zap } from 'lucide-react'

// Interface for each tech stack item
interface TechItem {
  id: string
  name: string
  label: string
  category: 'FRONTEND' | 'BACKEND_AI' | 'SPECIALIZATION'
  categoryName: string
  level: string
  description: string
  color: string
  glowColor: string
  icon: React.ReactNode
}

// Category Node Definition
interface CategoryNode {
  id: 'ALL' | 'FRONTEND' | 'BACKEND_AI' | 'SPECIALIZATION'
  name: string
  shortTitle: string
  badge: string
  description: string
  highlights: string[]
  icon: React.ComponentType<{ className?: string }>
  color: string
  glow: string
  count: number
}

// Custom crisp SVG brand icons
const TechIcons = {
  JavaScript: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#F7DF1E]">
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M3 3h18v18H3V3zm10.72 14.18c.55.93 1.34 1.54 2.5 1.54 1.4 0 2.29-.71 2.29-2.5v-6.3h-2.31v6.33c0 .5-.19.78-.69.78-.45 0-.74-.29-.93-.68l-.86.83zm-6.22.04c.43.76 1.07 1.49 2.24 1.49 1.25 0 2.05-.67 2.05-1.74 0-1.19-.8-1.63-2.02-2.16l-.42-.18c-1.39-.59-2.3-1.31-2.3-2.73 0-1.53 1.21-2.68 3.01-2.68 1.31 0 2.25.48 2.87 1.56l-1.69 1.08c-.33-.61-.75-.89-1.29-.89-.58 0-.98.37-.98.84 0 .58.4 1 .1.46 1.44l.43.18c1.66.72 2.59 1.48 2.59 3.05 0 1.76-1.37 2.87-3.37 2.87-1.89 0-3.05-.91-3.6-2.12l1.79-1.07z" fill="#F7DF1E"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#3178C6]">
      <path d="M3 3h18v18H3V3zm8.38 6.72H6.94v1.89h1.72v7.47h2.22v-7.47h1.72V9.72h-.22zm3.34 3.7c.68-.44 1.46-.72 2.26-.72 1.02 0 1.63.49 1.63 1.24 0 .82-.67 1.26-1.84 1.73l-.74.3c-1.66.66-2.58 1.47-2.58 3.04 0 2.01 1.51 3.25 3.82 3.25 1.55 0 2.84-.55 3.65-1.47l-1.35-1.35c-.56.62-1.37.99-2.22.99-1.07 0-1.64-.53-1.64-1.29 0-.85.67-1.29 1.95-1.78l.74-.29c1.78-.69 2.7-1.58 2.7-3.2 0-1.99-1.51-3.15-3.66-3.15-1.42 0-2.65.48-3.48 1.28l1.23 1.41z"/>
    </svg>
  ),
  HTML5: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#E34F26]">
      <path d="M3 2l1.65 18.53L12 23l7.35-2.47L21 2H3zm14.88 5.76H7.93l.22 2.45h9.45l-.75 8.42L12 20.08l-4.83-1.45-.33-3.68h2.39l.17 1.88 2.6.71 2.61-.71.36-4.04H7.49L6.82 5.31h11.45l-.39 2.45z"/>
    </svg>
  ),
  CSS3: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#1572B6]">
      <path d="M3 2l1.65 18.53L12 23l7.35-2.47L21 2H3zm14.88 5.76H7.93l.22 2.45h9.45l-.75 8.42L12 20.08l-4.83-1.45-.33-3.68h2.39l.17 1.88 2.6.71 2.61-.71.36-4.04H7.49L6.82 5.31h11.45l-.39 2.45z"/>
    </svg>
  ),
  React: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#61DAFB] animate-[spin_14s_linear_infinite]">
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.2" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </g>
    </svg>
  ),
  Nextjs: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
      <circle cx="12" cy="12" r="10.5" fill="#000000" stroke="#a855f7" strokeWidth="1" />
      <path d="M14.9 17.5L8.5 9.2v8.3H7V6.5h1.7l6.4 8.3V6.5h1.5v11h-1.7z" fill="#ffffff" />
      <path d="M15.5 14.5l-5.7 7.4c.7.2 1.4.3 2.2.3 4.4 0 8-3.6 8-8 0-1.4-.4-2.8-1-4l-3.5 4.3z" fill="url(#nextGrad2)" />
      <defs>
        <linearGradient id="nextGrad2" x1="12" y1="12" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Bootstrap: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#7952B3]">
      <rect width="20" height="20" x="2" y="2" rx="5" fill="#7952B3"/>
      <path d="M7.5 7h4.8c1.8 0 2.9.9 2.9 2.2 0 1-.6 1.7-1.5 2 1.2.3 1.9 1.2 1.9 2.3 0 1.5-1.3 2.5-3.2 2.5H7.5V7zm2.4 3.6h2.1c.7 0 1.1-.4 1.1-.9s-.4-.9-1.1-.9H9.9v1.8zm0 3.6h2.4c.8 0 1.3-.4 1.3-1s-.5-1-1.3-1H9.9v2z" fill="#ffffff"/>
    </svg>
  ),
  Nodejs: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#339933]">
      <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.5v7l7.2 4.2 7.2-4.2v-7L12 4.3zM12 7c2.8 0 5 1.8 5 4.2 0 2.6-2 3.8-4.2 4.2l-.8.1V17h-2v-6.5h2.8c1.2 0 2.2-.6 2.2-1.5 0-.8-.9-1.2-2-1.2H10v7.7H8V7h4z"/>
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#38BDF8]">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
    </svg>
  ),
  OpenAI: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#10A37F]">
      <path d="M22.28 9.9c-.2-1.6-1.1-3-2.5-3.8-.4-.2-.8-.4-1.2-.5-.3-.9-.8-1.7-1.6-2.3-1.4-1.2-3.3-1.6-5.1-1.1-.5.1-.9.4-1.4.7-1.1-.7-2.4-1-3.7-.8-2 .3-3.6 1.6-4.4 3.4-.3.6-.5 1.3-.5 2-.9.5-1.7 1.3-2.1 2.2-1 1.9-.9 4.2.3 5.9.4.5.8 1 1.3 1.4.1.9.5 1.8 1.2 2.5 1.3 1.4 3.2 2 5.1 1.7.5-.1 1-.3 1.5-.6.9.7 2.1 1.1 3.3 1 1.9-.1 3.6-1.2 4.5-2.9.4-.7.6-1.5.6-2.3.9-.4 1.7-1.1 2.2-2 1-1.9.9-4.2-.3-5.9-.4-.5-.8-.9-1.3-1.3zm-8.8 10.6c-.9.5-2 .5-2.9.1l3.5-2c.3-.2.5-.5.5-.9v-3.7l1.7 1v4.3c0 .5-.3 1-.7 1.2h-.1zm-7.6-3.8c-.5-.9-.6-2 0-2.9l3.5 2c.3.2.7.2.9 0l3.2-1.9v2l-3.7 2.1c-.5.3-1.1.2-1.5-.1l-2.4-1.2zm-1.4-6.4c.5-.9 1.4-1.5 2.4-1.6v4.1c0 .4.2.7.5.9l3.2 1.9-1.7 1-3.7-2.1c-.5-.3-.8-.8-.8-1.3l.1-2.9zm13 2.1l-3.2-1.9 1.7-1 3.7 2.1c.5.3.8.8.8 1.3v2.9c-.5.9-1.4 1.5-2.4 1.6v-4.1c0-.4-.2-.7-.6-.9zm2.4-3.6c.5.9.6 2 0 2.9l-3.5-2c-.3-.2-.7-.2-.9 0l-3.2 1.9v-2l3.7-2.1c.5-.3 1.1-.2 1.5.1l2.4 1.2zm-7.8-3.4c.9-.5 2-.5 2.9-.1l-3.5 2c-.3.2-.5.5-.5.9v3.7l-1.7-1v-4.3c0-.5.3-1 .7-1.2h.1z"/>
    </svg>
  ),
  MCPServer: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current text-[#D97706]" fill="none" strokeWidth="2">
      <rect x="2" y="3" width="20" height="6" rx="2" stroke="currentColor"/>
      <rect x="2" y="15" width="20" height="6" rx="2" stroke="currentColor"/>
      <circle cx="6" cy="6" r="1" fill="currentColor"/>
      <circle cx="6" cy="18" r="1" fill="currentColor"/>
      <path d="M18 9v6M14 9v6M10 9v6" strokeDasharray="2 2" stroke="currentColor"/>
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
      <path d="M11.9 2c-3.1 0-5.2.4-5.2 2.2v2.7h5.3v.8H4.6C2.5 7.7 2 9.8 2 12c0 2.3.8 4.2 2.6 4.2h1.5v-2.1c0-1.8 1.5-3.3 3.3-3.3h5.2c1.5 0 2.7-1.2 2.7-2.7V4.2C17.3 2.5 15 2 11.9 2zm-1.8 1.8c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#3776AB"/>
      <path d="M12.1 22c3.1 0 5.2-.4 5.2-2.2v-2.7h-5.3v-.8h7.4c2.1 0 2.6-2.1 2.6-4.3 0-2.3-.8-4.2-2.6-4.2h-1.5v2.1c0 1.8-1.5 3.3-3.3 3.3H9.4c-1.5 0-2.7 1.2-2.7 2.7v3.9c0 1.7 2.3 2.2 5.4 2.2zm1.8-1.8c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#FFD438"/>
    </svg>
  ),
  FastAPI: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#009688]">
      <circle cx="12" cy="12" r="10" fill="#009688" fillOpacity="0.2" stroke="#009688" strokeWidth="1.5"/>
      <path d="M12 2l-6 11h5l-1 9 7-12h-5l1-8z" fill="#009688"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#4169E1]">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2.5c2.6 0 4.8 1.4 6 3.5-.7-.4-1.6-.6-2.6-.6-2.8 0-5.1 2.2-5.1 5 0 .4.1.8.2 1.2-1.3-.2-2.4-.9-3.2-1.9-.3.9-.5 1.8-.5 2.8 0 1.7.6 3.3 1.6 4.5-2.7-1.4-4.4-4.2-4.4-7.5 0-4.4 3.6-7 8-7z"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#47A248]">
      <path d="M12 1.5s-6 5.5-6 11c0 4.2 3.1 7.7 7 8 0-1.5.3-3 .8-4.5.3-.9.7-1.8 1.2-2.6 1.8-2.9 2-5.4 1.5-7.4-.7-2.8-4.5-4.5-4.5-4.5zm.5 19.5c3.5-.5 6-3.7 6-7.5 0-3.3-2.1-6.6-4.5-8.5.5 2.5.2 5.2-1.5 8-.5.8-.9 1.7-1.2 2.6-.4 1.6-.7 3.5-.8 5.4h2z"/>
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#2496ED]">
      <path d="M13.9 8.2h2.2v2.2H13.9zm-3.3 0h2.2v2.2h-2.2zm-3.3 0h2.2v2.2H7.3zm-3.3 0H6.2v2.2H4zm6.6-3.3h2.2v2.2h-2.2zm-3.3 0h2.2v2.2H7.3zm6.6 0h2.2v2.2h-2.2zm3.3 3.3h2.2v2.2h-2.2zM23.5 12.3c-.6-.4-1.8-.5-2.7-.2-.2-.5-.5-1-1-1.3l-.6-.4-.4.6c-.7 1.1-.8 2.6-.2 3.8-1 .6-2.5.9-4.2.9H2.5c-.4 1.6.2 3.3 1.5 4.4 1.9 1.6 5.1 2.4 8.7 2.4 7.2 0 11.4-4.2 11.4-8.8 0-.4 0-.9-.6-1.4z"/>
    </svg>
  ),
  Redis: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#DC382D]">
      <path d="M12 2L2 7l10 5 10-5-10-5zm-8 7.3V14l8 4 8-4V9.3l-8 4-8-4zm0 6.7V20l8 4 8-4v-4l-8 4-8-4z"/>
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#F05032]">
      <path d="M21.6 10.9l-8.5-8.5c-.8-.8-2.1-.8-2.9 0L8.3 4.3l3.7 3.7c.9-.3 1.9-.1 2.5.6.7.7.8 1.7.5 2.6l3.6 3.6c.9-.3 1.9-.1 2.6.5.9.9.9 2.4 0 3.3-.9.9-2.4.9-3.3 0-.7-.7-.9-1.8-.5-2.7l-3.3-3.3v4.6c.3.2.6.5.7.9.5 1.1 0 2.4-1.1 2.9-1.1.5-2.4 0-2.9-1.1-.4-.8-.2-1.8.4-2.4V8.4c-.6-.6-.8-1.5-.4-2.4l-3.6-3.6-4.3 4.3c-.8.8-.8 2.1 0 2.9l8.5 8.5c.8.8 2.1.8 2.9 0l8.5-8.5c.8-.8.8-2.1 0-2.8z"/>
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#FF9900]">
      <path d="M12.9 10.8c-.2-.4-.5-.6-.9-.8-.5-.2-1.1-.3-1.9-.3-.8 0-1.5.1-2.1.4-.6.2-1 .6-1.3 1.1-.3.5-.5 1.1-.5 1.8 0 .8.2 1.4.6 2 .4.5.9.9 1.6 1.1.7.3 1.5.4 2.4.4 1 0 1.9-.2 2.6-.5.7-.4 1.3-.9 1.7-1.5v1.6h2.2V7.7h-2.2v3.1h-.2zm-2.2 4.1c-.6 0-1.1-.1-1.5-.4-.4-.3-.6-.7-.6-1.3 0-.6.2-1 .6-1.3.4-.3.9-.4 1.5-.4.6 0 1.1.1 1.5.4.4.3.6.7.6 1.3 0 .6-.2 1-.6 1.3-.4.3-.9.4-1.5.4zM22 16.5c-2.3 1.9-5.7 3-9.5 3-4.3 0-8.2-1.4-10.5-3.8-.2-.2-.1-.5.2-.4 3.7 1.8 8.1 2.8 12.6 2.4 3.1-.3 6-1.3 8.3-2.8.4-.3.8.2.4.6zm-1.4-1.8c-.3-.4-1.8-.2-2.5-.1-.2 0-.3-.2-.1-.3 1.3-.9 3.5-.7 3.8-.2.3.5-.1 2.7-1.3 3.8-.2.2-.4.1-.3-.1.4-.7.7-2.3.4-3.1z"/>
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
      <path d="M12 2L24 22H0L12 2Z" />
    </svg>
  ),
  VSCode: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#007ACC]">
      <path d="M17.6 2.3l-8.4 7.6-4.5-3.4L2 8.1l4.2 3.9L2 15.9l2.7 1.6 4.5-3.4 8.4 7.6 4.4-2.1V4.4l-4.4-2.1zm0 4.9v9.6l-5.6-4.8 5.6-4.8z"/>
    </svg>
  ),
  Postman: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#FF6C37]">
      <path d="M13.6 2.1c-5.8-.8-10.9 3.4-11.4 9.3-.5 5.5 3.3 10.4 8.7 11.2 5.8.8 10.9-3.4 11.4-9.3.5-5.5-3.3-10.4-8.7-11.2zm-2.8 17.5c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm6.5-9.8c-.2-.6-.7-1.1-1.3-1.3-.8-.3-1.7-.1-2.3.4l-2.4 2.1-1.3-1.1c-.6-.5-1.5-.5-2.1 0-.6.5-.6 1.4 0 2l2.3 2c.3.3.7.4 1.1.4s.8-.1 1.1-.4l3.5-3.1c.3-.3.4-.7.4-1z"/>
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <path d="M8 2h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#F24E1E"/>
      <path d="M12 2h4a2.5 2.5 0 0 1 0 5h-4V2z" fill="#FF7262"/>
      <path d="M8 7h4v5H8a2.5 2.5 0 0 1 0-5z" fill="#A259FF"/>
      <path d="M12 7h4a2.5 2.5 0 0 1 0 5h-4V7z" fill="#1ABCFE"/>
      <path d="M8 12h4v5a2.5 2.5 0 0 1-4 0v-5z" fill="#0ACF83"/>
    </svg>
  ),
  Jupyter: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-[#F37626]">
      <path d="M12 3.5c-4.1 0-7.6 2.1-9.4 5.3 1.1-1.4 3-2.3 5.4-2.3 3.6 0 6.5 2 6.5 4.5s-2.9 4.5-6.5 4.5c-2.4 0-4.3-.9-5.4-2.3 1.8 3.2 5.3 5.3 9.4 5.3s7.6-2.1 9.4-5.3c-1.1 1.4-3 2.3-5.4 2.3-3.6 0-6.5-2-6.5-4.5s2.9-4.5 6.5-4.5c2.4 0 4.3.9 5.4 2.3-1.8-3.2-5.3-5.3-9.4-5.3z"/>
      <circle cx="5" cy="4" r="1.5" fill="#767676"/>
      <circle cx="19" cy="20" r="1.5" fill="#767676"/>
    </svg>
  ),
  AgenticAI: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-current text-[#A855F7]" fill="none" strokeWidth="1.8">
      <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v1.5a2 2 0 0 1-2 2 2 2 0 0 1-2-2V9.5C8.8 8.8 8 7.5 8 6a4 4 0 0 1 4-4z" stroke="currentColor"/>
      <path d="M6 14a3 3 0 0 0-3 3v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a3 3 0 0 0-3-3H6z" stroke="currentColor"/>
      <circle cx="12" cy="6" r="1.5" fill="currentColor"/>
      <path d="M12 15v3M9 17h6" stroke="currentColor" strokeLinecap="round"/>
    </svg>
  )
}

// 3 Major Tech Categories with Rich Highlights
const categoryNodes: CategoryNode[] = [
  {
    id: 'FRONTEND',
    name: 'FRONTEND DEVELOPMENT',
    shortTitle: 'Frontend',
    badge: 'Modern UI/UX & SPAs',
    description: 'High-performance, pixel-perfect responsive web applications built with modern frameworks and type safety.',
    highlights: [
      'Next.js 14 App Router & SSR Architecture',
      'React Component Lifecycle & Reactive State',
      'Tailwind CSS & Ultra-Responsive Layouts',
      'TypeScript Strict Type Safety'
    ],
    icon: Layers,
    color: 'from-violet-500 to-indigo-500',
    glow: 'rgba(139, 92, 246, 0.5)',
    count: 9
  },
  {
    id: 'BACKEND_AI',
    name: 'BACKEND & AI INTEGRATION',
    shortTitle: 'Backend & AI',
    badge: 'Autonomous Agents & Scalable APIs',
    description: 'Autonomous multi-agent AI systems, MCP protocol integration, scalable serverless backends, and vectorized search.',
    highlights: [
      'OpenAI Agents SDK & Autonomous Pipelines',
      'Model Context Protocol (MCP) Server Architecture',
      'FastAPI & Node.js Asynchronous Microservices',
      'PostgreSQL, MongoDB & Redis Caching'
    ],
    icon: Brain,
    color: 'from-purple-500 to-fuchsia-500',
    glow: 'rgba(168, 85, 247, 0.6)',
    count: 11
  },
  {
    id: 'SPECIALIZATION',
    name: 'SPECIALIZATION',
    shortTitle: 'Specialization',
    badge: 'Domain Architecture & SaaS',
    description: 'Full-cycle production grade solutions ranging from AI agent orchestration to cloud deployment pipelines.',
    highlights: [
      'Autonomous Workflow Automation',
      'Enterprise SaaS & E-Commerce Engineering',
      'Real-Time WebSockets & Streaming APIs',
      'Docker Containerization & CI/CD Deployment'
    ],
    icon: Sparkles,
    color: 'from-fuchsia-500 to-pink-500',
    glow: 'rgba(217, 70, 239, 0.5)',
    count: 5
  }
]

// 5-Tier Inverted Pyramid data structured precisely like the reference video
const pyramidTiers: TechItem[][] = [
  // Tier 1 (Widest Top Row - 9 items)
  [
    { id: 'js', name: 'JavaScript', label: 'JS', category: 'FRONTEND', categoryName: 'Frontend Core', level: 'Advanced / ES6+', description: 'Modern asynchronous JavaScript, closures, and DOM manipulation.', color: '#F7DF1E', glowColor: 'rgba(247, 223, 30, 0.4)', icon: TechIcons.JavaScript },
    { id: 'ts', name: 'TypeScript', label: 'TS', category: 'FRONTEND', categoryName: 'Frontend Core', level: 'Advanced', description: 'Strict type systems, generics, and enterprise architecture.', color: '#3178C6', glowColor: 'rgba(49, 120, 198, 0.4)', icon: TechIcons.TypeScript },
    { id: 'html', name: 'HTML5', label: 'HTML', category: 'FRONTEND', categoryName: 'Markup', level: 'Expert', description: 'Semantic HTML5 structure, accessibility (a11y), and SEO.', color: '#E34F26', glowColor: 'rgba(227, 79, 38, 0.4)', icon: TechIcons.HTML5 },
    { id: 'css', name: 'CSS3', label: 'CSS', category: 'FRONTEND', categoryName: 'Styling', level: 'Expert', description: 'Modern CSS Grid, Flexbox, keyframe animations, and styling.', color: '#1572B6', glowColor: 'rgba(21, 114, 182, 0.4)', icon: TechIcons.CSS3 },
    { id: 'react', name: 'React', label: 'React', category: 'FRONTEND', categoryName: 'Frontend Library', level: 'Expert / Hooks', description: 'Concurrent mode, hooks, custom states, and SPA design.', color: '#61DAFB', glowColor: 'rgba(97, 218, 251, 0.5)', icon: TechIcons.React },
    { id: 'next', name: 'Next.js', label: 'Next.js', category: 'FRONTEND', categoryName: 'Framework', level: 'App Router / SSR', description: 'Server Components, SSR/SSG, optimized image/font pipelines.', color: '#ffffff', glowColor: 'rgba(168, 85, 247, 0.6)', icon: TechIcons.Nextjs },
    { id: 'bootstrap', name: 'Bootstrap', label: 'Bootstrap', category: 'FRONTEND', categoryName: 'UI Framework', level: 'Advanced', description: 'Grid systems, responsive utilities, and rapid styling.', color: '#7952B3', glowColor: 'rgba(121, 82, 179, 0.4)', icon: TechIcons.Bootstrap },
    { id: 'node', name: 'Node.js', label: 'Node.js', category: 'BACKEND_AI', categoryName: 'Runtime', level: 'Advanced', description: 'Asynchronous event loop, REST APIs, and file systems.', color: '#339933', glowColor: 'rgba(51, 153, 51, 0.4)', icon: TechIcons.Nodejs },
    { id: 'tailwind', name: 'Tailwind CSS', label: 'Tailwind', category: 'FRONTEND', categoryName: 'CSS Framework', level: 'Expert', description: 'Utility-first styling, design tokens, and glassmorphism.', color: '#38BDF8', glowColor: 'rgba(56, 189, 248, 0.5)', icon: TechIcons.Tailwind },
  ],
  // Tier 2 (Upper Middle Row - 7 items)
  [
    { id: 'openai', name: 'OpenAI Agents SDK', label: 'OpenAI', category: 'BACKEND_AI', categoryName: 'AI Architecture', level: 'Expert Agents SDK', description: 'Autonomous agent loops, tool calling, and structured outputs.', color: '#10A37F', glowColor: 'rgba(16, 163, 127, 0.5)', icon: TechIcons.OpenAI },
    { id: 'mcp', name: 'MCP Server', label: 'MCP', category: 'BACKEND_AI', categoryName: 'AI Protocols', level: 'Specialized Server', description: 'Model Context Protocol server implementations and tool routing.', color: '#D97706', glowColor: 'rgba(217, 119, 6, 0.4)', icon: TechIcons.MCPServer },
    { id: 'python', name: 'Python', label: 'Python', category: 'BACKEND_AI', categoryName: 'Programming', level: 'Advanced', description: 'Backend automation, data wrangling, and AI model orchestration.', color: '#3776AB', glowColor: 'rgba(55, 118, 171, 0.4)', icon: TechIcons.Python },
    { id: 'fastapi', name: 'FastAPI', label: 'FastAPI', category: 'BACKEND_AI', categoryName: 'Backend API', level: 'High-Performance', description: 'Async endpoints, Pydantic validation, and OpenAPI documentation.', color: '#009688', glowColor: 'rgba(0, 150, 136, 0.4)', icon: TechIcons.FastAPI },
    { id: 'postgres', name: 'PostgreSQL', label: 'PostgreSQL', category: 'BACKEND_AI', categoryName: 'Database', level: 'Advanced SQL', description: 'Relational data modeling, indexing, and vector extensions.', color: '#4169E1', glowColor: 'rgba(65, 105, 225, 0.4)', icon: TechIcons.PostgreSQL },
    { id: 'mongo', name: 'MongoDB', label: 'MongoDB', category: 'BACKEND_AI', categoryName: 'Database', level: 'Advanced NoSQL', description: 'Document stores, aggregation pipelines, and Mongoose schemas.', color: '#47A248', glowColor: 'rgba(71, 162, 72, 0.4)', icon: TechIcons.MongoDB },
    { id: 'docker', name: 'Docker', label: 'Docker', category: 'SPECIALIZATION', categoryName: 'DevOps / Containers', level: 'Containerization', description: 'Multi-stage container builds, Compose environments, and deployment.', color: '#2496ED', glowColor: 'rgba(36, 150, 237, 0.4)', icon: TechIcons.Docker },
  ],
  // Tier 3 (Middle Row - 5 items)
  [
    { id: 'redis', name: 'Redis', label: 'Redis', category: 'BACKEND_AI', categoryName: 'In-Memory Cache', level: 'Fast Caching', description: 'Session caching, rate limiting, and pub/sub message queues.', color: '#DC382D', glowColor: 'rgba(220, 56, 45, 0.4)', icon: TechIcons.Redis },
    { id: 'git', name: 'Git', label: 'Git', category: 'SPECIALIZATION', categoryName: 'Version Control', level: 'Advanced', description: 'Branch management, rebasing, and atomic versioning.', color: '#F05032', glowColor: 'rgba(240, 80, 50, 0.4)', icon: TechIcons.Git },
    { id: 'github', name: 'GitHub', label: 'GitHub', category: 'SPECIALIZATION', categoryName: 'Collaboration / CI', level: 'Expert', description: 'GitHub Actions, automated workflows, and repository management.', color: '#ffffff', glowColor: 'rgba(168, 85, 247, 0.5)', icon: TechIcons.GitHub },
    { id: 'aws', name: 'AWS Cloud', label: 'AWS', category: 'SPECIALIZATION', categoryName: 'Cloud Platform', level: 'S3 & Serverless', description: 'Cloud infrastructure, S3 buckets, and lambda integration.', color: '#FF9900', glowColor: 'rgba(255, 153, 0, 0.4)', icon: TechIcons.AWS },
    { id: 'vercel', name: 'Vercel', label: 'Vercel', category: 'SPECIALIZATION', categoryName: 'Edge Deployment', level: 'CI/CD & Serverless', description: 'Edge networks, instant preview deployments, and analytics.', color: '#ffffff', glowColor: 'rgba(255, 255, 255, 0.4)', icon: TechIcons.Vercel },
  ],
  // Tier 4 (Lower Middle Row - 3 items)
  [
    { id: 'vscode', name: 'VS Code', label: 'VS Code', category: 'SPECIALIZATION', categoryName: 'IDE Environment', level: 'Primary Editor', description: 'Custom extension stack, debugger integration, and CLI tools.', color: '#007ACC', glowColor: 'rgba(0, 122, 204, 0.4)', icon: TechIcons.VSCode },
    { id: 'postman', name: 'Postman', label: 'Postman', category: 'BACKEND_AI', categoryName: 'API Testing', level: 'REST & Automation', description: 'API contract testing, environment variables, and mocking.', color: '#FF6C37', glowColor: 'rgba(255, 108, 55, 0.4)', icon: TechIcons.Postman },
    { id: 'figma', name: 'Figma', label: 'Figma', category: 'FRONTEND', categoryName: 'UI/UX Design', level: 'Wireframing & UI', description: 'Component design systems, responsive auto-layout, and prototypes.', color: '#A259FF', glowColor: 'rgba(162, 89, 255, 0.4)', icon: TechIcons.Figma },
  ],
  // Tier 5 (Bottom Anchor Item - 1 item)
  [
    { id: 'agentic', name: 'Agentic AI Systems', label: 'Agentic AI', category: 'BACKEND_AI', categoryName: 'Autonomous Systems', level: 'Production-Grade Workflows', description: 'Autonomous agent loop orchestration, memory stores, and real-time reasoning engines.', color: '#A855F7', glowColor: 'rgba(168, 85, 247, 0.7)', icon: TechIcons.AgenticAI },
  ]
]

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'FRONTEND' | 'BACKEND_AI' | 'SPECIALIZATION'>('ALL')
  const [activeTooltip, setActiveTooltip] = useState<TechItem | null>(null)

  // Interactive spotlight tracker
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const selectedCategoryData = categoryNodes.find((c) => c.id === activeCategory)

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setActiveTooltip(null)
      }}
      className="relative max-w-7xl mx-auto py-10 sm:py-16 px-2 sm:px-6 lg:px-8 overflow-hidden select-none rounded-3xl"
    >
      {/* ========================================================= */}
      {/* 🌐 1. SLEEK INTERACTIVE BACKGROUND MATRIX & GRID         */}
      {/* ========================================================= */}

      {/* Cyber Grid Lines Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 -z-20 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(168, 85, 247, 0.09) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.09) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, #000 40%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 35%, #000 40%, transparent 85%)'
        }}
      />

      {/* Top Epicenter Radial Spotlight (Laser Cone Origin) */}
      <div 
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[750px] sm:w-[950px] lg:w-[1200px] h-[650px] rounded-full blur-[120px] opacity-75 transition-opacity duration-700 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 12%, rgba(168, 85, 247, 0.48) 0%, rgba(139, 92, 246, 0.24) 35%, rgba(109, 40, 217, 0.08) 65%, transparent 80%)'
        }}
      />

      {/* Dramatic Conic Light Beam extending downwards */}
      <div 
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-[750px] opacity-45 blur-[55px] -z-10"
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 58deg, rgba(168, 85, 247, 0.38) 82deg, rgba(216, 180, 254, 0.55) 90deg, rgba(168, 85, 247, 0.38) 98deg, transparent 122deg)'
        }}
      />

      {/* Ambient Cyber Wing Glows */}
      <div className="pointer-events-none absolute top-1/3 -left-12 w-80 h-80 bg-purple-900/25 rounded-full blur-[100px] -z-10" />
      <div className="pointer-events-none absolute top-1/3 -right-12 w-80 h-80 bg-violet-900/25 rounded-full blur-[100px] -z-10" />

      {/* Dynamic Cursor Flashlight Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2 blur-[85px] transition-all duration-150 ease-out -z-10"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(139, 92, 246, 0.12) 42%, transparent 70%)',
          }}
        />
      )}

      {/* ========================================================= */}
      {/* 🏷️ 2. DUAL-TONE SECTION HEADER                           */}
      {/* ========================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 relative z-10"
      >
        <h2 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 inline-block"
          style={{ fontFamily: 'var(--font-jetbrains)' }}
        >
          <span className="text-white">Skills & </span>
          <span className="gradient-accent heading-glow">Expertise</span>
        </h2>
        
        {/* Luminous Center Accent Flare */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-purple-500/40 to-purple-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc] animate-pulse" />
          <div className="h-[1px] w-16 sm:w-32 bg-gradient-to-l from-transparent via-purple-500/40 to-purple-500/80" />
        </div>

        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-mono tracking-tight px-4">
          Production-grade technologies, autonomous AI frameworks, and architectural proficiencies
        </p>
      </motion.div>

      {/* ========================================================= */}
      {/* ⚡ 3. FLOATING / GLOWING TECH CATEGORY NODES              */}
      {/* ========================================================= */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10 relative z-20 px-2">
        {/* ALL TECHNOLOGIES Master Node */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setActiveCategory('ALL')}
          className={`
            relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl font-mono text-xs sm:text-sm font-semibold transition-all duration-300 backdrop-blur-xl border
            ${activeCategory === 'ALL'
              ? 'bg-purple-600/30 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]'
              : 'bg-slate-900/60 border-purple-500/20 text-slate-300 hover:border-purple-400/50 hover:bg-slate-900/80 hover:text-white'
            }
          `}
        >
          <LayoutGrid className="w-4 h-4 text-purple-400" />
          <span>ALL TECHNOLOGIES</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
            25
          </span>
        </motion.button>

        {/* Dynamic Category Nodes */}
        {categoryNodes.map((node) => {
          const isCurrentActive = activeCategory === node.id
          const NodeIcon = node.icon

          return (
            <motion.button
              key={node.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveCategory(isCurrentActive ? 'ALL' : node.id)}
              className={`
                group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl font-mono text-xs sm:text-sm font-semibold transition-all duration-300 backdrop-blur-xl border
                ${isCurrentActive
                  ? 'bg-purple-600/30 border-purple-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.6)]'
                  : 'bg-slate-900/60 border-purple-500/20 text-slate-300 hover:border-purple-400/50 hover:bg-slate-900/80 hover:text-white'
                }
              `}
            >
              {/* Glowing Indicator Dot */}
              <span className={`w-2 h-2 rounded-full transition-all duration-300 ${isCurrentActive ? 'bg-purple-300 shadow-[0_0_8px_#d8b4fe] animate-pulse' : 'bg-purple-500/50 group-hover:bg-purple-400'}`} />

              <NodeIcon className={`w-4 h-4 transition-colors ${isCurrentActive ? 'text-purple-300' : 'text-purple-400 group-hover:text-purple-200'}`} />
              <span className="tracking-tight">{node.name}</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30">
                {node.count}
              </span>
            </motion.button>
          )
        })}
      </div>

      {/* Category Info Highlight Card (When a Category is Selected) */}
      <AnimatePresence>
        {selectedCategoryData && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <div className="max-w-4xl mx-auto p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-xl shadow-lg shadow-purple-950/40">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    {React.createElement(selectedCategoryData.icon, { className: "w-5 h-5 text-purple-300" })}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base font-mono">{selectedCategoryData.name}</h3>
                    <p className="text-slate-400 text-xs">{selectedCategoryData.description}</p>
                  </div>
                </div>
                <span className="self-start sm:self-center px-3 py-1 text-xs font-mono rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 whitespace-nowrap">
                  {selectedCategoryData.badge}
                </span>
              </div>

              {/* Category Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-1">
                {selectedCategoryData.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 🔺 4. TIERED INVERTED PYRAMID OF TECH STACK SQUIRCLES    */}
      {/* ========================================================= */}
      <div className="flex flex-col items-center justify-center gap-3.5 sm:gap-4 md:gap-5 relative z-10 px-2 sm:px-4">
        {pyramidTiers.map((tier, tierIndex) => (
          <motion.div
            key={tierIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: tierIndex * 0.1, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 max-w-full"
          >
            {tier.map((item) => {
              const isItemActive = activeTooltip?.id === item.id
              const isCategoryMatch = activeCategory === 'ALL' || item.category === activeCategory

              return (
                <div key={item.id} className="relative group">
                  <motion.div
                    whileHover={{ 
                      scale: 1.15, 
                      y: -8,
                      transition: { type: "spring", stiffness: 450, damping: 17 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setActiveTooltip(item)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    className={`
                      relative flex flex-col items-center justify-center
                      w-[68px] h-[68px] sm:w-[80px] sm:h-[80px] md:w-[90px] md:h-[90px]
                      rounded-2xl sm:rounded-3xl cursor-pointer select-none
                      transition-all duration-300 backdrop-blur-xl
                      ${!isCategoryMatch ? 'opacity-30 grayscale hover:opacity-100 hover:grayscale-0' : 'opacity-100'}
                      ${isItemActive 
                        ? 'bg-slate-900/95 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.8)]' 
                        : isCategoryMatch && activeCategory !== 'ALL'
                        ? 'bg-purple-950/40 border-purple-400/60 shadow-[0_0_20px_rgba(168,85,247,0.35)]'
                        : 'bg-[#0c0618]/80 border-purple-500/20 hover:border-purple-400/80 hover:bg-slate-900/90 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]'
                      }
                      border
                    `}
                    style={{
                      boxShadow: isItemActive 
                        ? `0 0 30px ${item.glowColor}, inset 0 0 15px rgba(168, 85, 247, 0.35)`
                        : undefined
                    }}
                  >
                    {/* Subtle Top Edge Highlight Flare */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/70 to-transparent rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />

                    {/* Tech Icon */}
                    <div className="flex items-center justify-center p-1 sm:p-1.5 transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>

                    {/* Card Label */}
                    <span 
                      className="text-[9px] sm:text-[10px] md:text-[11px] font-mono font-medium text-slate-300 group-hover:text-white transition-colors tracking-tight text-center px-1 truncate max-w-full"
                    >
                      {item.label}
                    </span>

                    {/* Ambient Radial Hover Aura */}
                    <div 
                      className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${item.glowColor} 0%, transparent 75%)`
                      }}
                    />
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 💬 5. FLOATING INTERACTIVE TECH INFO BADGE                */}
      {/* ========================================================= */}
      <div className="min-h-[70px] flex items-center justify-center mt-8 sm:mt-12 relative z-20">
        <AnimatePresence mode="wait">
          {activeTooltip ? (
            <motion.div
              key={activeTooltip.id}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-6 py-3 rounded-2xl bg-slate-900/95 border border-purple-500/50 backdrop-blur-xl shadow-2xl shadow-purple-950/70 text-center sm:text-left max-w-2xl"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] animate-ping" />
                <span className="font-bold text-white font-mono text-sm sm:text-base">{activeTooltip.name}</span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {activeTooltip.level}
                </span>
              </div>
              
              <div className="text-xs text-slate-300 font-mono hidden sm:block">
                <span className="text-purple-400">•</span> {activeTooltip.description}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-slate-500 text-xs font-mono tracking-wider uppercase flex items-center gap-2 bg-slate-950/40 px-4 py-2 rounded-full border border-purple-500/10"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              Click category nodes to filter • Hover badges for architectural insights
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  )
}
