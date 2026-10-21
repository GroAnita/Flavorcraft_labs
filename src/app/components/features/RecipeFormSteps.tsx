"use client";

import { useId } from "react";
import type { StepFormRow } from "@/app/types/recipe";
import { createStepRow } from "@/app/lib/recipeForm";
import { useRowList } from "@/app/hooks/useRowList";
import {
  EditableRowList,
  ROW_INPUT_CLASSES,
  RowNumber,
} from "@/app/components/ui/EditableRowList";
import { RowActions } from "@/app/components/ui/RowActions";

type RecipeFormStepsProps = {
  steps: StepFormRow[];
  onChange: (steps: StepFormRow[]) => void;
};

// Placeholders for the first steps, then a general one
const PLACEHOLDERS = [
  "E.g. Preheat the oven to 250°C.",
  "E.g. Roll out the dough on a floured surface.",
];

export function RecipeFormSteps({ steps, onChange }: RecipeFormStepsProps) {
  const id = useId();
  const { containerRef, add, update, move, remove } = useRowList(
    steps,
    onChange,
    createStepRow
  );

  return (
    <EditableRowList
      title="Steps"
      description="One action per step. Start with a verb, like “Preheat the oven to 250 °C”."
      addLabel="Add step"
      onAdd={add}
      containerRef={containerRef}
    >
      <ol role="list" className="flex flex-col gap-6 md:gap-3">
        {steps.map((step, index) => {
          const number = index + 1;
          const fieldId = `${id}-${step.id}`;

          return (
            <li
              key={step.id}
              data-row-id={step.id}
              // Number and actions above the text on mobile, beside it from md
              className="grid grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1.5rem_minmax(0,1fr)_7rem] md:items-start"
            >
              <div className="flex items-center gap-2 md:pt-2">
                <RowNumber number={number} />
                <label
                  htmlFor={fieldId}
                  className="text-sm font-medium text-truffle-500 md:sr-only"
                >
                  Step {number}
                </label>
              </div>

              <textarea
                id={fieldId}
                data-row-first-field
                rows={3}
                placeholder={PLACEHOLDERS[index] ?? "E.g. Bake for 10 minutes."}
                value={step.text}
                onChange={(event) =>
                  update(step.id, { text: event.target.value })
                }
                className={`${ROW_INPUT_CLASSES} col-span-2 row-start-2 resize-y md:col-span-1 md:row-start-auto`}
              />

              <div className="col-start-2 row-start-1 md:col-start-auto md:row-start-auto">
                <RowActions
                  rowLabel={`step ${number}`}
                  canMoveUp={index > 0}
                  canMoveDown={index < steps.length - 1}
                  onMove={(direction) => move(index, direction)}
                  onRemove={() => remove(index)}
                />
              </div>
            </li>
          );
        })}
      </ol>
    </EditableRowList>
  );
}
