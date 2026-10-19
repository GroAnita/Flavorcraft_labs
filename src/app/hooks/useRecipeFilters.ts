"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseFilters, serializeFilters } from "@/app/lib/recipeFilters";

const PARAM = "filters";

// Filter selections live in the URL, so refreshes, shared links and the
// browser's back/forward buttons all keep the same filters.
export function useRecipeFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const selected = parseFilters(searchParams.get(PARAM));

  const update = useCallback(
    (next: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.length > 0) params.set(PARAM, serializeFilters(next));
      else params.delete(PARAM);
      params.delete("page");

      const query = params.toString();
      // push (not replace) adds a history entry for back/forward navigation
      push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [searchParams, pathname, push],
  );

  const toggle = useCallback(
    (value: string, checked: boolean) =>
      update(
        checked
          ? [...selected, value]
          : selected.filter((selectedValue) => selectedValue !== value),
      ),
    [selected, update],
  );

  const clear = useCallback(() => update([]), [update]);

  return { selected, toggle, clear };
}
