import { authFetch } from "./api";
import { BASE_URL } from "./config";
import type { Recipe } from "../types/recipe";

// null means the count could not be loaded
export type ProfileStatsData = {
  favoritesCount: number | null;
  recipesCount: number | null;
  mealPlansCount: number | null;
  pantryCount: number | null;
};

// Asks for one item and reads the total from the response's meta
async function countItems(path: string, accessToken: string): Promise<number> {
  const response = await authFetch(`${path}?limit=1`, accessToken);
  if (!response.ok) {
    throw new Error(`Failed to count ${path}`);
  }
  const json = await response.json();
  return json.meta?.totalCount ?? json.data.length;
}

// The API can't filter recipes by owner, so this goes through every page
async function countOwnRecipes(ownerName: string): Promise<number> {
  let count = 0;
  let page = 1;

  while (true) {
    const response = await fetch(
      `${BASE_URL}/recipe-book/recipes?limit=100&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const json = await response.json();
    count += json.data.filter(
      (recipe: Recipe) => recipe.owner?.name === ownerName
    ).length;
    if (json.meta?.isLastPage !== false) return count;

    page += 1;
  }
}

export async function fetchProfileStats(
  accessToken: string,
  name: string
): Promise<ProfileStatsData> {
  const [favorites, recipes, mealPlans, pantry] = await Promise.allSettled([
    countItems("/recipe-book/favorites", accessToken),
    countOwnRecipes(name),
    countItems("/recipe-book/meal-plans", accessToken),
    countItems("/recipe-book/pantry", accessToken),
  ]);

  const valueOf = (result: PromiseSettledResult<number>) =>
    result.status === "fulfilled" ? result.value : null;

  return {
    favoritesCount: valueOf(favorites),
    recipesCount: valueOf(recipes),
    mealPlansCount: valueOf(mealPlans),
    pantryCount: valueOf(pantry),
  };
}
