import { useAppStore } from '@/lib/store';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { Sidebar } from '@/components/layout/sidebar';
import { Star, Crown, Palette, Sparkles, CheckCircle2, Gift, Flame, Trophy } from 'lucide-react';
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
    <PageTransition className="px-0">
      <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }}>
        <Sidebar />
        <main className="flex-1 px-4 md:px-8 pt-4 pb-20 md:pb-8">
          <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-3 flex items-center justify-center gap-3">
          Rewards Store <Gift className="w-9 h-9 text-sage" />
        </h1>
        <p className="text-muted-foreground text-lg">Spend your hard-earned points on fun upgrades.</p>
      </motion.div>

      {/* Colored stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Balance" value={`${state.points}`} unit="pts" color="var(--sky)" icon={<Star className="w-6 h-6" />} />
        <StatCard label="Streak" value={`${state.streak}`} unit="days" color="var(--orange-clay)" icon={<Flame className="w-6 h-6" />} />
        <StatCard label="Level" value={`${Math.floor(state.points / 200) + 1}`} unit="" color="var(--sage)" icon={<Trophy className="w-6 h-6" />} />
        <StatCard label="Owned" value={`${state.purchasedRewards.length}`} unit="" color="var(--primary)" icon={<CheckCircle2 className="w-6 h-6" />} />
      </div>

      {/* Level progress */}
      <ClayCard className="p-6 mb-10" style={{ backgroundColor: 'var(--bg-card-warm)' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-ink-subtle">Level {Math.floor(state.points / 200) + 1}</p>
          <p className="text-sm font-semibold" style={{ color: 'var(--cream-gold)' }}>
            {state.points} / {(Math.floor(state.points / 200) + 1) * 200} XP
          </p>
        </div>
        <div className="relative h-3 rounded-full clay-inner overflow-hidden" style={{ backgroundColor: 'var(--bg-page)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (state.points % 200) / 2)}%` }}
            transition={{ duration: 1.1 }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, var(--primary), var(--cream-gold))' }}
          />
        </div>
      </ClayCard>

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
          </div>
        </main>
      </div>
    </PageTransition>
  );
}

function StatCard({
  label,
  value,
  unit,
  color,
  icon,
}: {
  label: string;
  value: string;
  unit?: string;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="clay-card p-5 flex items-center gap-4 rounded-2xl"
      style={{ backgroundColor: `color-mix(in oklab, ${color} 12%, var(--bg-card))` }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: `color-mix(in oklab, ${color} 18%, white)`, color }}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider font-semibold text-ink-subtle">{label}</p>
        <p className="text-2xl font-bold text-ink-deep">
          {value} {unit && <span className="text-sm font-normal text-ink-subtle">{unit}</span>}
        </p>
      </div>
    </motion.div>
  );
}
