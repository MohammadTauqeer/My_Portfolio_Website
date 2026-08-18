import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'gradient' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' }
type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

type Props = ButtonProps | AnchorProps

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'font-medium transition-all duration-300 rounded-xl inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25',
      secondary: 'glass-effect hover:bg-purple-500/10 hover:border-purple-500/40 text-slate-200',
      gradient: 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50',
      ghost: 'hover:bg-purple-500/10 text-slate-300 hover:text-purple-200'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className)
    
    if ('as' in props && props.as === 'a') {
      const { as: _as, ...anchorProps } = props as AnchorProps
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={combinedClassName}
          {...anchorProps}
        >
          {children}
        </a>
      )
    }

    const { as: _as, ...buttonProps } = props as ButtonProps
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...buttonProps}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
