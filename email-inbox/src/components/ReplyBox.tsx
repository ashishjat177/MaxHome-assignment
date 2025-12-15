import { useState } from "react";

type Props = {
  onSend?: (text: string) => void;
};

export default function ReplyBox({ onSend }: Props) {
  const [text, setText] = useState("");

  function send() {
    if (onSend) onSend(text);
    setText("");
  }

  return (
    <div className="reply-box">
      <textarea
        placeholder="Reply..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={send}>Send</button>
      <button onClick={() => setText("")}>Cancel</button>
    </div>
  );
}
