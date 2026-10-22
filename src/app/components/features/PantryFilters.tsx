"use client";

import { Dropdown } from "@/app/components/ui/Dropdown";

export const ALL_CATEGORIES = "all";

// Only one sort option is agreed on so far
const SORT_OPTIONS = [{ value: "updated", label: "Recently updated" }] as const;

type PantryFiltersProps = {
  categories: { category: string; count: number }[];
  totalCount: number;
  selected: string;
  onSelect: (category: string) => void;
};

function Chip({
  label,
  count,
  isSelected,
  onClick,
}: {
  label: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={isSelected}
        onClick={onClick}
        className={`inline-flex h-6.75 items-center gap-2 rounded-full border px-3 py-1 font-aptly text-base leading-none tracking-[0.02em] ${
          isSelected
            ? "border-basil-500 bg-basil-500 text-mint-500"
            : "border-nori-500 text-nori-500 hover:bg-mint-500"
        }`}
      >
        {label}
        <span className="text-xs">{count}</span>
      </button>
    </li>
  );
}

export function PantryFilters({
  categories,
  totalCount,
  selected,
  onSelect,
}: PantryFiltersProps) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-4">
      <ul aria-label="Filter by category" className="flex flex-wrap gap-2">
        <Chip
          label="All"
          count={totalCount}
          isSelected={selected === ALL_CATEGORIES}
          onClick={() => onSelect(ALL_CATEGORIES)}
        />
        {categories.map(({ category, count }) => (
          <Chip
            key={category}
            label={category}
            count={count}
            isSelected={selected === category}
            onClick={() => onSelect(category)}
          />
        ))}
      </ul>

      <Dropdown
        options={SORT_OPTIONS}
        value="updated"
        onChange={() => {}}
        ariaLabel="Sort pantry"
        className="h-9.25 w-50 shrink-0"
        buttonClassName="border border-thyme-500 bg-salt-50 px-3.25 py-2 font-medium text-thyme-500 focus-visible:border-basil-500"
      />
    </div>
  );
}
