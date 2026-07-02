import { Download } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="topbar-anchor">
      <a
        href="/cv"
        target="_blank"
        rel="noopener noreferrer"
        className="pill-accent"
        aria-label="Download CV as PDF"
      >
        <Download size={14} strokeWidth={1.9} />
        <span className="topbar-full">Download CV</span>
        <span className="topbar-short">CV</span>
      </a>
    </div>
  );
}
