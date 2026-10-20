"use client";

import { useRouter } from "next/navigation";
import { RecipeActions } from "@/app/components/features/RecipeActions";
import { useRecipeFavorite } from "@/app/components/features/RecipeFavoriteProvider";

type RecipeDetailActionsProps = {
  title: string;
  isLoggedIn: boolean;
};

// Gives RecipeActions its state and callbacks, since a server component
// can't pass functions to a client component
export function RecipeDetailActions({
  title,
  isLoggedIn,
}: RecipeDetailActionsProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useRecipeFavorite();

  return (
    <RecipeActions
      title={title}
      isLoggedIn={isLoggedIn}
      isFavorite={isFavorite}
      onToggleFavorite={toggleFavorite}
      // The meal planner page is a coming soon page for now
      onOpenMealPlanner={() => router.push("/meal-plan")}
    />
  );
}
