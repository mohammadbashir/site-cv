import { Download } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="fixed top-5 right-5 z-50">
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
