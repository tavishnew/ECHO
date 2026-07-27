import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAppStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { toast } from 'sonner';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { ClayInput } from '@/components/ui/clay-input';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { Eye, EyeOff, Mic, Loader2, AlertCircle, Info } from 'lucide-react';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAppStore();
  const t = useT();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cardControls = useAnimationControls();

  const handleForgot = (e: React.MouseEvent) => {
    e.preventDefault();
    toast('If that account exists, we’ll send a password reset link.');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation → error + shake (ISSUE-016).
    if (!formData.email.trim() || !formData.password.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email and password.');
      cardControls.start({ x: [0, -8, 8, -8, 8, 0], transition: { duration: 0.4 } });
      return;
    }
    setError(null);
    setLoading(true);
    // Mock async auth with a loading state (ISSUE-017).
    setTimeout(() => {
      login({
        name: formData.email.split('@')[0] || 'Student',
        email: formData.email,
        tier: 'free',
        accessibilityPreference: 'None'
      });
      setLocation('/dashboard');
    }, 900);
  };

  return (
      <PageTransition className="min-h-[80vh] flex items-center justify-center py-6 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
          <ClayCard animate={cardControls} className="p-5 md:p-7">
            <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-primary text-primary-foreground clay-btn">
              <Mic className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('auth.welcomeBack')}</h1>
            <p className="text-muted-foreground">{t('auth.readyNew')}</p>
          </div>

          <div className="mb-5 flex items-start gap-2 text-sm text-muted-foreground bg-muted/50 rounded-2xl p-3">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              Accounts are not stored on a server yet. Your profile and progress live only on this
              device and will be lost if you clear your browser storage or switch devices.
            </span>
          </div>

            <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">{t('auth.email')}</label>
                <ClayInput
                  required
                  id="email"
                  name="email"
                  autoComplete="email"
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
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
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

            <ClayButton type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                t('auth.login')
              )}
            </ClayButton>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                role="alert"
                className="mt-4 flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-2xl p-3"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-sm text-muted-foreground mt-8">
            {t('auth.noAccount')} <Link href="/signup" className="text-primary font-bold hover:underline">{t('auth.startFree')}</Link>
          </p>

          {/* Forgot password (ISSUE-018) */}
          <div className="text-center mt-3">
            <a
              href="#"
              onClick={handleForgot}
              className="text-sm text-primary font-semibold hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </ClayCard>
      </motion.div>
    </PageTransition>
  );
}
