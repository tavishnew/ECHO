import { useEffect, useRef, useState } from 'react';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { ClayInput } from '@/components/ui/clay-input';
import { Sidebar } from '@/components/layout/sidebar';
import { Send, BookOpen, ChevronLeft, AlertCircle, SlidersHorizontal, Clock, List, Volume2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

import { askAI } from '@/api/groq';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { speak, stopSpeaking } from '@/utils/speak';
import { LanguageSelector } from '@/components/voice/LanguageSelector';
import { VoiceButton } from '@/components/voice/VoiceButton';
import { MessageBubble } from '@/components/voice/MessageBubble';
import { TypingIndicator } from '@/components/voice/TypingIndicator';

const CURRICULUM: Record<string, string[]> = {
  Science: ['Solar System', 'Plant Life', 'Human Body', 'Forces & Motion'],
  Math: ['Fractions', 'Multiplication', 'Geometry', 'Algebra Basics'],
  History: ['Ancient Egypt', 'Indian Freedom Struggle', 'World Wars'],
};

const SUBJECT_STYLES: Record<string, { heading: string; card: string; bar: string }> = {
  Science: { heading: 'text-[#33503d]', card: 'bg-sage/15 hover:bg-sage/25', bar: 'bg-sage' },
  Math: { heading: 'text-[#43395c]', card: 'bg-primary/15 hover:bg-primary/25', bar: 'bg-primary' },
  History: { heading: 'text-[#2e4759]', card: 'bg-sky/15 hover:bg-sky/25', bar: 'bg-sky' },
};

type Msg = { id: string; role: 'user' | 'assistant'; content: string; error?: boolean };

let idCounter = 0;
const nextId = () => `m${++idCounter}`;
let sessionCounter = 0;

export default function Tutor() {
  const { state, setLanguage } = useAppStore();
  const t = useT();

  const [subject, setSubject] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showVoice, setShowVoice] = useState(false);

  const [seconds, setSeconds] = useState(0);

  const speakingRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, isSupported, transcript, start, stop, error: voiceError } =
    useSpeechRecognition(state.language, (text) => sendMessage(text));

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  function sendMessage(text: string) {
    const t = text.trim();
    if (!t || isThinking) return;

    const userMsg: Msg = { id: nextId(), role: 'user', content: t };
    const history = [...messages, userMsg]
      .filter((m) => !m.error)
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);
    setApiError(null);

    askAI(history, {
      languageCode: state.language,
      subject: subject ?? undefined,
      topic: topic ?? undefined,
    })
      .then((reply) =>
        setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', content: reply }])
      )
      .catch((e: Error) => {
        const msg = e.message || 'Something went wrong.';
        setApiError(msg);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'assistant', content: `âš ï¸ ${msg}`, error: true },
        ]);
      })
      .finally(() => setIsThinking(false));
  }

  async function handleSpeak(id: string, text: string) {
    if (speakingRef.current === id) {
      stopSpeaking();
      speakingRef.current = null;
      setSpeakingId(null);
      return;
    }
    const session = ++sessionCounter;
    speakingRef.current = id;
    setSpeakingId(id);
    const ok = await speak(text, state.language, {
      rate,
      pitch,
      volume,
      onEnd: () => {
        if (sessionCounter === session) {
          speakingRef.current = null;
          setSpeakingId(null);
        }
      },
    });
    if (!ok) {
      speakingRef.current = null;
      setSpeakingId(null);
    }
  }

  function startTopic(t: string, s: string) {
    setSubject(s);
    setTopic(t);
    setSeconds(0);
    setMessages([
      {
        id: nextId(),
        role: 'assistant',
        content: `Hi ${state.user?.name || 'there'}! Let's learn about ${t}. Ask me anything, or tap the mic and speak.`,
      },
    ]);
  }

  const displayValue = isListening ? transcript : input;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  if (!topic) {
    return (
      <PageTransition className="px-0">
        <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }}>
          <Sidebar />
          <main className="flex-1 px-4 md:px-8 pt-8 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center sm:text-left"
          >
            {t('tutor.chooseTopic')}
          </motion.h1>
          <LanguageSelector value={state.language} onChange={setLanguage} />
        </div>
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-12">
          {Object.entries(CURRICULUM).map(([subj, topics]) => (
            <motion.div key={subj} variants={item}>
              <h2 className={cn('text-2xl font-bold mb-6 flex items-center gap-3', SUBJECT_STYLES[subj].heading)}>
                <BookOpen className="w-6 h-6" /> {subj}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {topics.map((t) => (
                  <ClayCard
                    key={t}
                    onClick={() => startTopic(t, subj)}
                    className={cn(
                      'p-6 cursor-pointer hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center justify-center h-32',
                      SUBJECT_STYLES[subj].card
                    )}
                  >
                    <div className={cn('w-10 h-1.5 rounded-full mb-3', SUBJECT_STYLES[subj].bar)} />
                    <span className="font-bold text-foreground">{t}</span>
                  </ClayCard>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
          </div>
        </main>
      </div>
      </PageTransition>
    );
  }

  const chapters = CURRICULUM[subject as keyof typeof CURRICULUM] ?? [];
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <PageTransition className="px-0">
      <div className="flex min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }}>
        <Sidebar />
        <main className="flex-1 px-4 md:px-8 pt-6 pb-20 md:pb-6">
          <div className="max-w-[1400px] mx-auto">
      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-3 mb-6"
      >
        <button
          type="button"
          onClick={() => {
            stopSpeaking();
            speakingRef.current = null;
            setSpeakingId(null);
            setTopic(null);
          }}
          aria-label="Back to topics"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white clay-btn transition-transform hover:scale-105"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center min-w-0">
          <p className="text-xs uppercase tracking-wider text-ink-subtle font-semibold">
            {subject} Â· Class 5
          </p>
          <h1 className="font-display text-xl font-bold text-ink-deep truncate">{topic}</h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector value={state.language} onChange={setLanguage} />
          <button
            type="button"
            onClick={() => setShowVoice((v) => !v)}
            aria-label={t('tutor.voiceSettings')}
            aria-pressed={showVoice}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors',
              showVoice ? 'bg-primary/10 text-primary' : 'bg-white clay-btn text-ink-muted hover:text-ink'
            )}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-[280px_1fr_240px] gap-6 items-start">
        {/* Left panel â€” chapters */}
        <ClayCard className="p-6 hidden lg:block" style={{ backgroundColor: 'var(--bg-card-alt)' }}>
          <div className="w-10 h-1.5 rounded-full bg-primary mb-4" />
          <p className="text-xs uppercase tracking-wider font-semibold text-ink-subtle mb-4">{t('tutor.chapters')}</p>
          <ul className="space-y-1">
            {chapters.map((t) => (
              <li key={t}>
                <button
                  onClick={() => startTopic(t, subject ?? 'General')}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-2xl text-sm font-semibold transition-colors',
                    t === topic ? 'clay-pill text-primary' : 'text-ink-muted hover:text-ink hover:bg-white'
                  )}
                  style={t === topic ? { backgroundColor: 'var(--bg-card)', color: 'var(--primary)' } : undefined}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </ClayCard>

        {/* Center â€” orb, mic, chat */}
        <div className="flex flex-col gap-6">
          {/* Orb + Mic centerpiece */}
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full animate-orb-pulse" style={{ backgroundColor: 'rgba(107,94,136,0.20)' }} />
              <div className="absolute inset-6 rounded-full animate-orb-pulse-inner" style={{ backgroundColor: 'rgba(107,94,136,0.28)' }} />
              <div className="relative w-48 h-48 rounded-full bg-white clay-circle overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-sage/30" />
                <Bot className="relative w-20 h-20 text-primary animate-orb-float" />
              </div>
            </div>
            <div className="relative">
              {isListening && (
                <>
                  <span className="absolute -inset-3 rounded-full border-2 animate-ping" style={{ borderColor: 'rgba(107,94,136,0.35)' }} />
                  <span className="absolute -inset-1 rounded-full border-2 animate-pulse" style={{ borderColor: 'rgba(107,94,136,0.55)' }} />
                </>
              )}
              <VoiceButton
                isListening={isListening}
                disabled={!isSupported}
                onClick={() => (isListening ? stop() : start())}
              />
            </div>
            <p className="text-center text-xs uppercase tracking-wider text-ink-subtle font-semibold">
              {isListening ? t('tutor.listening') : t('tutor.tapMic')}
            </p>
          </div>

          {/* Chat */}
          <ClayCard
            className="flex-1 overflow-hidden flex flex-col p-4 md:p-6 rounded-3xl min-h-[360px]"
            style={{ background: 'linear-gradient(180deg, rgba(107,94,136,0.07), hsl(var(--card)))' }}
          >
            <div className="flex-1 overflow-y-auto pr-2 space-y-6" role="log" aria-live="polite">
              <AnimatePresence initial={false}>
                {messages.map((m) => (
                  <MessageBubble
                    key={m.id}
                    role={m.role}
                    content={m.content}
                    speakable={true}
                    isSpeaking={speakingId === m.id}
                    onSpeak={() => handleSpeak(m.id, m.content)}
                    onStop={() => handleSpeak(m.id, m.content)}
                  />
                ))}
                {isThinking && <TypingIndicator key="typing" />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {(apiError || voiceError) && (
              <div role="alert" className="mt-3 flex items-start gap-2 text-sm text-destructive bg-destructive/10 rounded-2xl p-3">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{apiError || voiceError}</span>
              </div>
            )}

            {showVoice && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 p-3 rounded-2xl bg-card border border-black/5">
                {([
                  ['Pitch', pitch, setPitch, 0, 2, 0.1],
                  ['Volume', volume, setVolume, 0, 1, 0.05],
                ] as const).map(([label, val, setVal, min, max, step]) => (
                  <label key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    {label}
                    <input
                      type="range"
                      min={min}
                      max={max}
                      step={step}
                      value={val}
                      onChange={(e) => setVal(Number(e.target.value))}
                      aria-label={label}
                      className="w-24 accent-[hsl(var(--primary))]"
                    />
                  </label>
                ))}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="mt-4 pt-4 border-t flex gap-3 items-center">
              <div className="flex-1 relative">
                <ClayInput
                  id="tutor-message"
                  name="message"
                  autoComplete="off"
                  value={displayValue}
                  onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? 'Listening…' : 'Ask anything, or just speak…'}
                  className="pr-4 h-14 rounded-full"
                  aria-label="Message"
                />
              </div>
              <ClayButton
                type="submit"
                variant="primary"
                className="w-14 h-14 rounded-full p-0 flex items-center justify-center flex-shrink-0"
                disabled={!displayValue.trim()}
              >
                <Send className="w-5 h-5" />
              </ClayButton>
            </form>

            {!isSupported && (
              <p className="mt-2 text-xs text-muted-foreground text-center">
                {t('tutor.voiceInput')}
              </p>
            )}
          </ClayCard>
        </div>

        {/* Right panel â€” context */}
        <ClayCard className="p-6 hidden lg:block" style={{ backgroundColor: 'var(--bg-card-alt)' }}>
          <div className="w-10 h-1.5 rounded-full bg-sky mb-4" />
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-subtle font-semibold mb-3">
                <Clock className="w-4 h-4" /> {t('tutor.session')}
              </div>
              <div className="rounded-2xl p-5 text-center clay-inner" style={{ backgroundColor: 'rgba(107,94,136,0.10)' }}>
                <p className="font-display text-3xl font-bold" style={{ color: 'var(--primary)' }}>
                  {mm}:{ss}
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-subtle font-semibold mb-3">
                <List className="w-4 h-4" /> Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {[topic, subject].filter(Boolean).map((tag) => (
                  <span
                    key={tag as string}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-subtle font-semibold mb-3">
                <Volume2 className="w-4 h-4" /> Speech pace
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-ink-subtle font-semibold">{t('tutor.slow')}</span>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  aria-label="Speech speed"
                  className="flex-1 accent-[hsl(var(--primary))]"
                />
                <span className="text-xs text-ink-subtle font-semibold">{t('tutor.fast')}</span>
              </div>
            </div>
          </div>
        </ClayCard>
      </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
}