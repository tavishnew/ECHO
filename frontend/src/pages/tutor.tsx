import { useEffect, useRef, useState } from 'react';
import { useT } from '@/lib/i18n';
import { useAppStore } from '@/lib/store';
import { useLocation } from 'wouter';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { ClayInput } from '@/components/ui/clay-input';
import { Sidebar } from '@/components/layout/sidebar';
import { Send, BookOpen, ChevronLeft, AlertCircle, SlidersHorizontal, Clock, List, Volume2, Bot } from 'lucide-react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

import { askAI } from '@/api/groq';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { speak, stopSpeaking } from '@/utils/speak';
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

// Orb communicates the AI's state at a glance (ISSUE-024).
const orbVariants: Variants = {
  idle: {
    scale: [1, 1.03, 1],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
  thinking: {
    scale: [1, 1.08, 1],
    transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' },
  },
  speaking: {
    scale: [1, 1.12, 1, 1.06, 1],
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
  },
  listening: {
    scale: [1, 1.06, 1],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function Tutor() {
const { state } = useAppStore();
  const t = useT();
  const [, navigate] = useLocation();

  // Gate the tutor behind auth: guests are sent to signup instead of seeing
  // the chat UI. state.user is hydrated synchronously from localStorage, so
  // this check is reliable on first render.
  useEffect(() => {
    if (!state.user) navigate('/signup');
  }, [state.user, navigate]);

  // The active class is threaded from the Dashboard via the global store so the
  // tutor always reflects the user's selection (ISSUE-023).
  const classLevel = state.selectedClass;

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

  const isSpeaking = speakingId !== null;
  const orbState = isListening
    ? 'listening'
    : isThinking
      ? 'thinking'
      : isSpeaking
        ? 'speaking'
        : 'idle';

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  function sendMessage(text: string) {
    const content = text.trim();
    if (!content || isThinking) return;

    const userMsg: Msg = { id: nextId(), role: 'user', content };
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
      classLevel,
    })
      .then((reply) =>
        setMessages((prev) => [...prev, { id: nextId(), role: 'assistant', content: reply }])
      )
      .catch((e: Error) => {
        const msg = e.message || 'Something went wrong.';
        setApiError(msg);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: 'assistant', content: `⚠️ ${msg}`, error: true },
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

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  const chapters = subject ? CURRICULUM[subject] ?? [] : [];
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  // Both views live inside a single AnimatePresence so the topic picker animates
  // out while the chat animates in (ISSUE-025). The component no longer early
  // returns before the transition wrapper.
  if (!state.user) return null;
  return (
    <PageTransition className="px-0">
      <AnimatePresence mode="wait">
        {!topic ? (
          <motion.div
            key="picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.25 }}
          >
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
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
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
                        {subject} · {classLevel}
                      </p>
                    <h1 className="font-display text-xl font-bold text-ink-deep truncate">{topic}</h1>
                    </div>
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
                  </motion.div>

                  <div className="grid lg:grid-cols-[280px_1fr_240px] gap-6 items-start">
                    {/* Left panel — chapters */}
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

                    {/* Center — orb, mic, chat */}
                    <div className="relative flex flex-col gap-3">
                      {/* Orb + Mic centerpiece. The orb stays sticky above the
                          scrolling chat and overlaps it (ISSUE-027). */}
                      <div className="relative w-56 h-56 flex items-center justify-center sticky top-4 mx-auto -mb-20 rounded-full bg-card/50" style={{ background: 'linear-gradient(180deg, rgba(107,94,136,0.10), hsl(var(--card)))' }}>
                        {/* Reactive rings driven by the AI/orb state (ISSUE-024) */}
                        <motion.span
                          aria-hidden
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: 'rgba(107,94,136,0.20)' }}
                          animate={{
                            scale: orbState === 'thinking' ? [1, 1.25, 1] : orbState === 'listening' ? [1, 1.15, 1] : [1, 1.06, 1],
                            opacity: orbState === 'idle' ? 0.5 : 1,
                          }}
                          transition={{
                            duration: orbState === 'thinking' ? 0.9 : 1.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        <motion.span
                          aria-hidden
                          className="absolute inset-6 rounded-full"
                          style={{ backgroundColor: 'rgba(107,94,136,0.28)' }}
                          animate={{
                            scale: orbState === 'thinking' ? [1, 1.2, 1] : orbState === 'listening' ? [1, 1.1, 1] : [1, 1.04, 1],
                          }}
                          transition={{
                            duration: orbState === 'thinking' ? 0.7 : 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                        <motion.div
                          className="relative w-48 h-48 rounded-full bg-primary/10 clay-circle overflow-hidden flex items-center justify-center"
                          variants={orbVariants}
                          animate={orbState}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-sage/30" />
                          <Bot className="relative w-20 h-20 text-primary" />
                        </motion.div>
                      </div>

                      {/* Chat */}
                      <ClayCard
                        className="relative z-10 flex-1 overflow-hidden flex flex-col p-4 md:p-6 pt-36 rounded-3xl min-h-[360px]"
                        style={{ background: 'linear-gradient(180deg, rgba(107,94,136,0.12), hsl(var(--card)))' }}
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

                        {/* Voice settings now animate open/closed and group all three
                            sliders in one place (ISSUE-026 + ISSUE-027). */}
                        <AnimatePresence initial={false}>
                          {showVoice && (
                            <motion.div
                              key="voice"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-3 p-3 rounded-2xl bg-card border border-black/5">
                                {([
                                  ['Rate', rate, setRate, 0.5, 2, 0.1],
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
                            </motion.div>
                          )}
                        </AnimatePresence>

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
                          {/* Waveform + tap-to-speak, parked beside the send button (ISSUE-027) */}
                          <div className="h-6 flex items-end justify-center gap-1" aria-hidden>
                            <AnimatePresence>
                              {isSpeaking &&
                                [0, 1, 2, 3, 4].map((i) => (
                                  <motion.span
                                    key={i}
                                    className="w-1 rounded-full"
                                    style={{ backgroundColor: 'var(--primary)' }}
                                    initial={{ opacity: 0, height: 4 }}
                                    animate={{ opacity: 1, height: [6, 22, 12, 24, 8][i % 5] }}
                                    exit={{ opacity: 0, height: 4 }}
                                    transition={{
                                      height: { duration: 0.6, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' },
                                      opacity: { duration: 0.2 },
                                    }}
                                  />
                                ))}
                            </AnimatePresence>
                          </div>
                          <div className="relative flex items-center justify-center">
                            {isListening && (
                              <>
                                <span className="absolute -inset-3 rounded-full border-2 animate-ping" style={{ borderColor: 'rgba(107,94,136,0.35)', backgroundColor: 'rgba(107,94,136,0.12)' }} />
                                <span className="absolute -inset-1 rounded-full border-2 animate-pulse" style={{ borderColor: 'rgba(107,94,136,0.55)', backgroundColor: 'rgba(107,94,136,0.12)' }} />
                              </>
                            )}
                            <VoiceButton
                              isListening={isListening}
                              disabled={!isSupported}
                              onClick={() => (isListening ? stop() : start())}
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

                    {/* Right panel — context (rate moved inline into the voice panel) */}
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
                            <Volume2 className="w-4 h-4" /> Voice
                          </div>
                          <p className="text-sm text-ink-muted">
                            Open the voice settings above to tune rate, pitch, and volume.
                          </p>
                        </div>
                      </div>
                    </ClayCard>
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
