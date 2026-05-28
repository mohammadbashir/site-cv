import profileImage from '../assets/profile.jpg';

type Props = {
  role: 'user' | 'assistant';
  content: string;
  streaming?: boolean;
};

export default function Message({ role, content, streaming }: Props) {
  const isUser = role === 'user';

  if (isUser) {
    return (
      <div className="turn user">
        <div className="turn-col">
          <div className="turn-role">You</div>
          <div className="bubble">{content}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="turn assistant">
      <div
        className="turn-avatar"
        style={{ backgroundImage: `url(${profileImage})` }}
        aria-hidden="true"
      />
      <div className="turn-col">
        <div className="turn-role">Mohamad</div>
        <div className="bubble">
          {content}
          {streaming ? <span className="stream-caret" aria-hidden="true" /> : null}
        </div>
      </div>
    </div>
  );
}
