"use client";

import { RecipeCard } from "@/app/components/features/RecipeCard";
import { FilterGroup } from "@/app/components/ui/FilterGroup";
import { SavedRecipesLink } from "@/app/components/ui/SavedRecipesLink";
import { useRecipeFilters } from "@/app/hooks/useRecipeFilters";
import {
  RECIPE_FILTER_GROUPS,
  filterRecipes,
  getGroupOptionsWithCounts,
} from "@/app/lib/recipeFilters";
import type { Recipe } from "@/app/types/recipe";

type RecipeBrowserProps = {
  recipes: Recipe[];
};

export function RecipeBrowser({ recipes }: RecipeBrowserProps) {
  // Shared state for every group, so equivalent options stay in sync
  const { selected, toggle, clear } = useRecipeFilters();
  const results = filterRecipes(recipes, selected);

  return (
    <>
      {/* Basic layout; the styled sidebar comes in card 6 */}
      <aside
        aria-label="Filters"
        className="flex flex-col gap-4 md:w-80.5 md:shrink-0"
      >
        <SavedRecipesLink />

        {RECIPE_FILTER_GROUPS.map((group) => (
          <FilterGroup
            key={group.id}
            title={group.title}
            // Counts are based on all recipes
            options={getGroupOptionsWithCounts(group, recipes)}
            selectedValues={selected}
            onChange={toggle}
            defaultOpen={group.defaultOpen}
          />
        ))}
      </aside>

      <section aria-label="Recipe results" className="flex-1">
        <p aria-live="polite" className="sr-only">
          {results.length} {results.length === 1 ? "recipe" : "recipes"} found
        </p>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-lg bg-surface p-6 text-center">
            <p className="text-muted-foreground">
              No recipes match your filters.
            </p>
            <button
              type="button"
              onClick={clear}
              className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-salt-500 hover:bg-basil-700"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
