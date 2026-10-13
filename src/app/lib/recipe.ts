import type { Recipe } from "../types/recipe";
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
