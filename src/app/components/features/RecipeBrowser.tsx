"use client";

import { useRef } from "react";
import { ArrowLeft, SlidersHorizontal, X } from "lucide-react";
import { RecipeCard } from "@/app/components/features/RecipeCard";
import { RecipeFilterSidebar } from "@/app/components/features/RecipeFilterSidebar";
import { useRecipeFilters } from "@/app/hooks/useRecipeFilters";
import { filterRecipes, getFilterLabel } from "@/app/lib/recipeFilters";
import type { Recipe } from "@/app/types/recipe";

type RecipeBrowserProps = {
  recipes: Recipe[];
};

// Shortcuts shown in the Suggestion row, using the same values as the sidebar
const SUGGESTIONS = [
  "tag:quick",
  "difficulty:easy",
  "category:lunch",
  "category:dinner",
  "category:dessert",
  "tag:cake",
];

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
    <div className="flex flex-col gap-10 md:gap-14">
      <div className="flex flex-col">
        {/* Active filters */}
        {selected.length > 0 && (
          <ul aria-label="Active filters" className="mb-4 flex flex-wrap gap-4 md:mb-6">
            {selected.map((value) => {
              const label = getFilterLabel(value) ?? value;
              return (
                <li key={value}>
                  <button
                    type="button"
                    onClick={() => toggle(value, false)}
                    aria-label={`Remove filter: ${label}`}
                    className="inline-flex h-7 items-center gap-1 rounded-lg border border-mint-600 bg-mint-500 py-1 pr-2 pl-3 font-aptly text-sm leading-5 font-medium text-basil-500 hover:bg-mint-600"
                  >
                    {label}
                    <X aria-hidden="true" strokeWidth={2.25} className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {/* Mobile: opens the filter overlay */}
        <div className="mb-6 flex gap-2 md:hidden">
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-thyme-500 bg-salt-50 px-3.25 py-2.5 text-sm leading-none font-medium text-thyme-500"
          >
            <SlidersHorizontal aria-hidden="true" className="size-4.5" />
            Filter{selected.length > 0 && ` (${selected.length})`}
          </button>
        </div>

        <div className="flex flex-col gap-4 text-sm leading-none md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
            <span className="text-nori-200">Suggestion:</span>
            {/* role="list" keeps the list semantics that display: contents can remove */}
            <ul role="list" aria-label="Suggested filters" className="contents">
              {SUGGESTIONS.map((value) => {
                const isActive = selected.includes(value);
                return (
                  <li key={value}>
                    <button
                      type="button"
                      onClick={() => toggle(value, !isActive)}
                      aria-pressed={isActive}
                      className={`font-medium text-basil-500 hover:underline ${
                        isActive ? "underline underline-offset-4" : ""
                      }`}
                    >
                      {getFilterLabel(value)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <p role="status" className="text-nori-200">
            <span className="font-semibold text-nori-500">{results.length}</span>{" "}
            {results.length === 1 ? "result" : "results"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
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

        <section aria-label="Recipe results" className="flex-1">
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
      </div>
    </div>
  );
}
