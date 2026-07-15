import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CheckCircle2, Globe2, Sparkles, Eye, EyeOff, Mic, ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/echo/ui";
import child from "@/assets/echo-child.png";

export const Route = createFileRoute("/auth")({
  component: Auth,
  head: () => ({
    meta: [
      { title: "Sign in — ECHO" },
      { name: "description", content: "Sign in or create your ECHO family account." },
    ],
  }),
});

function Auth() {
  const [tab, setTab] = useState<"signin" | "signup">("signup");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="min-h-screen p-6 lg:p-10" style={{ backgroundColor: "var(--bg-page)" }}>
      <div className="max-w-[1280px] mx-auto grid lg:grid-cols-2 gap-10 items-center min-h-[calc(100vh-5rem)]">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex flex-col gap-8"
        >
          <Link to="/" className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center clay-btn-primary"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <Mic className="w-6 h-6 text-white" />
            </div>
            <span className="font-display text-4xl font-extrabold" style={{ color: "var(--primary)" }}>
              ECHO
            </span>
          </Link>
          <h2
            className="font-display font-semibold"
            style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)", lineHeight: 1.1, color: "var(--ink-deep)" }}
          >
            A warmer way to learn — for the ones who matter most.
          </h2>

          <div
            className="rounded-[32px] p-4 aspect-square max-w-[480px] clay-panel"
            style={{ backgroundColor: "white" }}
          >
            <img src={child} alt="Child learning with ECHO" className="w-full h-full object-cover rounded-[24px]" />
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { icon: CheckCircle2, t: "Kid-safe" },
              { icon: Globe2, t: "25+ languages" },
              { icon: Sparkles, t: "Adaptive & kind" },
            ].map((c) => (
              <span
                key={c.t}
                className="clay-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink"
                style={{ backgroundColor: "var(--bg-card)" }}
              >
                <c.icon className="w-4 h-4" style={{ color: "var(--primary)" }} />
                {c.t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto clay-panel rounded-[32px] p-8 sm:p-12"
          style={{ backgroundColor: "var(--bg-card-light)" }}
        >
          {/* Tabs */}
          <div
            className="clay-inner rounded-full p-1.5 grid grid-cols-2 mb-8"
            style={{ backgroundColor: "var(--bg-page)" }}
          >
            {(["signup", "signin"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  tab === t ? "clay-pill" : ""
                }`}
                style={{
                  backgroundColor: tab === t ? "#F4F3F1" : "transparent",
                  color: tab === t ? "var(--primary)" : "#8C8697",
                }}
              >
                {t === "signup" ? "Create account" : "Sign in"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
            >
              <h1 className="font-display text-3xl font-bold text-ink-deep">
                {tab === "signup" ? "Welcome to ECHO" : "Welcome back"}
              </h1>
              <p className="text-sm text-ink-muted -mt-2">
                {tab === "signup"
                  ? "Create your family account in under a minute."
                  : "Continue your family's learning journey."}
              </p>

              {tab === "signup" && <ClayInput placeholder="Parent's name" />}
              <ClayInput type="email" placeholder="Email address" />
              <div className="relative">
                <ClayInput type={showPw ? "text" : "password"} placeholder="Password" />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-subtle hover:text-primary"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {tab === "signup" && (
                <div className="grid grid-cols-2 gap-3">
                  <ClaySelect options={["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"]} />
                  <ClaySelect options={["English", "Hindi", "Spanish", "French"]} />
                </div>
              )}

              <div className="pt-2">
                <PrimaryButton className="w-full inline-flex items-center justify-center gap-2">
                  {tab === "signup" ? "Create account" : "Sign in"}
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              </div>

              <div className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px" style={{ backgroundColor: "#D6D2CA" }} />
                <span className="text-xs text-ink-subtle font-semibold uppercase tracking-wider">or</span>
                <div className="flex-1 h-px" style={{ backgroundColor: "#D6D2CA" }} />
              </div>

              <button
                type="button"
                className="clay-btn-secondary rounded-full w-full py-3.5 inline-flex items-center justify-center gap-3 text-sm font-semibold text-ink"
                style={{ backgroundColor: "#F3F1EC" }}
              >
                <GoogleG />
                Continue with Google
              </button>

              <p className="text-xs text-ink-subtle text-center pt-2">
                By continuing you agree to our Terms & Privacy.
              </p>
            </motion.form>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function ClayInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full px-5 py-4 text-[15px] text-ink placeholder:text-[#8C8697] rounded-2xl border-0 outline-none clay-inner focus:ring-0"
      style={{ backgroundColor: "var(--bg-page)" }}
    />
  );
}

function ClaySelect({ options }: { options: string[] }) {
  return (
    <div className="relative">
      <select
        className="w-full appearance-none px-5 py-4 text-[15px] text-ink rounded-2xl border-0 outline-none clay-inner"
        style={{ backgroundColor: "var(--bg-page)" }}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M5.5 8l4.5 4.5L14.5 8z" />
      </svg>
    </div>
  );
}

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.7 30.2.5 24 .5 14.8.5 6.9 5.8 3.1 13.5l7.8 6C12.8 13.6 17.9 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.6z" />
      <path fill="#FBBC05" d="M10.9 28.5c-.5-1.4-.8-3-.8-4.5s.3-3.1.8-4.5l-7.8-6C1.2 16.9 0 20.3 0 24s1.2 7.1 3.1 10.5l7.8-6z" />
      <path fill="#34A853" d="M24 47.5c6.5 0 12-2.1 15.9-5.9l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6.1 0-11.2-4.1-13.1-9.5l-7.8 6C6.9 42.2 14.8 47.5 24 47.5z" />
    </svg>
  );
}
