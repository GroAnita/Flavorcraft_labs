"use client";

import { useId } from "react";
import { Check } from "lucide-react";

type FilterOptionProps = {
  label: string;
  value: string;
  count: number;
  checked: boolean;
  onChange: (value: string, checked: boolean) => void;
};

export function FilterOption({
  label,
  value,
  count,
  checked,
  onChange,
}: FilterOptionProps) {
  const id = useId();

  return (
    <div className="flex w-full items-center justify-between gap-2 text-sm leading-none">
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-2 ${
          checked ? "text-basil-500" : "text-nori-500"
        }`}
      >
        <span className="relative flex size-4.5 shrink-0">
          <input
            id={id}
            type="checkbox"
            value={value}
            checked={checked}
            onChange={(e) => onChange(value, e.target.checked)}
            className="peer size-4.5 cursor-pointer appearance-none rounded-sm border border-thyme-300 bg-salt-50 checked:border-sprout-500 checked:bg-sprout-500"
          />
          <Check
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 m-auto hidden size-3.5 text-salt-50 peer-checked:block"
          />
        </span>
        {label}
        {/* The visible count is hidden from screen readers, so read it here */}
        <span className="sr-only">, {count} recipes</span>
      </label>

      <span
        aria-hidden="true"
        className={`tabular-nums ${
          checked ? "font-medium text-basil-500" : "text-thyme-300"
        }`}
      >
        {count}
      </span>
    </div>
  );
}
