"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { setFavorite } from "@/app/actions/favorites";
import { Toast, type ToastData } from "@/app/components/ui/Toast";

type FavoritesValue = {
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipeId: string, title: string) => void;
};

const FavoritesContext = createContext<FavoritesValue | null>(null);

type FavoritesProviderProps = {
  initialRecipeIds: string[];
  children: ReactNode;
};

// Keeps track of the user's favorites for every recipe card on the page, and shows a
// message after each change. Only rendered for logged-in users.
export function FavoritesProvider({
  initialRecipeIds,
  children,
}: FavoritesProviderProps) {
  const [favoriteIds, setFavoriteIds] = useState(
    () => new Set(initialRecipeIds)
  );
  const [toast, setToast] = useState<ToastData | null>(null);
  // Recipes with a request in progress, so double clicks don't send a second request
  const pendingIds = useRef(new Set<string>());
  const nextToastId = useRef(0);

  const dismissToast = useCallback(() => setToast(null), []);

  function showToast(data: Omit<ToastData, "id">) {
    nextToastId.current += 1;
    setToast({ ...data, id: nextToastId.current });
  }

  function update(recipeId: string, favorite: boolean) {
    setFavoriteIds((ids) => {
      const next = new Set(ids);
      if (favorite) next.add(recipeId);
      else next.delete(recipeId);
      return next;
    });
  }

  async function toggleFavorite(recipeId: string, title: string) {
    if (pendingIds.current.has(recipeId)) return;
    pendingIds.current.add(recipeId);

    const favorite = !favoriteIds.has(recipeId);
    // Fill or empty the heart straight away, and undo it if saving fails
    update(recipeId, favorite);

    try {
      const result = await setFavorite(recipeId, favorite);
      if (result.ok) {
        showToast({
          tone: "success",
          message: (
            <>
              <strong>&ldquo;{title}&rdquo;</strong>{" "}
              {favorite
                ? "was added! Go to favorites to find it."
                : "was removed from favorites."}
            </>
          ),
          action: { href: "/favorites", label: "Go to favorites" },
        });
        return;
      }

      update(recipeId, !favorite);
      showToast({
        tone: "error",
        message: result.error,
        action: result.needsLogin
          ? { href: "/login", label: "Go to login" }
          : undefined,
      });
    } catch {
      update(recipeId, !favorite);
      showToast({
        tone: "error",
        message: "Something went wrong. Check your connection and try again.",
      });
    } finally {
      pendingIds.current.delete(recipeId);
    }
  }

  return (
    <FavoritesContext
      value={{
        isFavorite: (recipeId) => favoriteIds.has(recipeId),
        toggleFavorite,
      }}
    >
      {children}
      <Toast toast={toast} onDismiss={dismissToast} />
    </FavoritesContext>
  );
}

// Returns null outside FavoritesProvider, which means the user is logged out
export function useFavorites() {
  return useContext(FavoritesContext);
}
