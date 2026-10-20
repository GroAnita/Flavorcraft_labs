import type { Recipe } from "../types/recipe";
import type { FilterOptionData } from "../components/ui/FilterGroup";

// Values are stable IDs ("field:option"). The same value is reused when an
// option appears in several groups (e.g. "Easy" in Popular and Difficulty),
// so selecting it in one group also selects it in the other.
export type RecipeFilterOption = {
  label: string;
  value: string;
  matches: (recipe: Recipe) => boolean;
  // Field to combine with when it differs from the value's own field
  combineWith?: string;
};

export type RecipeFilterGroup = {
  id: string;
  title: string;
  defaultOpen: boolean;
  options: RecipeFilterOption[];
};

// The API mixes casing ("Dinner"/"dinner", "quick"/"Quick"), so compare in lowercase
const normalize = (value?: string | null) => value?.trim().toLowerCase() ?? "";

const hasTag = (recipe: Recipe, ...tags: string[]) =>
  (recipe.tags ?? []).some((tag) => tags.includes(normalize(tag)));

const hasCategory = (recipe: Recipe, category: string) =>
  normalize(recipe.category) === category;

const hasDifficulty = (recipe: Recipe, difficulty: string) =>
  normalize(recipe.difficulty) === difficulty;

// Time uses total time (prep + cook). 0 means the time is missing,
// so those recipes are left out of every time option.
export const totalTime = (recipe: Recipe) =>
  (recipe.prepTime || 0) + (recipe.cookTime || 0);

// "Under 15 min" is also part of "Under 30 min"; the other ranges don't overlap
const TIME_RANGES = {
  under15: { min: 1, max: 15 },
  under30: { min: 1, max: 30 },
  from30to60: { min: 31, max: 60 },
  over60: { min: 61, max: Infinity },
};

const isWithin = (recipe: Recipe, range: { min: number; max: number }) => {
  const minutes = totalTime(recipe);
  return minutes >= range.min && minutes <= range.max;
};

const SIMPLE_LIMIT = 5;

// Diet and allergy options only match recipes that say so explicitly in their
// tags. They are never guessed from ingredients, as a wrong match can be unsafe.
const freeFromTags = (word: string) => [
  `${word}-free`,
  `${word}free`,
  `${word} free`,
];

// Shared options, reused in several groups
const EASY: RecipeFilterOption = {
  label: "Easy",
  value: "difficulty:easy",
  matches: (r) => hasDifficulty(r, "easy"),
};
const CAKES: RecipeFilterOption = {
  label: "Cakes",
  value: "tag:cake",
  matches: (r) => hasTag(r, "cake", "cakes"),
  // Shown as a meal type, so "Dinner + Cakes" means Dinner OR Cakes
  combineWith: "category",
};
const MEAT: RecipeFilterOption = {
  label: "Meat",
  value: "main:meat",
  matches: (r) => hasTag(r, "meat", "beef", "pork", "lamb"),
};
const FISH: RecipeFilterOption = {
  label: "Fish",
  value: "main:fish",
  matches: (r) => hasTag(r, "fish", "seafood", "salmon"),
};
const VEGETARIAN: RecipeFilterOption = {
  label: "Vegetarian",
  value: "diet:vegetarian",
  matches: (r) => hasTag(r, "vegetarian"),
};
const GLUTEN_FREE: RecipeFilterOption = {
  label: "Gluten-free",
  value: "diet:gluten-free",
  matches: (r) => hasTag(r, ...freeFromTags("gluten")),
};

