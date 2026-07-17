import { LANGUAGES } from '@/lib/languages';
import { Globe } from 'lucide-react';
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
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select language"
        className="appearance-none clay-input pl-3 pr-8 h-9 md:h-11 rounded-full bg-card text-foreground cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 max-w-full"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native} · {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
