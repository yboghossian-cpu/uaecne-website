"use client";

import { useKeepForm } from "@/lib/useKeepForm";
import { useState, useTransition } from "react";
import { saveSettingsAction, sendTestEmail, type ActionResult } from "@/app/admin/actions";
import type { SiteSettings } from "@/lib/server/settings";
import styles from "./admin.module.css";

export default function SettingsForm({ settings: s, mailOn }: { settings: SiteSettings; mailOn: boolean }) {
  const [state, onSubmit, pending] = useKeepForm(saveSettingsAction, { ok: true, message: "" });
  const [test, setTest] = useState<ActionResult | null>(null);
  const [testing, startTest] = useTransition();

  return (
    <form onSubmit={onSubmit}>
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Head office contact</h2>
        <p className={styles.cardHint}>Shown in the footer on every page and on the Contact page. One item per line.</p>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span className={styles.label}>Address (English)</span>
            <textarea
              name="addressEn"
              defaultValue={s.contact.addressEn.join("\n")}
              rows={3}
              className={styles.textarea}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Address (Armenian)</span>
            <textarea
              name="addressHy"
              lang="hyw"
              defaultValue={s.contact.addressHy.join("\n")}
              rows={3}
              className={`${styles.textarea} ${styles.armenian}`}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input name="email" type="email" defaultValue={s.contact.email} className={styles.input} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Phone numbers (one per line)</span>
            <textarea name="phones" defaultValue={s.contact.phones.join("\n")} rows={2} className={styles.textarea} />
          </label>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Social media</h2>
        <p className={styles.cardHint}>Leave a box empty to show that network greyed out in the footer.</p>
        <div className={styles.grid2}>
          {(
            [
              ["facebook", "Facebook"],
              ["youtube", "YouTube"],
              ["instagram", "Instagram"],
              ["x", "X (Twitter)"],
            ] as const
          ).map(([k, label]) => (
            <label key={k} className={styles.field}>
              <span className={styles.label}>{label}</span>
              <input name={k} defaultValue={s.social[k]} placeholder="https://" className={styles.input} />
            </label>
          ))}
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Donations</h2>
        <label className={styles.field}>
          <span className={styles.label}>Donate link</span>
          <input name="donateUrl" defaultValue={s.donateUrl} placeholder="https://" className={styles.input} />
          <span className={styles.help}>
            Where the Donate buttons go (header and homepage). Empty = buttons shown but not clickable, as now.
          </span>
        </label>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Announcement banner</h2>
        <p className={styles.cardHint}>
          A thin red strip above the header on every page — for urgent or seasonal notices.
        </p>
        <label className={styles.check}>
          <input type="checkbox" name="announcementEnabled" defaultChecked={s.announcement.enabled} />
          Show the banner
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Text</span>
          <input name="announcementText" defaultValue={s.announcement.text} maxLength={240} className={styles.input} />
        </label>
        <div className={styles.grid2}>
          <label className={styles.field}>
            <span className={styles.label}>Link label (optional)</span>
            <input name="announcementLinkLabel" defaultValue={s.announcement.linkLabel} className={styles.input} />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>Link (optional)</span>
            <input
              name="announcementLinkUrl"
              defaultValue={s.announcement.linkUrl}
              placeholder="/news or https://"
              className={styles.input}
            />
          </label>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Search engines</h2>
        <label className={styles.field}>
          <span className={styles.label}>Default description</span>
          <textarea
            name="defaultDescription"
            defaultValue={s.seo.defaultDescription}
            rows={2}
            maxLength={300}
            className={styles.textarea}
          />
          <span className={styles.help}>Used by Google and link previews for pages without their own description.</span>
        </label>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Form notifications</h2>
        <label className={styles.field}>
          <span className={styles.label}>Send new messages to (one email per line)</span>
          <textarea
            name="notifyEmails"
            defaultValue={s.notifications.emails.join("\n")}
            rows={2}
            className={styles.textarea}
          />
          <span className={styles.help}>
            Empty = the head-office email above. Every message is also kept in the Inbox.
          </span>
        </label>
        <div className={styles.row}>
          <span className={mailOn ? styles.pillGreen : styles.pillGrey}>
            {mailOn ? "Email connected" : "Email not connected"}
          </span>
          <button
            type="button"
            className={styles.btnSmall}
            disabled={testing}
            onClick={() => startTest(async () => setTest(await sendTestEmail()))}
          >
            {testing ? "Sending…" : "Send a test email"}
          </button>
          {test && <span className={test.ok ? styles.msgOk : styles.msgErr}>{test.message}</span>}
        </div>
      </section>

      <div className={styles.saveBar}>
        <button className={styles.btn} disabled={pending}>
          {pending ? "Saving…" : "Save settings"}
        </button>
        {state.message && <span className={state.ok ? styles.msgOk : styles.msgErr}>{state.message}</span>}
      </div>
    </form>
  );
}
