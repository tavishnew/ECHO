import { Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isListening ? 'Stop listening' : 'Start microphone'}
      aria-pressed={isListening}
      className={cn(
        'w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all outline-none',
        'focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-40 disabled:pointer-events-none',
        isListening
          ? 'bg-destructive text-white animate-pulse'
          : 'clay-btn bg-card text-foreground hover:scale-105'
      )}
    >
      <Mic className="w-6 h-6" />
    </button>
  );
}
