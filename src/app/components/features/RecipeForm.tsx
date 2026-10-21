"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CircleAlert } from "lucide-react";
import {
  createEmptyRecipeForm,
  type RecipeFormErrors,
  type RecipeFormValues,
  type SubmitRecipeResult,
} from "@/app/types/recipeForm";
import { hasErrors, validateRecipeForm } from "@/app/lib/recipeFormValidation";
import { RecipeFormBasics } from "@/app/components/features/RecipeFormBasics";
import { RecipeFormQuickFacts } from "@/app/components/features/RecipeFormQuickFacts";
import { RecipeFormIngredients } from "@/app/components/features/RecipeFormIngredients";
import { RecipeFormSteps } from "@/app/components/features/RecipeFormSteps";
import { RecipeFormTags } from "@/app/components/features/RecipeFormTags";

type RecipeFormProps = {
  onCancel: () => void;
  // Sends the values, e.g. createRecipe now and updateRecipe in the edit issue
  onSubmit: (values: RecipeFormValues) => Promise<SubmitRecipeResult>;
  // Gets the recipe id after a successful submit
  onSuccess: (id: string) => void;
  // Filled in when editing. Empty when creating
  initialValues?: RecipeFormValues;
  // "Publish recipe" when creating, "Save changes" when editing
  submitLabel?: string;
  pendingLabel?: string;
};

// Holds the form values and passes them to each section,
// so the sections can be built independently
export function RecipeForm({
  onCancel,
  onSubmit,
  onSuccess,
  initialValues,
  submitLabel = "Publish recipe",
  pendingLabel = "Publishing…",
}: RecipeFormProps) {
  const [values, setValues] = useState<RecipeFormValues>(
    () => initialValues ?? createEmptyRecipeForm()
  );
  const [errors, setErrors] = useState<RecipeFormErrors>({});
  const [formError, setFormError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // A ref changes at once, so a fast double click can't send twice
  const submittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const formErrorRef = useRef<HTMLParagraphElement>(null);

  function updateValues(changes: Partial<RecipeFormValues>) {
    setValues((previous) => ({ ...previous, ...changes }));

    // The error for a field disappears when the user changes it
    setErrors((previous) => {
      const next: Record<string, unknown> = { ...previous };
      for (const key of Object.keys(changes)) {
        delete next[key];
        if (key === "ingredients") delete next.ingredientRows;
      }
      return next as RecipeFormErrors;
    });
  }

  // Waits for the error messages to render, then focuses the first field with an error,
  // or a list error like "Add at least one ingredient"
  function focusFirstError() {
    requestAnimationFrame(() => {
      const first = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"], [data-form-error]'
      );
      (first ?? formErrorRef.current)?.focus();
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    setFormError("");
    setNeedsLogin(false);

    const found = validateRecipeForm(values);
    setErrors(found);
    if (hasErrors(found)) {
      setFormError("Some fields need to be fixed before you can publish.");
      focusFirstError();
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);

    try {
      const result = await onSubmit(values);

      if (result.ok) {
        // Stays "submitting" while the modal closes and the next page opens
        onSuccess(result.id);
        return;
      }

      // The values are kept, so the user can fix the problem and try again
      setErrors(result.fieldErrors ?? {});
      setFormError(
        result.error ?? "Couldn't save the recipe. Please try again."
      );
      setNeedsLogin(Boolean(result.needsLogin));
      focusFirstError();
    } catch {
      setFormError(
        "Something went wrong. Check your connection and try again."
      );
      focusFirstError();
    }

    submittingRef.current = false;
    setIsSubmitting(false);
  }

  const sectionProps = { values, onChange: updateValues, errors };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
      className="flex flex-col gap-7"
    >
      <RecipeFormBasics {...sectionProps} />
      <RecipeFormQuickFacts {...sectionProps} />
      <RecipeFormIngredients {...sectionProps} />
      <RecipeFormSteps {...sectionProps} />
      <RecipeFormTags {...sectionProps} />

      <div className="flex flex-col gap-4">
        {/* Always rendered so screen readers pick up changes */}
        <p
          ref={formErrorRef}
          role="alert"
          tabIndex={-1}
          className="flex flex-wrap items-center gap-1.5 rounded-lg bg-error-bg px-3 py-2 text-sm font-medium text-error-text empty:hidden"
        >
          {formError && (
            <>
              <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
              {formError}
              {needsLogin && (
                // A new tab keeps the form and its values open here.
                // After logging in, the user can come back and publish again
                <Link
                  href="/login"
                  target="_blank"
                  rel="noopener"
                  className="font-semibold underline underline-offset-2"
                >
                  Log in again (opens in a new tab)
                </Link>
              )}
            </>
          )}
        </p>

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
              onClick={() => {
                if (!submittingRef.current) onCancel();
              }}
              aria-disabled={isSubmitting || undefined}
              className="inline-flex h-10 cursor-pointer items-center rounded-lg px-4 text-sm font-semibold text-truffle-500 transition-colors hover:bg-oat-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              // aria-disabled instead of disabled keeps keyboard focus on the button
              aria-disabled={isSubmitting || undefined}
              className="inline-flex h-10 cursor-pointer items-center rounded-lg bg-primary px-4 text-sm font-semibold text-salt-500 transition-colors hover:bg-basil-700 aria-disabled:cursor-wait aria-disabled:opacity-60"
            >
              {isSubmitting ? pendingLabel : submitLabel}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
