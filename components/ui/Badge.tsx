import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Badge({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}: BadgeProps) {
  const baseStyles = 'inline-block rounded-full font-semibold border backdrop-blur-sm'
  
  const variants = {
    primary: 'bg-blue-500/10 dark:bg-blue-500/20 border-blue-400/40 dark:border-blue-500/30 text-blue-700 dark:text-blue-300',
    secondary: 'bg-slate-100 dark:bg-slate-500/20 border-slate-300 dark:border-slate-500/30 text-slate-700 dark:text-slate-300',
    success: 'bg-emerald-500/10 dark:bg-green-500/20 border-emerald-400/40 dark:border-green-500/30 text-emerald-700 dark:text-green-400',
    warning: 'bg-yellow-500/10 dark:bg-yellow-500/20 border-yellow-400/40 dark:border-yellow-500/30 text-yellow-700 dark:text-yellow-400',
    danger: 'bg-rose-500/10 dark:bg-red-500/20 border-rose-400/40 dark:border-red-500/30 text-rose-700 dark:text-red-400',
    info: 'bg-purple-500/10 dark:bg-purple-500/20 border-purple-400/40 dark:border-purple-500/30 text-purple-700 dark:text-purple-400'
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  return (
    <span 
      className={cn(baseStyles, variants[variant], sizes[size], className)} 
      {...props}
    >
      {children}
    </span>
  )
}
