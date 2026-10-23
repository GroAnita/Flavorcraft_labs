import { authFetch } from "./api";
import type { PantryItems } from "../types/recipe";

// Fetches every pantry item for the logged-in user, page by page.
// The API only returns the user's own items, so one user can't read another's pantry
export async function fetchPantry(accessToken: string): Promise<PantryItems[]> {
  const items: PantryItems[] = [];
  let page = 1;

  while (true) {
    const response = await authFetch(
      `/recipe-book/pantry?limit=100&page=${page}`,
      accessToken
    );
    if (!response.ok) {
      throw new Error("Failed to fetch pantry");
    }

    const json = await response.json();
    items.push(...json.data);
    if (json.meta?.isLastPage !== false) return items;

    page += 1;
  }
}
