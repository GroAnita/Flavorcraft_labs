"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";
import { FavoritesEmptyState } from "@/app/components/features/FavoritesEmptyState";
import { FavoritesProvider } from "@/app/components/features/FavoritesProvider";
import { RecipeCard } from "@/app/components/features/RecipeCard";
import type { Recipe } from "@/app/types/recipe";

type FavoritesGridProps = {
  recipes: Recipe[];
};

export function FavoritesGrid({ recipes }: FavoritesGridProps) {
  const router = useRouter();
  // Removed recipes are hidden right away, before the refreshed list arrives from the server
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const listHeadingRef = useRef<HTMLHeadingElement>(null);
  const emptyHeadingRef = useRef<HTMLHeadingElement>(null);

  const visible = recipes.filter((recipe) => !removedIds.includes(recipe.id));

  function handleSaved(recipeId: string, favorite: boolean) {
    if (favorite) return;

    // flushSync updates the page now, so focus can move before the removed button is gone
    flushSync(() => setRemovedIds((ids) => [...ids, recipeId]));
    (listHeadingRef.current ?? emptyHeadingRef.current)?.focus();
    // Reloads the server parts, so the sidebar's Favorites count goes down too
    router.refresh();
  }

  return (
    <FavoritesProvider
      initialRecipeIds={recipes.map((recipe) => recipe.id)}
      onSaved={handleSaved}
      showFavoritesLink={false}
    >
      {visible.length === 0 ? (
        <FavoritesEmptyState headingRef={emptyHeadingRef} />
      ) : (
        <section aria-labelledby="favorites-heading">
          <h2
            id="favorites-heading"
            ref={listHeadingRef}
            tabIndex={-1}
            className="sr-only"
          >
            {visible.length === 1
              ? "1 favorite recipe"
              : `${visible.length} favorite recipes`}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
            {visible.map((recipe) => (
              <li key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </FavoritesProvider>
  );
}
