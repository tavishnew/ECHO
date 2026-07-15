import { LANGUAGES } from '@/lib/languages';
import { Globe } from 'lucide-react';

export function LanguageSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (code: string) => void;
}) {
  return (
    <div className="relative inline-flex items-center">
      <Globe className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select language"
        className="appearance-none clay-input pl-9 pr-8 h-11 rounded-full bg-card text-foreground cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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
