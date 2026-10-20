"use client";

import { useCallback, useSyncExternalStore } from "react";

// localStorage doesn't notify the tab that wrote to it, so writes dispatch this event too
const CHANGE_EVENT = "local-storage-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    // Storage can be blocked, for example in private browsing
    return null;
  }
}

// Reads and writes a JSON value in localStorage. Returns fallback on the server, before
// anything is saved, and when storage is unavailable.
export function useLocalStorage<T>(
  key: string,
  fallback: T
): [value: T, save: (value: T) => boolean] {
  const raw = useSyncExternalStore(
    subscribe,
    () => read(key),
    () => null
  );

  let value = fallback;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      // Keep the fallback when the saved value isn't valid JSON
    }
  }

  // Returns false when the value could not be saved
  const save = useCallback(
    (next: T) => {
      try {
        localStorage.setItem(key, JSON.stringify(next));
        window.dispatchEvent(new Event(CHANGE_EVENT));
        return true;
      } catch {
        return false;
      }
    },
    [key]
  );

  return [value, save];
}
