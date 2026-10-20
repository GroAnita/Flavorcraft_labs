import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchRecipe, RecipeNotFoundError } from "@/app/lib/recipe";
import { fetchIsFavorite } from "@/app/lib/favorites";
import { getAccessToken } from "@/app/lib/session";
import { createRecipeJsonLd } from "@/app/lib/seo/recipeJsonLd";
import Breadcrumb from "@/app/components/ui/Breadcrumb";
import { RecipeHero } from "@/app/components/features/RecipeHero";
import { RecipeOverview } from "@/app/components/features/RecipeOverview";
import { RecipeFavoriteProvider } from "@/app/components/features/RecipeFavoriteProvider";
import { RecipeDetailActions } from "@/app/components/features/RecipeDetailActions";
import { RecipeMobileActions } from "@/app/components/features/RecipeMobileActions";
import { RecipeIngredientsAndInstructions } from "@/app/components/features/RecipeIngredientsAndInstructions";
import { RecipeIngredients } from "@/app/components/features/RecipeIngredients";
import { InstructionsList } from "@/app/components/features/InstructionsList";
import { KeepScreenOnToggle } from "@/app/components/features/KeepScreenOnToggle";
import { SimilarRecipes } from "@/app/components/features/SimilarRecipes";
import { CommentSection } from "@/app/components/features/CommentSection";

type RecipePageProps = {
  // In Next.js 15 and later, params is a Promise
  params: Promise<{ id: string }>;
};

// Next.js remembers the same fetch during one request, so the page and
// generateMetadata only call the API once
async function getRecipe(id: string) {
  try {
    return await fetchRecipe(id);
  } catch (error) {
    // Shows the 404 page. Other errors are shown by error.tsx
    if (error instanceof RecipeNotFoundError) notFound();
    throw error;
  }
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const recipe = await fetchRecipe(id);

    const description =
      recipe.description?.trim() ||
      "Discover this delicious recipe on FlavorCraft Labs.";

    return {
      title: recipe.title,
      description,
      openGraph: {
        title: recipe.title,
        description,
        type: "article",
        ...(recipe.image?.url && {
          images: [
            {
              url: recipe.image.url,
              alt: recipe.image.alt || recipe.title,
            },
          ],
        }),
      },
    };
  } catch {
    return {
      title: "Recipe",
      description: "Discover delicious recipes on FlavorCraft Labs.",
    };
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  const accessToken = await getAccessToken();
  const isLoggedIn = Boolean(accessToken);

  let isFavorite = false;
  if (accessToken) {
    try {
      isFavorite = await fetchIsFavorite(recipe.id, accessToken);
    } catch {
      // If the favorites can't be loaded, the buttons start as not saved
    }
  }

  // Escapes "<" so text in the recipe can't close the script tag
  const jsonLd = JSON.stringify(createRecipeJsonLd(recipe)).replace(
    /</g,
    "\\u003c",
  );

  return (
    <main className="flex flex-1 flex-col bg-salt-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* 1310px content on desktop (1438px minus 64px on each side) */}
      <div className="mx-auto flex w-full min-w-0 max-w-359.5 flex-col gap-6 pt-6 md:gap-9 md:px-8 md:pt-8 md:pb-20 lg:px-16">
        <div className="px-6 md:px-0">
          <Breadcrumb
            items={[
              { label: "Recipes", href: "/recipes" },
              { label: recipe.title },
            ]}
          />
        </div>

        {/* Shares the favorite state between the hero tiles and the mobile buttons.
            key resets it when another recipe is opened */}
        <RecipeFavoriteProvider
          key={recipe.id}
          recipeId={recipe.id}
          initialIsFavorite={isFavorite}
        >
          {/* 24px between the sections on mobile, 80px on desktop */}
          <div className="flex flex-col gap-6 md:gap-20">
            <RecipeHero image={recipe.image}>
              <RecipeOverview
                {...recipe}
                commentCount={recipe.comments?.length ?? 0}
              />
              <RecipeDetailActions
                title={recipe.title}
                isLoggedIn={isLoggedIn}
              />
            </RecipeHero>

            {/* The sections below the hero are 1090px wide on desktop */}
            <div className="mx-auto flex w-full min-w-0 max-w-272.5 flex-col gap-6 md:gap-20">
              <div className="p-6 md:p-0">
                {/* key resets the tab, servings and checked steps when another recipe is opened */}
                <RecipeIngredientsAndInstructions
                  key={recipe.id}
                  ingredients={
                    <RecipeIngredients
                      ingredients={recipe.ingredients}
                      servings={recipe.servings}
                    />
                  }
                  instructions={
                    <InstructionsList
                      recipeId={recipe.id}
                      steps={recipe.instructions}
                      headerAction={<KeepScreenOnToggle />}
                    />
                  }
                  mobileFooter={
                    <RecipeMobileActions
                      title={recipe.title}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
              </div>

              <div className="p-6 md:p-0">
                <SimilarRecipes
                  difficulty={recipe.difficulty}
                  category={recipe.category}
                  tags={recipe.tags}
                />
              </div>

              {/* Full width on mobile, a rounded card on desktop */}
              <div className="bg-surface px-6 pt-6 pb-12 md:rounded-2xl md:p-12">
                <CommentSection recipeId={recipe.id} />
              </div>
            </div>
          </div>
        </RecipeFavoriteProvider>
      </div>
    </main>
  );
}
