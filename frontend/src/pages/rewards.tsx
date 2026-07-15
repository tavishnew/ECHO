import { useAppStore } from '@/lib/store';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { Star, Crown, Palette, Sparkles, CheckCircle2, Gift } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const REWARDS = [
  { id: 'badge-scholar', name: 'Scholar Badge', description: 'Show everyone you love to learn.', cost: 100, icon: <Crown className="w-8 h-8 text-sky" />, category: 'cosmetic' },
  { id: 'theme-space', name: 'Space Colors', description: 'Unlock a special galactic chat color.', cost: 250, icon: <Palette className="w-8 h-8 text-primary" />, category: 'cosmetic' },
  { id: 'avatar-robot', name: 'Robot Avatar', description: 'Change your profile picture.', cost: 150, icon: <Sparkles className="w-8 h-8 text-sage" />, category: 'cosmetic' },
  { id: 'hint-pack', name: 'Extra Hints', description: 'Get 5 extra hints for tough quizzes.', cost: 50, icon: <Star className="w-8 h-8 text-yellow-500" />, category: 'perk' },
];

const REWARD_TINT: Record<string, string> = {
  cosmetic: 'bg-primary/10',
  perk: 'bg-sage/10',
};
const REWARD_ICON_BG: Record<string, string> = {
  cosmetic: 'bg-primary/15',
  perk: 'bg-sage/15',
};

export default function Rewards() {
  const { state, buyReward } = useAppStore();
  const [message, setMessage] = useState<{text: string, type: 'success'|'error'} | null>(null);

  const handleBuy = (id: string, cost: number) => {
    if (state.purchasedRewards.includes(id)) return;
    
    if (buyReward(id, cost)) {
      setMessage({ text: 'Reward unlocked! Enjoy!', type: 'success' });
    } else {
      setMessage({ text: 'Not enough points yet. Keep learning!', type: 'error' });
    }
    
    setTimeout(() => setMessage(null), 3000);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring" } }
  };

  return (
    <PageTransition className="px-4 md:px-8 max-w-5xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">Rewards Store <Gift className="w-8 h-8 text-sage" /></h1>
          <p className="text-muted-foreground text-lg">Spend your hard-earned points here.</p>
        </div>
        
        <ClayCard className="px-6 py-4 flex items-center gap-4 bg-sky/10 border-none shadow-sm">
          <div className="clay-circle w-12 h-12 flex items-center justify-center bg-sky text-sky-foreground shadow-sm">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground font-bold">Your Balance</div>
            <div className="text-2xl font-bold">{state.points} <span className="text-sm font-normal">pts</span></div>
          </div>
        </ClayCard>
      </motion.div>

      <AnimatePresence>
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-8 p-4 rounded-xl font-bold text-center ${message.type === 'success' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}`}
          >
            {message.text}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {REWARDS.map(reward => {
          const isOwned = state.purchasedRewards.includes(reward.id);
          const canAfford = state.points >= reward.cost;

          return (
              <motion.div key={reward.id} variants={item}>
                <ClayCard className={cn('p-6 flex flex-col items-center text-center h-full group relative overflow-hidden', REWARD_TINT[reward.category])}>
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-sage to-sky" />
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={cn('clay-circle w-20 h-20 flex items-center justify-center mb-6', REWARD_ICON_BG[reward.category])}
                  >
                    {reward.icon}
                  </motion.div>
                
                <h3 className="font-bold text-lg mb-2">{reward.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-1">{reward.description}</p>
                
                {isOwned ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-full py-3 flex items-center justify-center gap-2 text-primary font-bold bg-primary/10 rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Owned
                  </motion.div>
                ) : (
                  <ClayButton 
                    variant={canAfford ? 'primary' : 'default'} 
                    className="w-full"
                    onClick={() => handleBuy(reward.id, reward.cost)}
                  >
                    {reward.cost} pts
                  </ClayButton>
                )}
              </ClayCard>
            </motion.div>
          );
        })}
      </motion.div>
    </PageTransition>
  );
}
