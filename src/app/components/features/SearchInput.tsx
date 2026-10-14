"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useSetSearchParam } from "@/app/hooks/useSetSearchParam";

const DEBOUNCE_MS = 300;

type Props = {
  placeholder?: string;
  // Page that shows the search results. On that page the URL updates while
  // typing; anywhere else, submitting the search navigates there.
  resultsPath?: string;
};

export default function SearchInput({
  placeholder = "Search recipes...",
  resultsPath = "/",
}: Props) {
  const urlSearch = useSearchParams().get("search") ?? "";
  const pathname = usePathname();
  const { push } = useRouter();
  const setParam = useSetSearchParam();
  const [value, setValue] = useState(urlSearch);
  const [prevUrlSearch, setPrevUrlSearch] = useState(urlSearch);
  const isResultsPage = pathname === resultsPath;

  // Keep the input in sync when the URL changes from outside (e.g. back
  // button or clicking the logo), without overwriting what is being typed.
  if (urlSearch !== prevUrlSearch) {
    setPrevUrlSearch(urlSearch);
    if (urlSearch !== value.trim()) setValue(urlSearch);
  }

  useEffect(() => {
    if (!isResultsPage) return;
    const trimmedValue = value.trim();
    if (trimmedValue === urlSearch) return;
    const id = setTimeout(() => setParam("search", trimmedValue), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [value, urlSearch, setParam, isResultsPage]);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmedValue = value.trim();
    if (isResultsPage) {
      if (trimmedValue !== urlSearch) setParam("search", trimmedValue);
      return;
    }
    const query = trimmedValue
      ? `?${new URLSearchParams({ search: trimmedValue })}`
      : "";
    push(`${resultsPath}${query}`);
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="relative w-full">
      <label htmlFor="recipe-search" className="sr-only">
        Search recipes
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground"
      />
      <input
        id="recipe-search"
        type="search"
        enterKeyHint="search"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`h-11 w-full rounded-lg bg-surface pl-10 placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none ${
          value ? "pr-10" : "pr-3"
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search input"
          className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      )}
    </form>
  );
}
