"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleAlert } from "lucide-react";

type FavoritesErrorProps = {
  message: string;
  // An expired session can't be fixed by retrying, so it links to the login page instead
  needsLogin?: boolean;
};

const BUTTON_CLASSES =
  "inline-flex h-9 items-center rounded-md bg-basil-500 px-4 text-sm font-semibold text-white hover:bg-basil-700 disabled:cursor-not-allowed disabled:opacity-60";

export function FavoritesError({ message, needsLogin }: FavoritesErrorProps) {
  const router = useRouter();
  const [isRetrying, startTransition] = useTransition();

  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-lg bg-surface px-6 py-10 text-center"
    >
      <CircleAlert aria-hidden="true" className="size-8 text-error-text" />
      <p className="text-truffle-500">{message}</p>
      {needsLogin ? (
        <Link href="/login" className={BUTTON_CLASSES}>
          Log in
        </Link>
      ) : (
        <button
          type="button"
          // Loads the page again on the server, which fetches the favorites again
          onClick={() => startTransition(() => router.refresh())}
          disabled={isRetrying}
          className={BUTTON_CLASSES}
        >
          {isRetrying ? "Trying again…" : "Try again"}
        </button>
      )}
    </div>
  );
}
