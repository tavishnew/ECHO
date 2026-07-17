import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAppStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { ClayInput } from '@/components/ui/clay-input';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mic } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAppStore();
  const t = useT();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPw, setShowPw] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login({
      name: formData.email.split('@')[0] || 'Student',
      email: formData.email,
      tier: 'free',
      accessibilityPreference: 'None'
    });
    setLocation('/dashboard');
  };

  return (
      <PageTransition className="min-h-[80vh] flex items-center justify-center py-6 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
          <ClayCard className="p-5 md:p-7">
            <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-primary text-primary-foreground clay-btn">
              <Mic className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('auth.welcomeBack')}</h1>
            <p className="text-muted-foreground">{t('auth.readyNew')}</p>
          </div>

            <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">{t('auth.email')}</label>
                <ClayInput
                  required
                  type="email"
                  placeholder="parent@example.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">{t('auth.password')}</label>
                <div className="relative">
                  <ClayInput
                    required
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(v => !v)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-primary transition-colors"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <ClayButton type="submit" variant="primary" className="w-full">
              {t('auth.login')}
            </ClayButton>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {t('auth.noAccount')} <Link href="/signup" className="text-primary font-bold hover:underline">{t('auth.startFree')}</Link>
          </p>
        </ClayCard>
      </motion.div>
    </PageTransition>
  );
}
