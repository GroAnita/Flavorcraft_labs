"use client";

import { useState, type ReactNode } from "react";
import { Check } from "lucide-react";

type InstructionsListProps = {
  recipeId: string;
  steps: string[];
  // Shown next to the heading, e.g. the keep-screen-on toggle
  headerAction?: ReactNode;
};

export function InstructionsList({
  recipeId,
  steps,
  headerAction,
}: InstructionsListProps) {
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [prevRecipeId, setPrevRecipeId] = useState(recipeId);

  // Start with every step unchecked when another recipe is opened
  if (recipeId !== prevRecipeId) {
    setPrevRecipeId(recipeId);
    setCompleted(new Set());
  }

  function toggleStep(index: number) {
    // Copy the set so the steps prop is never changed
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section
      aria-labelledby="instructions-heading"
      className="flex flex-col gap-4"
    >
      {/* Under each other on mobile, side by side from md */}
      <div className="flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6">
        <h2 id="instructions-heading" className="text-3xl text-truffle-500">
          Instructions <span className="text-thyme-400">({steps.length})</span>
        </h2>
        {headerAction}
      </div>

      {steps.length === 0 ? (
        <p className="rounded-lg bg-surface p-4 text-muted-foreground">
          This recipe has no instructions yet.
        </p>
      ) : (
        <ol role="list" className="flex flex-col gap-2">
          {steps.map((step, index) => {
            const isDone = completed.has(index);

            return (
              <li key={index}>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-surface p-3 md:p-4">
                  <span className="relative flex shrink-0">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={() => toggleStep(index)}
                      className="peer size-5 cursor-pointer appearance-none rounded-full border-2 border-thyme-300 bg-surface checked:border-sprout-500 checked:bg-sprout-500"
                    />
                    <Check
                      aria-hidden="true"
                      strokeWidth={3}
                      className="pointer-events-none absolute inset-0 m-auto hidden size-3 text-white peer-checked:block"
                    />
                  </span>

                  <span
                    aria-hidden="true"
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${
                      isDone ? "bg-sprout-500" : "bg-primary"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <span
                    className={`text-sm md:text-base ${
                      isDone ? "text-sprout-500 line-through" : ""
                    }`}
                  >
                    <span className="sr-only">Step {index + 1}: </span>
                    {step}
                  </span>
                </label>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
