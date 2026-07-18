// The Groq key lives server-side (backend/.env). The frontend only ever talks to
// our own /api/ask endpoint (proxied to the backend in dev). In production set
// VITE_API_URL to your deployed backend.
const API_BASE = import.meta.env.VITE_API_URL || '/api';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AskOptions {
  languageCode?: string;
  subject?: string;
  topic?: string;
  classLevel?: string;
}

/**
 * Send a conversation to the backend proxy, which calls Groq with the
 * server-side key and returns the tutor's plain-text reply.
 */
export async function askAI(
  messages: ChatMessage[],
  { languageCode = 'en', subject, topic, classLevel }: AskOptions = {}
): Promise<string> {
  const res = await fetch(`${API_BASE}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, languageCode, subject, topic, classLevel }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Request failed: ${res.status}`);
  }

  const data = await res.json();
  if (!data?.reply) throw new Error('Empty response from tutor.');
  return data.reply as string;
}
