type Props = {
  onMarkRead: () => void;
  onMarkUnread: () => void;
  onDelete: () => void;
  onSpam?: () => void;
};

export default function BulkActions({ onMarkRead, onMarkUnread, onDelete, onSpam }: Props) {
  return (
    <div className="bulk-actions">
      <button onClick={onMarkRead}>Mark read</button>
      <button onClick={onMarkUnread}>Mark unread</button>
      {onSpam && <button onClick={onSpam}>Mark spam</button>}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
