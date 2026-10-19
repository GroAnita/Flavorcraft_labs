import type { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import FeaturedRecipeSection from './components/FeaturedRecipe';
import CategoryNavigation from './components/features/CategoryNavigation';
import { RecipeSection } from './components/features/RecipeSection';
import { fetchRecipes } from './lib/recipe';
import type { Recipe } from './types/recipe';

export const metadata: Metadata = {
  title: 'Flavorcraft Labs – Good food starts here',
  description:
    'Discover your next favourite meal, find inspiration for tonight, and make something delicious.',
};

const SECTION_SIZE = 8;
const FAST_RECIPE_MAX_MINUTES = 20;

const totalTime = (recipe: Recipe) => recipe.prepTime + recipe.cookTime;

export default async function Home() {
  let recipes: Recipe[] = [];
  let failed = false;
  try {
    recipes = await fetchRecipes();
  } catch {
    failed = true;
  }

  // Fast: 1–20 min total, quickest first. 0 min means the time info is missing.
  const fastRecipes = recipes
    .filter((r) => totalTime(r) > 0 && totalTime(r) <= FAST_RECIPE_MAX_MINUTES)
    .sort((a, b) => totalTime(a) - totalTime(b))
    .slice(0, SECTION_SIZE);

  // Popular: dinners with the most favorites first. The API has both "Dinner" and "dinner".
  const dinnerRecipes = recipes
    .filter((r) => r.category?.toLowerCase() === 'dinner')
    .sort((a, b) => (b._count?.favorites ?? 0) - (a._count?.favorites ?? 0))
    .slice(0, SECTION_SIZE);

  // New: most recently created first
  const newestRecipes = [...recipes]
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
    )
    .slice(0, SECTION_SIZE);

  return (
    <main className="flex flex-1 flex-col bg-salt-500">
      <HeroSection />
      <CategoryNavigation />
      <FeaturedRecipeSection />
      <div className="container mx-auto flex flex-col gap-8 px-6 py-8">
        {failed ? (
          <p
            role="alert"
            className="rounded-lg bg-surface p-6 text-center text-muted-foreground"
          >
            We couldn&apos;t load recipes right now. Please try again in a
            moment.
          </p>
        ) : (
          <>
            <RecipeSection
              title="Fast recipes"
              recipes={fastRecipes}
              viewAllHref="/recipes"
            />
            <RecipeSection
              title="Popular everyday dinners"
              recipes={dinnerRecipes}
              viewAllHref="/recipes?category=Dinner"
            />
            <RecipeSection
              title="Try something new"
              recipes={newestRecipes}
              viewAllHref="/recipes"
            />
          </>
        )}
      </div>
    </main>
  );
}
