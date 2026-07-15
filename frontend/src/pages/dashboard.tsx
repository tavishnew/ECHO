import { useAppStore } from '@/lib/store';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { Link, useLocation } from 'wouter';
import { Sparkles, Brain, Trophy, ArrowRight, Star, Moon, Sun, Type, Leaf, Pizza, CloudRain, Check, Hand } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { state, toggleHighContrast, toggleTextSize } = useAppStore();
  const [, setLocation] = useLocation();

  if (!state.user) {
    setLocation('/login');
    return null;
  }

  const starterTopics = [
    { title: "Photosynthesis", subject: "Science", icon: <Leaf className="w-8 h-8 text-primary" /> },
    { title: "Fractions", subject: "Math", icon: <Pizza className="w-8 h-8 text-sage" /> },
    { title: "Solar System", subject: "Science", icon: <Star className="w-8 h-8 text-sky" /> },
    { title: "Water Cycle", subject: "Geography", icon: <CloudRain className="w-8 h-8 text-primary" /> }
  ];

  return (
    <PageTransition className="pb-24 px-4 md:px-8 max-w-6xl mx-auto mt-8">
      
      {/* Header & Accessibility Controls */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
      >
        <div className="flex items-center gap-4">
          <div className="clay-circle w-16 h-16 overflow-hidden p-1.5 shrink-0 bg-card hidden md:block">
            <img src="/user.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">Hi, {state.user.name}! <Hand className="w-8 h-8 text-sage" /></h1>
            <p className="text-muted-foreground text-lg">What are we learning today?</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ClayButton variant="ghost" size="icon" onClick={toggleHighContrast} title="Toggle Contrast">
            {state.highContrast ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </ClayButton>
          <ClayButton variant="ghost" size="icon" onClick={toggleTextSize} title="Toggle Text Size">
            <Type className="w-5 h-5" />
          </ClayButton>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-sky/20 text-sky-foreground font-bold rounded-full clay-card border-none"
          >
            <Star className="w-4 h-4" />
            {state.points} points
          </motion.div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Action Area */}
        <div className="lg:col-span-2 space-y-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            <ClayCard className="bg-primary text-primary-foreground p-8 md:p-12 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
              <div className="absolute right-0 top-0 opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none">
                <Brain className="w-64 h-64" />
              </div>
              <div className="relative z-10 max-w-md space-y-6">
                <h2 className="text-3xl font-bold">Ready for a lesson?</h2>
                <p className="text-primary-foreground/90 text-lg">Your AI tutor is waiting to answer your questions and play quizzes.</p>
                <Link href="/tutor">
                  <ClayButton variant="default" size="lg" className="text-primary font-bold shadow-xl">
                    Start Tutoring <ArrowRight className="w-5 h-5 ml-2" />
                  </ClayButton>
                </Link>
              </div>
            </ClayCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky" /> Jump straight in
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {starterTopics.map((topic, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link href="/tutor">
                    <ClayCard className="p-4 cursor-pointer hover:scale-[1.02] transition-transform flex items-center gap-4">
                      <div className="text-3xl clay-circle w-12 h-12 flex items-center justify-center shrink-0">{topic.icon}</div>
                      <div>
                        <div className="font-bold text-foreground">{topic.title}</div>
                        <div className="text-sm text-muted-foreground">{topic.subject}</div>
                      </div>
                    </ClayCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ClayCard className="p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-sage" /> Daily Streak
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl font-bold text-sage">{state.streak}</div>
                <div className="text-muted-foreground leading-tight">Days in a row!<br/>Keep it up!</div>
              </div>
              <div className="flex gap-2">
                {[1,2,3,4,5,6,7].map(day => (
                  <div 
                    key={day} 
                    className={`flex-1 h-8 rounded-full ${day <= state.streak ? 'bg-sage shadow-inner' : 'bg-card-border'} flex items-center justify-center text-xs font-bold transition-all ${day <= state.streak ? 'text-white' : 'text-transparent'}`}
                  >
                    <Check className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </ClayCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ClayCard className="p-6 bg-gradient-to-br from-card to-sage/10">
              <h3 className="font-bold text-lg mb-2">Rewards Store</h3>
              <p className="text-sm text-muted-foreground mb-4">You have {state.points} points to spend on fun badges and perks!</p>
              <Link href="/rewards">
                <ClayButton variant="accent" className="w-full">
                  Visit Store
                </ClayButton>
              </Link>
            </ClayCard>
          </motion.div>

          {state.user.tier === 'free' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <ClayCard className="p-6 border-2 border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary/20 px-3 py-1 rounded-bl-xl text-primary font-bold text-xs">Free Plan</div>
                <h3 className="font-bold text-lg mb-2">Unlock Everything</h3>
                <p className="text-sm text-muted-foreground mb-4">Get unlimited talk time and all subjects with Premium.</p>
                <Link href="/pricing">
                  <ClayButton variant="ghost" className="w-full text-primary underline hover:bg-primary/5">
                    See Premium Plans
                  </ClayButton>
                </Link>
              </ClayCard>
            </motion.div>
          )}

        </div>
      </div>
    </PageTransition>
  );
}
