"use server";

import { authFetch, AuthError } from "@/app/lib/api";
import { deleteSession, getAccessToken } from "@/app/lib/session";
import type { Comment } from "@/app/types/recipe";

type CreateCommentResult =
  | { comment: Comment }
  | { error: string; needsLogin?: boolean };

export async function createComment(
  recipeId: string,
  text: string
): Promise<CreateCommentResult> {
  const trimmedText = text.trim();
  if (!trimmedText) {
    return { error: "Comment cannot be empty" };
  }

  try {
    const accessToken = await getAccessToken();
    const response = await authFetch(
      `/recipe-book/recipes/${recipeId}/comments`,
      accessToken,
      { method: "POST", body: JSON.stringify({ text: trimmedText }) }
    );
    if (!response.ok) {
      return { error: "Could not post your comment. Please try again." };
    }
    // The API wraps the result as { data: Comment, meta: {...} }
    const json = await response.json();
    return { comment: json.data };
  } catch (error) {
    if (error instanceof AuthError) {
      // The token is missing or expired, so remove it and ask the user to log in again
      await deleteSession();
      return { error: error.message, needsLogin: true };
    }
    return {
      error: "Something went wrong. Check your connection and try again.",
    };
  }
}
