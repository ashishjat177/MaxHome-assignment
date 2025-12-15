import type { Email } from "../types/email";

type Props = {
  email: Email;
  checked: boolean;
  onSelect: (id: string) => void;
  onOpen: (email: Email) => void;
  showSnippet: boolean;
};

export default function EmailItem({
  email,
  checked,
  onSelect,
  onOpen,
  showSnippet,
}: Props) {
  return (
    <div
      style={{ fontWeight: email.isRead ? "normal" : "bold" }}
      className={`email-item ${email.isRead ? "read" : "unread"}`}
      onClick={() => onOpen(email)}
    >
      <label className="email-action">
        <input
          type="checkbox"
          checked={checked}
          onClick={(e) => e.stopPropagation()}
          onChange={() => onSelect(email.id)}
        />
        <div className="email-main">
          <div className="summary-line">
            <span className="email-sender">{email.sender}</span>
            <span className="email-subject">{email.subject}</span>
            <span className="email-date">{new Date(email.date).toLocaleDateString()}</span>
          </div>
          {showSnippet && (
            <p className="snippet">{email.body.slice(0, 80)}{email.body.length > 80 ? '...' : ''}</p>
          )}
        </div>
      </label>
    </div>
  );
}
