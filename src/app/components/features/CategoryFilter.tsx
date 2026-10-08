"use client";

import { useSearchParams } from "next/navigation";
import { useSetSearchParam } from "@/app/hooks/useSetSearchParam";

type Props = { categories: readonly string[] };

export default function CategoryFilter({ categories }: Props) {
  const active = useSearchParams().get("category") ?? "";
  const setParam = useSetSearchParam();

  const chip = (selected: boolean) =>
    `rounded-full border px-3 py-1 text-sm focus-visible:outline-2 focus-visible:outline-blue-700 ${
      selected ? "bg-black text-white" : "bg-white"
    }`;

  return (
    <div
      role="group"
      aria-label="Filter by category"
      className="flex flex-wrap gap-2"
    >
      <button
        type="button"
        aria-pressed={active === ""}
        onClick={() => setParam("category")}
        className={chip(active === "")}
      >
        All categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          aria-pressed={active === category}
          onClick={() => setParam("category", category)}
          className={chip(active === category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
