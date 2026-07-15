import { Link } from 'wouter';
import { Mic } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-ink/5 mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl flex items-center justify-center bg-primary text-primary-foreground clay-btn">
            <Mic className="w-4 h-4" />
          </div>
          <span className="font-display text-xl font-extrabold text-primary">ECHO</span>
        </div>
        <p className="text-sm text-ink-subtle text-center max-w-md">
          A warm, voice-first AI tutor for children. Safe. Multilingual. Inclusive.
        </p>
        <div className="flex items-center gap-6 text-sm text-ink-muted">
          <Link href="/pricing" className="hover:text-ink transition-colors">
            Pricing
          </Link>
          <Link href="/tutor" className="hover:text-ink transition-colors">
            Tutor
          </Link>
          <span className="text-ink-subtle">© {new Date().getFullYear()} ECHO Learning</span>
        </div>
      </div>
    </footer>
  );
}
