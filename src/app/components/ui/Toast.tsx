"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CircleAlert, Heart } from "lucide-react";

export type ToastData = {
  id: number; // a new id restarts the timer, even when the text is the same
  message: ReactNode;
  tone: "success" | "error";
  action?: { href: string; label: string }; // label is read by screen readers
};

type ToastProps = {
  toast: ToastData | null;
  onDismiss: () => void;
};

const AUTO_CLOSE_MS = 5000;

// The live region is always rendered, so screen readers announce each new message
export function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      {/* The key gives each message its own timer and hover state */}
      {toast && <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />}
    </div>
  );
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: () => void;
}) {
  const [isPaused, setIsPaused] = useState(false);

  // Closes after 5 seconds, unless the toast is hovered or focused
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(onDismiss, AUTO_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [isPaused, onDismiss]);

  const isError = toast.tone === "error";
  const Icon = isError ? CircleAlert : Heart;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-lg px-4 py-3 text-sm shadow-md ${
        isError
          ? "bg-error-bg text-error-text"
          : "bg-success-bg text-success-text"
      }`}
    >
      <Icon
        aria-hidden="true"
        className={`size-5 shrink-0 ${isError ? "" : "fill-sprout-500 text-sprout-500"}`}
      />
      <p className="flex-1">{toast.message}</p>
      {toast.action && (
        <Link
          href={toast.action.href}
          aria-label={toast.action.label}
          onClick={onDismiss}
          className="flex size-8 shrink-0 items-center justify-center rounded-md bg-surface text-truffle-500 hover:bg-salt-500"
        >
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}
    </div>
  );
}
