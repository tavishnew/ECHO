import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { Footer } from '@/components/layout/footer';
import { ClayButton } from '@/components/ui/clay-button';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Sparkles, Brain, BookOpen, Volume2, Globe, WifiOff, Star, Mic, ArrowRight, Calculator, FlaskConical } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { LanguageSelector } from '@/components/voice/LanguageSelector';

const steps = [
  { n: "01", icon: Mic, title: "Say hello", body: "Tap the orb and speak — ECHO listens and replies with a friendly voice." },
  { n: "02", icon: BookOpen, title: "Pick a subject", body: "Math, Science or English — start where curiosity takes them today." },
  { n: "03", icon: Sparkles, title: "Learn by doing", body: "Interactive story-lessons that reward every attempt with kindness." },
  { n: "04", icon: Star, title: "Grow every day", body: "Streaks, badges and gentle progress that keeps children coming back." },
];

const subjects = [
  { icon: Calculator, title: "Mathematics", chapters: "24 chapters", from: "#8A7FB0", to: "#6B5E88" },
  { icon: FlaskConical, title: "Science", chapters: "18 chapters", from: "#7A9C8A", to: "#5A7A68" },
  { icon: BookOpen, title: "English", chapters: "21 chapters", from: "#6A8CA8", to: "#4A6E88" },
];

const testimonials = [
  { quote: "My daughter went from avoiding math to asking ECHO for 'one more question' at bedtime.", name: "Priya S.", role: "Parent, Class 5" },
  { quote: "The voice-first design is a genuine accessibility win. It just meets kids where they are.", name: "Mr. Alvarez", role: "Grade 4 Teacher" },
];

