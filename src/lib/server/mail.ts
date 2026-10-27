import "server-only";
import nodemailer from "nodemailer";
import { getSettings } from "./settings";

/**
 * Outgoing email through Gmail SMTP (free). Configured on the server only:
 *   SMTP_USER  – the Gmail address that sends (e.g. uaecne.website@gmail.com)
 *   SMTP_PASS  – a Google "app password" for that account (not its login password)
 * Recipients are set in Admin › Settings › Notifications (falls back to the
 * head-office email). Without SMTP settings, submissions are still saved to
 * the admin inbox — email is a bonus, never a requirement.
 */

export function mailConfigured(): boolean {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function transport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_PORT ?? "465") === "465",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export function notifyRecipients(): string[] {
  const s = getSettings();
  const list = s.notifications.emails.filter(Boolean);
  return list.length ? list : s.contact.email ? [s.contact.email] : [];
}

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 200);

export async function sendMail(opts: { subject: string; text: string; replyTo?: string; to?: string[] }) {
  if (!mailConfigured()) return { ok: false as const, error: "Email is not configured on the server" };
  const to = opts.to ?? notifyRecipients();
  if (!to.length) return { ok: false as const, error: "No notification address set" };
  try {
    await transport().sendMail({
      from: `"UAECNE Website" <${process.env.SMTP_USER}>`,
      to: to.join(", "),
      subject: oneLine(opts.subject),
      text: opts.text,
      replyTo:
        opts.replyTo && /^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/.test(opts.replyTo) ? opts.replyTo : undefined,
    });
    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: e instanceof Error ? e.message : String(e) };
  }
}
