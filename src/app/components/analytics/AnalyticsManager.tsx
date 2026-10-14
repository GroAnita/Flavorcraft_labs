"use client";

import { useEffect, useState } from "react";
import AnalyticsConsent from "./AnalyticsConsent";
import ClarityTracker from "./ClarityTracker";

export type AnalyticsConsentChoice = "accepted" | "rejected" | null;

export default function AnalyticsManager() {
  const [consent, setConsent] = useState<AnalyticsConsentChoice>(null);
  const [isConsentLoaded, setIsConsentLoaded] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem("flavorcraft_analytics_consent");

    if (savedConsent === "accepted" || savedConsent === "rejected") {
      setConsent(savedConsent);
    }
    setIsConsentLoaded(true);
  }, []);

  function clearClarityCookies() {
    const clarityCookies = ["_clck", "_clsk"];

    clarityCookies.forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    });
  }

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
