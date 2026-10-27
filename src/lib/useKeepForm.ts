"use client";

import { startTransition, useActionState, type FormEvent } from "react";

/**
 * Like useActionState, but submits through onSubmit so React does not clear
 * the form afterwards — a failed save or a wrong password never wipes what
 * was typed.
 */
export function useKeepForm<S>(action: (state: Awaited<S>, fd: FormData) => S | Promise<S>, initial: Awaited<S>) {
  const [state, run, pending] = useActionState<S, FormData>(action, initial);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => run(fd));
  };
  return [state, onSubmit, pending] as const;
}
