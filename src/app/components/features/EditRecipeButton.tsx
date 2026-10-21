"use client";

import { useState } from "react";
import { SquarePen } from "lucide-react";
import { RecipeFormDialog } from "@/app/components/features/RecipeFormDialog";
import type { RecipeFormValues } from "@/app/types/recipeForm";

type EditRecipeButtonProps = {
  recipeId: string;
  // The recipe's current values, made on the server with toRecipeFormValues
  initialValues: RecipeFormValues;
};

// Opens the recipe form with the recipe's values.
// Only shown to the owner, in the ownerActions slot of RecipeOverview
export function EditRecipeButton({
  recipeId,
  initialValues,
}: EditRecipeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className="inline-flex min-h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-basil-500 px-4 py-1 text-sm font-semibold leading-6 text-basil-500 transition-all duration-200 hover:bg-mint-200 hover:shadow-[0_0_12px_0_#00000040] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basil-500 motion-reduce:transition-none"
      >
        Edit
        <SquarePen aria-hidden="true" className="size-[18px]" />
      </button>

      <RecipeFormDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit recipe"
        edit={{ recipeId, initialValues }}
      />
    </>
  );
}
