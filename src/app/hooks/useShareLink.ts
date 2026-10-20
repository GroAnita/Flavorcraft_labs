"use client";

import { useState } from "react";

export type ShareFeedback = {
  type: "success" | "error";
  message: string;
} | null;

// Opens the browser's share sheet, or copies the link when sharing isn't available.
// Returns feedback to show, or null when the link was shared or the user closed the sheet
export function useShareLink() {
  const [isSharing, setIsSharing] = useState(false);

  async function share(
    title: string,
    url: string = window.location.href
  ): Promise<ShareFeedback> {
    if (isSharing) return null;
    setIsSharing(true);

    try {
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title, url });
          return null;
        } catch (error) {
          // The user closed the share sheet, which is not an error
          if (error instanceof DOMException && error.name === "AbortError")
            return null;
          // Sharing failed for another reason, so copy the link below instead
        }
      }

      await navigator.clipboard.writeText(url);
      return { type: "success", message: "Link copied" };
    } catch {
      return {
        type: "error",
        message:
          "Couldn't copy the link. Copy it from the address bar instead.",
      };
    } finally {
      setIsSharing(false);
    }
  }

  return { share, isSharing };
}
