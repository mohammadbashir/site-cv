import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

const PLACEHOLDERS = [
  'Ask me anything…',
  "Try: what's your AI experience?",
  'Try: tell me about your Pega depth',
  'Try: are you open to relocation?',
  'Try: why should we hire him?',
  "Try: what's your most impressive shipped work?",
];

type Props = {
  busy: boolean;
  onSubmit: (text: string) => void;
};

export default function Composer({ busy, onSubmit }: Props) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const wasBusy = useRef(false);
  const ghost = useTypewriter(PLACEHOLDERS, { enabled: value.length === 0 && !busy });

  const canSubmit = !busy && value.trim().length >= 3;

  useEffect(() => {
    // Focus the input on first render so visitors can just start typing
    const t = setTimeout(() => inputRef.current?.focus(), 800);
    return () => clearTimeout(t);
  }, []);

  // Return focus to the input when an answer finishes (e.g. after a chip click
  // or a submit) so the keyboard can drive a follow-up without re-clicking.
  useEffect(() => {
    if (!busy && wasBusy.current) inputRef.current?.focus();
    wasBusy.current = busy;
  }, [busy]);

  const submit = () => {
    if (!canSubmit) return;
    const text = value.trim();
    setValue('');
    onSubmit(text);
    inputRef.current?.focus();
  };

  return (
    <div className="composer-wrap">
      <div className={`composer ${busy ? 'busy' : ''}`}>
        <div className="relative flex-1 min-w-0">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            aria-label="Ask my CV"
            maxLength={500}
          />
          {value.length === 0 && !busy ? (
            <span className="ghost">
              {ghost}
              <span className="ghost-caret" aria-hidden="true" />
            </span>
          ) : null}
        </div>
        <button
          type="button"
          className="send"
          onClick={submit}
          disabled={!canSubmit}
          aria-label="Send question"
        >
          <Send size={15} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
