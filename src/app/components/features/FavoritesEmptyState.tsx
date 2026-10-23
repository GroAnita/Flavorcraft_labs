import Image from "next/image";
import Link from "next/link";
import type { Ref } from "react";

type FavoritesEmptyStateProps = {
  // Lets the grid move focus here after the last favorite is removed
  headingRef?: Ref<HTMLHeadingElement>;
};

export function FavoritesEmptyState({ headingRef }: FavoritesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center md:py-16">
      <Image
        src="/images/favorites-empty.png"
        alt=""
        width={402}
        height={190}
        className="h-auto w-52 md:w-56"
      />
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 text-3xl font-medium text-truffle-500 md:text-4xl"
      >
        No favorites yet
      </h2>
      <p className="mt-3 text-sm text-thyme-600">
        Tap the heart on any recipe to save it here.
      </p>
      <Link
        href="/recipes"
        className="mt-5 inline-flex h-9 items-center rounded-md bg-basil-500 px-4 text-sm font-semibold text-white hover:bg-basil-700"
      >
        Browse recipes
      </Link>
    </div>
  );
}
