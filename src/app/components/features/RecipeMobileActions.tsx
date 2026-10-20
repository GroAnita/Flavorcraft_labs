"use client";

import { useEffect, useState } from "react";
import { Heart, Share2 } from "lucide-react";
import { useRecipeFavorite } from "@/app/components/features/RecipeFavoriteProvider";
import { useShareLink, type ShareFeedback } from "@/app/hooks/useShareLink";

type RecipeMobileActionsProps = {
  title: string;
  isLoggedIn: boolean;
};

const BUTTON_CLASSES =
  "flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-60";

// The wide favorite and share buttons below the ingredients and instructions on mobile.
// They use the same favorite state as the tiles in the hero
export function RecipeMobileActions({
  title,
  isLoggedIn,
}: RecipeMobileActionsProps) {
  const { isFavorite, isSaving, toggleFavorite } = useRecipeFavorite();
  const { share, isSharing } = useShareLink();
  const [feedback, setFeedback] = useState<ShareFeedback>(null);

  // Success messages disappear after a few seconds, errors stay until the next action
  useEffect(() => {
    if (feedback?.type !== "success") return;
    const timer = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  async function handleFavorite() {
    if (isSaving) return;
    setFeedback(null);
    try {
      await toggleFavorite();
    } catch {
      setFeedback({
        type: "error",
        message: isFavorite
          ? "Couldn't remove the recipe from your favorites. Please try again."
          : "Couldn't save the recipe to your favorites. Please try again.",
      });
    }
  }

  async function handleShare() {
    if (isSharing) return;
    setFeedback(null);
    const result = await share(title);
    if (result) setFeedback(result);
  }

  return (
    <div className="flex flex-col gap-2">
      {isLoggedIn && (
        <button
          type="button"
          aria-disabled={isSaving || undefined}
          onClick={handleFavorite}
          className={`${BUTTON_CLASSES} bg-primary text-salt-500 hover:bg-basil-600`}
        >
          {/* The label changes with the state, so it is never wrong about what happens */}
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
          <Heart
            aria-hidden="true"
            className={`size-4 ${isFavorite ? "fill-current" : "fill-none"}`}
          />
        </button>
      )}

      <button
        type="button"
        aria-disabled={isSharing || undefined}
        onClick={handleShare}
        className={`${BUTTON_CLASSES} border border-primary text-primary hover:bg-mint-500`}
      >
        Share
        <Share2 aria-hidden="true" className="size-4" />
      </button>

      {/* Always rendered so screen readers pick up changes */}
      <p
        role="status"
        className={`text-sm empty:hidden ${
          feedback?.type === "error" ? "text-error-text" : "text-success-text"
        }`}
      >
        {feedback?.message}
      </p>
    </div>
  );
}
