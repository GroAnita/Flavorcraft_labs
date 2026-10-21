import type { RecipeFormSectionProps } from "@/app/types/recipeForm";
import { RecipeFormSection } from "@/app/components/features/RecipeFormSection";

// PLACEHOLDER: the rows are added in the "Ingredients and steps" issue.
// Remove the eslint comment when the props are used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RecipeFormIngredients(props: RecipeFormSectionProps) {
  return (
    <RecipeFormSection
      title="Ingredients"
      description="Add each ingredient with an amount and a unit."
      required
    >
      <p className="text-sm text-oat-800">Ingredient rows.</p>
    </RecipeFormSection>
  );
}
