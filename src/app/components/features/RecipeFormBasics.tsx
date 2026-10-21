import type { RecipeFormSectionProps } from "@/app/types/recipeForm";
import { RecipeFormSection } from "@/app/components/features/RecipeFormSection";

// PLACEHOLDER: the fields are added in the "Basics and quick facts" issue.
// Remove the eslint comment when the props are used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RecipeFormBasics(props: RecipeFormSectionProps) {
  return (
    <RecipeFormSection title="Basics">
      <p className="text-sm text-oat-800">Title, description and image.</p>
    </RecipeFormSection>
  );
}
