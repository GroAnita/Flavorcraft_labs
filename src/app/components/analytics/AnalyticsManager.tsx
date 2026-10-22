"use client";

import { useSyncExternalStore } from "react";
import AnalyticsConsent from "./AnalyticsConsent";
import ClarityTracker from "./ClarityTracker";

export type AnalyticsConsentChoice = "accepted" | "rejected" | null;

const STORAGE_KEY = "flavorcraft_analytics_consent";

// Components that read the consent, so they update when it is saved in this tab
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  // Also updates when the consent is changed in another tab
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getConsent(): AnalyticsConsentChoice {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "accepted" || saved === "rejected" ? saved : null;
  } catch {
    // localStorage can be blocked, e.g. in some private windows
    return null;
  }
}

// The server can't read localStorage, so nothing is shown until the browser has loaded.
// This replaces the old isConsentLoaded state and avoids hydration mismatches
function getServerConsent() {
  return "loading" as const;
}

function saveConsent(choice: "accepted" | "rejected") {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // If it can't be saved, the choice still applies until the page is reloaded
  }
  listeners.forEach((listener) => listener());
}

/**
 * Attempts to remove Microsoft Clarity's first-party cookies.
 *
 * Clears the known Clarity cookie names using the current document's cookie scope.
 */
function clearClarityCookies() {
  const clarityCookies = ["_clck", "_clsk"];

  clarityCookies.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
  });
}

export default function AnalyticsManager() {
  // Reads the saved consent from localStorage, which lives outside React.
  // useSyncExternalStore is made for this, so no effect or extra state is needed
  const consent = useSyncExternalStore(subscribe, getConsent, getServerConsent);

  /**
   * Saves the user's analytics consent preference.
   *
   * When consent is rejected, attempts to clear Clarity cookies.
   * Reloads the page if consent changes from accepted to rejected.
   *
   * @param choice - Whether the user accepts or rejects analytics tracking.
   */
  function handleConsentChoice(choice: "accepted" | "rejected") {
    const previous = consent;
    saveConsent(choice);

    if (choice === "rejected") {
      clearClarityCookies();

      if (previous === "accepted") {
        window.location.reload();
      }
    }
  }

  if (consent === "loading") {
    return null;
  }

  return (
    <>
      <AnalyticsConsent
        consent={consent}
        onConsentChange={handleConsentChoice}
      />
      <ClarityTracker consent={consent} />
    </>
  );
}
