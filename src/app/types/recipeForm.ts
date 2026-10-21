export type Difficulty = "Easy" | "Medium" | "Hard";

// Each row has a stable id, so rows keep their values when others are added, removed or moved
export type IngredientRow = {
  id: string;
  quantity: string;
  unit: string;
  name: string;
};

export type StepRow = {
  id: string;
  text: string;
};

// The values of the create and edit recipe form.
// Numbers are kept as text, so the fields can be empty while typing.
// They are turned into numbers when the form is sent
export type RecipeFormValues = {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  category: string;
  difficulty: Difficulty;
  ingredients: IngredientRow[];
  steps: StepRow[];
  tags: string[];
};

// Error messages shown next to the fields. Ingredient row errors use the row id
export type RecipeFormErrors = {
  title?: string;
  description?: string;
  imageUrl?: string;
  prepTime?: string;
  cookTime?: string;
  ingredients?: string;
  steps?: string;
  ingredientRows?: Record<string, { quantity?: string; name?: string }>;
};

// Every section of the form gets the values, a way to change them, and its errors
export type RecipeFormSectionProps = {
  values: RecipeFormValues;
  onChange: (changes: Partial<RecipeFormValues>) => void;
  errors?: RecipeFormErrors;
};

// What the create and edit Server Actions return
export type SubmitRecipeResult =
  | { ok: true; id: string }
  | {
      ok: false;
      error?: string;
      fieldErrors?: RecipeFormErrors;
      needsLogin?: boolean;
    };

export function createRowId() {
  return crypto.randomUUID();
}

export function createEmptyIngredient(): IngredientRow {
  return { id: createRowId(), quantity: "", unit: "g", name: "" };
}

export function createEmptyStep(): StepRow {
  return { id: createRowId(), text: "" };
}

// The form starts with one empty ingredient and one empty step
export function createEmptyRecipeForm(): RecipeFormValues {
  return {
    title: "",
    description: "",
    imageUrl: "",
    imageAlt: "",
    prepTime: "",
    cookTime: "",
    servings: 4,
    category: "",
    difficulty: "Easy",
    ingredients: [createEmptyIngredient()],
    steps: [createEmptyStep()],
    tags: [],
  };
}
