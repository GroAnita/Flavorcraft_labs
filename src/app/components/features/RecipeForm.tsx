"use client";

import { useState, type FormEvent } from "react";
import {
  createEmptyRecipeForm,
  type RecipeFormValues,
} from "@/app/types/recipeForm";
import { RecipeFormBasics } from "@/app/components/features/RecipeFormBasics";
import { RecipeFormQuickFacts } from "@/app/components/features/RecipeFormQuickFacts";
import { RecipeFormIngredients } from "@/app/components/features/RecipeFormIngredients";
import { RecipeFormSteps } from "@/app/components/features/RecipeFormSteps";
import { RecipeFormTags } from "@/app/components/features/RecipeFormTags";

type RecipeFormProps = {
  onCancel: () => void;
  // "Publish recipe" when creating, "Save changes" when editing
  submitLabel?: string;
};

// Holds the form values and passes them to each section,
// so the sections can be built independently
export function RecipeForm({
  onCancel,
  submitLabel = "Publish recipe",
}: RecipeFormProps) {
  const [values, setValues] = useState<RecipeFormValues>(createEmptyRecipeForm);

  function updateValues(changes: Partial<RecipeFormValues>) {
    setValues((previous) => ({ ...previous, ...changes }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Validation and sending are added in the "Validation and submission" issue
  }

  const sectionProps = { values, onChange: updateValues };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">
      <RecipeFormBasics {...sectionProps} />
      <RecipeFormQuickFacts {...sectionProps} />
      <RecipeFormIngredients {...sectionProps} />
      <RecipeFormSteps {...sectionProps} />
      <RecipeFormTags {...sectionProps} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-oat-800">
          <span aria-hidden="true" className="mr-0.5 text-error-text">
            *
          </span>
          Some fields are required. Fill them in to send the form.
        </p>

        <div className="flex items-center gap-3 self-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 cursor-pointer items-center rounded-lg px-4 text-sm font-semibold text-truffle-500 transition-colors hover:bg-oat-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex h-10 cursor-pointer items-center rounded-lg bg-primary px-4 text-sm font-semibold text-salt-500 transition-colors hover:bg-basil-700"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
