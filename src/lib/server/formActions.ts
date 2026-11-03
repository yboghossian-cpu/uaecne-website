"use server";

import { getDb, rateLimit } from "./db";
import { clientIp, ipHash } from "./auth";
import { sendMail } from "./mail";
import { institution } from "./institutionEmail";

export type FormState = { status: "idle" | "ok" | "error"; message: string };

const EMAIL_RE = /^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/;

const str = (fd: FormData, k: string, max: number) =>
  String(fd.get(k) ?? "")
    .trim()
    .slice(0, max);

export async function submitForm(_prev: FormState, fd: FormData): Promise<FormState> {
  const raw = fd.get("form");
  const form = raw === "prayer" || raw === "church" || raw === "school" ? raw : "contact";
  // Church and school pages: the recipient is looked up from the page's own
  // contact card on the server — never taken from the browser.
  const target = form === "church" || form === "school" ? institution(form, str(fd, "slug", 160)) : null;
  if ((form === "church" || form === "school") && !target?.emails.length) {
    return { status: "error", message: "This form is not available on this page." };
  }
  const db = getDb();
  if (!db) {
    return {
      status: "error",
      message: "This form is not active on this preview site yet. Please email office.director@uaecne.org.",
    };
  }

  // Spam traps: a hidden field people never fill, and a minimum time on page.
  if (str(fd, "website", 200)) return { status: "ok", message: "Thank you — your message has been sent." };
  const started = Number(fd.get("started") ?? 0);
  if (!started || Date.now() - started < 3000) {
    return { status: "error", message: "Please take a moment to complete the form, then send it again." };
  }

  const ip = await clientIp();
  if (!rateLimit("form", ip, 5, 3600)) {
    return { status: "error", message: "Too many messages from your connection. Please try again later." };
  }

  const name = str(fd, "name", 120);
  const email = str(fd, "email", 200);
  const phone = str(fd, "phone", 40);
  const subject = form === "prayer" ? "Prayer request" : str(fd, "subject", 160);
  const message = str(fd, "message", 5000);
  const confidential = form === "prayer" && fd.get("confidential") === "on";

  if (!name) return { status: "error", message: "Please enter your name." };
  if (form !== "prayer" && !email) return { status: "error", message: "Please enter your email address." };
  if (email && !EMAIL_RE.test(email)) return { status: "error", message: "Please check your email address." };
  if (message.length < 5) return { status: "error", message: "Please write your message." };

  const extra =
    form === "prayer"
      ? { confidential }
      : target
        ? { institution: target.name, slug: str(fd, "slug", 160), to: target.emails }
        : {};
  const { lastInsertRowid } = db
    .prepare(
      `INSERT INTO submissions (form, name, email, phone, subject, message, extra, ip_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(form, name, email, phone, subject, message, JSON.stringify(extra), ipHash(ip));

  const label = form === "prayer" ? "Prayer request" : "Contact form";
  const res = await sendMail({
    subject: target
      ? `[UAECNE website] Message for ${target.name}: ${subject || name}`
      : `[UAECNE website] ${label}: ${subject || name}`,
    replyTo: email || undefined,
    to: target?.emails,
    text: [
      target
        ? `A visitor sent this message from the ${target.name} page on the UAECNE website (uaecne.org). Reply to this email to answer them directly.`
        : `${label} received on the UAECNE website.`,
      "",
      `Name: ${name}`,
      ...(email ? [`Email: ${email}`] : []),
      ...(phone ? [`Phone: ${phone}`] : []),
      ...(form !== "prayer" && subject ? [`Subject: ${subject}`] : []),
      ...(form === "prayer" ? [`Keep confidential: ${confidential ? "Yes" : "No"}`] : []),
      "",
      message,
      "",
      target ? "— Sent through the UAECNE website." : "— Also saved in Admin › Inbox.",
    ].join("\n"),
  });
  db.prepare("UPDATE submissions SET email_status = ? WHERE id = ?").run(
    res.ok ? "sent" : `not sent: ${res.error}`.slice(0, 300),
    lastInsertRowid,
  );

  return {
    status: "ok",
    message:
      form === "prayer"
        ? "Thank you. Your prayer request has been received."
        : "Thank you — your message has been sent. We will get back to you soon.",
  };
}
