import { Link, useLocation } from 'wouter';
import { useAppStore } from '@/lib/store';
import { ClayButton } from '@/components/ui/clay-button';
import { Mic, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/i18n';
import { useState, useEffect, useRef } from 'react';

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  show: { opacity: 1, y: 0 },
};

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // Auto-hide the bar when scrolling down; reveal on scroll up or near the top.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= 10) {
        setHidden(false);
      } else if (y > lastY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The top navbar is the guest navigation surface: it renders on every route
  // while the visitor is NOT signed in. Once the user logs in / signs up it is
  // hidden and the in-app Sidebar takes over (see sidebar.tsx). It still
  // auto-hides on scroll-down and reveals on scroll-up / top-hover.
  if (state.user) return null;

  return (
    <>
      {/* Thin hover zone at the very top that reveals the bar when it is hidden
          (the bar itself is translated off-screen, so it can't be hovered). */}
      <div
        aria-hidden="true"
        onMouseEnter={() => setHidden(false)}
        className={cn(
          'fixed top-0 left-0 right-0 h-4 z-[60]',
          hidden ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      />
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: hidden ? '-100%' : 0, opacity: hidden ? 0 : 1 }}
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
          <span className="font-display text-lg font-bold tracking-tight text-primary">
            ECHO
          </span>
        </Link>

        {/* Desktop nav — links fade/slide in with a stagger (ISSUE-006) and
            lift on hover (ISSUE-005). */}
        <motion.nav
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="hidden md:flex items-center gap-8"
        >
          {guestLinks.map((l) => {
            const active = location === l.to;
            return (
              <motion.div key={l.to} variants={itemVariants}>
                <Link
                  href={l.to}
                  className={cn(
                    'relative text-[15px] font-medium transition-colors',
                    active ? 'text-primary font-semibold' : 'text-ink-muted hover:text-ink'
                  )}
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className="inline-block"
                  >
                    {t('nav.' + l.key)}
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        <div className="flex items-center gap-3">
          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
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

          {/* Mobile hamburger — provides navigation for guest users on small
              screens, where the desktop nav is hidden (ISSUE-004). */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden w-11 h-11 rounded-2xl flex items-center justify-center clay-btn text-ink"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-ink/5"
            style={{
              backgroundColor: 'rgba(234,232,228,0.96)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {guestLinks.map((l) => {
                const active = location === l.to;
                return (
                  <Link
                    key={l.to}
                    href={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'px-4 py-3 rounded-2xl text-[15px] font-semibold transition-colors',
                      active ? 'bg-primary/10 text-primary' : 'text-ink-muted hover:text-ink hover:bg-white'
                    )}
                  >
                    {t('nav.' + l.key)}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-2 mt-3">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <button
                    type="button"
                    className="w-full clay-btn-sky px-5 py-3 text-sm font-semibold text-white"
                  >
                    {t('nav.login')}
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <ClayButton variant="primary" size="sm" className="w-full justify-center">
                    {t('nav.signin')}
                  </ClayButton>
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
    </>
  );
}
