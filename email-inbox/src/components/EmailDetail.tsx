import { useState } from "react";
import type { Email } from "../types/email";
import ReplyBox from "./ReplyBox";

type Props = {
  email: Email;
  allowSpam: boolean;
  onClose?: () => void;
  onMarkUnread: () => void;
  onSpam?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
};

export default function EmailDetail({
  email,
  allowSpam,
  onClose,
  onMarkUnread,
  onSpam,
  onPrev,
  onNext,
}: Props) {
  const [replyOpen, setReplyOpen] = useState(false);

  function handleSend(text: string) {
    console.log("Reply sent:", text);
    setReplyOpen(false);
  }
  return (
    <div className="email-detail">
      <div className="detail-header">
        <div className="detail-header-row">
          {onClose && <button className="back-button" onClick={onClose}>Back</button>}
          <div className="detail-nav">
            <button onClick={onPrev} disabled={!onPrev}>Prev</button>
            <button onClick={onNext} disabled={!onNext}>Next</button>
          </div>
          <h3>{email.subject}</h3>
        </div>
      </div>
      <p className="from">From: {email.sender}</p>
      <p className="date">{email.date}</p>
      {email.isSpam && <p className="spam-note">This message is marked as spam</p>}
      <div className="email-body">{email.body}</div>

      <div className="detail-actions">
        <button onClick={onMarkUnread}>Mark Unread</button>
        {allowSpam && onSpam && <button onClick={onSpam}>Mark Spam</button>}
        <button onClick={() => setReplyOpen((s) => !s)}>{replyOpen ? "Close" : "Reply"}</button>
      </div>

      {replyOpen && <ReplyBox onSend={handleSend} />}
    </div>
  );
}
