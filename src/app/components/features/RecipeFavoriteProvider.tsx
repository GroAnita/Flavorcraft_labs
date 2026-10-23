"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { setFavorite } from "@/app/actions/favorites";
import { trackClarityEvent } from "@/app/components/analytics/trackClarityEvent";

type RecipeFavoriteValue = {
  isFavorite: boolean;
  isSaving: boolean;
  // Throws if saving fails, so the button that was pressed can show an error
  toggleFavorite: () => Promise<void>;
};

const RecipeFavoriteContext = createContext<RecipeFavoriteValue | null>(null);

type RecipeFavoriteProviderProps = {
  recipeId: string;
  initialIsFavorite: boolean;
  children: ReactNode;
};

// Shares the favorite state between the tiles in the hero and the buttons on mobile,
// so both show the same state and only one request runs at a time
export function RecipeFavoriteProvider({
  recipeId,
  initialIsFavorite,
  children,
}: RecipeFavoriteProviderProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isSaving, setIsSaving] = useState(false);

  async function toggleFavorite() {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const favorite = !isFavorite;
      const result = await setFavorite(recipeId, favorite);
      if (!result.ok) throw new Error(result.error);
      setIsFavorite(favorite);

      trackClarityEvent(favorite ? "recipe_favorited" : "recipe_unfavorited");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <RecipeFavoriteContext value={{ isFavorite, isSaving, toggleFavorite }}>
      {children}
    </RecipeFavoriteContext>
  );
}

export function useRecipeFavorite() {
  const value = useContext(RecipeFavoriteContext);
  if (!value) {
    throw new Error(
      "useRecipeFavorite must be used inside RecipeFavoriteProvider",
    );
  }
  return value;
}
