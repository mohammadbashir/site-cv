import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

/**
 * Floating Download CV pill. On desktop it sits fixed top-right. On small
 * screens it docks bottom-right instead (see .topbar-anchor CSS) and stays
 * hidden until the reader scrolls past the hero, so it never covers the
 * hero composer's send button.
 */
export default function TopBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const update = () => {
      setHidden(mq.matches && window.scrollY < window.innerHeight * 0.75);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    mq.addEventListener('change', update);
    return () => {
      window.removeEventListener('scroll', update);
      mq.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className={`topbar-anchor fixed top-5 right-5 z-50${hidden ? ' topbar-hidden' : ''}`}>
      <a
        href="/cv"
        target="_blank"
        rel="noopener noreferrer"
        className="topbar-download"
        aria-label="Download CV as PDF"
      >
        <Download size={14} strokeWidth={1.9} />
        <span>Download CV</span>
      </a>
    </div>
  );
}
