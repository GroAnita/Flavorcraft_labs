"use server";

import { authFetch, AuthError } from "@/app/lib/api";
import { deleteSession, getAccessToken } from "@/app/lib/session";

export type FavoriteResult =
  | { ok: true }
  | { ok: false; error: string; needsLogin?: boolean };

// Adds the recipe to the user's favorites when favorite is true, and removes it when false.
// Used by the recipe detail page and the favorites page
export async function setFavorite(
  recipeId: string,
  favorite: boolean
): Promise<FavoriteResult> {
  try {
    const accessToken = await getAccessToken();
    const response = favorite
      ? await authFetch("/recipe-book/favorites", accessToken, {
          method: "POST",
          body: JSON.stringify({ recipeId }),
        })
      : await authFetch(`/recipe-book/favorites/${recipeId}`, accessToken, {
          method: "DELETE",
        });

    // 409 when adding means it is already saved, and 404 when removing means it is
    // already gone. Both mean the favorite is already in the state the user wants
    const alreadyDone =
      (favorite && response.status === 409) ||
      (!favorite && response.status === 404);

    if (response.ok || alreadyDone) return { ok: true };

    return {
      ok: false,
      error: "Could not update your favorites. Please try again.",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      // The token is missing or expired, so remove it and ask the user to log in again
      await deleteSession();
      return { ok: false, error: error.message, needsLogin: true };
    }
    return {
      ok: false,
      error: "Something went wrong. Check your connection and try again.",
    };
  }
}
