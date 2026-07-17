import { Link, useLocation } from 'wouter';
import { useAppStore } from '@/lib/store';
import { ClayButton } from '@/components/ui/clay-button';
import { Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/i18n';

const guestLinks = [
  { to: '/', key: 'home' },
  { to: '/tutor', key: 'tutor' },
  { to: '/rewards', key: 'rewards' },
  { to: '/pricing', key: 'pricing' },
];

export function Navbar() {
  const { state } = useAppStore();
  const [location] = useLocation();
  const t = useT();

  // The top navbar is the guest navigation surface. Authenticated users get the
  // sidebar instead, so once a user is signed in this bar is hidden entirely.
  if (state.user) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-ink/5"
      style={{
        backgroundColor: 'rgba(234,232,228,0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto h-20 px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-primary text-primary-foreground clay-btn group-hover:scale-105 transition-transform">
            <Mic className="w-5 h-5" strokeWidth={2.4} />
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight text-primary">
            ECHO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {guestLinks.map((l) => {
            const active = location === l.to;
            return (
              <Link
                key={l.to}
                href={l.to}
                className={cn(
                  'text-[15px] font-medium transition-colors',
                  active ? 'text-primary font-semibold' : 'text-ink-muted hover:text-ink'
                )}
              >
                {t('nav.' + l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <button
              type="button"
              className="clay-btn-sky px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            >
              {t('nav.login')}
            </button>
          </Link>
          <Link href="/signup">
            <ClayButton
              variant="primary"
              size="sm"
              className="px-6 transition-transform hover:scale-105 active:scale-95"
            >
              {t('nav.signin')}
            </ClayButton>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
