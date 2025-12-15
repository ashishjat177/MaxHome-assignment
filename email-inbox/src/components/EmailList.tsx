import type { Email }from "../types/email";
import EmailItem from './EmailItem';

type Props = {
  emails: Email[];
  selected: string[];
  onSelect: (id: string) => void;
  onOpen: (email: Email) => void;
  showSnippet: boolean;
};

export default function EmailList({
  emails,
  selected,
  onSelect,
  onOpen,
  showSnippet,
}: Props) {
  return (
    <div className="email-list">
      {emails.map((email) => (
        <EmailItem
          key={email.id}
          email={email}
          checked={selected.includes(email.id)}
          onSelect={onSelect}
          onOpen={onOpen}
          showSnippet={showSnippet}
        />
      ))}
    </div>
  );
}
