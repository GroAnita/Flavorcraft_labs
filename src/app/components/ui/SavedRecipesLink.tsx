import Link from "next/link";
import { Heart } from "lucide-react";

type SavedRecipesLinkProps = {
  // TODO: send logged-out users to /login (with the destination) once session handling is in place
  href?: string;
};

export function SavedRecipesLink({ href = "/favorites" }: SavedRecipesLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-basil-500 px-3 py-1.5 text-sm leading-6 font-semibold text-basil-500 transition-colors hover:bg-basil-500 hover:text-white"
    >
      Go to saved recipes
      <Heart
        aria-hidden="true"
        className="size-4 shrink-0 fill-sprout-500 text-sprout-500"
      />
    </Link>
  );
}
