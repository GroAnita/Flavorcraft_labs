"use client";

import { useId } from "react";
import { PantryItemRow } from "@/app/components/features/PantryItemRow";
import type { PantryItems } from "@/app/types/recipe";

type PantryCategorySectionProps = {
  category: string;
  items: PantryItems[];
  now: number;
  onUpdated: (item: PantryItems) => void;
  onDeleted: (id: string) => void;
};

export function PantryCategorySection({
  category,
  items,
  now,
  onUpdated,
  onDeleted,
}: PantryCategorySectionProps) {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-col gap-4 rounded-lg bg-salt-50 py-6"
    >
      <div className="flex items-center justify-between gap-4 px-6">
        <h2 id={headingId} className="text-2xl leading-none font-medium text-nori-500">
          {category}
        </h2>
        <p className="text-sm leading-none font-medium text-basil-500">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      <ul className="flex flex-col">
        {items.map((item) => (
          <PantryItemRow
            key={item.id}
            item={item}
            now={now}
            onUpdated={onUpdated}
            onDeleted={onDeleted}
          />
        ))}
      </ul>
    </section>
  );
}
