import { useEffect, useRef, useState } from 'react';

/**
 * One-shot IntersectionObserver. Returns a ref + boolean.
 * When the element scrolls into view, `inView` becomes true permanently.
 * Use with the `.reveal` / `.in` CSS classes in index.css.
 */
export function useInViewReveal<T extends HTMLElement>(rootMargin = '-10% 0px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}
