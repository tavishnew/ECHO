import { useAppStore } from '@/lib/store';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { Sidebar } from '@/components/layout/sidebar';
import { LanguageSelector } from '@/components/voice/LanguageSelector';
import { LogOut, Settings, CreditCard, Globe } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useT } from '@/lib/i18n';

export default function Account() {
  const { state, logout, setLanguage } = useAppStore();
  const [, setLocation] = useLocation();
  const t = useT();

  if (!state.user) return null;

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } }
  };

  return (
    <PageTransition className="px-0">
      <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }}>
        <Sidebar />
        <main className="flex-1 px-4 md:px-8 pt-8 pb-20 md:pb-8">
          <div className="max-w-3xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold mb-8 text-foreground"
      >
        Account Settings
      </motion.h1>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        <motion.div variants={item}>
          <ClayCard className="p-8 flex items-center gap-6">
            <div className="clay-circle w-24 h-24 flex items-center justify-center bg-card shrink-0 p-2 overflow-hidden border-4 border-transparent hover:border-primary/20 transition-colors">
              <img src="/user.png" alt="User Avatar" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1 text-foreground">{state.user.name}</h2>
              <p className="text-muted-foreground">{state.user.email}</p>
            </div>
          </ClayCard>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={item}>
            <ClayCard className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-sky" />
                <h3 className="text-xl font-bold text-foreground">Subscription</h3>
              </div>
              <div className="mb-8 flex-1">
                <span className="text-muted-foreground">Current Plan:</span>
                <div className="text-xl font-bold capitalize text-foreground mt-1">
                  {state.user.tier} Plan
                </div>
              </div>
              <Link href="/pricing" className="mt-auto">
                <ClayButton variant="secondary" className="w-full">
                  Manage Plan
                </ClayButton>
              </Link>
            </ClayCard>
          </motion.div>

          <motion.div variants={item}>
            <ClayCard className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Preferences</h3>
              </div>
              <div className="mb-8 flex-1">
                <span className="text-muted-foreground">Accessibility Needs:</span>
                <div className="text-xl font-bold text-foreground mt-1">
                  {state.user.accessibilityPreference}
                </div>
              </div>
              <div className="mb-6">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Globe className="w-4 h-4" /> {t('side.language')}
                </span>
                <div className="mt-2">
                  <LanguageSelector value={state.language} onChange={setLanguage} className="w-full" />
                </div>
              </div>
              <Link href="/signup" className="mt-auto">
                <ClayButton variant="default" className="w-full">
                  Update Preferences
                </ClayButton>
              </Link>
            </ClayCard>
          </motion.div>
        </div>

        <motion.div variants={item} className="pt-8">
          <ClayButton variant="ghost" className="text-destructive hover:bg-destructive/10 gap-2 px-6" onClick={handleLogout}>
            <LogOut className="w-5 h-5" /> Log out
          </ClayButton>
        </motion.div>
      </motion.div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
