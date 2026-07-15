import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const MAX_TOKENS = 1200;

const LANGUAGE_INSTRUCTIONS = {
  en: 'Respond in English.',
  hi: 'Always respond in Hindi using Devanagari script only. Do not use English.',
  bn: 'Always respond in Bengali script only. Do not use English.',
  te: 'Always respond in Telugu script only. Do not use English.',
  mr: 'Always respond in Marathi using Devanagari script only. Do not use English.',
  ta: 'Always respond in Tamil script only. Do not use English.',
  gu: 'Always respond in Gujarati script only. Do not use English.',
  kn: 'Always respond in Kannada script only. Do not use English.',
  ml: 'Always respond in Malayalam script only. Do not use English.',
  pa: 'Always respond in Punjabi using Gurmukhi script only. Do not use English.',
};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir   = path.resolve(__dirname, '..');
const app       = express();

// ─── Microsoft Edge TTS voices for Indian languages ───────────────────────────
// These are free neural voices built into Microsoft Edge / Azure Cognitive Services.
// No API key required. High-quality, natural-sounding voices.
const LANG_TO_VOICE = {
  en: 'en-IN-NeerjaNeural',     // English (India) - Female
  hi: 'hi-IN-SwaraNeural',      // Hindi - Female (natural, widely praised)
  bn: 'bn-IN-TanishaaNeural',   // Bengali (India) - Female
  te: 'te-IN-ShrutiNeural',     // Telugu - Female
  mr: 'mr-IN-AarohiNeural',     // Marathi - Female
  ta: 'ta-IN-PallaviNeural',    // Tamil - Female
  gu: 'gu-IN-DhwaniNeural',     // Gujarati - Female
  kn: 'kn-IN-SapnaNeural',      // Kannada - Female
  ml: 'ml-IN-SobhanaNeural',    // Malayalam - Female
  pa: 'pa-IN-OjasNeural',       // Punjabi - Male (only Punjabi voice available)
  or: 'or-IN-SubhasiniNeural',  // Odia - Female
  ur: 'ur-PK-UzmaNeural',       // Urdu - Female (Pakistan locale)
};

const DEFAULT_VOICE = 'en-IN-NeerjaNeural';

app.use(cors({
  origin: (origin, cb) => cb(null, true),   // allow all origins (Vercel, localhost, etc.)
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// ─── Load .env ────────────────────────────────────────────────────────────────
for (const envFile of [
  path.join(rootDir, '.env.local'),
  path.join(rootDir, '.env'),
  path.join(__dirname, '.env'),
]) {
  const envPath = envFile;
  if (!fs.existsSync(envPath)) continue;
  const entries = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const entry of entries) {
    const trimmed = entry.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const sep = trimmed.indexOf('=');
    if (sep === -1) continue;
    const key   = trimmed.slice(0, sep).trim();
    const value = trimmed.slice(sep + 1).trim();
    if (key && value && process.env[key] === undefined) process.env[key] = value;
  }
}

// ─── TTS endpoint  (Microsoft Edge TTS — free, no API key) ───────────────────
app.post('/api/tts', async (req, res) => {
  const { text, language = 'en' } = req.body;
  const trimmed = typeof text === 'string' ? text.trim() : '';

  if (!trimmed) return res.status(400).json({ error: 'Missing text' });

  // Resolve the best voice for the requested language
  const langKey = String(language).toLowerCase().split('-')[0];
  const voice   = LANG_TO_VOICE[langKey] || DEFAULT_VOICE;

  try {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const { audioStream } = await tts.toStream(trimmed);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Stream audio directly to response
    audioStream.pipe(res);

    audioStream.on('error', (err) => {
      console.error('[TTS] Stream error:', err.message);
      if (!res.headersSent) res.status(500).json({ error: 'TTS stream error' });
    });

  } catch (err) {
    console.error('[TTS] Edge TTS error:', err.message);
    res.status(500).json({ error: 'TTS generation failed', details: err.message });
  }
});

// ─── /api/translate  — MyMemory free translation ─────────────────────────────
app.post('/api/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  if (!text || !targetLang) return res.status(400).json({ error: 'Missing text or targetLang' });
  try {
    const url  = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`;
    const data = await fetch(url).then(r => r.json());
    res.json({ translated: data.responseData.translatedText });
  } catch {
    res.status(500).json({ error: 'Translation failed' });
  }
});

// ─── /api/health ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status:             'ok',
    tts:                'microsoft-edge-tts',
    voices:             LANG_TO_VOICE,
    supportedLanguages: Object.keys(LANG_TO_VOICE),
  });
});

// ─── /api/ask  ── Groq chat completion (server-side key) ─────────────────────
app.post('/api/ask', async (req, res) => {
  const { messages, languageCode = 'en', subject, topic } = req.body || {};

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Groq API key is not configured on the server. Set GROQ_API_KEY in backend/.env.',
    });
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Missing messages' });
  }

  const lang = LANGUAGE_INSTRUCTIONS[languageCode] || LANGUAGE_INSTRUCTIONS.en;
  const context = [subject, topic].filter(Boolean).join(' › ');
  const scope = context
    ? `You are tutoring a student on "${context}".`
    : 'You are a friendly AI tutor for school students.';
  const systemPrompt = `You are ECHO, a friendly multilingual AI tutor.
${scope}
Keep answers simple, clear, and encouraging. Use examples students relate to.
Prefer short paragraphs over lists. Finish explanations completely; never stop mid-sentence.
Respond in plain text only. No markdown (#, *, -, bullets) and no code fences.
No emojis or decorative symbols.
${lang}`;

  try {
    const r = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: 0.7,
        max_tokens: MAX_TOKENS,
      }),
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      return res.status(r.status).json({ error: e?.error?.message || `Groq error: ${r.status}` });
    }
    const data = await r.json();
    res.json({
      reply:
        data?.choices?.[0]?.message?.content?.trim() ||
        'Sorry, I could not generate a response.',
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach Groq.' });
  }
});

app.listen(3001, () => {
  console.log('EchoEdu backend → http://localhost:3001');
  console.log('TTS engine: Microsoft Edge Neural Voices (free, no API key)');
  console.log('Supported languages:', Object.keys(LANG_TO_VOICE).join(', '));
});
