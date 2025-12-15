import { useState } from "react";
import { emails as initialEmails } from "./data/emails";
import { partnerA } from "./partners/partnerA";
import { partnerB } from "./partners/partnerB";
import type { Email } from "./types/email";

import PartnerSwitcher from "./components/PartnerSwitcher";
import SearchBar from "./components/SearchBar";
import BulkActions from "./components/BulkActions";
import EmailList from "./components/EmailList";
import EmailDetail from "./components/EmailDetail";
import './styles.css';
import './App.css';

export default function App() {
  const [partnerKey, setPartnerKey] = useState("A");
  const partner = partnerKey === "A" ? partnerA : partnerB;

  const [emails, setEmails] = useState<Email[]>(initialEmails);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeEmail, setActiveEmail] = useState<Email | null>(null);
  const [detailMode, setDetailMode] = useState(false);
  const [search, setSearch] = useState("");

  const filteredEmails = emails.filter((e) =>
    (e.sender || "").toLowerCase().includes(search.toLowerCase()) ||
    e.subject.toLowerCase().includes(search.toLowerCase())
  );

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function updateEmails(fn: (e: Email) => Email) {
    setEmails((prev) => prev.map(fn));
  }

  // Bulk action helpers
  function markSelectedRead() {
    updateEmails((e) => (selectedIds.includes(e.id) ? { ...e, isRead: true } : e));
  }

  function markSelectedUnread() {
    updateEmails((e) => (selectedIds.includes(e.id) ? { ...e, isRead: false } : e));
  }

  function markSelectedSpam() {
    updateEmails((e) => (selectedIds.includes(e.id) ? { ...e, isSpam: true } : e));
  }

  function deleteSelected() {
    setEmails((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
    setSelectedIds([]);
  }

  return (
    <div className={`main-container ${partner.theme} ${detailMode ? 'detail-only' : ''}`}>
      <header className="header">
        <h2>Email Inbox</h2>
        <div className="controls">
          <PartnerSwitcher partner={partnerKey} onChange={setPartnerKey} />
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </header>

      {partner.showBulkActions && (
        <BulkActions
          onMarkRead={markSelectedRead}
          onMarkUnread={markSelectedUnread}
          onDelete={deleteSelected}
          onSpam={partner.allowSpam ? markSelectedSpam : undefined}
        />
      )}

      <div className={`inbox ${activeEmail ? "show-detail" : ""}`}>
        <EmailList
          emails={filteredEmails}
          selected={selectedIds}
          onSelect={toggleSelect}
          onOpen={(e) => {
            setActiveEmail(e);
            setDetailMode(true);
            updateEmails((x) => (x.id === e.id ? { ...x, isRead: true } : x));
          }}
          showSnippet={partner.showSnippet}
        />

        {activeEmail && (
          <EmailDetail
            email={activeEmail}
            allowSpam={partner.allowSpam}
            onClose={() => {
              setDetailMode(false);
              setActiveEmail(null);
            }}
            onMarkUnread={() =>
              updateEmails((e) => (e.id === activeEmail.id ? { ...e, isRead: false } : e))
            }
            onSpam={
              partner.allowSpam
                ? () =>
                    updateEmails((e) => (e.id === activeEmail.id ? { ...e, isSpam: true } : e))
                : undefined
            }
            onPrev={() => {
              if (!activeEmail) return;
              const idx = filteredEmails.findIndex((x) => x.id === activeEmail.id);
              if (idx > 0) {
                const prev = filteredEmails[idx - 1];
                setActiveEmail(prev);
                updateEmails((x) => (x.id === prev.id ? { ...x, isRead: true } : x));
              }
            }}
            onNext={() => {
              if (!activeEmail) return;
              const idx = filteredEmails.findIndex((x) => x.id === activeEmail.id);
              if (idx >= 0 && idx < filteredEmails.length - 1) {
                const next = filteredEmails[idx + 1];
                setActiveEmail(next);
                updateEmails((x) => (x.id === next.id ? { ...x, isRead: true } : x));
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
