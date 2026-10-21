import type { RecipeFormSectionProps } from "@/app/types/recipeForm";
import { RecipeFormSection } from "@/app/components/features/RecipeFormSection";

// PLACEHOLDER: the rows are added in the "Ingredients and steps" issue.
// Remove the eslint comment when the props are used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RecipeFormSteps(props: RecipeFormSectionProps) {
  return (
    <RecipeFormSection
      title="Steps"
      description="One action per step. Start with a verb, like “Preheat the oven to 250 °C”."
      required
    >
      <p className="text-sm text-oat-800">Step rows.</p>
    </RecipeFormSection>
  );
}
