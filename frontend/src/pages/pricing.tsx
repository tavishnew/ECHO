import { useAppStore } from '@/lib/store';
import { PageTransition } from '@/components/layout/page-transition';
import { Footer } from '@/components/layout/footer';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { SpotlightCard } from '@/components/motion/spotlight-card';
import { Check, Star } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Pricing() {
  const { state, updateUser } = useAppStore();
  const [, setLocation] = useLocation();

  const handleUpgrade = () => {
    updateUser({ tier: 'premium' });
    setLocation('/dashboard');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } }
  };

  return (
    <PageTransition className="px-4 md:px-8 max-w-5xl mx-auto py-12 pb-24">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Invest in their curiosity</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          ECHO Free helps you get started. Premium unlocks limitless learning potential.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
      >
        
        {/* Free Plan */}
        <motion.div variants={item}>
          <SpotlightCard color="107, 94, 136" className="rounded-[32px]">
          <ClayCard className={`h-full flex flex-col p-8 md:p-10 ${state.user?.tier === 'free' ? 'ring-4 ring-primary/20' : ''}`}>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-muted-foreground mb-2">Free</h2>
              <div className="text-4xl font-bold">â‚¹0<span className="text-xl text-muted-foreground font-normal">/mo</span></div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "3 core subjects (Math, Science, English)",
                "30 minutes of voice tutoring daily",
                "Standard AI responses",
                "Basic progress tracking"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            {state.user?.tier === 'free' ? (
              <div className="w-full py-4 text-center font-bold text-primary bg-primary/10 rounded-2xl">
                Current Plan
              </div>
            ) : (
              <ClayButton className="w-full" disabled>
                Downgrade
              </ClayButton>
            )}
          </ClayCard>
          </SpotlightCard>
        </motion.div>

        {/* Premium Plan */}
        <motion.div variants={item}>
          <SpotlightCard color="107, 94, 136" className="rounded-[32px]">
          <ClayCard className={`h-full flex flex-col p-8 md:p-10 relative overflow-hidden ${state.user?.tier === 'premium' ? 'ring-4 ring-primary/50' : 'border-2 border-primary/20'}`}>
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-xl font-bold text-sm flex items-center gap-1">
              <Star className="w-4 h-4" /> Recommended
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">Premium</h2>
              <div className="text-4xl font-bold">â‚¹199<span className="text-xl text-muted-foreground font-normal">/mo</span></div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1">
              {[
                "Unlimited subjects & languages",
                "Unlimited voice tutoring time",
                "Advanced memory (AI remembers past lessons)",
                "Detailed parent dashboard & reports",
                "Priority offline access mode"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="font-medium text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            {state.user?.tier === 'premium' ? (
              <div className="w-full py-4 text-center font-bold text-primary bg-primary/10 rounded-2xl">
                Active Plan
              </div>
            ) : (
              <ClayButton variant="accent" className="w-full py-4 text-lg" onClick={handleUpgrade}>
                Upgrade to Premium
              </ClayButton>
            )}
          </ClayCard>
          </SpotlightCard>
        </motion.div>
        
      </motion.div>

      <Footer />
    </PageTransition>
  );
}
