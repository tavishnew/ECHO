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
} from 'lucide-react';

export function Sidebar() {
  const { state, logout, setLanguage } = useAppStore();
  const t = useT();
  const [location, setLocation] = useLocation();
  const [hovered, setHovered] = useState(false);
  const visible = hovered;
  // Sidebar is the signed-in navigation surface; guests use the top navbar.
  if (!state.user) return null;
  const initials = (state.user?.name || '?').charAt(0).toUpperCase();
  const level = Math.floor(state.points / 200) + 1;

const navItems = [
  { icon: Home, key: 'home', to: '/dashboard' },
  { icon: Mic, key: 'tutor', to: '/tutor' },
  { icon: Trophy, key: 'rewards', to: '/rewards' },
  { icon: Settings, key: 'settings', to: '/account' },
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
      {/* Hover trigger at the left edge reveals the sidebar */}
      <div
        className="fixed left-0 top-0 h-full w-3 z-40 hidden md:block"
        style={{ pointerEvents: visible ? 'none' : 'auto' }}
        onMouseEnter={() => setHovered(true)}
      />
      <motion.aside
        initial={{ x: '-100%' }}
        animate={{ x: visible ? 0 : '-100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="fixed left-0 top-0 z-50 h-screen w-[260px] hidden md:flex flex-col p-6 border-r border-ink/5"
        style={{ backgroundColor: 'var(--bg-card-alt)', pointerEvents: visible ? 'auto' : 'none' }}
      >
        <Link href="/dashboard" className="flex items-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            <Mic className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>
            ECHO
          </span>
        </Link>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const active = location === item.to;
            return (
              <Link
                key={item.key}
                href={item.to}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                  active ? 'clay-pill' : 'text-ink-muted hover:text-ink'
                }`}
                style={active ? { backgroundColor: 'var(--bg-card)', color: 'var(--primary)' } : {}}
              >
                <item.icon className="w-4 h-4" />
                {t('nav.' + item.key)}
              </Link>
            );
          })}
        </nav>

          <div className="mt-auto flex flex-col gap-3">
          <LanguageSelector value={state.language} onChange={setLanguage} className="w-full" />
          <ClayCard className="p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold overflow-hidden"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">{state.user?.name}</p>
              <p className="text-xs text-ink-subtle">
                {state.user?.tier === 'premium' ? 'Premium' : 'Class 5'} · Level {level}
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
        <LanguageSelector value={state.language} onChange={setLanguage} className="shrink-0 max-w-[120px]" />
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
