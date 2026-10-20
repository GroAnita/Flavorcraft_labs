"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CalendarDays, Heart, Printer, Share2 } from "lucide-react";
import { FavoriteButton } from "@/app/components/ui/FavoriteButton";
import { useShareLink, type ShareFeedback } from "@/app/hooks/useShareLink";

type RecipeActionsProps = {
  title: string;
  // Defaults to the current page, which is the recipe detail page
  shareUrl?: string;
  isLoggedIn: boolean;
  isFavorite: boolean;
  // Saves or removes the favorite. Should throw if it fails, so an error can be shown
  onToggleFavorite: () => Promise<void> | void;
  // Opens the flow for adding the recipe to the meal plan
  onOpenMealPlanner: () => void;
};

// Size, layout and colors shared by every tile
const BASE_TILE_CLASSES =
  "flex min-w-0 flex-col items-center justify-center gap-2 rounded-lg bg-oat-200 px-4 py-6 text-center text-sm font-medium leading-none text-primary @md:flex-1";

// Tiles that can be used. aria-pressed is only set on the favorite tile,
// so the dark style only applies there.
const TILE_CLASSES = `${BASE_TILE_CLASSES} cursor-pointer transition-colors hover:bg-oat-300 aria-pressed:bg-primary aria-pressed:text-salt-500 aria-pressed:hover:bg-basil-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-60`;

// Blurred tiles shown to visitors, as in the design
const LOCKED_TILE_CLASSES = `${BASE_TILE_CLASSES} select-none blur-[2px]`;

const ICON_CLASSES = "size-[18px] shrink-0";

type ActionTileProps = {
  icon: ReactNode;
  label: string;
  onClick: () => void;
  isBusy?: boolean;
};

function ActionTile({ icon, label, onClick, isBusy = false }: ActionTileProps) {
  return (
    <button
      type="button"
      // aria-disabled instead of disabled keeps keyboard focus on the button while it works
      aria-disabled={isBusy || undefined}
      onClick={() => {
        if (!isBusy) onClick();
      }}
      className={TILE_CLASSES}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

type LockedTileProps = {
  icon: ReactNode;
  label: string;
};

function LockedTile({ icon, label }: LockedTileProps) {
  return (
    // Only a visual hint for visitors: inert means it can't be clicked or focused,
    // and screen readers skip it, so the control is only available when logged in
    <div inert className={LOCKED_TILE_CLASSES}>
      {icon}
      <span>{label}</span>
    </div>
  );
}

export function RecipeActions({
  title,
  shareUrl,
  isLoggedIn,
  isFavorite,
  onToggleFavorite,
  onOpenMealPlanner,
}: RecipeActionsProps) {
  const { share, isSharing } = useShareLink();
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const [feedback, setFeedback] = useState<ShareFeedback>(null);

  // Success messages disappear after a few seconds, errors stay until the next action
  useEffect(() => {
    if (feedback?.type !== "success") return;
    const timer = setTimeout(() => setFeedback(null), 4000);
    return () => clearTimeout(timer);
  }, [feedback]);

  async function handleShare() {
    setFeedback(null);
    const result = await share(title, shareUrl);
    if (result) setFeedback(result);
  }

  async function handleToggleFavorite() {
    if (isSavingFavorite) return;
    setIsSavingFavorite(true);
    setFeedback(null);

    try {
      await onToggleFavorite();
    } catch {
      setFeedback({
        type: "error",
        message: isFavorite
          ? "Couldn't remove the recipe from your favorites. Please try again."
          : "Couldn't save the recipe to your favorites. Please try again.",
      });
    } finally {
      setIsSavingFavorite(false);
    }
  }

  const mealPlannerIcon = (
    <CalendarDays aria-hidden="true" className={ICON_CLASSES} />
  );

  return (
    // The layout follows the width of the component, not the screen:
    // a 2x2 grid when narrow, and one row when it is at least 448px wide
    <div className="@container flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2 @md:flex">
        <ActionTile
          icon={<Share2 aria-hidden="true" className={ICON_CLASSES} />}
          label="Share"
          onClick={handleShare}
          isBusy={isSharing}
        />

        {isLoggedIn ? (
          <ActionTile
            icon={mealPlannerIcon}
            label="Meal planner"
            onClick={onOpenMealPlanner}
          />
        ) : (
          <LockedTile icon={mealPlannerIcon} label="Meal planner" />
        )}

        <ActionTile
          icon={<Printer aria-hidden="true" className={ICON_CLASSES} />}
          label="Print out"
          onClick={() => window.print()}
        />

        {isLoggedIn ? (
          <FavoriteButton
            variant="tile"
            label="Favorite"
            isLoggedIn
            isLiked={isFavorite}
            onToggle={handleToggleFavorite}
            disabled={isSavingFavorite}
            className={TILE_CLASSES}
          />
        ) : (
          <LockedTile
            icon={<Heart aria-hidden="true" className={ICON_CLASSES} />}
            label="Favorite"
          />
        )}
      </div>

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
