"use client";

import { useState } from "react";
import type { Ingredient } from "@/app/types/recipe";
import { IngredientsList } from "@/app/components/features/IngredientsList";
import { ServingsControl } from "@/app/components/ui/ServingsControl";

type RecipeIngredientsProps = {
  ingredients: Ingredient[];
  // The servings the quantities in the recipe are written for
  servings: number;
};

export function RecipeIngredients({
  ingredients,
  servings: originalServings,
}: RecipeIngredientsProps) {
  // Starts at the recipe's servings, and starts over when another recipe is opened
  // because the page gives the parent component key={recipe.id}
  const [servings, setServings] = useState(
    originalServings > 0 ? originalServings : 1
  );

  return (
    <section
      aria-labelledby="ingredients-heading"
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 id="ingredients-heading" className="text-3xl text-truffle-500">
          Ingredients
        </h2>
        <ServingsControl servings={servings} onChange={setServings} />
      </div>

      <IngredientsList
        ingredients={ingredients}
        originalServings={originalServings}
        servings={servings}
      />
    </section>
  );
}
