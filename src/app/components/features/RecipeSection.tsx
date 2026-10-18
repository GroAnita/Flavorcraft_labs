"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Recipe } from "@/app/types/recipe";
import { RecipeCard } from "@/app/components/features/RecipeCard";

type RecipeSectionProps = {
  title: string;
  recipes: Recipe[];
  viewAllHref: string;
};

const arrowButtonClass =
  "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-xl bg-basil-200/80 text-white transition-colors hover:bg-basil-300/90 lg:flex cursor-pointer";

export function RecipeSection({
  title,
  recipes,
  viewAllHref,
}: RecipeSectionProps) {
  const headingId = useId();
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // 1px tolerance for sub-pixel rounding at the scroll edges.
    setCanScrollLeft(track.scrollLeft > 1);
    setCanScrollRight(
      track.scrollLeft + track.clientWidth < track.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateArrows();
    const observer = new ResizeObserver(updateArrows);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateArrows, recipes.length]);

  function scrollTrack(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: "smooth",
    });
  }

  return (
    <section aria-labelledby={headingId} className="w-full py-8">
      <div className="mb-6 flex flex-col items-center gap-1 text-center">
        <h2 id={headingId} className="text-[2rem] font-medium text-truffle-500">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-base font-medium text-basil-500"
        >
          See all
          <span className="sr-only"> {title.toLowerCase()}</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      {recipes.length === 0 ? (
        <p className="rounded-lg bg-surface p-6 text-center text-muted-foreground">
          No recipes to show here yet. Check back soon.
        </p>
      ) : (
        <div className="relative">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollTrack(-1)}
              aria-label={`Scroll ${title} left`}
              className={`${arrowButtonClass} -left-5`}
            >
              <ChevronLeft aria-hidden="true" className="size-6" />
            </button>
          )}

          {/* tabIndex lets keyboard users focus the list and scroll it with the arrow keys.
              `relative` keeps sr-only text in off-screen cards from widening the page. */}
          <ul
            ref={trackRef}
            role="list"
            tabIndex={0}
            aria-label={title}
            onScroll={updateArrows}
            className="relative flex snap-x snap-mandatory overflow-x-auto scroll-smooth py-1 pb-3 [scrollbar-color:var(--color-basil-500)_var(--color-salt-200)]"
          >
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="w-4/5 shrink-0 snap-start px-2 sm:w-1/2 lg:w-1/4"
              >
                <RecipeCard recipe={recipe} />
              </li>
            ))}
          </ul>

          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollTrack(1)}
              aria-label={`Scroll ${title} right`}
              className={`${arrowButtonClass} -right-5`}
            >
              <ChevronRight aria-hidden="true" className="size-6" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
