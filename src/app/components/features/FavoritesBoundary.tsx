import type { ReactNode } from "react";
import { FavoritesProvider } from "@/app/components/features/FavoritesProvider";
import { fetchFavoriteRecipeIds } from "@/app/lib/favorites";
import { getAccessToken } from "@/app/lib/session";

// Wrap recipe cards in this to show the favorite heart to logged-in users.
// Logged-out users get the cards without a heart.
export async function FavoritesBoundary({ children }: { children: ReactNode }) {
  const accessToken = await getAccessToken();
  if (!accessToken) return children;

  let recipeIds: string[] = [];
  try {
    recipeIds = await fetchFavoriteRecipeIds(accessToken);
  } catch {
    // Show empty hearts. If the session has expired, clicking one asks the user to log in
  }

  return (
    <FavoritesProvider initialRecipeIds={recipeIds}>{children}</FavoritesProvider>
  );
}