export const RECIPE_FILTER_GROUPS: RecipeFilterGroup[] = [
  {
    id: "popular",
    title: "Popular filters",
    defaultOpen: true,
    options: [
      {
        label: "Quick",
        value: "tag:quick",
        matches: (r) => hasTag(r, "quick", "quick meal"),
      },
      EASY,
      {
        label: "Weekday dinner",
        value: "tag:weekday-dinner",
        matches: (r) => hasTag(r, "weekday dinner", "weekday-dinner"),
      },
      CAKES,
      MEAT,
      FISH,
      GLUTEN_FREE,
    ],
  },
  {
    id: "time",
    title: "Time",
    defaultOpen: true,
    options: [
      {
        label: "Under 15 min",
        value: "time:under-15",
        matches: (r) => isWithin(r, TIME_RANGES.under15),
      },
      {
        label: "Under 30 min",
        value: "time:under-30",
        matches: (r) => isWithin(r, TIME_RANGES.under30),
      },
      {
        label: "30-60 min",
        value: "time:30-60",
        matches: (r) => isWithin(r, TIME_RANGES.from30to60),
      },
      {
        label: "Over 1 hour",
        value: "time:over-60",
        matches: (r) => isWithin(r, TIME_RANGES.over60),
      },
    ],
  },
  {
    id: "mealtype",
    title: "Mealtype",
    defaultOpen: true,
    options: [
      ...["Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Drink"].map(
        (label) => ({
          label,
          value: `category:${label.toLowerCase()}`,
          matches: (r: Recipe) => hasCategory(r, label.toLowerCase()),
        }),
      ),
      CAKES,
    ],
  },
  {
    id: "difficulty",
    title: "Difficulty",
    defaultOpen: false,
    options: [
      EASY,
      {
        label: "Medium",
        value: "difficulty:medium",
        matches: (r) => hasDifficulty(r, "medium"),
      },
      {
        label: "Hard",
        value: "difficulty:hard",
        matches: (r) => hasDifficulty(r, "hard"),
      },
    ],
  },
  {
    id: "simplicity",
    title: "Simplicity",
    defaultOpen: false,
    options: [
      {
        label: "Few ingredients",
        value: "simple:few-ingredients",
        matches: (r) =>
          (r.ingredients?.length ?? 0) > 0 &&
          r.ingredients.length <= SIMPLE_LIMIT,
      },
      {
        label: "Few steps",
        value: "simple:few-steps",
        matches: (r) =>
          (r.instructions?.length ?? 0) > 0 &&
          r.instructions.length <= SIMPLE_LIMIT,
      },
      {
        label: "Everyday ingredients",
        value: "simple:everyday-ingredients",
        matches: (r) => hasTag(r, "everyday ingredients"),
      },
      {
        label: "No special equipments",
        value: "simple:no-special-equipment",
        matches: (r) => hasTag(r, "no special equipment"),
      },
    ],
  },
  {
    id: "diet",
    title: "Diet & allergies",
    defaultOpen: false,
    options: [
      VEGETARIAN,
      { label: "Vegan", value: "diet:vegan", matches: (r) => hasTag(r, "vegan") },
      ...[
        ["Egg-free", "egg"],
        ["Shellfish-free", "shellfish"],
        ["Pork-free", "pork"],
        ["Dairy-free (milk/milk protein)", "dairy"],
        ["Lactose-free", "lactose"],
      ].map(([label, word]) => ({
        label,
        value: `diet:${word}-free`,
        matches: (r: Recipe) => hasTag(r, ...freeFromTags(word)),
      })),
      GLUTEN_FREE,
      ...[
        ["Nut-free (nuts/almonds/seeds)", "nut"],
        ["Citrus-free", "citrus"],
        ["Onion/garlic-free", "onion-garlic"],
        ["Soy-free", "soy"],
      ].map(([label, word]) => ({
        label,
        value: `diet:${word}-free`,
        matches: (r: Recipe) => hasTag(r, ...freeFromTags(word)),
      })),
    ],
  },
  {
    id: "time-of-week",
    title: "Time of week",
    defaultOpen: false,
    options: [
      {
        label: "Weekday",
        value: "week:weekday",
        matches: (r) => hasTag(r, "weekday"),
      },
      {
        label: "Weekend",
        value: "week:weekend",
        matches: (r) => hasTag(r, "weekend"),
      },
    ],
  },
  {
    id: "main-ingredient",
    title: "Main ingredient",
    defaultOpen: false,
    options: [
      {
        label: "Chicken",
        value: "main:chicken",
        matches: (r) => hasTag(r, "chicken"),
      },
      MEAT,
      FISH,
      VEGETARIAN,
      {
        label: "Pasta",
        value: "main:pasta",
        matches: (r) => hasTag(r, "pasta", "spaghetti"),
      },
    ],
  },
  {
    id: "cuisine",
    title: "Cuisine/region",
    defaultOpen: false,
    options: [
      ["Asian", "asian", ["asian", "chinese", "japanese", "thai", "indian", "korean"]],
      ["European", "european", ["european", "italian", "french", "british", "spanish", "greek"]],
      ["North America", "north-america", ["american", "north american", "canadian"]],
      ["Central America", "central-america", ["mexican", "central american"]],
      ["South America", "south-america", ["south american", "brazilian", "peruvian"]],
      ["Oceania", "oceania", ["oceania", "australian"]],
      ["Africa", "africa", ["african", "moroccan", "ethiopian"]],
    ].map(([label, id, tags]) => ({
      label: label as string,
      value: `cuisine:${id}`,
      // Some recipes use a cuisine as category (e.g. "Italian")
      matches: (r: Recipe) =>
        hasTag(r, ...(tags as string[])) ||
        (tags as string[]).includes(normalize(r.category)),
    })),
  },
];

