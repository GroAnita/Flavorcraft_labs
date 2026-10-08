"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSetSearchParam } from "@/app/hooks/useSetSearchParam";

const DEBOUNCE_MS = 300;

export default function SearchInput({
  placeholder = "Search recipes...",
}: {
  placeholder?: string;
}) {
  const urlSearch = useSearchParams().get("search") ?? "";
  const setParam = useSetSearchParam();
  const [value, setValue] = useState(urlSearch);

  useEffect(() => {
    const trimmedValue = value.trim();
    if (trimmedValue === urlSearch) return;
    const id = setTimeout(() => setParam("search", trimmedValue), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [value, urlSearch, setParam]);

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()} className="w-full">
      <label htmlFor="recipe-search" className="sr-only">
        Search recipes
      </label>
      <input
        id="recipe-search"
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search input"
          className="absolute border-gray-400"
        >
          ✕
        </button>
      )}
    </form>
  );
}
