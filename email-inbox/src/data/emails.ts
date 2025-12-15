import type { Email } from "../types/email";

export const emails: Email[] = [
  {
    id: "1",
    sender: "Amazon",
    subject: "Your order has been shipped",
    body: "Your package will arrive tomorrow.",
    date: "2024-09-01",
    isRead: false,
    isSpam: false,
  },
  {
    id: "2",
    sender: "LinkedIn",
    subject: "New job recommendations",
    body: "We found jobs that match your profile.",
    date: "2024-09-02",
    isRead: true,
    isSpam: false,
  },
  {
    id: "3",
    sender: "Spam Corp",
    subject: "You won $1,000,000",
    body: "Click here to claim your prize.",
    date: "2024-09-03",
    isRead: false,
    isSpam: true,
  },
];
