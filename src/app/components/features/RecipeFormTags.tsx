import type { RecipeFormSectionProps } from "@/app/types/recipeForm";
import { RecipeFormSection } from "@/app/components/features/RecipeFormSection";

// PLACEHOLDER: the tags are added in the "Tags" issue.
// Remove the eslint comment when the props are used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RecipeFormTags(props: RecipeFormSectionProps) {
  return (
    <RecipeFormSection
      title="Tags"
      description="Tags help people find your recipe with the filters."
    >
      <p className="text-sm text-oat-800">Suggested and custom tags.</p>
    </RecipeFormSection>
  );
}
