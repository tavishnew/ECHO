import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Mic } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/tutor", label: "Tutor" },
  { to: "/rewards", label: "Rewards" },
  { to: "/pricing", label: "Pricing" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-ink/5"
      style={{
        backgroundColor: "rgba(234,232,228,0.72)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center clay-btn-primary"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <Mic className="w-5 h-5 text-white" strokeWidth={2.4} />
          </div>
          <span
            className="font-display text-2xl font-extrabold tracking-tight"
            style={{ color: "var(--primary)" }}
          >
            ECHO
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[15px] font-medium text-ink-muted hover:text-ink transition-colors"
              activeProps={{ style: { color: "var(--primary)", fontWeight: 600 } }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/auth"
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-white clay-btn-primary transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Sign in
        </Link>
      </div>
    </motion.header>
  );
}
