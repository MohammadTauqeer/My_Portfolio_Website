'use client'

import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/theme/ThemeProvider'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme()

  if (!mounted) {
    // Skeleton placeholder with matching dimensions to prevent layout shift
    return (
      <div
        className={`w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 animate-pulse ${className}`}
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 group
        ${
          isDark
            ? 'bg-slate-900/80 hover:bg-slate-800 text-amber-400 border border-purple-500/30 hover:border-amber-400/50 shadow-md shadow-purple-950/30 hover:shadow-amber-500/20'
            : 'bg-white/90 hover:bg-purple-50 text-purple-700 border border-purple-300 hover:border-purple-400 shadow-sm hover:shadow-md hover:shadow-purple-200/50'
        }
        hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${className}`}
    >
      {/* Soft background glow */}
      <span
        className={`absolute inset-0 rounded-xl blur-sm opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${
          isDark ? 'bg-amber-400' : 'bg-purple-600'
        }`}
      />

      <span className="relative flex items-center gap-2">
        <span className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
          {/* Sun icon */}
          <Sun
            className={`w-5 h-5 transition-all duration-500 transform ${
              isDark
                ? 'rotate-0 scale-100 opacity-100 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]'
                : 'rotate-90 scale-0 opacity-0 absolute text-amber-500'
            }`}
          />

          {/* Moon icon */}
          <Moon
            className={`w-5 h-5 transition-all duration-500 transform ${
              !isDark
                ? 'rotate-0 scale-100 opacity-100 text-purple-700 drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]'
                : '-rotate-90 scale-0 opacity-0 absolute text-slate-400'
            }`}
          />
        </span>

        {showLabel && (
          <span className="text-xs font-medium font-mono select-none">
            {isDark ? 'LIGHT' : 'DARK'}
          </span>
        )}
      </span>
    </button>
  )
}
