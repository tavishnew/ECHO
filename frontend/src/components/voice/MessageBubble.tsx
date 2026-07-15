import { Bot, Volume2, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Props {
  role: 'user' | 'assistant';
  content: string;
  isSpeaking?: boolean;
  speakable?: boolean;
  onSpeak?: () => void;
  onStop?: () => void;
}

export function MessageBubble({
  role,
  content,
  isSpeaking,
  speakable,
  onSpeak,
  onStop,
}: Props) {
  const isUser = role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      {isUser ? (
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-card p-0.5 shadow-sm">
          <img src="/user.png" alt="" className="w-full h-full object-cover rounded-full" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-sage text-white clay-circle shadow-sm">
          <Bot className="w-6 h-6" />
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl p-4',
          isUser ? 'bg-primary/10 rounded-tr-none' : 'bg-card-border/30 rounded-tl-none'
        )}
      >
        <p className="text-lg leading-relaxed whitespace-pre-wrap">{content}</p>
        {!isUser && speakable && (
          isSpeaking ? (
            <button
              onClick={onStop}
              aria-label="Stop speaking"
              className="mt-3 text-muted-foreground hover:text-destructive flex items-center gap-1 text-sm font-semibold"
            >
              <Square className="w-4 h-4" /> Stop
            </button>
          ) : (
            <button
              onClick={onSpeak}
              aria-label="Read aloud"
              className="mt-3 text-muted-foreground hover:text-sage flex items-center gap-1 text-sm font-semibold"
            >
              <Volume2 className="w-4 h-4" /> Listen
            </button>
          )
        )}
      </div>
    </motion.div>
  );
}
