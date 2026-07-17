import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Mic,
  Flame,
  Star,
  Medal,
  ChevronDown,
  Calculator,
  FlaskConical,
  BookOpen,
  Library,
  Play,
  Globe,
  Home,
  BarChart3,
  Trophy,
  Settings,
  Sparkles,
} from "lucide-react";
import { ClayCard } from "@/components/echo/ui";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — ECHO" },
      { name: "description", content: "Your child's ECHO learning dashboard." },
    ],
  }),
});

const classes = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6"];

const subjects = [
  { icon: Calculator, title: "Mathematics", chapters: "24 chapters", from: "#7D6FA3", to: "#594B73" },
  { icon: FlaskConical, title: "Science", chapters: "18 chapters", from: "#6A8F7A", to: "#486354" },
  { icon: BookOpen, title: "English", chapters: "21 chapters", from: "#5B85A4", to: "#39566B" },
];

const sessions = [
  { title: "Numbers Adventure", subject: "Mathematics", color: "#7D6FA3", progress: 62 },
  { title: "The Water Cycle", subject: "Science", color: "#6A8F7A", progress: 34 },
];

const picks = [
  { icon: BookOpen, title: "Story of the day", meta: "5 min · English" },
  { icon: Sparkles, title: "Quick quiz", meta: "3 min · Mixed" },
  { icon: FlaskConical, title: "Experiment: rain", meta: "8 min · Science" },
];

function Dashboard() {
  const [activeClass, setActiveClass] = useState("Class 5");

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--bg-page)" }}>
      {/* Sidebar */}
      <aside
        className="hidden md:flex flex-col w-[260px] shrink-0 min-h-screen p-6 border-r border-ink/5"
        style={{ backgroundColor: "var(--bg-card-alt)" }}
      >
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <Mic className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-2xl font-extrabold" style={{ color: "var(--primary)" }}>
            ECHO
          </span>
        </Link>

        <nav className="flex flex-col gap-1.5">
          {[
            { icon: Home, label: "Dashboard", to: "/dashboard", active: true },
            { icon: Mic, label: "Tutor", to: "/tutor" },
            { icon: Trophy, label: "Rewards", to: "/rewards" },
            { icon: BarChart3, label: "Progress", to: "/dashboard" },
            { icon: Settings, label: "Settings", to: "/dashboard" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                item.active ? "clay-pill" : "text-ink-muted hover:text-ink"
              }`}
              style={item.active ? { backgroundColor: "var(--bg-card)", color: "var(--primary)" } : {}}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <button
            className="clay-pill flex items-center justify-between px-4 py-3 rounded-full text-sm font-semibold text-ink"
            style={{ backgroundColor: "var(--bg-card)" }}
          >
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4" style={{ color: "var(--primary)" }} />
              English
            </span>
            <ChevronDown className="w-4 h-4 text-ink-subtle" />
          </button>
          <ClayCard className="p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: "var(--primary)" }}
            >
              A
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">Aarav</p>
              <p className="text-xs text-ink-subtle">Class 5 · Level 7</p>
            </div>
          </ClayCard>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 md:px-10 md:py-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.16em] font-semibold text-ink-subtle mb-2">
                Tuesday · July 14
              </p>
              <h1
                className="font-display font-semibold"
                style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", color: "var(--ink-deep)" }}
              >
                Good afternoon, Aarav.
              </h1>
              <p className="text-ink-muted mt-2">Ready for today's little adventure?</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <StatPill icon={Flame} color="var(--orange-clay)" label="Streak" value="12 days" />
              <StatPill icon={Star} color="var(--primary)" label="XP" value="1,840" />
              <StatPill icon={Medal} color="var(--cream-gold)" label="Badges" value="7" />
            </div>
          </motion.div>

          {/* Class selector */}
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
            {classes.map((c) => {
              const active = c === activeClass;
              return (
                <motion.button
                  key={c}
                  onClick={() => setActiveClass(c)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap ${
                    active ? "text-white clay-btn-primary" : "text-ink-subtle clay-pill"
                  }`}
                  style={{ backgroundColor: active ? "var(--primary)" : "var(--bg-card)" }}
                >
                  {c}
                </motion.button>
              );
            })}
          </div>

          {/* Subjects */}
          <section>
            <SectionTitle>Subjects</SectionTitle>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {subjects.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-[32px] p-8 text-white relative overflow-hidden cursor-pointer group clay-card min-h-[180px]"
                  style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
                      <s.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold">{s.title}</h3>
                      <p className="text-sm text-white/70 mt-1">{s.chapters}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Continue */}
          <section>
            <SectionTitle>Continue where you left off</SectionTitle>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              {sessions.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <ClayCard whileHover={{ y: -4 }} className="p-6 flex items-center gap-5">
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: s.color }}>
                        {s.subject}
                      </p>
                      <h4 className="font-display text-xl font-bold text-ink-deep mt-1">{s.title}</h4>
                      <div className="clay-inner rounded-full h-2 mt-4 overflow-hidden" style={{ backgroundColor: "var(--bg-page)" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${s.progress}%` }}
                          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: s.color }}
                        />
                      </div>
                      <p className="text-xs text-ink-subtle mt-2">{s.progress}% complete</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white clay-btn-primary shrink-0"
                      style={{ backgroundColor: s.color }}
                    >
                      <Play className="w-5 h-5 fill-current" />
                    </motion.button>
                  </ClayCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Today's picks */}
          <section>
            <SectionTitle>Today's picks</SectionTitle>
            <ClayCard className="p-3 mt-6">
              <ul className="divide-y divide-ink/5">
                {picks.map((p) => (
                  <li key={p.title}>
                    <motion.button
                      whileHover={{ x: 4 }}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-colors text-left"
                    >
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: "rgba(107,94,136,0.1)" }}
                      >
                        <p.icon className="w-5 h-5" style={{ color: "var(--primary)" }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-ink">{p.title}</p>
                        <p className="text-xs text-ink-subtle">{p.meta}</p>
                      </div>
                      <Library className="w-4 h-4 text-ink-faint" />
                    </motion.button>
                  </li>
                ))}
              </ul>
            </ClayCard>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatPill({
  icon: Icon,
  color,
  label,
  value,
}: {
  icon: any;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className="clay-pill flex items-center gap-3 rounded-full px-4 py-2.5"
      style={{ backgroundColor: "var(--bg-card)" }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `color-mix(in oklab, ${color} 14%, white)` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="leading-tight">
        <p className="text-[10px] uppercase tracking-wider text-ink-subtle font-semibold">{label}</p>
        <p className="text-sm font-bold text-ink">{value}</p>
      </div>
    </motion.div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-bold text-ink-deep">{children}</h2>;
}
