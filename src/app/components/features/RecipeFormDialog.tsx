"use client";

import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import { X } from "lucide-react";
import { RecipeForm } from "@/app/components/features/RecipeForm";

type RecipeFormDialogProps = {
  open: boolean;
  onClose: () => void;
  // "New recipe" when creating, "Edit recipe" when editing
  title: string;
};

// showModal() makes the rest of the page inert, closes on Escape,
// and returns focus to the button that opened it when it closes
export function RecipeFormDialog({
  open,
  onClose,
  title,
}: RecipeFormDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingId = useId();

  // Opens and closes the native dialog when the open prop changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The page behind doesn't scroll while the dialog is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Stops Escape from also closing menus the button sits in, like the mobile menu.
  // The dialog still closes, since the browser handles Escape itself
  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "Escape") event.stopPropagation();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={headingId}
      // Fires when the dialog closes, also with Escape
      onClose={onClose}
      onKeyDown={handleKeyDown}
      // 800px on desktop, and 24px from the edges on mobile, as in Figma.
      // Scrolls inside when it is taller than the screen
      className="m-auto max-h-[calc(100dvh-3rem)] w-[calc(100%-3rem)] max-w-200 overflow-y-auto rounded-lg bg-salt-50 p-0 text-truffle-500 backdrop:bg-nori-500/40"
    >
      {/* Only rendered while open, so the form starts empty every time */}
      {open && (
        <div className="flex flex-col gap-6 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2
              id={headingId}
              className="text-2xl font-medium leading-none text-truffle-500"
            >
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full text-truffle-500 transition-colors hover:bg-oat-200"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <RecipeForm onCancel={onClose} />
        </div>
      )}
    </dialog>
  );
}
