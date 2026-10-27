"use client";

import { useKeepForm } from "@/lib/useKeepForm";

import { login } from "@/app/admin/actions";
import styles from "./admin.module.css";

export default function LoginForm() {
  const [state, onSubmit, pending] = useKeepForm(login, { ok: true, message: "" });
  return (
    <form onSubmit={onSubmit}>
      <label className={styles.field}>
        <span className={styles.label}>Username</span>
        <input name="username" autoComplete="username" required className={styles.input} autoFocus />
      </label>
      <label className={styles.field}>
        <span className={styles.label}>Password</span>
        <input name="password" type="password" autoComplete="current-password" required className={styles.input} />
      </label>
      {!state.ok && state.message && <p className={styles.msgErr}>{state.message}</p>}
      <button
        className={styles.btn}
        disabled={pending}
        style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
