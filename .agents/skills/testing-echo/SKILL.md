---
name: testing-echo
description: How to run and test the ECHO app locally (Vite frontend + Express backend) on this Windows box, including API-hardening checks, login flow, and known environment gotchas.
---

# Testing ECHO locally

## Services
- Backend: `cd backend; node index.js` → http://localhost:3001. Loads env via dotenv from
  `../.env.local`, `../.env`, then `backend/.env` (earlier file wins).
- Frontend: `cd frontend; npm run dev` → http://localhost:5173, proxies `/api` → :3001.
- Health check: `curl http://localhost:3001/api/health` → `{"status":"ok",...}`.
- `node_modules` are usually already installed in both folders.

## Devin Secrets Needed
- `GROQ_API_KEY` — required only for a real `/api/ask` answer (tutor chat round-trip). It is often
  absent (only `.env.example` files exist). Without it `/api/ask` returns `401 {"error":"Invalid API Key"}`.
- Workaround: write `GROQ_API_KEY=dummy` to `backend/.env`. All request validation
  (rate limits, message-count cap, payload-size cap) runs before the Groq call, so a 401 response
  proves the request passed validation. Only the 200/answer path needs a real key.

## Login (mock auth)
`/login` accepts any email containing `@` plus any non-empty password; a 900ms fake delay then
redirects to `/dashboard`. Progress is stored in localStorage only.

## Windows environment gotchas
- The shell is **PowerShell**: `&&` and `ls -a` do not work. Use `;` and `Get-ChildItem -Force`.
- `xdotool`-style typing in the browser **drops `:` and `@`**. Type URLs/emails by putting them on the
  clipboard (`Set-Clipboard -Value "..."`) and pressing ctrl+v; typing them directly silently
  produces `http//localhost5173` or `testerexample.com`.
- `upload_attachment` rejects `C:\...` paths. Copy files to `/tmp/...` (maps to `C:\tmp`) first,
  then upload with the POSIX-style path.
- Backgrounded `node index.js` may survive `kill_shell`; find it with
  `Get-NetTCPConnection -LocalPort 3001 -State Listen` and `Stop-Process -Id <pid> -Force`.
  For a detached server use `Start-Process node -ArgumentList "index.js" -RedirectStandardOutput ...`.

## Testing the API hardening
- Rate limits: 20/min on `/api/ask`, 30/min on `/api/tts` and `/api/translate`, in-memory per IP.
  Counters persist for 60s, so **restart the backend or wait a full minute between rate-limit and
  other API tests** or later tests will wrongly see 429s.
- Build JSON bodies in a file and use `curl --data-binary "@file.json"`; inline single-quoted
  PowerShell JSON with `\"` escapes reaches Express as invalid JSON and returns a misleading 400.
- CORS: allow-list from `FRONTEND_URLS` (default `http://localhost:5173`). A disallowed Origin gets
  `403 {"error":"Origin not allowed"}` and no `Access-Control-Allow-Origin` header; requests with no
  `Origin` (curl, server-to-server) are allowed.

## Known pre-existing UI issues (not regressions)
- The login submit button renders the raw i18n key `auth.login`.
- The password placeholder shows mojibake (`â€¢â€¢â€¢`).
