# Email Inbox (React + TypeScript + Vite)

This project is a small email-inbox UI scaffold built with React, TypeScript and Vite. It's intentionally frontend-only and uses local mock data (no backend).

## How to run

Install dependencies and start the dev server:

```bash
cd email-inbox
npm install
npm run dev
```

The app will be available at the address Vite prints (usually http://localhost:5173).

## Features implemented

- Inbox list with sender, subject, date and a snippet
- Responsive layout: stacks into a mobile-friendly single-column view and includes a mobile "Back" button in the detail view
- Select emails with checkboxes and perform bulk actions (Mark read/unread, Mark spam, Delete)
- Email detail view with mark Unread/Spam and a Reply box (Reply is a no-op, just clears the input)
- Search/filter by sender or subject
- Partner configuration with two partners (A/B) that change UI behavior (snippet, spam button, bulk actions, theme)

## Config system design

Partners are hard-coded as `src/partners/partnerA.ts` and `src/partners/partnerB.ts`. Each exports a config object:

- `showSnippet` — whether to display email preview snippets in list
- `allowSpam` — whether the "Mark spam" action is available
- `showBulkActions` — whether the bulk action toolbar is shown
- `theme` — a small theme key used to change accent color

The UI exposes a small partner switcher that toggles behavior at runtime.

## Tradeoffs and areas to improve

- No backend integration — all state is local. A real implementation would push changes to an API and re-sync.
- UI is minimal; accessibility and keyboard navigation need improvements.
- No tests were added; adding tests (React Testing Library) would increase confidence.
- State management is local to `App`. For a larger app I'd consider React Context or a state manager.

## Notes

This scaffold is designed to be small and easy to extend — if you'd like, I can add tests, responsive layout improvements or a dark mode as next steps.
