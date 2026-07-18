import { useState } from 'react';
import { LANGUAGES } from '@/lib/languages';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function LanguageSelector({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = LANGUAGES.find((l) => l.code === value) ?? LANGUAGES[0];

  return (
    <div className={cn('relative inline-flex items-center', className)}>
      <Globe className="w-4 h-4 text-muted-foreground shrink-0 absolute left-3 pointer-events-none" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="clay-btn flex items-center gap-2 pl-8 pr-7 h-8 md:h-10 rounded-full bg-card text-foreground cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 max-w-full text-sm"
      >
        {/* Re-animate the label on language change for clear feedback (ISSUE-032). */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={selected.code}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="truncate text-sm"
          >
            {selected.native} · {selected.name}
          </motion.span>
        </AnimatePresence>
        <ChevronDown
          className={cn('w-3 h-3 transition-transform shrink-0', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {/* Custom clay dropdown replaces the unstyleable native <select> (ISSUE-031). */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            role="listbox"
            aria-label="Select language"
            className="absolute top-full mt-2 clay-card p-2 w-56 z-50 max-h-72 overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-card)' }}
          >
            {LANGUAGES.map((l) => {
              const active = l.code === value;
              return (
                <li key={l.code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(l.code);
                      setOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center justify-between gap-2',
                      active ? 'bg-primary/10 text-primary font-semibold' : 'text-foreground hover:bg-black/5 dark:hover:bg-white/5'
                    )}
                  >
                    <span className="truncate">{l.native} · {l.name}</span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
