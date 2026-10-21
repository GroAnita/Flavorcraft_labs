import type { RecipeFormSectionProps } from "@/app/types/recipeForm";
import { RecipeFormSection } from "@/app/components/features/RecipeFormSection";

// PLACEHOLDER: the fields are added in the "Basics and quick facts" issue.
// Remove the eslint comment when the props are used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RecipeFormQuickFacts(props: RecipeFormSectionProps) {
  return (
    <RecipeFormSection title="Quick facts">
      <p className="text-sm text-oat-800">
        Times, servings, category and difficulty.
      </p>
    </RecipeFormSection>
  );
}
