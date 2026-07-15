import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAppStore } from '@/lib/store';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { ClayInput } from '@/components/ui/clay-input';
import { Eye, Brain, Ear, Wifi, User, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Signup() {
  const [, setLocation] = useLocation();
  const { login } = useAppStore();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    tier: 'free' as 'free'|'premium',
    accessibilityPreference: 'None' as 'None' | 'Cognitive' | 'Low Vision' | 'Hard of Hearing' | 'Limited Internet'
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else {
      login({
        name: formData.name,
        email: formData.email,
        tier: formData.tier,
        accessibilityPreference: formData.accessibilityPreference
      });
      setLocation('/dashboard');
    }
  };

  const accessOptions = [
    { id: 'None', label: 'Default', icon: User },
    { id: 'Cognitive', label: 'Simpler Text & Layout', icon: Brain },
    { id: 'Low Vision', label: 'High Contrast & Large Text', icon: Eye },
    { id: 'Hard of Hearing', label: 'Visual Cues & Captions', icon: Ear },
    { id: 'Limited Internet', label: 'Offline First', icon: Wifi },
  ];

  return (
    <PageTransition className="min-h-[80vh] flex items-start justify-center pt-24 pb-12 px-4">
      <div className="w-full max-w-md">
        
        <div className="mb-8 flex justify-center gap-2">
          {[1,2,3].map(i => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i <= step ? 'w-8 bg-primary' : 'w-4 bg-primary/20'}`} 
            />
          ))}
        </div>

        <ClayCard>
          <form onSubmit={handleNext} className="space-y-6">
            
            {step === 1 && (
              <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">Welcome to ECHO</h1>
                  <p className="text-muted-foreground">Let's set up your learning profile.</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">Your Name</label>
                    <ClayInput 
                      required 
                      placeholder="e.g. Rahul" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">Parent's Email</label>
                    <ClayInput 
                      required 
                      type="email" 
                      placeholder="parent@example.com" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">Password</label>
                    <ClayInput 
                      required 
                      type="password" 
                      placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" 
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">Choose a Plan</h1>
                  <p className="text-muted-foreground">You can always change this later.</p>
                </div>
                
                <div className="grid gap-4">
                  <div 
                    onClick={() => setFormData({...formData, tier: 'free'})}
                    className={`p-4 rounded-2xl cursor-pointer transition-all ${formData.tier === 'free' ? 'clay-card ring-2 ring-primary' : 'bg-card/50 hover:bg-card border border-border'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">Free</h3>
                      <span className="font-bold text-primary">â‚¹0/mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Basic voice tutor, 3 subjects, 30 mins daily.</p>
                  </div>
                  
                  <div 
                    onClick={() => setFormData({...formData, tier: 'premium'})}
                    className={`p-4 rounded-2xl cursor-pointer transition-all ${formData.tier === 'premium' ? 'clay-card ring-2 ring-primary' : 'bg-card/50 hover:bg-card border border-border'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">Premium</h3>
                      <span className="font-bold text-sky">â‚¹199/mo</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Unlimited tutoring, all subjects, progress reports.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-6">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">Accessibility Needs</h1>
                  <p className="text-muted-foreground">How can we make ECHO best for you?</p>
                </div>
                
                <div className="grid gap-3">
                  {accessOptions.map(opt => {
                    const Icon = opt.icon;
                    const isSelected = formData.accessibilityPreference === opt.id;
                    return (
                      <div 
                        key={opt.id}
                        onClick={() => setFormData({...formData, accessibilityPreference: opt.id as any})}
                        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${isSelected ? 'clay-card ring-2 ring-primary' : 'bg-card/50 hover:bg-card border border-border'}`}
                      >
                        <div className={`p-2 rounded-full ${isSelected ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="font-semibold">{opt.label}</span>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

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
                {step === 3 ? 'Start Learning' : 'Next Step'}
              </ClayButton>
            </div>

          </form>
          
          {step === 1 && (
            <p className="text-center text-sm text-muted-foreground mt-8">
              Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
            </p>
          )}
        </ClayCard>
      </div>
    </PageTransition>
  );
}
