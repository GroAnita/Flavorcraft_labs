import type { Metadata } from "next";
import { FavoritesError } from "@/app/components/features/FavoritesError";
import { FavoritesGrid } from "@/app/components/features/FavoritesGrid";
import { AuthError } from "@/app/lib/api";
import { fetchFavorites } from "@/app/lib/favorites";
import { getAccessToken } from "@/app/lib/session";
import type { Recipe } from "@/app/types/recipe";

export const metadata: Metadata = {
  title: "Favorites",
};

export default async function FavoritesPage() {
  // The layout has already sent logged-out visitors to the login page
  const accessToken = await getAccessToken();

  let recipes: Recipe[] | null = null;
  let error: { message: string; needsLogin?: boolean } | null = null;
  try {
    // Each favorite includes the full recipe, so no extra requests are needed
    const favorites = await fetchFavorites(accessToken ?? "");
    // Skips favorites whose recipe has since been deleted
    recipes = favorites
      .map((favorite) => favorite.recipe)
      .filter((recipe): recipe is Recipe => Boolean(recipe));
  } catch (err) {
    error =
      err instanceof AuthError
        ? { message: err.message, needsLogin: true }
        : { message: "We couldn't load your favorites. Please try again." };
  }

  return (
    <>
      <h1 className="sr-only">Favorites</h1>
      {recipes ? (
        <FavoritesGrid recipes={recipes} />
      ) : (
        <FavoritesError
          message={error?.message ?? ""}
          needsLogin={error?.needsLogin}
        />
      )}
    </>
  );
}
