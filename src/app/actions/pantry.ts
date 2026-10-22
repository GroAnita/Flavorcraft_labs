"use server";

import { revalidatePath } from "next/cache";
import { authFetch, AuthError } from "@/app/lib/api";
import { deleteSession, getAccessToken } from "@/app/lib/session";
import {
  PANTRY_CATEGORIES,
  PANTRY_UNITS,
  type PantryItemInput,
} from "@/app/lib/pantryOptions";
import type { PantryItems } from "@/app/types/recipe";

type Failure = { ok: false; error: string; needsLogin?: boolean };
export type PantryItemResult = { ok: true; item: PantryItems } | Failure;
export type PantryDeleteResult = { ok: true } | Failure;

const NETWORK_ERROR = "Something went wrong. Check your connection and try again.";

// "milk" is saved as "Milk"; the rest is kept as typed ("iPhone"-style names stay)
const capitalize = (name: string) => {
  const trimmed = name.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

// The same checks as the form, so the API never gets invalid values
function validate(input: Partial<PantryItemInput>): string | null {
  if (input.name !== undefined && !input.name.trim()) {
    return "Name is required";
  }
  if (
    input.quantity !== undefined &&
    (!Number.isFinite(input.quantity) || input.quantity < 0)
  ) {
    return "Quantity must be 0 or more";
  }
  if (
    input.unit !== undefined &&
    !(PANTRY_UNITS as readonly string[]).includes(input.unit)
  ) {
    return "Choose a unit from the list";
  }
  if (
    input.category !== undefined &&
    !(PANTRY_CATEGORIES as readonly string[]).includes(input.category)
  ) {
    return "Choose a category from the list";
  }
  return null;
}

async function handleError(error: unknown): Promise<Failure> {
  if (error instanceof AuthError) {
    // The token is missing or expired, so remove it and ask the user to log in again
    await deleteSession();
    return { ok: false, error: error.message, needsLogin: true };
  }
  return { ok: false, error: NETWORK_ERROR };
}

export async function addPantryItem(
  input: PantryItemInput
): Promise<PantryItemResult> {
  const invalid = validate(input);
  if (invalid) return { ok: false, error: invalid };

  try {
    const accessToken = await getAccessToken();
    const response = await authFetch("/recipe-book/pantry", accessToken, {
      method: "POST",
      body: JSON.stringify({ ...input, name: capitalize(input.name) }),
    });
    if (!response.ok) {
      return { ok: false, error: "Could not add the item. Please try again." };
    }
    const json = await response.json();
    revalidatePath("/pantry");
    return { ok: true, item: json.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function updatePantryItem(
  id: string,
  changes: Partial<PantryItemInput>
): Promise<PantryItemResult> {
  const invalid = validate(changes);
  if (invalid) return { ok: false, error: invalid };

  try {
    const accessToken = await getAccessToken();
    const response = await authFetch(`/recipe-book/pantry/${id}`, accessToken, {
      method: "PUT",
      body: JSON.stringify(changes),
    });
    if (!response.ok) {
      return { ok: false, error: "Could not save the changes. Please try again." };
    }
    const json = await response.json();
    revalidatePath("/pantry");
    return { ok: true, item: json.data };
  } catch (error) {
    return handleError(error);
  }
}

export async function deletePantryItem(id: string): Promise<PantryDeleteResult> {
  try {
    const accessToken = await getAccessToken();
    const response = await authFetch(`/recipe-book/pantry/${id}`, accessToken, {
      method: "DELETE",
    });
    // 404 means it's already gone, which is what the user wanted
    if (!response.ok && response.status !== 404) {
      return { ok: false, error: "Could not remove the item. Please try again." };
    }
    revalidatePath("/pantry");
    return { ok: true };
  } catch (error) {
    return handleError(error);
  }
}
