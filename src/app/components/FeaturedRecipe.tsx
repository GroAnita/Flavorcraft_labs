import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/app/components/ui/Badge';
import { fetchRecipe } from '../lib/recipe';
import type { Recipe } from '../types/recipe';

// The agreed featured recipe: "Smash and Grab Burgers"
const FEATURED_RECIPE_ID = '518caa11-4d9c-4348-8a85-007b6490173b';

export default async function FeaturedRecipeSection() {
  let recipe: Recipe;
  try {
    recipe = await fetchRecipe(FEATURED_RECIPE_ID);
  } catch {
    // Don't break the home page if the API is down or the recipe is gone
    return null;
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <section className="w-full bg-saffron-500 py-16 md:flex md:min-h-[494px] md:items-center">
      <div className="container mx-auto flex flex-col gap-10 px-6 md:flex-row md:items-center md:justify-around">
        <div className="max-w-md">
          <p className="text-sm font-medium uppercase tracking-wide text-truffle-500">
            Today&apos;s favorite
          </p>
          <h2 className="mt-1 text-3xl leading-tight font-bold text-truffle-500">
            What everyone&apos;s cooking today
          </h2>
          <p className="mt-4 leading-snug text-truffle-600">
            Curious what everyone else is having for dinner? Every day we
            spotlight the recipe most people have been tempted by. Quick, tasty
            and definitely worth a try!
          </p>
        </div>

        <div className="flex w-full flex-col gap-4 md:max-w-sm">
          <article className="overflow-hidden rounded-md bg-surface">
            <div className="relative aspect-3/2 w-full bg-oat-300">
              {recipe.image?.url && (
                <Image
                  src={recipe.image.url}
                  alt={recipe.image.alt}
                  fill
                  unoptimized
                  className="object-cover"
                />
              )}
              <div className="absolute bottom-3 left-3">
                <Badge variant="category">Today&apos;s favorite</Badge>
              </div>
            </div>
            <div className="px-3 py-4">
              <p className="text-sm font-medium text-primary">
                {totalTime > 0 && `${totalTime} min · `}
                {recipe.difficulty}
              </p>
              <h3 className="mt-1 text-[24px] font-bold text-foreground text-truffle-500">
                {recipe.title}
              </h3>
            </div>
          </article>

          <Link
            href={`/recipes/${recipe.id}`}
            className="inline-flex h-9 w-full items-center justify-center rounded-md bg-basil-500 px-4 font-semibold text-salt-500 transition-colors hover:bg-basil-600"
          >
            See the recipe
          </Link>
        </div>
      </div>
    </section>
  );
}
