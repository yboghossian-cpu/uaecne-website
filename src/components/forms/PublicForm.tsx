"use client";


import { useT } from "@/lib/i18n/client";
import { useKeepForm } from "@/lib/useKeepForm";
import { useEffect, useRef } from "react";
import { submitForm, type FormState } from "@/lib/server/formActions";
import styles from "./PublicForm.module.css";

const initial: FormState = { status: "idle", message: "" };

export default function PublicForm({ form }: { form: "contact" | "prayer" }) {
  const tx = useT();
  const [state, onSubmit, pending] = useKeepForm(submitForm, initial);
  const started = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Time-on-page spam check: stamped when the form appears in the browser.
  useEffect(() => {
    if (started.current) started.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "ok") {
      formRef.current?.reset();
      if (started.current) started.current.value = String(Date.now());
    }
  }, [state]);

  return (
    <form ref={formRef} onSubmit={onSubmit} className={styles.form} noValidate={false}>
      <input type="hidden" name="form" value={form} />
      <input type="hidden" name="started" ref={started} defaultValue="0" />
      <div className={styles.trap} aria-hidden="true">
        <label>
          {tx("Website")}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{tx("Full name *")}</span>
          <input name="name" required maxLength={120} autoComplete="name" className={styles.input} />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>{tx("Email")}{form === "contact" ? " *" : ""}</span>
          <input
            name="email"
            type="email"
            required={form === "contact"}
            maxLength={200}
            autoComplete="email"
            className={styles.input}
          />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>{tx("Phone")}</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={styles.input} />
        </label>
        {form === "contact" && (
          <label className={styles.field}>
            <span className={styles.label}>{tx("Subject")}</span>
            <input name="subject" maxLength={160} className={styles.input} />
          </label>
        )}
      </div>

      <label className={styles.field}>
        <span className={styles.label}>{form === "prayer" ? tx("Your prayer request *") : tx("Message *")}</span>
        <textarea name="message" required minLength={5} maxLength={5000} rows={7} className={styles.textarea} />
      </label>

      {form === "prayer" && (
        <label className={styles.check}>
          <input type="checkbox" name="confidential" />
          <span>{tx("Please keep my request confidential")}</span>
        </label>
      )}

      <div className={styles.actions}>
        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? tx("Sending…") : form === "prayer" ? tx("Send prayer request") : tx("Send message")}
        </button>
        <p role="status" aria-live="polite" className={state.status === "error" ? styles.error : styles.ok}>
          {tx(state.message)}
        </p>
      </div>
    </form>
  );
}
