import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ClayCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const ClayCard = forwardRef<HTMLDivElement, ClayCardProps>(
  ({ children, className, as = motion.div, ...props }, ref) => {
    const Component = as as any;
    return (
      <Component
        ref={ref}
        className={cn("clay-card p-6 md:p-8", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
ClayCard.displayName = "ClayCard";
