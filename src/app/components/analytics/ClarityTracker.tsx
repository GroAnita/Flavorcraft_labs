"use client";

import type { AnalyticsConsentChoice } from "./AnalyticsManager";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

type ClarityTrackerProps = {
  consent: AnalyticsConsentChoice;
};

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
