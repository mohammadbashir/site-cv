import { useEffect, useRef, useState } from 'react';

/**
 * Reveals a string character-by-character at the given speed (ms per char).
 * `target` is the full string we want to reveal. When `start` is true,
 * the reveal begins; updates pass through as target grows (useful for
 * real streaming responses that arrive in chunks).
 */
export function useStreamingText(target: string, opts: { start: boolean; speed?: number; onDone?: () => void } = { start: false }) {
  const { start, speed = 24, onDone } = opts;
  const [shown, setShown] = useState('');
  const indexRef = useRef(0);
  const targetRef = useRef(target);
  const doneCalledRef = useRef(false);

  useEffect(() => {
    targetRef.current = target;
  }, [target]);

  useEffect(() => {
    if (!start) {
      indexRef.current = 0;
      doneCalledRef.current = false;
      setShown('');
      return;
    }

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const elapsed = now - last;
      const advance = Math.max(1, Math.floor(elapsed / speed));
      const current = targetRef.current;

      if (indexRef.current < current.length) {
        indexRef.current = Math.min(current.length, indexRef.current + advance);
        setShown(current.slice(0, indexRef.current));
        last = now;
      }

      if (indexRef.current >= current.length) {
        if (!doneCalledRef.current) {
          doneCalledRef.current = true;
          onDone?.();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, speed, onDone]);

  const isStreaming = start && shown.length < target.length;
  return { shown, isStreaming };
}
