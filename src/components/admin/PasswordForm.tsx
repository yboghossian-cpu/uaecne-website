"use client";

import { useActionState } from "react";
import { changePassword, type ActionResult } from "@/app/admin/actions";
import styles from "./admin.module.css";

export default function PasswordForm() {
  const [state, action, pending] = useActionState<ActionResult, FormData>(changePassword, { ok: true, message: "" });
  return (
    <form action={action} style={{ maxWidth: 420 }}>
      <label className={styles.field}>
        <span className={styles.label}>Current password</span>
        <input name="current" type="password" autoComplete="current-password" required className={styles.input} />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>New password (12+ characters)</span>
        <input
          name="next"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
          className={styles.input}
        />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Repeat new password</span>
        <input
          name="again"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
          className={styles.input}
        />
      </label>
      <div className={styles.row}>
        <button className={styles.btn} disabled={pending}>
          {pending ? "Saving…" : "Change password"}
        </button>
        {state.message && <span className={state.ok ? styles.msgOk : styles.msgErr}>{state.message}</span>}
      </div>
    </form>
  );
}
