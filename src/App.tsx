import { useEffect } from 'react';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Proof from './components/Proof';
import Founder from './components/Founder';
import Person from './components/Person';
import ContactCta from './components/ContactCta';
import AskPanel from './components/AskPanel';

/** Buttons lean gently toward the cursor. Skipped for touch and reduced motion. */
function useMagneticButtons() {
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return;
    }
    const buttons = Array.from(document.querySelectorAll<HTMLElement>('.btn'));
    const cleanups = buttons.map((btn) => {
      const onMove = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.setProperty('--mx', `${Math.max(-4, Math.min(4, dx * 0.1))}px`);
        btn.style.setProperty('--my', `${Math.max(-3, Math.min(3, dy * 0.18))}px`);
      };
      const onLeave = () => {
        btn.style.setProperty('--mx', '0px');
        btn.style.setProperty('--my', '0px');
      };
      btn.addEventListener('pointermove', onMove);
      btn.addEventListener('pointerleave', onLeave);
      return () => {
        btn.removeEventListener('pointermove', onMove);
        btn.removeEventListener('pointerleave', onLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
}

function App() {
  useMagneticButtons();

  return (
    <div className="min-h-screen">
      <main>
        <Hero />
        <Expertise />
        <Proof />
        <Founder />
        <Person />
        <ContactCta />
      </main>
      <AskPanel />
    </div>
  );
}

export default App;
