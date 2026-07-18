import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3" aria-label="ECHO is thinking" role="status">
      <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-sage-dark text-white clay-circle">
        <Bot className="w-6 h-6" />
      </div>
      <div className="bg-card-border/30 rounded-2xl rounded-tl-none p-4 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
