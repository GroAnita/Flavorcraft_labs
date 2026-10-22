'use client';

import { useState } from 'react';
import { AddPantryItemForm } from '@/app/components/features/AddPantryItemForm';
import { PantryCategorySection } from '@/app/components/features/PantryCategorySection';
import {
  ALL_CATEGORIES,
  PantryFilters,
} from '@/app/components/features/PantryFilters';
import { PantryHeader } from '@/app/components/features/PantryHeader';
import { PantryRecipeSuggestions } from '@/app/components/features/PantryRecipeSuggestions';
import { isOutOfStock } from '@/app/lib/pantryOptions';
import {
  categoryOf,
  groupByCategory,
  matchRecipes,
} from '@/app/lib/pantryUtils';
import type { PantryItems, Recipe } from '@/app/types/recipe';

type PantryManagerProps = {
  initialItems: PantryItems[];
  recipes: Recipe[];
  recipesFailed: boolean;
};

// The single source of pantry state. Counts, search, filters and recipe
// suggestions are all derived from `items`, so they always stay in sync.
export function PantryManager({
  initialItems,
  recipes,
  recipesFailed,
}: PantryManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL_CATEGORIES);
  // Used for "Updated 2 days ago"; fixed per page load so rows don't change while you look
  const [now] = useState(() => Date.now());

  const outOfStockCount = items.filter(isOutOfStock).length;

  // Search is case-insensitive and ignores surrounding spaces, and combines with the category
  const query = search.trim().toLowerCase();
  const results = items.filter(
    (item) =>
      (!query || item.name.toLowerCase().includes(query)) &&
      (category === ALL_CATEGORIES || categoryOf(item) === category),
  );

  // Chip counts come from the whole pantry, so they don't change while searching
  const categoryCounts = groupByCategory(items).map((group) => ({
    category: group.category,
    count: group.items.length,
  }));
  const matches = matchRecipes(items, recipes);

  function handleAdded(item: PantryItems) {
    setItems((current) => [item, ...current]);
  }
  function handleUpdated(updated: PantryItems) {
    setItems((current) =>
      current.map((item) => (item.id === updated.id ? updated : item)),
    );
  }
  function handleDeleted(id: string) {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    // Don't stay on a category chip that no longer has items
    if (
      category !== ALL_CATEGORIES &&
      !next.some((item) => categoryOf(item) === category)
    ) {
      setCategory(ALL_CATEGORIES);
    }
  }
  function clearSearchAndFilters() {
    setSearch('');
    setCategory(ALL_CATEGORIES);
  }

  return (
    <>
      <PantryHeader
        totalCount={items.length}
        outOfStockCount={outOfStockCount}
        search={search}
        onSearchChange={setSearch}
      />

      <AddPantryItemForm onAdded={handleAdded} />

      {/* An empty pantry only shows the header, the form and this message */}
      {items.length === 0 && (
        // md:mt-2 makes the 24px desktop gap 32px, as on mobile
        <p className="rounded-lg bg-salt-50 p-6 text-center text-base leading-6 text-nori-300 md:mt-2">
          Your pantry is empty, add ingredients.
        </p>
      )}

      {items.length > 0 && (
        <div className="flex flex-col gap-6 md:gap-7">
          <PantryFilters
            categories={categoryCounts}
            totalCount={items.length}
            selected={category}
            onSelect={setCategory}
          />

          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            {/* On mobile the suggestions come first, above the list */}
            <div className="md:order-2 md:w-80.5 md:shrink-0">
              <PantryRecipeSuggestions
                matches={matches}
                failed={recipesFailed}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-6 md:order-1">
              <p className="sr-only" role="status">
                {results.length} {results.length === 1 ? 'item' : 'items'} shown
              </p>

              {results.length === 0 ? (
                <div className="flex flex-col items-start gap-4 rounded-lg bg-salt-50 p-6">
                  <p className="text-base text-nori-400">
                    No items match your search or filter.
                  </p>
                  <button
                    type="button"
                    onClick={clearSearchAndFilters}
                    className="inline-flex h-9 items-center rounded-lg border border-basil-500 px-3 py-1.5 text-sm leading-6 font-semibold text-basil-500 hover:bg-mint-500"
                  >
                    Clear search &amp; filters
                  </button>
                </div>
              ) : (
                groupByCategory(results).map((group) => (
                  <PantryCategorySection
                    key={group.category}
                    category={group.category}
                    items={group.items}
                    now={now}
                    onUpdated={handleUpdated}
                    onDeleted={handleDeleted}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
