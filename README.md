# EchoEdu (ECHO) — Voice of Every Child's Future

A **voice-first AI tutor** for school students. Pick a class, subject, and topic,
then chat with **ECHO** by typing or speaking. ECHO answers in plain text (via
**Groq**) and reads them aloud (via **free Microsoft Edge neural TTS**) in the
student's language.

This repo is a **monorepo** with two independently-runnable parts:

- `frontend/` — Vite + React + TypeScript single-page app (the product UI).
- `backend/` — small Express server that proxies Groq and generates speech, keeping the API key server-side.

There is **no root `package.json`** — install and run each folder separately.

## Tech stack

**Frontend (`frontend/`)**

- React 19 + TypeScript, bundled by Vite (`vite.config.ts`).
- Tailwind CSS v4 (via `@tailwindcss/vite`).
- Framer Motion (animation), `wouter` (routing), TanStack Query (data fetching).
- Client state in `src/lib/store.tsx` (React context + `localStorage`); i18n in `src/lib/i18n.ts` + `src/lib/languages.ts`.

**Backend (`backend/`)**

- Express 5 (`index.js`), `msedge-tts` for free neural text-to-speech (no API key needed), `cors` + JSON body parsing.
- Loads `.env` via `dotenv`; `express-rate-limit` caps per-IP traffic on `/api/ask`, `/api/tts` and `/api/translate`.
- CORS is restricted to an explicit origin allow-list (`FRONTEND_URLS`).

## Prerequisites

- Node.js 18+ (uses native ESM `import.meta` and the built-in `fetch`).
- A free **Groq API key** for the AI tutor — https://console.groq.com/keys.

> Windows / PowerShell note: use `npm.cmd` (not `npm`) to avoid execution-policy errors.

## Setup

### 1. Install dependencies

```bash
# Terminal 1 — backend
cd backend
npm.cmd install

# Terminal 2 — frontend
cd frontend
npm.cmd install
```

### 2. Configure the backend

Copy the example env and add your Groq key:

```bash
cp backend/.env.example backend/.env
```

`backend/.env`:

```
GROQ_API_KEY=your_groq_api_key_here
FRONTEND_URLS=http://localhost:5173
```

The key lives **only on the server** — the browser never sees it. In dev the
frontend calls `/api/ask` and Vite proxies that to the backend.

`FRONTEND_URLS` is a comma-separated allow-list of browser origins permitted to
call the API (defaults to `http://localhost:5173`); add your deployed frontend
URL in production. When the backend runs behind a reverse proxy, set
`TRUST_PROXY=1` so rate limiting uses the real client IP.

### 3. Run the backend

```bash
cd backend
node index.js
```

The server listens on **http://localhost:3001** and prints the supported languages.

> For a quick watch-reload loop you can use `npm run dev` (`node --watch index.js`),
> but for a stable long-lived session prefer `node index.js` so a stray log file
> can't trigger a restart loop.

### 4. Run the frontend

```bash
cd frontend
npm.cmd run dev
```

Open **http://localhost:5173**. Vite proxies any `/api/*` request to
`http://localhost:3001` (see `frontend/vite.config.ts`).

## Build & preview (frontend)

```bash
cd frontend
npm.cmd run build     # outputs to frontend/dist/public
npm.cmd run serve     # preview the production build
npm.cmd run typecheck # tsc --noEmit
```

## Project structure

```
backend/
  index.js            # Express server: /api/ask (Groq), /api/tts (edge-tts),
                      #   /api/translate (MyMemory), /api/health
  .env.example        # GROQ_API_KEY
  package.json        # scripts: start (node index.js), dev (node --watch index.js)

frontend/
  index.html
  vite.config.ts      # dev server on :5173, proxies /api -> :3001
  .env.example        # optional VITE_API_URL for production
  src/
    main.tsx, App.tsx, index.css
    api/groq.ts                 # client wrapper around /api/ask
    lib/
      store.tsx                 # global state (user, language, selectedClass)
      i18n.ts, languages.ts     # translations + language list
      utils.ts
    components/
      layout/  navbar.tsx, sidebar.tsx, page-transition.tsx, page-skeleton.tsx, footer.tsx
      ui/      clay-button.tsx, clay-card.tsx, clay-input.tsx
      voice/   LanguageSelector.tsx, MessageBubble.tsx, VoiceButton.tsx, TypingIndicator.tsx
    hooks/useSpeechRecognition.ts
    utils/speak.ts              # browser / edge-tts speech
    pages/  home, signup, login, dashboard, tutor, rewards, pricing, account, not-found
```

## Features

- **Voice-first tutor** — type or speak; ECHO replies in text and spoken voice.
- **Multilingual** — the UI selector offers 10 languages: English plus 9 Indian
  languages (Hindi, Bengali, Telugu, Marathi, Tamil, Gujarati, Kannada, Malayalam,
  Punjabi). The backend also ships free neural TTS voices for Odia and Urdu.
  Switch language from the home page or the sidebar `LanguageSelector`; the AI
  answers in the chosen language.
- **Free & Premium tiers** — sign up and choose a plan; free users see an upgrade prompt.
- **Auth** — signup / login; state lives in `lib/store.tsx` and is persisted to
  `localStorage`. Passwords are never stored.
- **Dashboard** — subject/curriculum picker keyed to the selected class; brand-new
  users see an empty state instead of fabricated progress.
- **Rewards & pricing** — gamified progress and plan-comparison pages.

## API reference (backend)

| Method | Path             | Purpose                                                                 |
|--------|------------------|-------------------------------------------------------------------------|
| POST   | `/api/ask`       | Groq chat completion (server holds `GROQ_API_KEY`). Body: `{ messages, languageCode, subject, topic }`. |
| POST   | `/api/tts`       | Microsoft Edge neural TTS. Body: `{ text, language }`. Returns `audio/mpeg` stream. |
| POST   | `/api/translate` | MyMemory translation. Body: `{ text, targetLang }`.                     |
| GET    | `/api/health`    | Status + supported voices / languages.                                  |

## Notes & housekeeping

- **Dev logs** — `frontend/dev.*.log` are Vite dev-server logs. They are gitignored
  (`*.log`) and safe to delete.
- The repo deliberately has **no root `package.json`**; each app is self-contained.

## License

ISC.
