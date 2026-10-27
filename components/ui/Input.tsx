import { InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
            {label} {props.required && <span className="text-purple-600 dark:text-purple-400">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-600/80 dark:text-purple-400/80 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 bg-white/90 dark:bg-black/60 border border-purple-300/80 dark:border-purple-500/20 rounded-xl text-slate-900 dark:text-white',
              'focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 shadow-sm dark:shadow-none',
              'placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm md:text-base',
              icon && 'pl-11',
              error && 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="text-rose-600 dark:text-rose-400 text-xs mt-1.5 flex items-center gap-1 font-medium">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
