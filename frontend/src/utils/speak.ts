import { getLanguage } from '@/lib/languages';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

let voices: SpeechSynthesisVoice[] = [];
let fallbackAudio: HTMLAudioElement | null = null;

function refreshVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  voices = window.speechSynthesis.getVoices();
  return voices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

function pickVoice(bcp47: string): SpeechSynthesisVoice | null {
  const list = voices.length ? voices : refreshVoices();
  if (!list.length) return null;
  const base = bcp47.split('-')[0].toLowerCase();
  return (
    list.find((v) => v.lang.toLowerCase() === bcp47.toLowerCase()) ||
    list.find((v) => v.lang.toLowerCase().startsWith(base)) ||
    null
  );
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** True when the browser has a voice for this language; otherwise we use the backend. */
export function browserVoiceAvailable(languageCode = 'en'): boolean {
  return isSpeechSupported() && pickVoice(getLanguage(languageCode).bcp47) != null;
}

export function stopSpeaking(): void {
  if (isSpeechSupported()) window.speechSynthesis.cancel();
  if (fallbackAudio) {
    fallbackAudio.pause();
    fallbackAudio.src = '';
    fallbackAudio = null;
  }
}

function clean(text: string): string {
  return text
    .replace(/[*`#>~]/g, '')
    .replace(/⚠️/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onEnd?: () => void;
}

/**
 * Speak text aloud. Uses the browser SpeechSynthesis API when a matching voice
 * exists; otherwise falls back to the backend Edge-TTS endpoint (/api/tts) which
 * streams an MP3. Returns false if neither path could play.
 */
export async function speak(
  text: string,
  languageCode = 'en',
  opts: SpeakOptions = {}
): Promise<boolean> {
  const cleaned = clean(text);
  if (!cleaned) return false;

  const bcp47 = getLanguage(languageCode).bcp47;

  if (browserVoiceAvailable(languageCode)) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(cleaned);
    u.lang = bcp47;
    const v = pickVoice(bcp47);
    if (v) u.voice = v;
    if (opts.rate != null) u.rate = opts.rate;
    if (opts.pitch != null) u.pitch = opts.pitch;
    if (opts.volume != null) u.volume = opts.volume;
    if (opts.onEnd) u.onend = opts.onEnd;
    window.speechSynthesis.speak(u);
    return true;
  }

  // Fallback: backend Edge-TTS MP3
  try {
    const res = await fetch(`${API_BASE}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleaned, language: languageCode }),
    });
    if (!res.ok) return false;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    fallbackAudio = audio;
    if (opts.onEnd) {
      audio.onended = () => {
        URL.revokeObjectURL(url);
        fallbackAudio = null;
        opts.onEnd!();
      };
    }
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      fallbackAudio = null;
    };
    audio.play();
    return true;
  } catch {
    return false;
  }
}
