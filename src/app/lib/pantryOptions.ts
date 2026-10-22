// Shared by the pantry form, filters and actions. The API doesn't restrict
// these values, so this is the list the app agrees on.

export const PANTRY_CATEGORIES = [
  "Protein",
  "Produce",
  "Dairy",
  "Grains & pasta",
  "Canned",
  "Spices & oils",
] as const;

export const PANTRY_UNITS = [
  "g",
  "kg",
  "ml",
  "l",
  "pieces",
  "cloves",
  "cans",
  "tsp",
  "tbsp",
  "cups",
] as const;

export type PantryCategory = (typeof PANTRY_CATEGORIES)[number];
export type PantryUnit = (typeof PANTRY_UNITS)[number];

// Values the user enters in the form, before the API adds id, owner and dates
export type PantryItemInput = {
  name: string;
  quantity: number;
  unit: string;
  category: string;
};

// A quantity of zero means the item is out of stock
export const isOutOfStock = (item: { quantity: number }) => item.quantity === 0;
