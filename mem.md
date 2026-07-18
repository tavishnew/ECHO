# ECHO (EchoEdu) — Session Memory

Last updated: 2026-07-17

## Stack
- Frontend: React + Vite + Tailwind v4 + Framer Motion + wouter + TanStack Query.
- Backend: Express + edge-tts (separate `backend/` folder, NOT part of frontend build).
- Source root: `C:\Users\tavis\ECHO\frontend\src`.
- Repo root `C:\Users\tavis\ECHO` has NO package.json — run frontend/backend separately.

## How to verify (network + sandbox restricted)
- `tsc`/`npx` fail (TS not installed locally, network blocked). Verification = escalated `vite build` only.
- Build command (escalated): `cd C:\Users\tavis\ECHO\frontend; npm.cmd run build` (use `npm.cmd`, not `npm`, on PowerShell).
- A build exit code of 1 is EXPECTED — it is the `>500 kB chunk` warning, not a failure. Success = `✓ built` in the output.
- Browser/HTTP verification of http://127.0.0.1:5173 is blocked by local policy; report static/typecheck-only verification.

## Running servers (start escalated)
- Frontend Vite: `http://localhost:5173` — `npm.cmd run dev` in `frontend/`.
- Backend Express: `http://localhost:3001` — start as plain `node C:\Users\tavis\ECHO\backend\index.js` (logs to %TEMP%). Do NOT use `npm run dev` (`node --watch`) for a stable session — the log redirect wrote a `.log` into the watched folder and caused infinite restart.
- Backend TTS/chat call Groq/Microsoft — network blocked in sandbox, so those endpoints can't be exercised here.

## Environment gotchas
- Sandbox blocks reading parent dirs (`../..`) and network.
- Source files are real UTF-8 (₹, ·, —, etc). When patching, match ASCII neighbors to avoid drift; em-dash `—` and `·` are valid UTF-8 and match fine if reproduced exactly.
- `request_user_input` is UNAVAILABLE in Default mode — make reasonable assumptions and proceed.

## Figma design audit (`C:\Users\tavis\ECHO\figma/issues/`, 39 issues)
- Already resolved in code: ISSUE-001 (blobs off tutor), 020 (mock data), 022 (color-mix fallback), 023 (class level from store), 024 (orb reactive), 027 (voice controls grouped), 035 (scrollbar hidden but functional; `.chat-scroll-area` keeps a styled bar), 036 (reduced-motion via `<MotionConfig reducedMotion="user">` in App.tsx), 037 (duplicate clay-btn classes).
- All issues are now RESOLVED. Final batch fixed this turn: app-shell 002 (staggered blob drift 0s/4s/8s), app-shell 003 (lazy routes + `<Suspense>` + `PageSkeleton` shimmer), homepage 007 (`font-display` hero), 009 (Framer `whileHover` on tilted cards), 011 (decorative avatar `aria-hidden`), global 039 (removed dead dark-mode `--primary` duplicate). Build verified 2026-07-17.

## Layout/nav conventions established this session
- Guest top `Navbar` shows on every route; hidden when `state.user` is set (sidebar takes over). Auto-hides on scroll-down, reveals on scroll-up / top hover zone.
- Home language selector lives in a `fixed bottom-4 right-4 z-[55]` wrapper OUTSIDE `PageTransition` (Framer transform would break `fixed` anchoring).
- Sidebar: desktop `aside` hidden `md:flex`, mobile bottom nav `md:hidden fixed bottom-0`. Only ONE ECHO logo (top of aside) — a duplicate logo block was removed.
- Tutor center column: orb is `relative w-56 h-56 ... sticky top-4 mx-auto -mb-20` (no z-20, so it sits BEHIND the chat `ClayCard` which has `relative z-10`); mic + waveform live in the input bar next to Send; chat `ClayCard` uses `pt-36` so the first message clears the overlapping orb.

## Recent fixes (this turn)
1. Tutor: restructured center column so the orb stays sticky and overlaps the chat card; moved speaking waveform next to the mic button.
2. Sidebar: removed the duplicate ECHO logo block in the desktop aside.
3. Build verified: `✓ built`.

## Final status (2026-07-17)
- All 39 figma issues RESOLVED. Build clean: `vite build` -> `built` in ~2.6s, main chunk 446 kB (under the 500 kB warning threshold).
- Runtime crashes previously reported (`state is not defined`, `activeClass.replace`, `AnimatePresence is not defined`, `ClayButton is not defined`) are NOT present in current code — `dashboard.tsx` correctly imports `AnimatePresence`/`ClayButton` and destructures `state`; `store.tsx` merges saved state over `defaultState` so `selectedClass` is always defined.
- New file: `frontend/src/components/layout/page-skeleton.tsx` (reuses `.skeleton` shimmer from ISSUE-038).
- ponytail lens: kept fixes minimal — only the open issues were touched; no speculative features added.
- security-guidance lens: login/signup store no passwords (password never persisted to localStorage); all inputs are controlled and rendered as text (no `dangerouslySetInnerHTML`); API errors render as escaped text.

## Key files
- `frontend/src/App.tsx` — MotionConfig, blob gating, router.
- `frontend/src/index.css` — clay tokens, scrollbar rules, reduced-motion, shimmer.
- `frontend/src/lib/store.tsx` — global state (selectedClass, language, user); localStorage merge with defaults.
- `frontend/src/lib/i18n.ts` — `en` is source dict; `translate()` falls back to en.
- `frontend/src/components/layout/navbar.tsx`, `sidebar.tsx`, `page-transition.tsx`.
- `frontend/src/pages/tutor.tsx`, `home.tsx`, `dashboard.tsx`, `signup.tsx`, `rewards.tsx`.
- `frontend/src/components/voice/MessageBubble.tsx`, `LanguageSelector.tsx`, `VoiceButton.tsx`.

## Cleanup (2026-07-18)
- Removed dead figma-make-app scaffold: figma/index.html, package.json, tsconfig.json, .figma/, AGENTS.md, CLAUDE.md. Kept figma/issues/ (39-issue design audit).
- Removed .impeccable/ tool cache (design.json, detect_out.json, critique/, live/).
- Rewrote README.md for the real monorepo: frontend Vite app + backend Express 5 / edge-tts (GROQ_API_KEY). Removed stale single-src layout, npm run server, ElevenLabs keys, 12-language overstatement.
- frontend/dev.*.log still locked by the running dev server; gitignored (*.log) and safe to ignore.

## Cleanup (2026-07-18, later)
- Deleted the entire figma/ folder. It only contained figma/issues/ (a stale, fully-resolved 39-issue design-audit snapshot from the Figma export, not referenced by app code). Removed its reference from README. Root now holds only: .agents, .git, backend, frontend, DESIGN.md, mem.md, README.md, .gitignore.
