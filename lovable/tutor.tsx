import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Settings,
  Globe2,
  Mic,
  Clock,
  List,
  Volume2,
} from "lucide-react";
import { ClayCard } from "@/components/echo/ui";
import heroOrb from "@/assets/echo-hero-orb.png";

export const Route = createFileRoute("/tutor")({
  component: Tutor,
  head: () => ({
    meta: [
      { title: "Tutor — ECHO" },
      { name: "description", content: "Talk with ECHO — your voice-first AI tutor." },
    ],
  }),
});

const messages = [
  { who: "tutor", text: "Great! Let's explore Numbers Adventure — ready?" },
  { who: "student", text: "Yes! I want to learn about place values." },
  { who: "tutor", text: "Beautiful. Say a number and I'll show you its home." },
];

function Tutor() {
  const [listening, setListening] = useState(true);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "var(--bg-page)" }}>
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 min-h-[calc(100vh-3rem)]">
        {/* Top bar */}
        <div className="flex items-center justify-between px-2">
          <Link
            to="/dashboard"
            className="w-10 h-10 rounded-full clay-btn-secondary flex items-center justify-center bg-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="text-center">
            <p className="text-xs uppercase tracking-wider text-ink-subtle font-semibold">
              Mathematics · Class 5
            </p>
            <h1 className="font-display text-xl font-bold text-ink-deep">Numbers Adventure</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="clay-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={{ backgroundColor: "var(--bg-card)" }}
            >
              <Globe2 className="w-4 h-4" style={{ color: "var(--primary)" }} />
              English
            </button>
            <button className="w-10 h-10 rounded-full clay-btn-secondary flex items-center justify-center bg-white">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr_260px] gap-6 flex-1">
          {/* Left panel */}
          <ClayCard className="p-6 hidden lg:block" style={{ backgroundColor: "var(--bg-card-alt)" }}>
            <p className="text-xs uppercase tracking-wider font-semibold text-ink-subtle mb-4">
              Chapters
            </p>
            <ul className="space-y-1">
              {["Place values", "Addition tricks", "Fun with tens", "Big numbers", "Practice quiz"].map(
                (t, i) => (
                  <li key={t}>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        i === 0
                          ? "clay-pill text-primary"
                          : "text-ink-muted hover:text-ink hover:bg-white"
                      }`}
                      style={i === 0 ? { backgroundColor: "var(--bg-card)", color: "var(--primary)" } : {}}
                    >
                      {t}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </ClayCard>

          {/* Center - Orb & Mic */}
          <div className="relative flex flex-col items-center justify-between py-10 gap-8">
            {/* chat bubbles */}
            <div className="w-full max-w-lg space-y-3">
              <AnimatePresence>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15, duration: 0.4 }}
                    className={`flex ${m.who === "student" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-5 py-3.5 clay-card ${
                        m.who === "student"
                          ? "rounded-3xl rounded-tr-sm"
                          : "rounded-3xl rounded-tl-sm bg-white"
                      }`}
                      style={{
                        backgroundColor: m.who === "student" ? "var(--bg-card-alt)" : "#FFFFFF",
                      }}
                    >
                      <p className="text-sm text-ink leading-relaxed">{m.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Orb */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full animate-orb-pulse"
                style={{ backgroundColor: "rgba(107,94,136,0.20)" }}
              />
              <div
                className="absolute inset-6 rounded-full animate-orb-pulse-inner"
                style={{ backgroundColor: "rgba(107,94,136,0.28)" }}
              />
              <motion.img
                src={heroOrb}
                alt="ECHO orb"
                className="relative w-56 h-56 object-contain animate-orb-float drop-shadow-2xl"
                draggable={false}
              />
            </div>

            {/* Mic */}
            <div className="relative">
              {listening && (
                <>
                  <span className="absolute -inset-3 rounded-full border-2 animate-ping" style={{ borderColor: "rgba(107,94,136,0.35)" }} />
                  <span className="absolute -inset-1 rounded-full border-2 animate-pulse" style={{ borderColor: "rgba(107,94,136,0.55)" }} />
                </>
              )}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => setListening((v) => !v)}
                className="relative w-20 h-20 rounded-full flex items-center justify-center text-white clay-mic"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Mic className="w-7 h-7" />
              </motion.button>
              <p className="text-center text-xs uppercase tracking-wider text-ink-subtle mt-4 font-semibold">
                {listening ? "Listening…" : "Tap to speak"}
              </p>
            </div>
          </div>

          {/* Right panel */}
          <ClayCard className="p-6 hidden lg:block" style={{ backgroundColor: "var(--bg-card-alt)" }}>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-subtle font-semibold mb-3">
                  <Clock className="w-4 h-4" /> Session
                </div>
                <div className="rounded-2xl p-5 text-center clay-inner" style={{ backgroundColor: "#FFFFFF" }}>
                  <p className="font-display text-3xl font-bold" style={{ color: "var(--primary)" }}>
                    {mm}:{ss}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-subtle font-semibold mb-3">
                  <List className="w-4 h-4" /> Topics
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { t: "Ones", c: "var(--primary)" },
                    { t: "Tens", c: "var(--sage)" },
                    { t: "Hundreds", c: "var(--sky)" },
                  ].map((tag) => (
                    <span
                      key={tag.t}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: `color-mix(in oklab, ${tag.c} 12%, white)`,
                        color: tag.c,
                      }}
                    >
                      {tag.t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-subtle font-semibold mb-3">
                  <Volume2 className="w-4 h-4" /> Speech pace
                </div>
                <div className="relative h-4 rounded-full clay-inner overflow-visible" style={{ backgroundColor: "var(--bg-page)" }}>
                  <div className="h-full rounded-full" style={{ width: "50%", backgroundColor: "var(--primary)" }} />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white clay-pill"
                    style={{ left: "calc(50% - 12px)" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-ink-subtle mt-2 font-semibold">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>
            </div>
          </ClayCard>
        </div>
      </div>
    </div>
  );
}
