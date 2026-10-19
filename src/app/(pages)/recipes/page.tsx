import type { Metadata } from "next";
import { RecipeCard } from "@/app/components/features/RecipeCard";
import { fetchRecipes } from "@/app/lib/recipe";
import type { Recipe } from "@/app/types/recipe";

export const metadata: Metadata = {
  title: "Recipes | FlavorCraft Labs",
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

  return (
    <main className="flex flex-1 flex-col bg-salt-500">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-8 md:flex-row">
        <h1 className="sr-only">Recipes</h1>

        {/* Filter sidebar goes here (cards 4–6) */}
        <aside aria-label="Filters" className="md:w-80.5 md:shrink-0" />

        <section aria-label="Recipe results" className="flex-1">
          {failed ? (
            <p
              role="alert"
              className="rounded-lg bg-surface p-6 text-center text-muted-foreground"
            >
              We couldn&apos;t load recipes right now. Please try again in a
              moment.
            </p>
          ) : recipes.length === 0 ? (
            <p className="rounded-lg bg-surface p-6 text-center text-muted-foreground">
              No recipes to show yet. Check back soon.
            </p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <li key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
