"use client";

import { useId, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ChefHat, ChevronUp } from "lucide-react";
import type { RecipeMatch } from "@/app/lib/pantryUtils";

type PantryRecipeSuggestionsProps = {
  matches: RecipeMatch[];
  failed: boolean;
};

const VISIBLE = 3;

// Whether the screen is desktop size (md). The server doesn't know, so it
// assumes mobile, and the CSS classes below keep desktop open until hydration.
const DESKTOP = "(min-width: 768px)";
function subscribeToDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const useIsDesktop = () =>
  useSyncExternalStore(
    subscribeToDesktop,
    () => window.matchMedia(DESKTOP).matches,
    () => false
  );

function MatchItem({ match }: { match: RecipeMatch }) {
  const { recipe, matched, total, missing } = match;
  const minutes = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const href = `/recipes/${recipe.id}`;
  const hasEverything = matched === total;

  return (
    <li className="flex flex-col gap-3 border-t border-oat-500 pt-6">
      <div className="flex items-start justify-between gap-3">
        <Link
          href={href}
          className="font-aptly text-xl leading-none font-medium text-nori-500 hover:underline"
        >
          {recipe.title}
        </Link>
        {minutes > 0 && (
          <p className="flex shrink-0 items-center gap-1 text-sm leading-none font-medium text-basil-500">
            <ChefHat aria-hidden="true" className="size-4" />
            {minutes} min
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div aria-hidden="true" className="h-2 flex-1 overflow-hidden rounded-full bg-mint-500">
          <div
            className="h-full rounded-full bg-basil-500"
            style={{ width: `${(matched / total) * 100}%` }}
          />
        </div>
        <p className="text-sm leading-none font-medium text-basil-500">
          {matched}/{total}
          <span className="sr-only"> ingredients in your pantry</span>
        </p>
      </div>

      {hasEverything ? (
        // Same destination as the title, so it's hidden from screen readers and keyboard
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="w-fit text-sm leading-none font-medium text-basil-500 underline"
        >
          You have everything
        </Link>
      ) : (
        <p className="text-sm leading-none text-oat-800">
          Missing: {missing.slice(0, 3).join(", ")}
          {missing.length > 3 && ` and ${missing.length - 3} more`}
        </p>
      )}
    </li>
  );
}

export function PantryRecipeSuggestions({ matches, failed }: PantryRecipeSuggestionsProps) {
  const id = useId();
  // Open by default on desktop and collapsed on mobile, until the user toggles it
  const isDesktop = useIsDesktop();
  const [toggled, setToggled] = useState<boolean | null>(null);
  const isOpen = toggled ?? isDesktop;
  // Before the user toggles, CSS decides, so desktop never flashes closed
  const openClass =
    toggled === null ? "hidden md:flex" : toggled ? "flex" : "hidden";
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? matches : matches.slice(0, VISIBLE);

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="flex flex-col gap-6 rounded-lg bg-salt-50 p-6 md:gap-10"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2">
          <h2 id={`${id}-title`} className="text-2xl leading-none font-medium text-truffle-500">
            What can I cook?
          </h2>
          <div className="flex items-center gap-2">
            {matches.length > 0 && (
              <span className="flex size-5.5 items-center justify-center rounded-full bg-butter-500 text-xs font-medium text-olive-500">
                {matches.length}
                <span className="sr-only"> matching recipes</span>
              </span>
            )}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${id}-content`}
              aria-label={isOpen ? "Hide recipe suggestions" : "Show recipe suggestions"}
              onClick={() => setToggled(!isOpen)}
              className="flex size-6 items-center justify-center rounded"
            >
              <ChevronUp
                aria-hidden="true"
                strokeWidth={2.25}
                className={`size-4 text-sprout-600 transition-transform ${
                  toggled === null ? "max-md:rotate-180" : isOpen ? "" : "rotate-180"
                }`}
              />
            </button>
          </div>
        </div>
        <p
          className={`text-sm leading-tight text-oat-800 ${openClass.replaceAll("flex", "block")}`}
        >
          Recipes matched to what you have. It&apos;ll update as your pantry changes.
        </p>
      </div>

      <div
        id={`${id}-content`}
        className={`flex-col gap-6 ${openClass}`}
      >
        {failed ? (
          <p role="alert" className="text-sm text-oat-800">
            We couldn&apos;t load recipes right now. Please try again in a moment.
          </p>
        ) : matches.length === 0 ? (
          <p className="text-sm text-oat-800">
            No recipes match what you have yet. Add more ingredients to get suggestions.
          </p>
        ) : (
          <>
            <ul className="flex flex-col gap-6" aria-live="polite">
              {visible.map((match) => (
                <MatchItem key={match.recipe.id} match={match} />
              ))}
            </ul>
            {matches.length > VISIBLE && (
              <div className="border-t border-oat-500 pt-6">
                <button
                  type="button"
                  onClick={() => setShowAll((all) => !all)}
                  className="text-sm leading-none font-medium text-basil-500 underline"
                >
                  {showAll ? "Show fewer recipes" : "See all matching recipes"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
