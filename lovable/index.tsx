import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Sparkles,
  ShieldCheck,
  Globe2,
  Mic,
  ArrowRight,
  Star,
  BookOpen,
  Calculator,
  FlaskConical,
} from "lucide-react";
import { Navbar } from "@/components/echo/Navbar";
import { Footer } from "@/components/echo/Footer";
import { ClayCard, PrimaryButton, SecondaryButton, ClayPill } from "@/components/echo/ui";
import child from "@/assets/echo-child.png";
import robot from "@/assets/echo-robot.png";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "ECHO — Voice-First AI Tutor for Children" },
      {
        name: "description",
        content:
          "A warm, voice-first AI tutor for children. Safe, multilingual, and inclusive learning across Math, Science and English.",
      },
    ],
  }),
});

const features = [
  {
    icon: ShieldCheck,
    title: "Safe by design",
    body: "Kid-safe conversations, human-reviewed content and clear parental controls — always.",
    color: "var(--sage)",
  },
  {
    icon: Globe2,
    title: "Speaks their language",
    body: "Fluent tutoring in 25+ languages, so every child learns in the voice of home.",
    color: "var(--sky)",
  },
  {
    icon: Sparkles,
    title: "Learns with them",
    body: "Adapts to your child's pace with warmth, patience and lessons that feel like play.",
    color: "var(--primary)",
  },
];

const steps = [
  { n: "01", icon: Mic, title: "Say hello", body: "Tap the orb and speak — ECHO listens and replies with a friendly voice." },
  { n: "02", icon: BookOpen, title: "Pick a subject", body: "Math, Science or English — start where curiosity takes them today." },
  { n: "03", icon: Sparkles, title: "Learn by doing", body: "Interactive story-lessons that reward every attempt with kindness." },
  { n: "04", icon: Star, title: "Grow every day", body: "Streaks, badges and gentle progress that keeps children coming back." },
];

