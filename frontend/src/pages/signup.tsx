import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAppStore } from '@/lib/store';
import { useT } from '@/lib/i18n';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { ClayInput } from '@/components/ui/clay-input';
import { Eye, EyeOff, Brain, Ear, Wifi, User, Mail, Lock, Mic, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Signup() {
  const [, setLocation] = useLocation();
  const { login } = useAppStore();
  const t = useT();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    tier: 'free' as 'free'|'premium',
    accessibilityPreference: 'None' as 'None' | 'Cognitive' | 'Low Vision' | 'Hard of Hearing' | 'Limited Internet'
  });

  const [showPw, setShowPw] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      login({
        name: formData.name,
        email: formData.email,
        tier: formData.tier,
        accessibilityPreference: formData.accessibilityPreference
      });
      // Celebratory success state before redirect (ISSUE-014).
      setSuccess(true);
      setTimeout(() => setLocation('/dashboard'), 1800);
    }
  };

  // Password strength feedback (ISSUE-015).
  const getStrength = (pw: string) => {
    if (!pw) return { level: 0, label: '', color: 'bg-muted' };
    if (pw.length < 6) return { level: 1, label: 'Too short', color: 'bg-red-400' };
    if (pw.length < 10) return { level: 2, label: 'Weak', color: 'bg-amber-400' };
    if (/[A-Z]/.test(pw) && /[0-9]/.test(pw)) return { level: 4, label: 'Strong', color: 'bg-green-500' };
    return { level: 3, label: 'Fair', color: 'bg-yellow-400' };
  };
  const strength = getStrength(formData.password);

  const accessOptions = [
    { id: 'None', label: 'Default', icon: User },
    { id: 'Cognitive', label: 'Simpler Text & Layout', icon: Brain },
    { id: 'Low Vision', label: 'High Contrast & Large Text', icon: Eye },
    { id: 'Hard of Hearing', label: 'Visual Cues & Captions', icon: Ear },
    { id: 'Limited Internet', label: 'Offline First', icon: Wifi },
  ];

  return (
      <PageTransition className="min-h-[80vh] flex items-start justify-center pt-2 pb-4 px-4">
      <div className="w-full max-w-md">
        
        <div className="mb-4 flex justify-center gap-2">
          {[1,2,3].map(i => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-primary' : 'w-4 bg-primary/20'}`} 
            />
          ))}
        </div>

        <ClayCard className="relative overflow-hidden">
          <form onSubmit={handleNext} className="space-y-6">
            {/* Step transitions: old step slides out left, new step slides in
                right (ISSUE-012). */}
            <AnimatePresence mode="wait" initial={false}>
            {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="space-y-4">
                <div className="text-center mb-4">
                  <h1 className="text-2xl font-bold mb-2">{t('auth.welcomeECHO')}</h1>
                  <p className="text-muted-foreground">{t('auth.setupProfile')}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">{t('auth.name')}</label>
                    <ClayInput 
                      required 
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="e.g. Rahul" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">{t('auth.parentEmail')}</label>
                    <ClayInput 
                      required 
                      id="email"
                      name="email"
                      autoComplete="email"
                      type="email" 
                      placeholder="parent@example.com" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">{t('auth.password')}</label>
                    <div className="relative">
                      <ClayInput
                        required
                        id="password"
                        name="password"
                        autoComplete="new-password"
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
                    {formData.password && (
                      <div className="mt-2">
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${strength.color}`}
                            animate={{ width: `${(strength.level / 4) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-xs mt-1 text-muted-foreground">{strength.label}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="space-y-4">
                <div className="text-center mb-4">
                  <h1 className="text-2xl font-bold mb-2">{t('auth.choosePlan')}</h1>
                  <p className="text-muted-foreground">{t('auth.changeLater')}</p>
                </div>
                
                {/* Keyboard-accessible plan selection (ISSUE-013) */}
                <fieldset role="radiogroup" aria-label={t('auth.choosePlan')} className="grid gap-4">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formData.tier === 'free'}
                    onClick={() => setFormData({...formData, tier: 'free'})}
                    className={`text-left w-full p-4 rounded-2xl cursor-pointer transition-all ${formData.tier === 'free' ? 'clay-card ring-2 ring-primary' : 'bg-card/50 hover:bg-card border border-border'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{t('auth.free')}</h3>
                      <span className="font-bold text-primary">â‚¹0/mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Basic voice tutor, 3 subjects, 30 mins daily.</p>
                  </button>
                  
                  <button
                    type="button"
                    role="radio"
                    aria-checked={formData.tier === 'premium'}
                    onClick={() => setFormData({...formData, tier: 'premium'})}
                    className={`text-left w-full p-4 rounded-2xl cursor-pointer transition-all ${formData.tier === 'premium' ? 'clay-card ring-2 ring-primary' : 'bg-card/50 hover:bg-card border border-border'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{t('auth.premium')}</h3>
                      <span className="font-bold text-sky">â‚¹199/mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Unlimited tutoring, all subjects, progress reports.</p>
                  </button>
                </fieldset>
              </motion.div>
            )}

            {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="space-y-4">
                <div className="text-center mb-4">
                  <h1 className="text-2xl font-bold mb-2">{t('auth.accessibility')}</h1>
                  <p className="text-muted-foreground">{t('auth.howCan')}</p>
                </div>
                
                {/* Keyboard-accessible accessibility options (ISSUE-013) */}
                <fieldset role="radiogroup" aria-label={t('auth.accessibility')} className="grid gap-3">
                  {accessOptions.map(opt => {
                    const Icon = opt.icon;
                    const isSelected = formData.accessibilityPreference === opt.id;
                    return (
                      <button
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        key={opt.id}
                        onClick={() => setFormData({...formData, accessibilityPreference: opt.id as any})}
                        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${isSelected ? 'clay-card ring-2 ring-primary' : 'bg-card/50 hover:bg-card border border-border'}`}
                      >
                        <div className={`p-2 rounded-full ${isSelected ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold">{opt.label}</span>
                      </button>
                    )
                  })}
                </fieldset>
              </motion.div>
            )}

            </AnimatePresence>

            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <ClayButton 
                  type="button" 
                  variant="secondary" 
                  className="w-1/3" 
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </ClayButton>
              )}
              <ClayButton type="submit" variant="primary" className="flex-1">
                {step === 3 ? t('auth.startLearning') : t('auth.nextStep')}
              </ClayButton>
            </div>

          </form>

          {step === 1 && (
            <p className="text-center text-sm text-muted-foreground mt-8">
            {t('auth.alreadyAccount')} <Link href="/login" className="text-primary font-bold hover:underline">{t('auth.logInLink')}</Link>
            </p>
          )}

          {/* Success animation on final submit (ISSUE-014) */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card rounded-[inherit] p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500" />
                </motion.div>
                <p className="font-display text-2xl text-foreground">You're all set!</p>
                <p className="text-sm text-muted-foreground">Taking you to your dashboard…</p>
              </motion.div>
            )}
          </AnimatePresence>
        </ClayCard>
      </div>
    </PageTransition>
  );
}
