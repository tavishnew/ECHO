import { Mic } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-ink/5 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "var(--primary)" }}
          >
            <Mic className="w-4 h-4 text-white" />
          </div>
          <span className="font-display text-xl font-extrabold" style={{ color: "var(--primary)" }}>
            ECHO
          </span>
        </div>
        <p className="text-sm text-ink-subtle">
          A warm, voice-first AI tutor for children. Safe. Multilingual. Inclusive.
        </p>
        <p className="text-xs text-ink-subtle">© {new Date().getFullYear()} ECHO Learning</p>
      </div>
    </footer>
  );
}
