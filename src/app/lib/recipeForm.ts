import type { IngredientFormRow, StepFormRow } from "@/app/types/recipe";

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

export const DEFAULT_UNIT = "g";

function createRowId(): string {
  // randomUUID only exists in secure contexts, so not on http://<LAN IP>
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}

export function createIngredientRow(): IngredientFormRow {
  return { id: createRowId(), amount: "", unit: DEFAULT_UNIT, name: "" };
}

export function createStepRow(): StepFormRow {
  return { id: createRowId(), text: "" };
}

// Returns a copy with the row at `from` moved to `to`
export function moveRow<T>(rows: T[], from: number, to: number): T[] {
  const next = [...rows];
  const [row] = next.splice(from, 1);
  next.splice(to, 0, row);
  return next;
}
