"use client";

import { useId } from "react";
import { ChevronDown } from "lucide-react";
import {
  createEmptyIngredient,
  type IngredientRow,
  type RecipeFormSectionProps,
} from "@/app/types/recipeForm";
import { INGREDIENT_UNITS } from "@/app/lib/recipeForm";
import { useRowList } from "@/app/hooks/useRowList";
import {
  EditableRowList,
  ROW_INPUT_CLASSES,
  RowNumber,
} from "@/app/components/ui/EditableRowList";
import { RowActions } from "@/app/components/ui/RowActions";

// Number, amount, unit, ingredient and actions. The column header uses the
// same columns, so the labels line up with the fields from md.
const ROW_GRID =
  "md:grid md:grid-cols-[1.5rem_5.5rem_7rem_minmax(0,1fr)_7rem] md:items-center md:gap-3";

// Shown on every row on mobile, and only once above the rows from md
const LABEL_CLASSES = "text-sm text-truffle-500 md:sr-only";

export function RecipeFormIngredients({
  values,
  onChange,
}: RecipeFormSectionProps) {
  const id = useId();
  const { ingredients } = values;
  const { containerRef, add, update, move, remove } = useRowList<IngredientRow>(
    ingredients,
    (rows) => onChange({ ingredients: rows }),
    createEmptyIngredient
  );

  return (
    <EditableRowList
      title="Ingredients"
      description="Add each ingredient with an amount and a unit."
      addLabel="Add ingredient"
      onAdd={add}
      containerRef={containerRef}
    >
      <div
        aria-hidden="true"
        className={`hidden text-sm text-truffle-500 ${ROW_GRID}`}
      >
        <span className="col-start-2">Amount</span>
        <span>Unit</span>
        <span>Ingredient</span>
      </div>

      <ol role="list" className="flex flex-col gap-6 md:gap-3">
        {ingredients.map((ingredient, index) => {
          const number = index + 1;
          const rowLabel = `ingredient ${number}`;
          const fieldId = `${id}-${ingredient.id}`;
          // Keeps a unit from an existing recipe selectable when it isn't in the list
          const hasCustomUnit = !INGREDIENT_UNITS.includes(ingredient.unit);

          return (
            <li
              key={ingredient.id}
              data-row-id={ingredient.id}
              className={`flex flex-col gap-3 ${ROW_GRID}`}
            >
              <div className="flex items-center gap-2">
                <RowNumber number={number} />
                <span className="text-sm font-medium text-truffle-500 md:sr-only">
                  Ingredient {number}
                </span>
              </div>

              {/* Name first on mobile, last from md */}
              <div className="grid grid-cols-2 gap-3 md:contents">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor={`${fieldId}-quantity`}
                    className={LABEL_CLASSES}
                  >
                    Amount<span className="sr-only">, {rowLabel}</span>
                  </label>
                  <input
                    id={`${fieldId}-quantity`}
                    data-row-first-field
                    type="text"
                    inputMode="decimal"
                    placeholder="200"
                    value={ingredient.quantity}
                    onChange={(event) =>
                      update(ingredient.id, { quantity: event.target.value })
                    }
                    className={ROW_INPUT_CLASSES}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={`${fieldId}-unit`} className={LABEL_CLASSES}>
                    Unit<span className="sr-only">, {rowLabel}</span>
                  </label>
                  <div className="relative">
                    <select
                      id={`${fieldId}-unit`}
                      value={ingredient.unit}
                      onChange={(event) =>
                        update(ingredient.id, { unit: event.target.value })
                      }
                      className={`${ROW_INPUT_CLASSES} cursor-pointer appearance-none pr-9`}
                    >
                      {hasCustomUnit && (
                        <option value={ingredient.unit}>
                          {ingredient.unit || "No unit"}
                        </option>
                      )}
                      {INGREDIENT_UNITS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-truffle-500"
                    />
                  </div>
                </div>

                <div className="order-first col-span-2 flex flex-col gap-2 md:order-none md:col-span-1">
                  <label htmlFor={`${fieldId}-name`} className={LABEL_CLASSES}>
                    Ingredient<span className="sr-only"> {number}</span>
                  </label>
                  <input
                    id={`${fieldId}-name`}
                    type="text"
                    placeholder="E.g. Fresh mozzarella"
                    value={ingredient.name}
                    onChange={(event) =>
                      update(ingredient.id, { name: event.target.value })
                    }
                    className={ROW_INPUT_CLASSES}
                  />
                </div>
              </div>

              <RowActions
                rowLabel={rowLabel}
                canMoveUp={index > 0}
                canMoveDown={index < ingredients.length - 1}
                onMove={(direction) => move(index, direction)}
                onRemove={() => remove(index)}
              />
            </li>
          );
        })}
      </ol>
    </EditableRowList>
  );
}
