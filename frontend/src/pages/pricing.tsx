import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { PageTransition } from '@/components/layout/page-transition';
import { Footer } from '@/components/layout/footer';
import { Sidebar } from '@/components/layout/sidebar';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { Check, ChevronDown, Brain, Eye, Ear, Wifi } from 'lucide-react';

const freeFeatures = [
  '1 child profile',
  '30 minutes of tutoring / day',
  'Math, Science, English basics',
  'Weekly progress email',
];
const premiumFeatures = [
  'Up to 4 child profiles',
  'Unlimited tutoring sessions',
  'Full curriculum access',
  'Voice in 25+ languages',
  'Accessibility features',
  'Parent insights dashboard',
];

const accessibility = [
  { icon: Brain, title: 'Cognitive support', color: 'var(--primary)', items: ['Simple language mode', 'Repeat & rephrase', 'Focus pacing'] },
  { icon: Eye, title: 'Low Vision', color: 'var(--blush)', items: ['High-contrast UI', 'Larger type toggle', 'Voice-first navigation'] },
  { icon: Ear, title: 'Hard of Hearing', color: 'var(--sky)', items: ['Live captions', 'Visual cues', 'Adjustable speech pace'] },
  { icon: Wifi, title: 'Low Resources', color: 'var(--amber-clay)', items: ['Offline lessons', 'Low-data mode', 'Works on old phones'] },
];

const faqs = [
  { q: 'Can I try ECHO for free?', a: 'Yes — every account starts with a 14-day full-feature trial. No card required.' },
  { q: 'Which languages are supported?', a: 'ECHO speaks and understands 25+ languages including Hindi, Spanish, Mandarin, Arabic, French and more.' },
  { q: 'Is my child’s data private?', a: 'Absolutely. Conversations are encrypted, never sold, and reviewed only to improve safety.' },
  { q: 'Can I cancel any time?', a: 'Cancel from settings in one tap. No penalties, no calls.' },
];

export default function Pricing() {
  const { state, updateUser } = useAppStore();
  const [, setLocation] = useLocation();
  const [open, setOpen] = useState<number | null>(0);

  const handleUpgrade = () => {
    updateUser({ tier: 'premium' });
    setLocation('/dashboard');
  };

  return (
    <PageTransition className="px-0">
      <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }}>
        <Sidebar />
        <main className="flex-1 px-4 md:px-8 pt-4 pb-20">
          <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
       className="text-center max-w-2xl mx-auto"
     >
       <h1 className="font-display font-bold" style={{ fontSize: 'clamp(2.75rem, 5vw, 4.2rem)', letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--ink-deep)' }}>
          Kind on families.
          <br /> Fair to teachers.
        </h1>
        <p className="mt-6 text-lg text-ink-muted">
          Start free for 14 days. Upgrade whenever you’re ready.
        </p>
      </motion.div>

      {/* Plans */}
      <div className="grid md:grid-cols-2 gap-6 mt-16 items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <ClayCard
            className="p-8 md:p-12 h-full"
            style={{ backgroundColor: 'var(--bg-card-light)', border: '2px solid #EAE8E4' }}
          >
            <p className="text-xs uppercase tracking-wider font-semibold text-ink-subtle">Free</p>
            <h3 className="font-display text-3xl font-bold text-ink-deep mt-2">Starter</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold" style={{ color: 'var(--ink-deep)' }}>₹0</span>
              <span className="text-ink-subtle">/ forever</span>
            </div>
            <ul className="mt-8 space-y-4">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-ink">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(107,94,136,0.12)' }}>
                    <Check className="w-3 h-3" style={{ color: 'var(--primary)' }} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              {state.user?.tier === 'free' ? (
                <div className="w-full py-4 text-center font-bold text-primary bg-primary/10 rounded-2xl">
                  Current Plan
                </div>
              ) : (
                <Link href="/signup" className="block">
                  <ClayButton variant="secondary" className="w-full">Get started</ClayButton>
                </Link>
              )}
            </div>
          </ClayCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <span
            className="absolute left-1/2 -translate-x-1/2 -top-4 px-4 py-1.5 rounded-full text-xs font-bold text-white z-10"
            style={{ backgroundColor: 'var(--primary)', boxShadow: 'var(--shadow-clay-btn-primary)' }}
          >
            Most popular
          </span>
          <ClayCard
            className="p-8 md:p-12 h-full"
            style={{
              backgroundColor: 'var(--bg-card-light)',
              border: '3px solid rgba(107,94,136,0.18)',
            }}
          >
            <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--primary)' }}>
              Premium
            </p>
            <h3 className="font-display text-3xl font-bold text-ink-deep mt-2">Family</h3>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-bold" style={{ color: 'var(--ink-deep)' }}>₹199</span>
              <span className="text-ink-subtle">/ month</span>
            </div>
            <ul className="mt-8 space-y-4">
              {premiumFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-ink">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              {state.user?.tier === 'premium' ? (
                <div className="w-full py-4 text-center font-bold text-primary bg-primary/10 rounded-2xl">
                  Active Plan
                </div>
              ) : (
                <ClayButton variant="primary" className="w-full" onClick={handleUpgrade}>
                  Start 14-day trial
                </ClayButton>
              )}
            </div>
          </ClayCard>
        </motion.div>
      </div>

      {/* Accessibility */}
      <section className="mt-24">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-xs uppercase tracking-[0.16em] font-semibold mb-3" style={{ color: 'var(--primary)' }}>
            Built for every child
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-deep">
            Accessibility isn’t an add-on.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {accessibility.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <ClayCard whileHover={{ y: -4 }} className="p-8 h-full">
                <div
                  className="w-14 h-14 rounded-[20px] flex items-center justify-center mb-5"
                  style={{ backgroundColor: `color-mix(in oklab, ${a.color} 14%, white)` }}
                >
                  <a.icon className="w-6 h-6" style={{ color: a.color }} />
                </div>
                <h4 className="font-display text-xl font-bold text-ink-deep mb-3">{a.title}</h4>
                <ul className="space-y-2">
                  {a.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-ink-muted">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </ClayCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-24 max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-deep text-center mb-10">
          Questions, answered.
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <ClayCard key={f.q} className="p-0 overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-display text-lg font-bold text-ink-deep">{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-ink-muted leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ClayCard>
            );
          })}
        </div>
      </section>

      <Footer />
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
