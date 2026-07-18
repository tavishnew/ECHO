import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ClayButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const ClayButton = forwardRef<HTMLButtonElement, ClayButtonProps>(
  ({ children, className, variant = 'default', size = 'md', ...props }, ref) => {
    
    const variants = {
      default: 'clay-btn bg-card text-foreground',
      primary: 'clay-btn-primary',
      secondary: 'clay-btn-secondary',
      accent: 'clay-btn-sky',
      ghost: 'bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-colors'
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg font-semibold',
      icon: 'p-3'
    };

    return (
      <motion.button
        ref={ref}
        whileHover={variant !== 'ghost' ? { scale: 1.02 } : {}}
        whileTap={variant !== 'ghost' ? { scale: 0.95 } : { scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center font-medium outline-none disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);
ClayButton.displayName = "ClayButton";
