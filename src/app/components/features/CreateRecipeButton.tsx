"use client";

import { useState, type ReactNode } from "react";
import { RecipeFormDialog } from "@/app/components/features/RecipeFormDialog";

type CreateRecipeButtonProps = {
  children: ReactNode;
  className?: string;
  // Needed when the button only shows an icon
  ariaLabel?: string;
};

// Opens the create recipe modal. Used in the header, the mobile menu,
// and the profile page when the user has no recipes yet
export function CreateRecipeButton({
  children,
  className = "",
  ariaLabel,
}: CreateRecipeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={ariaLabel}
        onClick={() => setIsOpen(true)}
        className={`cursor-pointer ${className}`}
      >
        {children}
      </button>

      <RecipeFormDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="New recipe"
      />
    </>
  );
}
