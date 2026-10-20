"use client";

import { FilterGroup } from "@/app/components/ui/FilterGroup";
import { SavedRecipesLink } from "@/app/components/ui/SavedRecipesLink";
import {
  RECIPE_FILTER_GROUPS,
  getGroupOptionsWithCounts,
} from "@/app/lib/recipeFilters";
import type { Recipe } from "@/app/types/recipe";

type RecipeFilterSidebarProps = {
  recipes: Recipe[];
  selected: string[];
  onChange: (value: string, checked: boolean) => void;
};

export function RecipeFilterSidebar({
  recipes,
  selected,
  onChange,
}: RecipeFilterSidebarProps) {
  return (
    <div className="flex flex-col gap-4">
      <SavedRecipesLink />

      {RECIPE_FILTER_GROUPS.map((group) => (
        <FilterGroup
          key={group.id}
          title={group.title}
          // Counts are based on all recipes
          options={getGroupOptionsWithCounts(group, recipes)}
          selectedValues={selected}
          onChange={onChange}
          defaultOpen={group.defaultOpen}
        />
      ))}
    </div>
  );
}
