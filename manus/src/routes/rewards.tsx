import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Flame,
  Star,
  Trophy,
  Target,
  Zap,
  Languages,
  Microscope,
  GraduationCap,
  Lock,
  BookOpen,
} from "lucide-react";
import { Navbar } from "@/components/echo/Navbar";
import { Footer } from "@/components/echo/Footer";
import { ClayCard } from "@/components/echo/ui";

export const Route = createFileRoute("/rewards")({
  component: Rewards,
  head: () => ({
    meta: [
      { title: "Rewards — ECHO" },
      { name: "description", content: "Streaks, XP and badges that celebrate every small win." },
    ],
  }),
});

const stats = [
  { label: "Streak", value: "12 days", icon: Flame, bg: "#E88C5D" },
  { label: "Total XP", value: "1,840", icon: Star, bg: "#6B5E88" },
  { label: "Level", value: "7", icon: Trophy, bg: "#5A7A68", progress: 70 },
];

const badges = [
  { icon: Target, name: "First Session", color: "#6B5E88", earned: true },
  { icon: Zap, name: "Math Whiz", color: "#E88C5D", earned: true },
  { icon: Languages, name: "Multilingual", color: "#4A6E88", earned: true },
  { icon: Microscope, name: "Science Star", color: "#5A7A68", earned: true },
  { icon: BookOpen, name: "Storyteller", color: "#8A7248", earned: true },
  { icon: Star, name: "Streaker", color: "#8A5250", earned: true },
  { icon: Trophy, name: "Top of Class", color: "#6B5E88", earned: false },
  { icon: GraduationCap, name: "All Subjects", color: "#4A6E88", earned: false },
];

const activity = [
  { icon: Zap, subject: "Math", title: "Numbers Adventure — Chapter 3", xp: 120, when: "2h · 12 min" },
  { icon: Microscope, subject: "Science", title: "Water Cycle basics", xp: 80, when: "Yesterday · 9 min" },
  { icon: BookOpen, subject: "English", title: "Story: The Kind Fox", xp: 60, when: "Yesterday · 7 min" },
];

const leaderboard = [
  { name: "Riya", xp: 2140 },
  { name: "Aarav (you)", xp: 1840, you: true },
  { name: "Mateo", xp: 1620 },
  { name: "Lin", xp: 1490 },
];

function Rewards() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-page)" }}>
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold" style={{ color: "var(--primary)" }}>
            Rewards
          </p>
          <h1
            className="font-display font-semibold mt-2"
            style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", letterSpacing: "-0.02em", color: "var(--ink-deep)" }}
          >
            Every little win, celebrated.
          </h1>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="clay-card rounded-3xl p-6 text-white relative overflow-hidden"
              style={{ backgroundColor: s.bg }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-white/80">{s.label}</p>
                  <p className="font-display text-4xl font-bold mt-2">{s.value}</p>
                </div>
                <div className="w-11 h-11 rounded-full flex items-center justify-center bg-white/20 backdrop-blur">
                  <s.icon className="w-5 h-5" />
                </div>
              </div>
              {s.progress !== undefined && (
                <div className="relative z-10 mt-5">
                  <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.progress}%` }}
                      transition={{ duration: 1.2, delay: 0.4 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <p className="text-xs text-white/80 mt-2">{s.progress}% to Level 8</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Level card */}
        <ClayCard className="p-8" style={{ backgroundColor: "var(--bg-card-warm)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-ink-subtle">Level 7</p>
              <h3 className="font-display text-2xl font-bold text-ink-deep mt-1">Curious Explorer</h3>
            </div>
            <p className="font-semibold" style={{ color: "var(--cream-gold)" }}>1,840 / 2,600 XP</p>
          </div>
          <div className="relative h-3 rounded-full clay-inner overflow-hidden" style={{ backgroundColor: "var(--bg-page)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "70%" }}
              transition={{ duration: 1.3 }}
              className="h-full rounded-full relative"
              style={{ background: "linear-gradient(90deg, var(--primary), var(--cream-gold))" }}
            >
              <div className="absolute inset-x-0 top-0 h-1/2 bg-white/25 rounded-full" />
            </motion.div>
          </div>
        </ClayCard>

        {/* Badges */}
        <section>
          <h2 className="font-display text-2xl font-bold text-ink-deep mb-6">Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {badges.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center clay-card relative"
                  style={{
                    backgroundColor: b.earned ? b.color : "#D5D3D0",
                    opacity: b.earned ? 1 : 0.7,
                    filter: b.earned ? "none" : "grayscale(0.4)",
                  }}
                >
                  <b.icon className="w-10 h-10 text-white" />
                  {!b.earned && (
                    <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white clay-pill flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5 text-ink-subtle" />
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-ink text-center">{b.name}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Activity + Leaderboard */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <section>
            <h2 className="font-display text-2xl font-bold text-ink-deep mb-6">Recent activity</h2>
            <ClayCard className="p-3">
              <ul className="divide-y divide-ink/5">
                {activity.map((a) => (
                  <li key={a.title} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-colors">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                      style={{ backgroundColor: "var(--primary)" }}
                    >
                      <a.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs uppercase tracking-wider font-semibold text-ink-subtle">{a.subject}</p>
                      <p className="font-semibold text-ink truncate">{a.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold" style={{ color: "var(--primary)" }}>+{a.xp} XP</p>
                      <p className="text-xs text-ink-subtle">{a.when}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ClayCard>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-ink-deep mb-6">Leaderboard</h2>
            <ClayCard className="p-6">
              <ol className="space-y-3">
                {leaderboard.map((p, i) => (
                  <motion.li
                    key={p.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={`flex items-center gap-3 p-3 rounded-2xl ${
                      p.you ? "clay-pill" : ""
                    } ${i === 0 ? "border-2" : ""}`}
                    style={{
                      backgroundColor: p.you ? "var(--bg-card-alt)" : "transparent",
                      borderColor: i === 0 ? "var(--cream-gold)" : "transparent",
                      opacity: i > 2 ? 0.75 : 1,
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{
                        backgroundColor: i === 0 ? "var(--cream-gold)" : "var(--bg-page)",
                        color: i === 0 ? "white" : "var(--ink)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1 font-semibold text-ink text-sm truncate">{p.name}</span>
                    <span className="text-xs font-bold text-ink-subtle">{p.xp} XP</span>
                  </motion.li>
                ))}
              </ol>
            </ClayCard>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