// --- Selection logic ---

// Every option by value. Shared options (e.g. "Easy") appear once.
const OPTIONS_BY_VALUE = new Map(
  RECIPE_FILTER_GROUPS.flatMap((group) =>
    group.options.map((option) => [option.value, option] as const),
  ),
);

// Fields where a recipe must match every selected option (Vegan AND Gluten-free).
// In all other fields one match is enough (Dinner OR Lunch).
const MATCH_ALL_FIELDS = new Set(["diet"]);

const fieldOf = (value: string) => value.split(":")[0];

// Reads the "filters" URL parameter and drops values that don't exist
export function parseFilters(param: string | null): string[] {
  if (!param) return [];
  const values = param.split(",").filter((value) => OPTIONS_BY_VALUE.has(value));
  return [...new Set(values)];
}

// Display label for a filter value, e.g. "difficulty:easy" → "Easy"
export function getFilterLabel(value: string): string | undefined {
  return OPTIONS_BY_VALUE.get(value)?.label;
}

export function serializeFilters(values: string[]): string {
  return values.join(",");
}

// Link to the recipes page with these filters selected, so every link uses the same format
export function filterHref(values: string[]): string {
  if (values.length === 0) return "/recipes";
  // Filter values only contain a-z, 0-9, "-" and ":", so they are safe in a URL as is
  return `/recipes?filters=${serializeFilters(values)}`;
}

// Turns a tag, category or difficulty from the API into a filter value, e.g.
// "Easy" → "difficulty:easy", "Dinner" → "category:dinner", "homemade" → null.
// It reuses the filters' own matches functions, so a link always gives the same
// results as the filter. Matching is case-insensitive and ignores surrounding spaces.
export function tagToFilterValue(text: string): string | null {
  if (!text.trim()) return null;

  // A minimal recipe where the text is the tag, category and difficulty at once.
  // No times, ingredients or steps, so time and simplicity options never match.
  const probe = {
    tags: [text],
    category: text,
    difficulty: text,
    prepTime: 0,
    cookTime: 0,
    ingredients: [],
    instructions: [],
  } as unknown as Recipe;

  for (const option of OPTIONS_BY_VALUE.values()) {
    if (option.matches(probe)) return option.value;
  }
  return null;
}

// Different fields combine with AND (Dinner AND Easy)
export function filterRecipes(recipes: Recipe[], selected: string[]): Recipe[] {
  if (selected.length === 0) return recipes;

  const byField = new Map<string, RecipeFilterOption[]>();
  for (const value of selected) {
    const option = OPTIONS_BY_VALUE.get(value);
    if (!option) continue;
    const field = option.combineWith ?? fieldOf(value);
    byField.set(field, [...(byField.get(field) ?? []), option]);
  }

  return recipes.filter((recipe) =>
    [...byField].every(([field, options]) =>
      MATCH_ALL_FIELDS.has(field)
        ? options.every((option) => option.matches(recipe))
        : options.some((option) => option.matches(recipe)),
    ),
  );
}

// Counts come from the recipes passed in, not from the design's placeholder numbers.
// The results page passes all recipes, so counts don't change while filtering.
export function getGroupOptionsWithCounts(
  group: RecipeFilterGroup,
  recipes: Recipe[],
): FilterOptionData[] {
  return group.options.map((option) => ({
    label: option.label,
    value: option.value,
    count: recipes.filter(option.matches).length,
  }));
}
