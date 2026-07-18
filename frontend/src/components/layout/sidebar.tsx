import { Link, useLocation } from 'wouter';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { ClayCard } from '@/components/ui/clay-card';
import { LanguageSelector } from '@/components/voice/LanguageSelector';
import { useT } from '@/lib/i18n';
import { motion } from 'framer-motion';
import {
  Mic,
  Home,
  Trophy,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

export function Sidebar() {
  const { state, logout, setLanguage, setSelectedClass } = useAppStore();
  const t = useT();
  const [location, setLocation] = useLocation();
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  // Visible when hovered (desktop mouse) or explicitly toggled open (touch /
  // tablet, where there is no hover — ISSUE-028).
  const visible = hovered || open;
  // Sidebar is the signed-in navigation surface; guests use the top navbar.
  if (!state.user) return null;
  const initials = (state.user?.name || '?').charAt(0).toUpperCase();
  const level = Math.floor(state.points / 200) + 1;

const navItems = [
  { icon: Home, key: 'home', to: '/dashboard' },
  { icon: Mic, key: 'tutor', to: '/tutor' },
  { icon: Trophy, key: 'rewards', to: '/rewards' },
  { icon: Settings, key: 'account', to: '/account' },
  { icon: CreditCard, key: 'pricing', to: '/pricing' },
];

  // Mobile bottom bar shows the same destinations as the sidebar.
  const mobileItems = navItems;

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  return (
    <>
      {/* Edge tab to open the sidebar — visible only when collapsed, and only
          on md+ (touch tablets get a tap target; mobile uses the bottom nav).
          ISSUE-028 */}
      {!visible && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          aria-expanded={visible}
          className="hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-[55] w-9 h-20 items-center justify-center clay-card rounded-l-none rounded-r-2xl text-ink hover:text-primary transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: visible ? 0 : '-100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed left-0 top-0 z-50 h-screen w-[260px] hidden md:flex flex-col p-6 border-r border-ink/5"
        style={{ backgroundColor: 'var(--bg-card-alt)', pointerEvents: visible ? 'auto' : 'none' }}
      >
        <div className="flex items-center justify-between mb-10">
          <Link href="/dashboard" className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white"
          >
            <Mic className="w-5 h-5 text-primary" />
          </div>
            <span className="font-display text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>
              ECHO
            </span>
          </Link>
          <button
            type="button"
            onClick={() => { setOpen(false); setHovered(false); }}
            aria-label="Close navigation"
            className="md:flex w-9 h-9 rounded-xl items-center justify-center text-ink-muted hover:text-ink hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const active = location === item.to;
            return (
              <Link key={item.key} href={item.to} className="relative block">
                {/* Animated active indicator that slides between links (ISSUE-029) */}
                {active && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-2xl"
                    style={{ backgroundColor: 'var(--bg-card)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <div
                  className={`relative z-10 flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-colors ${
                    active ? 'text-primary' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {t('nav.' + item.key)}
                </div>
              </Link>
            );
          })}
        </nav>

          <div className="mt-auto flex flex-col gap-3">
          <LanguageSelector value={state.language} onChange={setLanguage} className="w-full" />
          <ClayCard className="p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold overflow-hidden"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{state.user?.name}</p>
              <p className="text-xs text-ink-subtle">
                {state.user?.tier === 'premium' ? 'Premium' : state.selectedClass} · Level {level}
              </p>
            </div>
          </ClayCard>
          <button
            type="button"
            onClick={handleLogout}
            className="clay-btn w-full flex items-center justify-center gap-2 px-4 py-3 text-white text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
            style={{ backgroundColor: 'var(--blush)' }}
          >
          <LogOut className="w-4 h-4" /> {t('nav.logout')}
          </button>
        </div>
      </motion.aside>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-around px-2 py-2 border-t border-ink/5"
        style={{
          backgroundColor: 'rgba(234,232,228,0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {mobileItems.map((item) => {
          const active = location === item.to;
          return (
              <Link
                key={item.key}
                href={item.to}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-semibold ${
                  active ? 'text-primary' : 'text-ink-muted'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {t('nav.' + item.key)}
              </Link>
          );
        })}
        <button
          type="button"
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-semibold text-ink-muted"
        >
          <LogOut className="w-5 h-5" />
          {t('nav.logout')}
        </button>
      </nav>
    </>
  );
}