const subjects = [
  { icon: Calculator, title: "Mathematics", chapters: "24 chapters", from: "#7D6FA3", to: "#594B73" },
  { icon: FlaskConical, title: "Science", chapters: "18 chapters", from: "#6A8F7A", to: "#486354" },
  { icon: BookOpen, title: "English", chapters: "21 chapters", from: "#5B85A4", to: "#39566B" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function Landing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-page)" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-30 animate-blob-drift"
          style={{ background: "radial-gradient(circle, var(--primary), transparent 60%)" }}
        />
        <div
          className="absolute top-40 -right-32 w-[420px] h-[420px] rounded-full blur-3xl opacity-30 animate-blob-drift"
          style={{
            background: "radial-gradient(circle, var(--sage), transparent 60%)",
            animationDelay: "-4s",
          }}
        />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <ClayPill className="mb-6" >
                <Sparkles className="w-3.5 h-3.5" style={{ color: "var(--sage)" }} />
                <span style={{ color: "var(--sage)" }}>Voice-first learning for children</span>
              </ClayPill>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="font-display font-bold leading-[1.05]"
              style={{
                fontSize: "clamp(3rem, 5.2vw, 4.6rem)",
                letterSpacing: "-0.02em",
                color: "var(--ink-deep)",
              }}
            >
              The gentle tutor
              <br />
              that listens back.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
              style={{ color: "var(--ink-muted)" }}
            >
              ECHO is a voice-first AI tutor built for kids — patient, playful and safe. Ask
              anything, out loud, in the language you love.
            </motion.p>

            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-10 flex flex-wrap gap-4">
              <Link to="/auth">
                <PrimaryButton className="inline-flex items-center gap-2">
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              </Link>
              <Link to="/tutor">
                <SecondaryButton>Try the tutor</SecondaryButton>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-10 flex items-center gap-6 text-sm"
              style={{ color: "var(--ink-subtle)" }}
            >
              <div className="flex -space-x-2">
                {["#7D6FA3", "#6A8F7A", "#5B85A4", "#E88C5D"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2"
                    style={{ background: c, borderColor: "var(--bg-page)" }}
                  />
                ))}
              </div>
              Loved by 12,000+ families
            </motion.div>
          </motion.div>

          {/* Hero image card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <ClayCard className="p-8 md:p-10 aspect-square max-h-[540px] mx-auto w-full max-w-[540px] overflow-hidden">
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="absolute inset-8 rounded-full opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 30%, rgba(107,94,136,0.35), transparent 60%)",
                  }}
                />
                <motion.img
                  src={child}
                  alt="Child learning with ECHO"
                  className="relative w-full h-full object-contain drop-shadow-2xl animate-orb-float rounded-3xl"
                  draggable={false}
                />
              </div>
            </ClayCard>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 clay-card rounded-2xl px-5 py-3 flex items-center gap-3"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(107,94,136,0.12)" }}
              >
                <Mic className="w-4 h-4" style={{ color: "var(--primary)" }} />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-ink-subtle">
                  Listening
                </p>
                <p className="text-sm font-semibold text-ink">Tell me about oceans…</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <SectionHeader
          eyebrow="Why families choose ECHO"
          title="Warm, safe, made for how kids actually learn."
        />
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ClayCard
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="p-8 h-full"
              >
                <div
                  className="w-14 h-14 rounded-[20px] flex items-center justify-center mb-6"
                  style={{ backgroundColor: `color-mix(in oklab, ${f.color} 14%, white)` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="font-display text-2xl font-bold text-ink-deep mb-3">{f.title}</h3>
                <p className="text-ink-muted leading-relaxed">{f.body}</p>
              </ClayCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <SectionHeader eyebrow="How it works" title="Four small steps. One big spark." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative"
            >
              <ClayCard whileHover={{ y: -6 }} className="p-8 h-full overflow-hidden relative">
                <motion.span
                  className="absolute top-4 right-6 font-display font-bold text-6xl select-none pointer-events-none"
                  style={{ color: "#EAE8E4", mixBlendMode: "multiply" }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {s.n}
                </motion.span>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 clay-btn-secondary"
                  style={{ backgroundColor: "#F4F3F1" }}
                >
                  <s.icon className="w-5 h-5" style={{ color: "var(--primary)" }} />
                </div>
                <h4 className="font-display text-xl font-bold text-ink-deep mb-2">{s.title}</h4>
                <p className="text-sm text-ink-muted leading-relaxed">{s.body}</p>
              </ClayCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <SectionHeader
          eyebrow="A curriculum kids adore"
          title="Three subjects, thoughtfully crafted."
        />
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {subjects.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-[32px] p-8 text-white relative overflow-hidden cursor-pointer group clay-card"
              style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3" />
              <div className="relative z-10 flex flex-col justify-between min-h-[180px]">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/15 backdrop-blur"
                >
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-white/70">{s.chapters}</p>
                    <motion.div
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
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

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <SectionHeader eyebrow="From real families" title="Words from parents and teachers." />
        <div className="grid md:grid-cols-2 gap-8 mt-14">
          {[
            {
              quote:
                "My daughter went from avoiding math to asking ECHO for 'one more question' at bedtime.",
              name: "Priya S.",
              role: "Parent, Class 5",
            },
            {
              quote:
                "The voice-first design is a genuine accessibility win. It just meets kids where they are.",
              name: "Mr. Alvarez",
              role: "Grade 4 Teacher",
            },
          ].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ClayCard whileHover={{ y: -4 }} className="p-10 h-full">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="w-5 h-5 fill-current" style={{ color: "var(--cream-gold)" }} />
                  ))}
                </div>
                <p className="text-xl leading-relaxed font-display text-ink-deep">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: "var(--primary)" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-ink-subtle">{t.role}</p>
                  </div>
                </div>
              </ClayCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <ClayCard className="relative overflow-hidden p-12 md:p-20 text-center">
            <div
              className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-40 animate-blob-drift"
              style={{ background: "radial-gradient(circle, var(--primary), transparent 65%)" }}
            />
            <div
              className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-30 animate-blob-drift"
              style={{
                background: "radial-gradient(circle, var(--sage), transparent 65%)",
                animationDelay: "-6s",
              }}
            />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <img src={robot} alt="ECHO AI robot tutor" className="w-40 h-40 object-contain drop-shadow-2xl" />
              <h2
                className="font-display font-bold mt-4"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--ink-deep)" }}
              >
                Start your child's first
                <br /> voice-led lesson today.
              </h2>
              <p className="text-lg text-ink-muted max-w-xl">
                Free for the first 14 days. No credit card. Cancel any time.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center">
                <Link to="/auth">
                  <PrimaryButton className="inline-flex items-center gap-2">
                    Create free account
                    <ArrowRight className="w-4 h-4" />
                  </PrimaryButton>
                </Link>
                <Link to="/pricing">
                  <SecondaryButton>See pricing</SecondaryButton>
                </Link>
              </div>
            </div>
          </ClayCard>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      <p
        className="text-xs font-semibold uppercase tracking-[0.16em] mb-4"
        style={{ color: "var(--primary)" }}
      >
        {eyebrow}
      </p>
      <h2
        className="font-display font-bold"
        style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", lineHeight: 1.1, color: "var(--ink-deep)" }}
      >
        {title}
      </h2>
    </motion.div>
  );
}
