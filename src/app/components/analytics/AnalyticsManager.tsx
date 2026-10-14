"use client";

import { useEffect, useState } from "react";
import AnalyticsConsent from "./AnalyticsConsent";
import ClarityTracker from "./ClarityTracker";

export type AnalyticsConsentChoice = "accepted" | "rejected" | null;

export default function AnalyticsManager() {
  const [consent, setConsent] = useState<AnalyticsConsentChoice>(null);
  const [isConsentLoaded, setIsConsentLoaded] = useState(false);

  // Restore saved consent after mounting to avoid accessing localStorage during rendering.
  useEffect(() => {
    const savedConsent = localStorage.getItem("flavorcraft_analytics_consent");

    if (savedConsent === "accepted" || savedConsent === "rejected") {
      setConsent(savedConsent);
    }
    setIsConsentLoaded(true);
  }, []);

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

  /**
   * Saves the user's analytics consent preference and updates the application state.
   *
   * When consent is rejected, attempts to clear Clarity cookies.
   * Reloads the page if consent changes from accepted to rejected.
   *
   * @param choice - Whether the user accepts or rejects analytics tracking.
   */
  function handleConsentChoice(choice: "accepted" | "rejected") {
    localStorage.setItem("flavorcraft_analytics_consent", choice);
    setConsent(choice);

    if (choice === "rejected") {
      clearClarityCookies();

      if (consent === "accepted") {
        window.location.reload();
      }
    }
  }

  if (!isConsentLoaded) {
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
