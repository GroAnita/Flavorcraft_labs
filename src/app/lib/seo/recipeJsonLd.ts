import type { Recipe } from "../../types/recipe";

export function createRecipeJsonLd(recipe: Recipe) {
  return {
    "@context": "https://schema.org",
    "@type": "Recipe",
    image: recipe.image?.url,
    name: recipe.title,
    author: {
      "@type": "Person",
      name: recipe.owner.name,
    },
    recipeCategory: recipe.category,
    keywords: recipe.tags.join(", "),
    description: recipe.description,
    recipeIngredient: recipe.ingredients.map((ingredient) => {
      return `${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`.trim();
    }),
    recipeInstructions: recipe.instructions.map((instruction) => {
      return {
        "@type": "HowToStep",
        text: instruction,
      };
    }),
    prepTime: `PT${recipe.prepTime}M`,
    cookTime: `PT${recipe.cookTime}M`,
    totalTime: `PT${recipe.prepTime + recipe.cookTime}M`,
    recipeYield: `${recipe.servings} servings`,
  };
}
