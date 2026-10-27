"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

export default function ConfirmButton({
  label,
  confirmText,
  className,
  action,
  refresh,
}: {
  label: string;
  confirmText: string;
  className?: string;
  action: () => Promise<{ ok: boolean; message: string } | void>;
  refresh?: boolean;
}) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);
  const router = useRouter();
  return (
    <span className={styles.row}>
      <button
        type="button"
        className={className}
        disabled={pending}
        onClick={() => {
          if (confirmText && !confirm(confirmText)) return;
          start(async () => {
            const r = await action();
            if (r) setMsg(r);
            if (refresh && (!r || r.ok)) router.refresh();
          });
        }}
      >
        {pending ? "Working…" : label}
      </button>
      {msg?.message && <span className={msg.ok ? styles.msgOk : styles.msgErr}>{msg.message}</span>}
    </span>
  );
}
