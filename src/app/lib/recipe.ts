import type { Comment, Recipe } from "../types/recipe";
import { BASE_URL } from "./config";

export async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}/recipe-book/recipes`);
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  // The API wraps results as { data: Recipe[], meta: {...} }
  const json = await response.json();
  return json.data;
}

export async function fetchRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`${BASE_URL}/recipe-book/recipes/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }
  // The API wraps the result as { data: Recipe, meta: {...} }
  const json = await response.json();
  return json.data;
}

export async function fetchComments(recipeId: string): Promise<Comment[]> {
  const response = await fetch(
    `${BASE_URL}/recipe-book/recipes/${recipeId}/comments`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  // The comments endpoint ignores limit/page and returns an empty meta,
  // so this always returns every comment for the recipe.
  const json = await response.json();
  return json.data;
}
