import { PANTRY_CATEGORIES, isOutOfStock } from "./pantryOptions";
import type { PantryItems, Recipe } from "../types/recipe";

const normalize = (value?: string | null) => value?.trim().toLowerCase() ?? "";

// --- Grouping and sorting ---

export const OTHER_CATEGORY = "Other";

// The supported category an item belongs to. The API accepts any text,
// so unknown or differently cased categories are matched case-insensitively.
export function categoryOf(item: PantryItems): string {
  return (
    PANTRY_CATEGORIES.find((category) => normalize(category) === normalize(item.category)) ??
    OTHER_CATEGORY
  );
}

// Most recently updated first
export function sortByUpdated(items: PantryItems[]): PantryItems[] {
  return [...items].sort(
    (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
  );
}

// Only categories that have items, in the same order as the filter chips
export function groupByCategory(
  items: PantryItems[]
): { category: string; items: PantryItems[] }[] {
  return [...PANTRY_CATEGORIES, OTHER_CATEGORY]
    .map((category) => ({
      category,
      items: sortByUpdated(items.filter((item) => categoryOf(item) === category)),
    }))
    .filter((group) => group.items.length > 0);
}

// --- "Updated 2 days ago" ---

export function formatUpdated(value: Date | string, now: number): string {
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return "";

  const minutes = Math.max(0, Math.round((now - time) / 60_000));
  if (minutes < 1) return "Updated just now";
  if (minutes < 60) return `Updated ${minutes} min ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `Updated ${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days === 1) return "Updated yesterday";
  return `Updated ${days} days ago`;
}

// --- Recipe suggestions ---

export type RecipeMatch = {
  recipe: Recipe;
  matched: number;
  total: number;
  missing: string[];
};

// The API has no matching endpoint, so pantry and ingredient names are compared
// as text: "chickpeas" matches "chickpea", and "egg" matches "eggs". This is a
// simple approach and can miss or wrongly match some ingredients.
function namesMatch(pantryName: string, ingredientName: string) {
  const a = normalize(pantryName);
  const b = normalize(ingredientName);
  if (!a || !b) return false;
  return a.includes(b) || b.includes(a);
}

export function matchRecipes(
  pantry: PantryItems[],
  recipes: Recipe[]
): RecipeMatch[] {
  // Out-of-stock items don't count as available
  const available = pantry.filter((item) => !isOutOfStock(item));
  if (available.length === 0) return [];

  return recipes
    .map((recipe) => {
      const ingredients = (recipe.ingredients ?? []).filter((i) => i.name?.trim());
      const missing = ingredients
        .filter((i) => !available.some((item) => namesMatch(item.name, i.name)))
        .map((i) => i.name.trim());
      return {
        recipe,
        total: ingredients.length,
        matched: ingredients.length - missing.length,
        missing,
      };
    })
    .filter((match) => match.matched > 0)
    // Best match first, then the most matched ingredients
    .sort(
      (a, b) => b.matched / b.total - a.matched / a.total || b.matched - a.matched
    );
}
