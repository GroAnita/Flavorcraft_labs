"use client";

import { useId, useState } from "react";
import { ChevronUp } from "lucide-react";
import { FilterOption } from "@/app/components/ui/FilterOption";

export type FilterOptionData = {
  label: string;
  value: string;
  count: number;
};

type FilterGroupProps = {
  title: string;
  options: FilterOptionData[];
  // Selected values live in the parent, so they are kept when the group collapses
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
  defaultOpen?: boolean;
};

export function FilterGroup({
  title,
  options,
  selectedValues,
  onChange,
  defaultOpen = false,
}: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();
  const selectedCount = options.filter((option) =>
    selectedValues.includes(option.value),
  ).length;

  return (
    <section className="flex w-full flex-col gap-4 rounded-lg bg-salt-50 p-6">
      <h3 className="font-inter">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-2 text-left text-base leading-none font-medium text-nori-500"
        >
          {title}
          {selectedCount > 0 && (
            <span className="sr-only">, {selectedCount} selected</span>
          )}

          <span className="flex shrink-0 items-center gap-2">
            {selectedCount > 0 && (
              <span
                aria-hidden="true"
                className="flex size-5.5 items-center justify-center rounded-full bg-butter-500 text-xs font-medium text-olive-500"
              >
                {selectedCount}
              </span>
            )}
            <ChevronUp
              aria-hidden="true"
              strokeWidth={2.25}
              className={`size-4 text-sprout-600 transition-transform ${
                isOpen ? "" : "rotate-180"
              }`}
            />
          </span>
        </button>
      </h3>

      {isOpen && (
        <div
          id={panelId}
          role="group"
          aria-label={title}
          className="flex flex-col gap-2.5"
        >
          {options.map((option) => (
            <FilterOption
              key={option.value}
              label={option.label}
              value={option.value}
              count={option.count}
              checked={selectedValues.includes(option.value)}
              onChange={onChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}
