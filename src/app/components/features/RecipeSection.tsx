"use client";

import { useId, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Recipe } from "@/app/types/recipe";
import { RecipeCard } from "@/app/components/features/RecipeCard";

type RecipeSectionProps = {
  title: string;
  recipes: Recipe[];
  viewAllHref: string;
};

const arrowButtonClass =
  "hidden size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface lg:flex";

export function RecipeSection({
  title,
  recipes,
  viewAllHref,
}: RecipeSectionProps) {
  const headingId = useId();
  const trackRef = useRef<HTMLUListElement>(null);

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
        <h2 id={headingId} className="text-3xl  text-truffle-500">
          {title}
        </h2>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-basil-500"
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollTrack(-1)}
            aria-label={`Scroll ${title} left`}
            className={arrowButtonClass}
          >
            <ArrowLeft aria-hidden="true" className="size-5" />
          </button>

          {/* tabIndex lets keyboard users focus the list and scroll it with the arrow keys.
              `relative` keeps sr-only text in off-screen cards from widening the page. */}
          <ul
            ref={trackRef}
            role="list"
            tabIndex={0}
            aria-label={title}
            className="relative flex min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto scroll-smooth py-1 pb-3 [scrollbar-color:var(--color-basil-500)_var(--color-salt-200)]"
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

          <button
            type="button"
            onClick={() => scrollTrack(1)}
            aria-label={`Scroll ${title} right`}
            className={arrowButtonClass}
          >
            <ArrowRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      )}
    </section>
  );
}
