import { Mic } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const buttonVariants: Variants = {
  idle: { scale: 1 },
  listening: {
    scale: [1, 1.1, 1],
    transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
  },
};

export function VoiceButton({
  isListening,
  disabled,
  onClick,
}: {
  isListening: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="relative group">
      <motion.button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={isListening ? 'Stop listening' : 'Start microphone'}
        aria-pressed={isListening}
        aria-disabled={disabled}
        aria-describedby={disabled ? 'voice-unsupported-tip' : undefined}
        variants={buttonVariants}
        animate={isListening ? 'listening' : 'idle'}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={cn(
          'relative w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 outline-none',
          'focus-visible:ring-2 focus-visible:ring-primary/50',
          disabled ? 'opacity-40 cursor-not-allowed' : '',
          isListening ? 'bg-destructive text-white' : 'clay-btn bg-card text-foreground'
        )}
      >
        {/* Ring-pulse matching the orb's visual language while listening (ISSUE-033). */}
        {isListening && (
          <>
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-destructive/30"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            />
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-destructive/20"
              animate={{ scale: [1, 2], opacity: [0.4, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }}
            />
          </>
        )}
        <Mic className="w-6 h-6 relative" />
      </motion.button>

      {/* Explanatory tooltip for the unsupported / disabled state (ISSUE-034). */}
      {disabled && (
        <div
          id="voice-unsupported-tip"
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none z-50"
        >
          Voice input is not supported in this browser. Try Chrome or Edge.
        </div>
      )}
    </div>
  );
}
