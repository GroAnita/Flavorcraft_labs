import type { Ingredient } from "@/app/types/recipe";
import { formatQuantity } from "@/app/lib/ingredients";

type IngredientsListProps = {
  ingredients: Ingredient[];
  originalServings: number;
  servings: number;
};

export function IngredientsList({
  ingredients,
  originalServings,
  servings,
}: IngredientsListProps) {
  if (ingredients.length === 0) {
    return (
      <p className="rounded-lg bg-surface p-4 text-muted-foreground">
        This recipe has no ingredients yet.
      </p>
    );
  }

  return (
    <ul role="list" className="flex flex-col gap-2">
      {ingredients.map((ingredient, index) => {
        const amount = [
          formatQuantity(ingredient.quantity, originalServings, servings),
          ingredient.unit?.trim(),
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <li
            key={`${ingredient.name}-${index}`}
            className="flex items-baseline gap-3 rounded-lg bg-surface p-3 text-base md:p-4"
          >
            {amount && (
              <span className="shrink-0 font-semibold text-truffle-500">
                {amount}
              </span>
            )}
            <span className="wrap-anywhere font-normal text-muted-foreground">
              {ingredient.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
