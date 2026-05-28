import { useEffect } from 'react';

/**
 * Updates CSS custom properties --mx and --my on the document element
 * based on mouse position (range roughly -1 to 1). Components consume
 * these via translate3d() / radial-gradient positioning for parallax.
 */
export function useMouseParallax(intensity = 0.06) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      current.x += (target.x - current.x) * intensity;
      current.y += (target.y - current.y) * intensity;
      const r = document.documentElement;
      r.style.setProperty('--mx', current.x.toFixed(3));
      r.style.setProperty('--my', current.y.toFixed(3));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);
}
