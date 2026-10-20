import { authFetch } from "./api";
import type { Favorite } from "../types/recipe";

// Fetches every favorite for the logged-in user, page by page.
// Used by the recipe detail page and the favorites page
export async function fetchFavorites(accessToken: string): Promise<Favorite[]> {
  const favorites: Favorite[] = [];
  let page = 1;

  while (true) {
    const response = await authFetch(
      `/recipe-book/favorites?limit=100&page=${page}`,
      accessToken
    );
    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }

    const json = await response.json();
    favorites.push(...json.data);
    if (json.meta?.isLastPage !== false) return favorites;

    page += 1;
  }
}

// The API has no endpoint for checking a single recipe,
// so this looks through the user's favorites
export async function fetchIsFavorite(
  recipeId: string,
  accessToken: string
): Promise<boolean> {
  const favorites = await fetchFavorites(accessToken);
  return favorites.some((favorite) => favorite.recipeId === recipeId);
}

// The ids of every recipe the logged-in user has saved, used to fill the hearts on recipe cards
export async function fetchFavoriteRecipeIds(
  accessToken: string
): Promise<string[]> {
  const favorites = await fetchFavorites(accessToken);
  return favorites.map((favorite) => favorite.recipeId);
}
