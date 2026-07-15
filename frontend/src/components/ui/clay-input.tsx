import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ClayInputProps extends HTMLMotionProps<"input"> {
  className?: string;
}

export const ClayInput = forwardRef<HTMLInputElement, ClayInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <motion.input
        ref={ref}
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "clay-input w-full px-5 py-4 text-base placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
ClayInput.displayName = "ClayInput";
