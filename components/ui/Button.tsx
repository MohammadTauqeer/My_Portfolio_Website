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
      primary: 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20',
      secondary: 'glass-effect hover:bg-slate-800/50',
      gradient: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white',
      ghost: 'hover:bg-slate-800/30 text-slate-300 hover:text-white'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className)
    
    if ('as' in props && props.as === 'a') {
      const { as, ...anchorProps } = props as AnchorProps
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

    const { as, ...buttonProps } = props as ButtonProps
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
