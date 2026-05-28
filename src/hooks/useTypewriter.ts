import { useEffect, useState } from 'react';

/**
 * Cycles through a list of strings with a type→pause→erase→pause loop.
 * Used for the rotating placeholder hints inside the chat composer.
 */
export function useTypewriter(items: readonly string[], opts: { typeSpeed?: number; eraseSpeed?: number; pauseAfterType?: number; pauseAfterErase?: number; enabled?: boolean } = {}) {
  const { typeSpeed = 45, eraseSpeed = 24, pauseAfterType = 1600, pauseAfterErase = 350, enabled = true } = opts;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [mode, setMode] = useState<'type' | 'pause' | 'erase' | 'idle'>('type');

  useEffect(() => {
    if (!enabled || items.length === 0) return;
    const current = items[index % items.length];

    let timer: ReturnType<typeof setTimeout>;

    if (mode === 'type') {
      if (text.length < current.length) {
        timer = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
      } else {
        timer = setTimeout(() => setMode('erase'), pauseAfterType);
      }
    } else if (mode === 'erase') {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), eraseSpeed);
      } else {
        timer = setTimeout(() => {
          setIndex((i) => i + 1);
          setMode('type');
        }, pauseAfterErase);
      }
    }

    return () => clearTimeout(timer);
  }, [text, mode, index, items, typeSpeed, eraseSpeed, pauseAfterType, pauseAfterErase, enabled]);

  return text;
}
