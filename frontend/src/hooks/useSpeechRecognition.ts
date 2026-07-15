import { useCallback, useEffect, useRef, useState } from 'react';
import { getLanguage } from '@/lib/languages';

export interface UseSpeechRecognition {
  isListening: boolean;
  isSupported: boolean;
  transcript: string;
  start: () => void;
  stop: () => void;
  error: string | null;
}

// Web Speech API is non-standard; access it defensively.
const SR: any =
  typeof window !== 'undefined'
    ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    : null;

/**
 * Speech-to-Text via the browser Web Speech API.
 * - One-click mic (start/stop)
 * - Live interim transcript
 * - Auto-sends after ~2s of silence (Indian languages have natural pauses)
 * - Reports permission denial and unsupported browsers
 */
export function useSpeechRecognition(
  language: string,
  onResult?: (text: string) => void
): UseSpeechRecognition {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const recRef = useRef<any>(null);
  const silenceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langRef = useRef(language);
  const sentRef = useRef(false);
  const onResultRef = useRef(onResult);

  useEffect(() => {
    langRef.current = language;
  }, [language]);
  useEffect(() => {
    onResultRef.current = onResult;
  }, [onResult]);

  const clearSilence = () => {
    if (silenceRef.current) {
      clearTimeout(silenceRef.current);
      silenceRef.current = null;
    }
  };

  const stop = useCallback(() => {
    clearSilence();
    try {
      recRef.current?.stop();
    } catch {
      /* ignore */
    }
    recRef.current = null;
    setIsListening(false);
  }, []);

  const start = useCallback(() => {
    if (!SR) {
      setError('Speech recognition is not supported here. Use Chrome or Edge, or just type.');
      return;
    }
    setError(null);
    try {
      recRef.current?.abort();
    } catch {
      /* ignore */
    }
    clearSilence();

    const bcp47 = getLanguage(langRef.current).bcp47;
    const rec = new SR();
    rec.lang = bcp47;
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    sentRef.current = false;
    let finalText = '';
    setTranscript('');
    setIsListening(true);
    recRef.current = rec;

    rec.onresult = (e: any) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript + ' ';
        else interim += r[0].transcript;
      }
      const display = (finalText + interim).trim();
      if (display) setTranscript(display);

      clearSilence();
      silenceRef.current = setTimeout(() => {
        const text = finalText.trim() || display;
        if (text && !sentRef.current) {
          sentRef.current = true;
          onResultRef.current?.(text);
          try {
            rec.stop();
          } catch {
            /* ignore */
          }
        }
      }, 2000);
    };

    rec.onend = () => {
      clearSilence();
      setIsListening(false);
      recRef.current = null;
      if (!sentRef.current && finalText.trim()) {
        sentRef.current = true;
        onResultRef.current?.(finalText.trim());
      }
    };

    rec.onerror = (e: any) => {
      clearSilence();
      const ignored = ['no-speech', 'aborted', 'interrupted'];
      if (!ignored.includes(e.error)) {
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          setError('Microphone permission was denied. Enable it in your browser settings.');
        } else {
          setError(`Speech error: ${e.error}`);
        }
      }
      setIsListening(false);
      recRef.current = null;
    };

    try {
      rec.start();
    } catch {
      setError('Could not start the microphone.');
      setIsListening(false);
      recRef.current = null;
    }
  }, [stop]);

  useEffect(
    () => () => {
      clearSilence();
      try {
        recRef.current?.abort();
      } catch {
        /* ignore */
      }
    },
    []
  );

  return { isListening, isSupported: !!SR, transcript, start, stop, error };
}
