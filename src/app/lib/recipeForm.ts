// Units used by existing recipes, with plurals and spellings merged
// (e.g. "cups" → "cup", "pcs" → "piece", "teaspoon" → "tsp")
export const INGREDIENT_UNITS = [
  "g",
  "kg",
  "ml",
  "dl",
  "l",
  "tsp",
  "tbsp",
  "cup",
  "oz",
  "pinch",
  "piece",
  "slice",
  "leaves",
  "head",
  "ball",
  "package",
  "large",
  "medium",
];

// Returns a copy with the row at `from` moved to `to`
export function moveRow<T>(rows: T[], from: number, to: number): T[] {
  const next = [...rows];
  const [row] = next.splice(from, 1);
  next.splice(to, 0, row);
  return next;
}
