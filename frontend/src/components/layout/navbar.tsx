import { Link, useLocation } from 'wouter';
import { useAppStore } from '@/lib/store';
import { ClayButton } from '@/components/ui/clay-button';
import { Mic, Sparkles } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const authedLinks = [
  { to: '/dashboard', label: 'Home' },
  { to: '/tutor', label: 'Tutor' },
  { to: '/rewards', label: 'Rewards' },
  { to: '/pricing', label: 'Pricing' },
];

const guestLinks = [
  { to: '/', label: 'Home' },
  { to: '/tutor', label: 'Tutor' },
  { to: '/rewards', label: 'Rewards' },
];

export function Navbar() {
  const { state } = useAppStore();
  const [location] = useLocation();
  const isAuth = !!state.user;

  // Auto-hide on scroll-down, reveal on scroll-up or hover.
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest < 80) {
      setHidden(false);
      return;
    }
    if (latest > prev + 6) {
      setHidden(true);
    } else if (latest < prev - 6) {
      setHidden(false);
    }
  });

  const visible = !hidden || hovered;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: visible ? 0 : '-115%', opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-ink/5"
      style={{
        backgroundColor: 'rgba(234,232,228,0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto h-20 px-4 md:px-6 flex items-center justify-between">
        <Link href={isAuth ? '/dashboard' : '/'} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-primary text-primary-foreground clay-btn group-hover:scale-105 transition-transform">
            <Mic className="w-5 h-5" strokeWidth={2.4} />
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight text-primary">
            ECHO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {(isAuth ? authedLinks : guestLinks).map((l) => {
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
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {isAuth ? (
            <Link href="/tutor">
              <ClayButton
                variant={location === '/tutor' ? 'primary' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Talk to ECHO</span>
              </ClayButton>
            </Link>
          ) : (
            <>
              {/* Pricing + Log in sit beside Sign in, each a distinct accent colour */}
              <Link href="/pricing">
                <button
                  type="button"
                  className="clay-btn-sage px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                >
                  Pricing
                </button>
              </Link>
              <Link href="/login">
                <button
                  type="button"
                  className="clay-btn-sky px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
                >
                  Log in
                </button>
              </Link>
              <Link href="/signup">
                <ClayButton
                  variant="primary"
                  size="sm"
                  className="px-6 transition-transform hover:scale-105 active:scale-95"
                >
                  Sign in
                </ClayButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
