"use client";

import type { MouseEvent } from "react";
import { Heart } from "lucide-react";

type FavoriteButtonProps = {
  isLiked: boolean;
  onToggle: () => void;
  isLoggedIn?: boolean;
  label?: string;
  className?: string;
};

export function FavoriteButton({
  isLiked,
  onToggle,
  isLoggedIn = false,
  label = "Favorite recipe",
  className = "",
}: FavoriteButtonProps) {
  if (!isLoggedIn) return null;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // Do not open the recipe if the button is inside a link
    event.preventDefault();
    event.stopPropagation();
    onToggle();
  }

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isLiked}
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
