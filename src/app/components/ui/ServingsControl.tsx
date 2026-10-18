"use client";

import { Minus, Plus } from "lucide-react";

type ServingsControlProps = {
  servings: number;
  onChange: (servings: number) => void;
};

const MIN_SERVINGS = 1;

const BUTTON_CLASSES =
  "flex size-8 cursor-pointer items-center justify-center rounded-sm bg-olive-500 text-salt-50 hover:bg-olive-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-60 aria-disabled:hover:bg-olive-500";

export function ServingsControl({ servings, onChange }: ServingsControlProps) {
  const canDecrease = servings > MIN_SERVINGS;

  return (
    <div
      role="group"
      aria-label="Servings"
      className="inline-flex items-center gap-4"
    >
      <button
        type="button"
        aria-label="Decrease servings"
        // aria-disabled instead of disabled so keyboard focus stays on the button at 1
        aria-disabled={!canDecrease}
        onClick={() => {
          if (canDecrease) onChange(servings - 1);
        }}
        className={BUTTON_CLASSES}
      >
        <Minus aria-hidden="true" className="size-4" />
      </button>

      <span
        aria-live="polite"
        aria-atomic="true"
        className="flex h-8 min-w-8 items-center justify-center rounded-sm bg-salt-50 px-2 text-sm text-truffle-500"
      >
        {servings}
        <span className="sr-only"> servings</span>
      </span>

      <button
        type="button"
        aria-label="Increase servings"
        onClick={() => onChange(servings + 1)}
        className={BUTTON_CLASSES}
      >
        <Plus aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
