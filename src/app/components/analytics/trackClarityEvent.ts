import Clarity from "@microsoft/clarity";

export type ClarityEventName =
  | "recipe_searched"
  | "recipe_opened_from_search"
  | "recipe_favorited"
  | "recipe_unfavorited";

/**
 * Sends a custom Microsoft Clarity event when analytics consent is accepted.
 *
 * @param eventName - The custom event to track.
 */
export function trackClarityEvent(eventName: ClarityEventName): void {
  if (typeof window === "undefined") {
    return;
  }

  const consent = localStorage.getItem("flavorcraft_analytics_consent");

  if (consent !== "accepted") {
    return;
  }

  if (!process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID) {
    return;
  }

  Clarity.event(eventName);
}
