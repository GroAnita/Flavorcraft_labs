"use server";

import { revalidatePath } from "next/cache";
import { authFetch, AuthError } from "@/app/lib/api";
import { getAccessToken } from "@/app/lib/session";
import {
  hasErrors,
  toRecipePayload,
  validateRecipeForm,
} from "@/app/lib/recipeFormValidation";
import type {
  RecipeFormValues,
  SubmitRecipeResult,
} from "@/app/types/recipeForm";

const IMAGE_ERROR =
  "We couldn't use this image. Use a public link that goes straight to an image, for example ending in .jpg or .png.";

// The API returns errors as { errors: [{ message }] }
async function readApiMessage(response: Response) {
  try {
    const json = await response.json();
    return (json?.errors?.[0]?.message as string | undefined) ?? "";
  } catch {
    return "";
  }
}

export async function createRecipe(
  values: RecipeFormValues
): Promise<SubmitRecipeResult> {
  // Validated again here, since a Server Action can be called without the form
  const fieldErrors = validateRecipeForm(values);
  if (hasErrors(fieldErrors)) {
    return { ok: false, fieldErrors, error: "Some fields need to be fixed." };
  }

  try {
    const accessToken = await getAccessToken();
    const response = await authFetch("/recipe-book/recipes", accessToken, {
      method: "POST",
      body: JSON.stringify(toRecipePayload(values)),
    });

    if (!response.ok) {
      const message = await readApiMessage(response);

      // The API checks that the image is public and returns 400 if it isn't
      if (
        response.status === 400 &&
        values.imageUrl.trim() &&
        /image|url/i.test(message)
      ) {
        return {
          ok: false,
          fieldErrors: { imageUrl: IMAGE_ERROR },
          error: "The image couldn't be used.",
        };
      }

      return {
        ok: false,
        error: message
          ? `Couldn't publish the recipe: ${message}`
          : "Couldn't publish the recipe. Please try again.",
      };
    }

    // The API wraps the result as { data: Recipe, meta: {...} }
    const json = await response.json();
    revalidatePath("/recipes");
    return { ok: true, id: json.data.id };
  } catch (error) {
    if (error instanceof AuthError) {
      // The session cookie is not deleted here. Changing cookies in a Server Action
      // reloads the page, which would close the modal and lose the user's values
      return { ok: false, error: error.message, needsLogin: true };
    }
    return {
      ok: false,
      error: "Something went wrong. Check your connection and try again.",
    };
  }
}
