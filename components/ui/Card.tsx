import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glass?: boolean
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, glass = true, children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl p-8'
    const glassStyles = glass ? 'glass-effect' : 'bg-white/90 dark:bg-slate-900 border border-purple-200 dark:border-slate-800 text-slate-900 dark:text-white'
    const hoverStyles = hover ? 'hover:border-purple-400 dark:hover:border-slate-700/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md' : ''
    
    return (
      <div
        ref={ref}
        className={cn(baseStyles, glassStyles, hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
