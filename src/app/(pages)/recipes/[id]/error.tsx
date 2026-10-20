"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type RecipeErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

// Shown when the recipe can't be loaded for another reason than not existing.
// Recipes that don't exist use the shared 404 page in src/app/not-found.tsx
export default function RecipeError({ reset }: RecipeErrorProps) {
  return (
    <main className="flex flex-1 flex-col items-center bg-salt-500 px-4 py-32 text-center">
      <h1 className="text-[2rem] text-truffle-500 md:text-[40px]">
        We couldn&apos;t load this recipe
      </h1>
      <p className="my-4 text-sm text-oat-800">
        Something went wrong on our side. Please try again in a moment.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-basil-500 px-4 py-2 text-sm text-salt-500 transition-colors hover:bg-basil-700"
        >
          Try again
        </button>
        <Link
          href="/recipes"
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-basil-500 px-4 py-2 text-sm text-basil-500 transition-colors hover:bg-basil-50"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to recipes
        </Link>
      </div>
    </main>
  );
}
