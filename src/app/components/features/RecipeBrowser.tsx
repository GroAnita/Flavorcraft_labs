"use client";

import { useRef } from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { RecipeCard } from "@/app/components/features/RecipeCard";
import { RecipeFilterSidebar } from "@/app/components/features/RecipeFilterSidebar";
import { useRecipeFilters } from "@/app/hooks/useRecipeFilters";
import { filterRecipes } from "@/app/lib/recipeFilters";
import type { Recipe } from "@/app/types/recipe";

type RecipeBrowserProps = {
  recipes: Recipe[];
};

export function RecipeBrowser({ recipes }: RecipeBrowserProps) {
  // Shared state for every group, so equivalent options stay in sync
  const { selected, toggle, clear } = useRecipeFilters();
  const results = filterRecipes(recipes, selected);
  // Native <dialog> traps focus, closes on Escape and hides the page behind it
  const dialogRef = useRef<HTMLDialogElement>(null);

  const sidebar = (
    <RecipeFilterSidebar
      recipes={recipes}
      selected={selected}
      onChange={toggle}
    />
  );

  return (
    <>
      {/* Desktop: sidebar next to the results */}
      <aside
        aria-label="Filters"
        className="hidden md:block md:w-80.5 md:shrink-0"
      >
        {sidebar}
      </aside>

      {/* Mobile: the filters open as a full-screen overlay */}
      <dialog
        ref={dialogRef}
        aria-labelledby="mobile-filters-title"
        className="m-0 h-full max-h-none w-full max-w-none overscroll-contain bg-salt-500 p-6 md:hidden"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close filters"
              className="flex size-8 items-center justify-center rounded-lg text-truffle-500"
            >
              <ArrowLeft aria-hidden="true" className="size-5" />
            </button>
            <h2
              id="mobile-filters-title"
              className="text-2xl leading-none font-medium text-truffle-500"
            >
              Filter recipes
            </h2>
          </div>
          {sidebar}
        </div>
      </dialog>

      <section aria-label="Recipe results" className="flex flex-1 flex-col gap-6">
        <div className="flex gap-2 md:hidden">
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-thyme-500 bg-salt-50 px-3.25 py-2.5 text-sm leading-none font-medium text-thyme-500"
          >
            <SlidersHorizontal aria-hidden="true" className="size-4.5" />
            Filter{selected.length > 0 && ` (${selected.length})`}
          </button>
        </div>

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
