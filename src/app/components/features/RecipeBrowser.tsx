"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { RecipeCard } from "@/app/components/features/RecipeCard";
import { RecipeFilterSidebar } from "@/app/components/features/RecipeFilterSidebar";
import { useRecipeFilters } from "@/app/hooks/useRecipeFilters";
import {
  SORT_OPTIONS,
  filterRecipes,
  getFilterLabel,
  searchRecipes,
  sortRecipes,
  type SortValue,
} from "@/app/lib/recipeFilters";
import type { Recipe } from "@/app/types/recipe";
import { trackClarityEvent } from "@/app/components/analytics/trackClarityEvent";

type RecipeBrowserProps = {
  recipes: Recipe[];
  isLoggedIn: boolean;
};

// Shortcuts shown in the Suggestion row, using the same values as the sidebar
const SUGGESTIONS = [
  "tag:quick",
  "difficulty:easy",
  "category:lunch",
  "category:dinner",
  "category:dessert",
  "tag:cake",
];

type SortSelectProps = {
  value: SortValue;
  onChange: (value: SortValue) => void;
  className?: string;
};

const FOCUS_RING =
  "focus-visible:border-basil-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-basil-500";

// Custom dropdown styled like the rest of the design. Follows the ARIA
// listbox pattern: arrow keys move, Enter/Space selects, Escape closes.
function SortSelect({ value, onChange, className = "" }: SortSelectProps) {
  const id = useId();
  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-option-${index}`;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selectedIndex = SORT_OPTIONS.findIndex(
    (option) => option.value === value,
  );
  const selectedLabel = SORT_OPTIONS[selectedIndex]?.label;

  // Move focus into the list when it opens
  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  function open() {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  function select(index: number) {
    onChange(SORT_OPTIONS[index].value);
    close();
  }

  function handleButtonKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      open();
    }
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    const last = SORT_OPTIONS.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        select(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={`Sort recipes: ${selectedLabel}`}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleButtonKeyDown}
        className={`flex h-full w-full items-center justify-between gap-2 rounded-lg border border-thyme-500 bg-salt-50 px-3.25 py-2 text-sm leading-5 font-medium text-thyme-500 ${FOCUS_RING}`}
      >
        {selectedLabel}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-label="Sort recipes"
          aria-activedescendant={optionId(activeIndex)}
          onKeyDown={handleListKeyDown}
          className="absolute top-full right-0 left-0 z-20 mt-1 flex flex-col gap-0.5 rounded-lg border border-oat-500 bg-salt-50 p-1 shadow-md focus-visible:outline-none"
        >
          {SORT_OPTIONS.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                onClick={() => select(index)}
                onMouseMove={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm leading-5 ${
                  isSelected ? "font-medium text-basil-500" : "text-nori-500"
                } ${isActive ? "bg-mint-500" : ""}`}
              >
                {option.label}
                {isSelected && (
                  <Check aria-hidden="true" className="size-4 shrink-0" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function RecipeBrowser({ recipes, isLoggedIn }: RecipeBrowserProps) {
  // Shared state for every group, so equivalent options stay in sync
  const { selected, search, sort, toggle, clearAll, setSort } =
    useRecipeFilters();
  // Search and filters combine: a recipe must match both
  const results = sortRecipes(
    filterRecipes(searchRecipes(recipes, search), selected),
    sort,
  );
  // Native <dialog> traps focus, closes on Escape and hides the page behind it
  const dialogRef = useRef<HTMLDialogElement>(null);

  const sidebar = (
    <RecipeFilterSidebar
      recipes={recipes}
      selected={selected}
      onChange={toggle}
      isLoggedIn={isLoggedIn}
    />
  );

  return (
    <div className="flex flex-col gap-10 md:gap-14">
      <div className="flex flex-col">
        {/* Active filters, and the sort menu on desktop */}
        <div
          className={`mb-4 items-center gap-4 md:mb-6 ${
            selected.length > 0 ? "flex" : "hidden md:flex"
          }`}
        >
          {selected.length > 0 && (
            <ul aria-label="Active filters" className="flex flex-wrap gap-4">
              {selected.map((value) => {
                const label = getFilterLabel(value) ?? value;
                return (
                  <li key={value}>
                    <button
                      type="button"
                      onClick={() => toggle(value, false)}
                      aria-label={`Remove filter: ${label}`}
                      className="inline-flex h-7 items-center gap-1 rounded-lg border border-mint-600 bg-mint-500 py-1 pr-2 pl-3 font-aptly text-sm leading-5 font-medium text-basil-500 hover:bg-mint-600"
                    >
                      {label}
                      <X
                        aria-hidden="true"
                        strokeWidth={2.25}
                        className="size-4"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <SortSelect
            value={sort}
            onChange={setSort}
            className="hidden w-50 shrink-0 md:ml-auto md:block"
          />
        </div>

        {/* Mobile: filter button and sort menu share a row */}
        <div className="mb-6 flex gap-2 md:hidden">
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-thyme-500 bg-salt-50 px-3.25 py-2.5 text-sm leading-none font-medium text-thyme-500"
          >
            <SlidersHorizontal aria-hidden="true" className="size-4.5" />
            Filter{selected.length > 0 && ` (${selected.length})`}
          </button>
          <SortSelect value={sort} onChange={setSort} className="flex-1" />
        </div>

        <div className="flex flex-col gap-4 text-sm leading-none md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-4">
            <span className="text-nori-200">Suggestion:</span>
            {/* role="list" keeps the list semantics that display: contents can remove */}
            <ul role="list" aria-label="Suggested filters" className="contents">
              {SUGGESTIONS.map((value) => {
                const isActive = selected.includes(value);
                return (
                  <li key={value}>
                    <button
                      type="button"
                      onClick={() => toggle(value, !isActive)}
                      aria-pressed={isActive}
                      className={`font-medium text-basil-500 hover:underline ${
                        isActive ? "underline underline-offset-4" : ""
                      }`}
                    >
                      {getFilterLabel(value)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <p role="status" className="text-nori-200">
            <span className="font-semibold text-nori-500">
              {results.length}
            </span>{" "}
            {results.length === 1 ? "result" : "results"}
            {search && <> for &ldquo;{search}&rdquo;</>}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Desktop: sidebar next to the results */}
        <aside
          aria-label="Filters"
          className="hidden md:block md:w-80.5 md:shrink-0"
        >
          {sidebar}
        </aside>

        {/* Mobile: the filters open as a full-screen overlay */}
        <dialog
          ref={dialogRef}
          aria-labelledby="mobile-filters-title"
          className="m-0 h-full max-h-none w-full max-w-none overscroll-contain bg-salt-500 p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close filters"
                className="flex size-8 items-center justify-center rounded-lg text-truffle-500"
              >
                <ArrowLeft aria-hidden="true" className="size-5" />
              </button>
              <h2
                id="mobile-filters-title"
                className="text-2xl leading-none font-medium text-truffle-500"
              >
                Filter recipes
              </h2>
            </div>
            {sidebar}
          </div>
        </dialog>

        <section aria-label="Recipe results" className="flex-1">
          {results.length === 0 ? (
            // -mt-4 gives 24px (mobile) / 40px (desktop) up to the result count
            <div className="-mt-4 flex flex-col items-center text-center">
              <Image
                src="/images/categories/no-results.png"
                alt=""
                width={402}
                height={263}
                className="h-auto w-70 md:w-100.5"
              />
              <h2 className="mt-8 text-[2rem] leading-none font-medium tracking-[0.01em] text-truffle-500">
                No recipes matched the search or filter.
              </h2>
              <p className="mt-6 text-sm leading-tight tracking-[0.01em] text-oat-800 md:max-w-80">
                Try again with other words, remove the filter or choose another
                page.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex h-9 items-center rounded-lg bg-basil-500 px-3 py-1.5 text-sm leading-6 font-semibold text-mint-500 hover:bg-basil-700"
                >
                  Look at other recipes
                </Link>
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex h-9 items-center rounded-lg border border-basil-500 px-3 py-1.5 text-sm leading-6 font-semibold text-basil-500 hover:bg-mint-500"
                >
                  Clear search &amp; filters
                </button>
              </div>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((recipe) => (
                <li key={recipe.id}>
                  <RecipeCard
                    recipe={recipe}
                    onOpen={
                      search.trim()
                        ? () => trackClarityEvent("recipe_opened_from_search")
                        : undefined
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
