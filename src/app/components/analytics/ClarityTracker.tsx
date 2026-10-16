"use client";

import type { AnalyticsConsentChoice } from "./AnalyticsManager";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

type ClarityTrackerProps = {
  consent: AnalyticsConsentChoice;
};

/**
 * Initializes Microsoft Clarity only after the user accepts analytics tracking.
 *
 * Skips initialization when consent is missing or rejected,
 * or when the Clarity project ID is missing.
 *
 * @param consent - The user's current analytics consent choice.
 */
export default function ClarityTracker({ consent }: ClarityTrackerProps) {
  useEffect(() => {
    if (consent !== "accepted") {
      return;
    }

    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

    if (!projectId) {
      console.warn("Microsoft Clarity project ID is missing");
      return;
    }

    Clarity.init(projectId);

    Clarity.consentV2({
      ad_Storage: "denied",
      analytics_Storage: "granted",
    });
  }, [consent]);

  return null;
}
