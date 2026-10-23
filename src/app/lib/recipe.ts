import type { Comment, Recipe } from "../types/recipe";
import { BASE_URL } from "./config";

export class RecipeNotFoundError extends Error {
  constructor() {
    super("Recipe not found");
    this.name = "RecipeNotFoundError";
  }
}

// The recipe list is the same for everyone, so it's cached for 60 seconds.
// Pages then get it without waiting for the API on every visit; new or
// changed recipes can take up to a minute to show up in the lists.
const RECIPES_REVALIDATE_SECONDS = 60;

export async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}/recipe-book/recipes`, {
    next: { revalidate: RECIPES_REVALIDATE_SECONDS },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  // The API wraps results as { data: Recipe[], meta: {...} }
  const json = await response.json();
  return json.data;
}

export async function fetchRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipe-book/recipes/${id}`);
  // 400 is returned for ids that aren't valid, 404 for ids that don't exist
  if (response.status === 400 || response.status === 404) {
    throw new RecipeNotFoundError();
  }
  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }
  // The API wraps the result as { data: Recipe, meta: {...} }
  const json = await response.json();
  return json.data;
}

export async function fetchComments(recipeId: string): Promise<Comment[]> {
  const response = await fetch(
    `${BASE_URL}/recipe-book/recipes/${recipeId}/comments`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  // The comments endpoint ignores limit/page and returns an empty meta,
  // so this always returns every comment for the recipe.
  const json = await response.json();
  return json.data;
}
