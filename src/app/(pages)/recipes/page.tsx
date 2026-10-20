import type { Metadata } from "next";
import { Suspense } from "react";
import { FavoritesBoundary } from "@/app/components/features/FavoritesBoundary";
import { RecipeBrowser } from "@/app/components/features/RecipeBrowser";
import { fetchRecipes } from "@/app/lib/recipe";
import { getAccessToken } from "@/app/lib/session";
import type { Recipe } from "@/app/types/recipe";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Browse all recipes and find something you want to cook.",
};

export default async function RecipesPage() {
  let recipes: Recipe[] = [];
  let failed = false;
  try {
    recipes = await fetchRecipes();
  } catch {
    failed = true;
  }

  // Only checks that a session cookie exists, as in CommentSection
  const isLoggedIn = Boolean(await getAccessToken());

  return (
    <main className="flex flex-1 flex-col bg-salt-500">
      <div className="container mx-auto flex flex-col px-6 pt-6 pb-8 md:pt-11">
        <h1 className="sr-only">Recipes</h1>

        {failed ? (
          <p
            role="alert"
            className="flex-1 rounded-lg bg-surface p-6 text-center text-muted-foreground"
          >
            We couldn&apos;t load recipes right now. Please try again in a
            moment.
          </p>
        ) : recipes.length === 0 ? (
          <p className="flex-1 rounded-lg bg-surface p-6 text-center text-muted-foreground">
            No recipes to show yet. Check back soon.
          </p>
        ) : (
          // RecipeBrowser reads the filters from the URL, which needs Suspense
          <Suspense fallback={<p className="sr-only">Loading recipes…</p>}>
            <FavoritesBoundary>
              <RecipeBrowser recipes={recipes} isLoggedIn={isLoggedIn} />
            </FavoritesBoundary>
          </Suspense>
        )}
      </div>
    </main>
  );
}