export default function Home() {
  const { state, setLanguage } = useAppStore();
  return (
    <>
      {/* Language switcher pinned to the bottom-right corner so it stays
          reachable without disturbing the hero flow. Rendered as a sibling of
          PageTransition (not inside it) because PageTransition applies a Framer
          transform that would otherwise break position: fixed anchoring. */}
      <div className="fixed bottom-4 right-4 z-[55] md:bottom-6 md:right-6">
        <LanguageSelector value={state.language} onChange={setLanguage} />
      </div>
      <PageTransition className="pb-24">
      {/* Hero Section */}
      <section className="pt-8 pb-32 px-4 md:px-8 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 overflow-hidden">
        <div className="flex-1 text-center md:text-left mt-2">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full clay-card text-primary font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>A friendly tutor in your pocket</span>
          </motion.div>
          
          <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight max-w-4xl">
            Learn anything,<br/> in <span className="text-primary">your own language.</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto md:mx-0">
            ECHO is a voice-first AI companion that helps kids learn without judgment. It speaks 12 Indian languages, works on basic phones, and makes learning feel like magic.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
            <Link href="/signup" className="w-full sm:w-auto">
              <ClayButton variant="primary" size="lg" className="w-full">
                Start Learning for Free
              </ClayButton>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <ClayButton variant="secondary" size="lg" className="w-full">
                Parents & Teachers
              </ClayButton>
            </Link>
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex items-center gap-4 justify-center md:justify-start text-sm text-ink-subtle"
          >
          <div className="flex -space-x-2" aria-hidden="true">
            {['#7D6FA3', '#6A8F7A', '#5B85A4', '#E88C5D'].map((c, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2" style={{ background: c, borderColor: 'var(--bg-page)' }} />
            ))}
          </div>
            Loved by 12,000+ families
          </motion.div>
        </div>

        <motion.div 
          className="flex-1 w-full max-w-md relative self-start -mt-6"
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div whileHover={{ rotate: 0 }} className="clay-card p-4 rotate-2">
             <img src="/child_first_page.png" alt="Child using ECHO" width={480} height={360} loading="eager" className="w-full h-auto rounded-xl shadow-inner object-cover" />
          </motion.div>
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.6, duration: 0.6 }}
             className="absolute -bottom-6 -left-6"
           >
             <motion.div
               animate={{ y: [0, -6, 0] }}
               transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
               className="rounded-2xl px-5 py-3 flex items-center gap-3 clay-card bg-white"
             >
               <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(107,94,136,0.12)' }}>
                 <Mic className="w-4 h-4" style={{ color: 'var(--primary)' }} />
               </div>
               <div>
                 <p className="text-[11px] uppercase tracking-wider font-semibold text-ink-subtle">Listening</p>
                 <p className="text-sm font-semibold text-ink">Tell me about oceans…</p>
               </div>
             </motion.div>
           </motion.div>
        </motion.div>
      </section>

      {/* Value Props */}
      <section className="py-24 px-4 md:px-8 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Volume2 className="w-8 h-8 text-sage" />}
              title="Voice First"
              description="Talk to your tutor just like a friend. Perfect for kids who prefer speaking over typing, or those still learning to read."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Globe className="w-8 h-8 text-primary" />}
              title="12 Languages"
              description="From Hindi to Tamil, Marathi to Bengali. Learn complex science and math concepts in the language you speak at home."
              delay={0.2}
            />
            <FeatureCard 
              icon={<WifiOff className="w-8 h-8 text-sky" />}
              title="Works Anywhere"
              description="Designed for $50 phones and spotty internet. Your child's learning journey never gets interrupted by bad connectivity."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-4 text-primary">How it works</p>
          <h2 className="text-4xl font-bold text-foreground">Four small steps. One big spark.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="relative"
            >
              <ClayCard className="p-8 h-full overflow-hidden relative">
                <span className="absolute top-4 right-6 font-serif font-bold text-6xl select-none pointer-events-none text-foreground/5">
                  {s.n}
                </span>
                <div className="clay-btn w-12 h-12 flex items-center justify-center mb-6" style={{ backgroundColor: "#F4F3F1" }}>
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{s.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </ClayCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-4 text-primary">A curriculum kids adore</p>
          <h2 className="text-4xl font-bold text-foreground">Three subjects, thoughtfully crafted.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {subjects.map((s, i) => (
            <motion.div
              key={s.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              whileHover="hover"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
                hover: { y: -6 },
              }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="rounded-[32px] p-8 text-white relative overflow-hidden cursor-pointer group clay-card"
              style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
              <div className="relative z-10 flex flex-col justify-between min-h-[180px]">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/15 backdrop-blur">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{s.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-white/70">{s.chapters}</p>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -8 },
                        show: { opacity: 0, x: -8 },
                        hover: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="flex"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission / Accessibility Section */}
      <section className="py-32 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="flex-1 w-full max-w-lg"
          >
            <motion.div whileHover={{ rotate: 0 }} className="clay-card p-4 -rotate-2 bg-card">
              <img src="/section3image.png" alt="$50 Budget Device" width={560} height={420} loading="lazy" className="w-full h-auto rounded-xl shadow-inner object-cover" />
            </motion.div>
          </motion.div>

          <div className="flex-1 space-y-6 text-center md:text-left">
            <h2 className="text-4xl font-bold text-foreground">Accessible to everyone</h2>
            <p className="text-lg text-muted-foreground">
              We believe every child deserves a world-class education, regardless of their family's income. That's why ECHO is designed to run perfectly on entry-level $50 smartphones.
            </p>
            <p className="text-lg text-muted-foreground">
              No expensive tablets, no high-speed broadband required. Just a simple voice interface that brings the world's knowledge to the most remote villages.
            </p>
          </div>
        </div>
      </section>

      {/* How it feels */}
      <section className="py-32 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16 text-foreground">A safe space to ask "why?"</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
      <ClayCard className="p-8 text-left relative overflow-hidden h-96 flex flex-col justify-end bg-gradient-to-br from-card to-primary/10">
        <div className="absolute top-8 right-8 text-primary/20">
          <Brain className="w-32 h-32" />
        </div>
        {/* Demo conversation bubbles stagger in (ISSUE-010). */}
        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.25, delayChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div
            variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
            className="clay-card p-4 mb-4 ml-8 rounded-tr-none max-w-[80%]"
          >
            <p className="text-foreground">Why is the sky blue?</p>
          </motion.div>
          <motion.div
            variants={{ hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } }}
            className="clay-card p-4 bg-primary/10 border-none rounded-tl-none max-w-[80%] text-foreground"
          >
            <p>Imagine sunlight is made of all the colors of a rainbow...</p>
          </motion.div>
        </motion.div>
      </ClayCard>
          
          <div className="text-left space-y-6">
            <h3 className="text-2xl font-bold">Helped, never judged.</h3>
            <p className="text-lg text-muted-foreground">
              Kids ask hundreds of questions. In a crowded classroom, they might feel shy. With ECHO, they can ask the same question ten times until they understand, with a patient companion that always encourages them.
            </p>
            <ul className="space-y-4 pt-4">
              {['Curriculum aligned (CBSE & State Boards)', 'Zero ads or hidden tracking', 'Detailed progress reports for parents'].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 text-foreground font-medium"
                >
                  <div className="clay-circle w-6 h-6 flex items-center justify-center bg-sky/20 text-sky-foreground shrink-0">
                    <Star className="w-3 h-3" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] mb-4 text-primary">From real families</p>
          <h2 className="text-4xl font-bold text-foreground">Words from parents and teachers.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ClayCard className="p-10 h-full">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-5 h-5" style={{ color: "var(--cream-gold)", fill: "var(--cream-gold)" }} />
                  ))}
                </div>
                <p className="text-xl leading-relaxed font-serif text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold bg-primary">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </ClayCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <ClayCard className="bg-primary/5 p-12">
            <img src="/echo-robot.png" alt="ECHO robot" width={112} height={112} loading="lazy" className="w-28 h-28 mx-auto mb-2 object-contain drop-shadow-2xl animate-orb-float" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to make learning joyful?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of parents who trust ECHO to nurture their child's curiosity. Start free, upgrade only when you want more magic.
            </p>
            <Link href="/signup">
              <ClayButton variant="primary" size="lg">
                Create Free Account
              </ClayButton>
            </Link>
          </ClayCard>
        </motion.div>
      </section>

      <Footer />
    </PageTransition>
    </>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay, type: "spring" }}
      className="h-full"
    >
      <ClayCard
        whileHover={{ y: -8 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="h-full flex flex-col items-center text-center p-8"
      >
        <div className="clay-circle w-16 h-16 flex items-center justify-center mb-6">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </ClayCard>
    </motion.div>
  );
}
