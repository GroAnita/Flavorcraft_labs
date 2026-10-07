import type { Recipe } from '../types/recipe';

const BASE_URL = 'https://v2.api.noroff.dev';

export async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch(`${BASE_URL}/recipe-book/recipes`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  // The API wraps results as { data: Recipe[], meta: {...} }
  const json = await response.json();
  return json.data;
}
