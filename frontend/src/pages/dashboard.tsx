import { useAppStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { Sidebar } from '@/components/layout/sidebar';
import { Link, useLocation } from 'wouter';
import {
  Flame,
  Star,
  Medal,
  Calculator,
  FlaskConical,
  BookOpen,
  Library,
  Play,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'];

const subjects = [
  { icon: Calculator, title: 'Mathematics', chapters: '24 chapters', from: '#7D6FA3', to: '#594B73' },
  { icon: FlaskConical, title: 'Science', chapters: '18 chapters', from: '#6A8F7A', to: '#486354' },
  { icon: BookOpen, title: 'English', chapters: '21 chapters', from: '#5B85A4', to: '#39566B' },
];

// Session data is sourced from the store so it reflects the real user — a
// brand-new user with no history sees an empty state instead of fabricated
// progress (ISSUE-020).
const picks = [
  { icon: BookOpen, title: 'Story of the day', meta: '5 min · English' },
  { icon: Sparkles, title: 'Quick quiz', meta: '3 min · Mixed' },
  { icon: FlaskConical, title: 'Experiment: rain', meta: '8 min · Science' },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function todayLabel() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function StatPill({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className="clay-pill flex items-center gap-3 rounded-full px-4 py-2.5"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >
      <div
        className="stat-pill-icon w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `color-mix(in oklab, ${color} 14%, white)` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="leading-tight">
        <p className="text-[10px] uppercase tracking-wider text-ink-subtle font-semibold">{label}</p>
        <p className="text-sm font-bold text-ink">{value}</p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { state, setSelectedClass } = useAppStore();
  const sessions = state.sessions;
  const t = useT();
  const [location, setLocation] = useLocation();
  const activeClass = state.selectedClass;

  // Selecting a class now visibly changes the curriculum: the youngest
  // learners see friendlier subject names, and the chapter counts scale with
  // the class level.
  const classLevel = Number(activeClass.replace(/\D/g, '')) || 5;
  const subjectBases = [12, 10, 11];
  const classSubjectTitles: Record<string, string[]> = {
    'Class 1': ['Numbers', 'Nature', 'Stories'],
    'Class 2': ['Numbers', 'Nature', 'Stories'],
    'Class 3': ['Math', 'Science', 'Reading'],
    'Class 4': ['Math', 'Science', 'Reading'],
  };
  const subjectsForClass = subjects.map((s, i) => ({
    ...s,
    title: classSubjectTitles[activeClass]?.[i] ?? s.title,
    chapters: `${subjectBases[i] + classLevel * 2} chapters`,
  }));

  if (!state.user) {
    setLocation('/login');
    return null;
  }

  const initials = (state.user.name || '?').charAt(0).toUpperCase();
  const xp = state.points.toLocaleString('en-US');
  const badges = String(state.purchasedRewards.length);

  return (
    <PageTransition className="px-0">
      <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }}>
        <Sidebar />
        <main className="flex-1 p-6 md:px-10 md:py-10 pb-20 md:pb-10">
          <div className="max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-ink-subtle mb-2">
                  {todayLabel()}
                </p>
                <h1
                  className="font-display font-semibold"
                  style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)', color: 'var(--ink-deep)' }}
                >
                  {greeting()}, {state.user.name}.
                </h1>
                <p className="text-ink-muted mt-2">{t('dash.ready')}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <StatPill icon={Flame} color="var(--orange-clay)" label={t('dash.streak')} value={`${state.streak} days`} />
                <StatPill icon={Star} color="var(--primary)" label={t('dash.xp')} value={xp} />
                <StatPill icon={Medal} color="var(--cream-gold)" label={t('dash.badges')} value={badges} />
              </div>
            </motion.div>

            {/* Class selector */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
              {classes.map((c) => {
                const active = c === activeClass;
                return (
                  <motion.button
                    key={c}
                    onClick={() => setSelectedClass(c)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`px-6 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-shadow active:shadow-lg active:shadow-black/30 ${
                      active ? 'text-white shadow-black/25 cursor-pointer' : 'text-ink-subtle cursor-pointer'
                    }`}
                    style={{ backgroundColor: active ? 'var(--primary)' : 'var(--bg-card)' }}
                  >
                    {c}
                  </motion.button>
                );
              })}
            </div>

            {/* Subjects */}
            <section>
              <h2 className="font-display text-2xl font-bold text-ink-deep">{t('dash.subjects')} · {activeClass}</h2>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClass}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="grid md:grid-cols-3 gap-6 mt-6"
                >
                {subjectsForClass.map((s, i) => (
                  <Link key={s.title} href="/tutor">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="rounded-[32px] p-8 text-white relative overflow-hidden cursor-pointer group clay-card min-h-[180px]"
                      style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                      <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                        <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                          <s.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                          <p className="text-sm text-white/70 mt-1">{s.chapters}</p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
                </motion.div>
              </AnimatePresence>
            </section>

            {/* Continue */}
            <section>
              <h2 className="font-display text-2xl font-bold text-ink-deep">{t('dash.continue')}</h2>
              <AnimatePresence mode="wait">
                {sessions.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 clay-card p-10 text-center"
                >
                  <p className="text-muted-foreground">No sessions yet — start your first lesson!</p>
                  <Link href="/tutor" className="inline-block mt-4">
                    <ClayButton variant="primary">Begin Learning</ClayButton>
                  </Link>
                </motion.div>
              ) : (
                <div key={activeClass} className="grid md:grid-cols-2 gap-6 mt-6">
                {sessions.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <Link href="/tutor">
                      <ClayCard whileHover={{ y: -4 }} className="p-6 flex items-center gap-5 cursor-pointer">
                        <div className="flex-1">
                          <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: s.color }}>
                            {s.subject}
                          </p>
                          <h4 className="font-display text-xl font-bold text-ink-deep mt-1">{s.title}</h4>
                          <div
                            className="clay-inner rounded-full h-2 mt-4 overflow-hidden"
                            style={{ backgroundColor: 'var(--bg-page)' }}
                          >
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${s.progress}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 + i * 0.1 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: s.color }}
                              />
                          </div>
                          <p className="text-xs text-ink-subtle mt-2">{s.progress}% complete</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.94 }}
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white clay-btn-primary shrink-0"
                          style={{ backgroundColor: s.color }}
                        >
                          <Play className="w-5 h-5 fill-current" />
                        </motion.button>
                      </ClayCard>
                    </Link>
                  </motion.div>
                ))}
                  </div>
                )}
              </AnimatePresence>
            </section>

            {/* Today's picks */}
            <section>
              <h2 className="font-display text-2xl font-bold text-ink-deep">{t('dash.picks')}</h2>
              <ClayCard className="p-3 mt-6">
                <ul className="divide-y divide-ink/5">
                  {picks.map((p) => (
                    <li key={p.title}>
                      <Link href="/tutor">
                        <motion.button
                          whileHover={{ x: 4 }}
                          className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-colors text-left"
                        >
                          <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: 'rgba(107,94,136,0.1)' }}
                          >
                            <p.icon className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-ink">{p.title}</p>
                            <p className="text-xs text-ink-subtle">{p.meta}</p>
                          </div>
                          <Library className="w-4 h-4 text-ink-faint" />
                        </motion.button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </ClayCard>
            </section>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
