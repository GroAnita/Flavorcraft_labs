import Link from "next/link";
import type { Recipe } from "@/app/types/recipe";
import { Badge } from "@/app/components/ui/Badge";
import { filterHref, tagToFilterValue } from "@/app/lib/recipeFilters";

export type SimilarRecipesProps = Pick<
  Recipe,
  "difficulty" | "category" | "tags"
>;

type SimilarTag = {
  label: string;
  href: string;
};

function getSimilarTags({
  difficulty,
  category,
  tags,
}: SimilarRecipesProps): SimilarTag[] {
  const seen = new Set<string>();
  const result: SimilarTag[] = [];

  // Same order as in the design: difficulty, category, then the other tags
  for (const text of [difficulty, category, ...(tags ?? [])]) {
    const label = text?.trim();
    if (!label) continue;

    const value = tagToFilterValue(label);
    // Skip tags without a filter, and tags that lead to the same filter as an earlier one
    if (!value || seen.has(value)) continue;

    seen.add(value);
    result.push({ label, href: filterHref([value]) });
  }

  return result;
}

export function SimilarRecipes(props: SimilarRecipesProps) {
  const similarTags = getSimilarTags(props);

  if (similarTags.length === 0) return null;

  return (
    <section
      aria-labelledby="similar-recipes-heading"
      className="flex flex-col gap-6 border-y border-thyme-500 py-9.5"
    >
      <h2
        id="similar-recipes-heading"
        className="text-[2rem] font-medium leading-none tracking-[0.01em] text-truffle-500"
      >
        Find similar recipes
      </h2>

      <ul role="list" className="flex flex-wrap gap-2">
        {similarTags.map((tag) => (
          <li key={tag.href} className="flex max-w-full">
            <Link
              href={tag.href}
              className="flex max-w-full rounded-full transition-colors"
            >
              <Badge variant="tag" size="md">
                {tag.label}
              </Badge>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
