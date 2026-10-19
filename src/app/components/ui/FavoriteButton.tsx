"use client";

import type { MouseEvent } from "react";
import { Heart } from "lucide-react";

type FavoriteButtonProps = {
  isLiked: boolean;
  onToggle: () => void;
  isLoggedIn?: boolean;
  label?: string;
  className?: string;
  // "icon": small heart on the recipe card, "tile": icon and visible text on the recipe detail page
  variant?: "icon" | "tile";
  // Blocks clicks while the favorite is being saved
  disabled?: boolean;
};

export function FavoriteButton({
  isLiked,
  onToggle,
  isLoggedIn = false,
  label = "Favorite recipe",
  className = "",
  variant = "icon",
  disabled = false,
}: FavoriteButtonProps) {
  if (!isLoggedIn) return null;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // Do not open the recipe if the button is inside a link
    event.preventDefault();
    event.stopPropagation();
    // aria-disabled keeps keyboard focus on the button, so the click is blocked here
    if (disabled) return;
    onToggle();
  }

  if (variant === "tile") {
    return (
      <button
        type="button"
        aria-pressed={isLiked}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        className={className}
      >
        <Heart
          aria-hidden="true"
          className={`size-4.5 shrink-0 ${
            isLiked ? "fill-current text-sprout-500" : "fill-none"
          }`}
        />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isLiked}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      className={`absolute right-3 top-3 flex size-8 items-center justify-center rounded-xl bg-oat-500 text-truffle-500 ${className}`}
    >
      <Heart
        aria-hidden="true"
        className={`size-4 ${isLiked ? "fill-current" : "fill-none"}`}
      />
    </button>
  );
}
