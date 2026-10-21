"use client";

import { useEffect, useId, useState } from "react";
import { Info } from "lucide-react";

const UNSUPPORTED_MESSAGE =
  "Your browser doesn't support keeping the screen on.";
const FAILED_MESSAGE =
  "Couldn't keep the screen on. Your device may be blocking it, for example in battery saver mode.";

export function KeepScreenOnToggle() {
  const [enabled, setEnabled] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const id = useId();
  const tooltipId = `${id}-tooltip`;

  useEffect(() => {
    if (!enabled) return;

    let sentinel: WakeLockSentinel | null = null;
    let cancelled = false;

    async function requestWakeLock() {
      try {
        const lock = await navigator.wakeLock.request("screen");
        // Turned off or unmounted while the request was pending
        if (cancelled) {
          lock.release();
          return;
        }
        sentinel = lock;
        setIsActive(true);
        setError("");
        // The browser releases the lock itself when the tab is hidden
        lock.addEventListener("release", () => {
          if (!cancelled) setIsActive(false);
        });
      } catch {
        if (cancelled) return;
        setEnabled(false);
        setIsActive(false);
        setError(FAILED_MESSAGE);
      }
    }

    // Get the lock back when the user returns to the tab
    function handleVisibilityChange() {
      if (document.visibilityState === "visible" && sentinel?.released) {
        requestWakeLock();
      }
    }

    requestWakeLock();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      sentinel?.release();
    };
  }, [enabled]);

  // Escape closes the tooltip even when it was opened by hover, not focus
  useEffect(() => {
    if (!showTooltip) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowTooltip(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showTooltip]);

  function handleToggle() {
    if (enabled) {
      setEnabled(false);
      setIsActive(false);
      return;
    }
    if (!("wakeLock" in navigator)) {
      setError(UNSUPPORTED_MESSAGE);
      return;
    }
    setError("");
    setEnabled(true);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          id={id}
          aria-checked={enabled}
          aria-describedby={tooltipId}
          onClick={handleToggle}
          className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full bg-thyme-300 transition-colors aria-checked:bg-primary"
        >
          <span
            aria-hidden="true"
            className={`size-6 rounded-full bg-salt-50 shadow-sm transition-transform ${
              enabled ? "translate-x-5.5" : "translate-x-0.5"
            }`}
          />
        </button>

        <label
          htmlFor={id}
          className="cursor-pointer text-base text-truffle-500 md:text-lg"
        >
          Keep the screen on
        </label>

        <div
          className="relative flex"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            type="button"
            aria-label="About keep the screen on"
            aria-describedby={tooltipId}
            // Open, not toggle: hover or focus has already opened it before the click
            onClick={() => setShowTooltip(true)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            className="flex cursor-pointer rounded-full text-truffle-500"
          >
            <Info aria-hidden="true" className="size-5 md:size-6" />
          </button>

          {/* Always in the DOM so aria-describedby works, only shown on hover, focus or tap.
              Anchored to the icon's right edge so it grows left instead of past the viewport */}
          <p
            id={tooltipId}
            role="tooltip"
            className={`absolute right-0 bottom-full z-10 mb-3 w-56 rounded-lg bg-surface px-4 py-2 text-center text-sm text-truffle-500 shadow-md md:w-72 md:text-base ${
              showTooltip ? "block" : "hidden"
            }`}
          >
            Turn this on to prevent the screen from going to sleep.
            <span
              aria-hidden="true"
              className="absolute top-full right-1 size-3 -translate-y-1.5 rotate-45 bg-surface md:right-1.5"
            />
          </p>
        </div>
      </div>

      {/* Always rendered so screen readers pick up changes */}
      <p role="status" className="text-sm empty:hidden">
        {error ? (
          <span className="text-error-text">{error}</span>
        ) : isActive ? (
          <span className="text-muted-foreground sr-only">
            Your screen will stay on while this page is open.
          </span>
        ) : null}
      </p>
    </div>
  );
}
