"use client";

import { useState, useRef } from "react";
import type { AnalyticsConsentChoice } from "./AnalyticsManager";
import PrivacyPolicyModal from "./PrivacyPolicyModal";

type AnalyticsConsentProps = {
  consent: AnalyticsConsentChoice;
  onConsentChange: (choice: "accepted" | "rejected") => void;
};

export default function AnalyticsConsent({
  consent,
  onConsentChange,
}: AnalyticsConsentProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const privacyPolicyButtonRef = useRef<HTMLButtonElement>(null);

  function handleConsentChoice(choice: "accepted" | "rejected") {
    onConsentChange(choice);
    setIsSettingsOpen(false);
  }

  function handleClosePrivacyPolicy() {
    setIsPrivacyPolicyOpen(false);

    requestAnimationFrame(() => {
      privacyPolicyButtonRef.current?.focus();
    });
  }

  return (
    <>
      {consent !== null && !isSettingsOpen && (
        <button
          ref={settingsButtonRef}
          type="button"
          className="fixed bottom-4 left-4 z-40 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground shadow-md transition-colors hover:bg-oat-100"
          onClick={() => {
            setIsSettingsOpen(true);
            requestAnimationFrame(() => {
              headingRef.current?.focus();
            });
          }}
        >
          Privacy Settings
        </button>
      )}
      {(consent === null || isSettingsOpen) && (
        <section
          aria-label="Analytics Consent"
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-lg rounded-xl border border-border bg-surface p-6 text-foreground shadow-xl"
        >
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mb-2 text-lg font-semibold"
          >
            Your Privacy Matters
          </h2>

          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            We use optional Microsoft Clarity analytics to understand how
            visitors interact with FlavorCraft, including clicks, scrolling, and
            navigation. This helps us improve the website. You can reject
            analytics or change your preference at any time through Privacy
            Settings.
          </p>

          <button
            type="button"
            ref={privacyPolicyButtonRef}
            onClick={() => setIsPrivacyPolicyOpen(true)}
            className="mb-4 text-sm font-medium underline underline-offset-2 hover:no-underline"
          >
            View Privacy Policy
          </button>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="flex-1 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-nori-400 "
              onClick={() => handleConsentChoice("rejected")}
            >
              Reject analytics
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-basil-700 "
              onClick={() => handleConsentChoice("accepted")}
            >
              Accept analytics
            </button>
          </div>
          {consent !== null && (
            <p className="mt-4 text-sm">
              Your current preference:{" "}
              <strong>
                {consent === "accepted"
                  ? "Analytics enabled"
                  : "Analytics disabled"}
              </strong>
            </p>
          )}

          {consent !== null && (
            <button
              type="button"
              className="mt-3 text-sm font-medium underline underline-offset-2 hover:no-underline"
              onClick={() => {
                setIsSettingsOpen(false);
                requestAnimationFrame(() => {
                  settingsButtonRef.current?.focus();
                });
              }}
            >
              Close settings
            </button>
          )}
        </section>
      )}
      {isPrivacyPolicyOpen && (
        <PrivacyPolicyModal onClose={handleClosePrivacyPolicy} />
      )}
    </>
  );
}
