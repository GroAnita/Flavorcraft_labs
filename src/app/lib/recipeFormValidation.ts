import type {
  IngredientRow,
  RecipeFormErrors,
  RecipeFormValues,
} from "@/app/types/recipeForm";

// The body sent to POST and PUT /recipe-book/recipes
export type RecipePayload = {
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  category?: string;
  ingredients: { name: string; quantity: number; unit: string }[];
  instructions: string[];
  tags: string[];
  image?: { url: string; alt: string };
};

const WHOLE_NUMBER = /^\d+$/;

// Accepts both "0,5" and "0.5". Returns NaN for anything that isn't a number
export function parseAmount(value: string) {
  const normalized = value.trim().replace(",", ".");
  if (!/^\d*\.?\d+$/.test(normalized)) return NaN;
  return Number(normalized);
}

export function isHttpUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

// A row with no amount and no name is ignored, so the user can leave empty rows
function isEmptyIngredient(row: IngredientRow) {
  return !row.quantity.trim() && !row.name.trim();
}

function validateTime(value: string, label: string) {
  const trimmed = value.trim();
  if (!trimmed) return `Add the ${label}`;
  if (!WHOLE_NUMBER.test(trimmed)) return "Use whole minutes, 0 or more";
  return undefined;
}

// Used in the browser before sending, and again in the Server Action
export function validateRecipeForm(values: RecipeFormValues): RecipeFormErrors {
  const errors: RecipeFormErrors = {};

  if (!values.title.trim()) errors.title = "Add a title";
  if (!values.description.trim())
    errors.description = "Add a short description";

  const imageUrl = values.imageUrl.trim();
  if (imageUrl && !isHttpUrl(imageUrl)) {
    errors.imageUrl = "Use a full link that starts with https://";
  }

  const prepError = validateTime(values.prepTime, "prep time");
  if (prepError) errors.prepTime = prepError;
  const cookError = validateTime(values.cookTime, "cook time");
  if (cookError) errors.cookTime = cookError;

  const ingredients = values.ingredients.filter(
    (row) => !isEmptyIngredient(row)
  );
  if (ingredients.length === 0) {
    errors.ingredients = "Add at least one ingredient";
  }

  const rowErrors: NonNullable<RecipeFormErrors["ingredientRows"]> = {};
  for (const row of ingredients) {
    const rowError: { quantity?: string; name?: string } = {};
    if (!row.quantity.trim()) {
      rowError.quantity = "Add an amount";
    } else if (!(parseAmount(row.quantity) > 0)) {
      rowError.quantity = "Use a number greater than 0";
    }
    if (!row.name.trim()) rowError.name = "Add the ingredient";
    if (rowError.quantity || rowError.name) rowErrors[row.id] = rowError;
  }
  if (Object.keys(rowErrors).length > 0) errors.ingredientRows = rowErrors;

  if (!values.steps.some((step) => step.text.trim())) {
    errors.steps = "Add at least one step";
  }

  return errors;
}

export function hasErrors(errors: RecipeFormErrors) {
  return Object.keys(errors).length > 0;
}

// Turns valid form values into the API body. Empty rows are left out
export function toRecipePayload(values: RecipeFormValues): RecipePayload {
  const imageUrl = values.imageUrl.trim();
  const category = values.category.trim();
  const tags = [
    ...new Map(
      values.tags
        .map((tag) => tag.trim())
        .filter(Boolean)
        .map((tag) => [tag.toLowerCase(), tag] as const)
    ).values(),
  ];

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    prepTime: Number(values.prepTime),
    cookTime: Number(values.cookTime),
    servings: values.servings,
    difficulty: values.difficulty,
    ...(category && { category }),
    ingredients: values.ingredients
      .filter((row) => !isEmptyIngredient(row))
      .map((row) => ({
        name: row.name.trim(),
        quantity: parseAmount(row.quantity),
        unit: row.unit.trim(),
      })),
    instructions: values.steps.map((step) => step.text.trim()).filter(Boolean),
    tags,
    // The title is used as alt text when the image has no description
    ...(imageUrl && {
      image: {
        url: imageUrl,
        alt: values.imageAlt.trim() || values.title.trim(),
      },
    }),
  };
}
