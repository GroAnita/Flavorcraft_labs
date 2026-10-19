"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleAlert, Send } from "lucide-react";
import { createComment } from "@/app/actions/comments";
import type { Comment } from "@/app/types/recipe";

type CommentFormProps = {
  recipeId: string;
  onCommentAdded?: (comment: Comment) => void;
};

export function CommentForm({ recipeId, onCommentAdded }: CommentFormProps) {
  const router = useRouter();
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  async function submitComment() {
    if (isLoading) return;

    setStatus("");
    if (!text.trim()) {
      setError("Write a comment before posting");
      setNeedsLogin(false);
      textareaRef.current?.focus();
      return;
    }

    setError("");
    setNeedsLogin(false);
    setIsLoading(true);
    const result = await createComment(recipeId, text);
    setIsLoading(false);

    if ("error" in result) {
      // Keep the text so the user can log in again or retry without retyping
      setError(result.error);
      setNeedsLogin(Boolean(result.needsLogin));
      textareaRef.current?.focus();
      return;
    }

    setText("");
    setStatus("Your comment was posted");
    onCommentAdded?.(result.comment);
    // Re-runs the server components so the list fetches the new comment
    router.refresh();
    textareaRef.current?.focus();
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    submitComment();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Ctrl/Cmd + Enter posts the comment, plain Enter adds a new line
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submitComment();
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="text-sm leading-none text-truffle-500 md:text-base"
      >
        Comment
        <span aria-hidden="true" className="ml-0.5 text-error-text">
          *
        </span>
      </label>
      <textarea
        ref={textareaRef}
        id={id}
        name="comment"
        rows={4}
        required
        // readOnly instead of disabled keeps focus in the field while posting
        readOnly={isLoading}
        placeholder="Share your thoughts on this recipe"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (error && !needsLogin) setError("");
        }}
        onKeyDown={handleKeyDown}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : helperId}
        className="w-full resize-y rounded-lg border border-transparent bg-salt-100 px-4 py-3.5 text-sm text-truffle-500 inset-shadow-sm placeholder:text-oat-700 read-only:opacity-60 md:p-4 md:text-base aria-invalid:border-error-text"
      />

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-error-text"
        >
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
          {needsLogin && (
            <Link
              href="/login"
              className="font-semibold underline underline-offset-2"
            >
              Log in again
            </Link>
          )}
        </p>
      ) : (
        <p id={helperId} className="text-xs text-muted-foreground">
          Press Ctrl + Enter (⌘ + Enter on Mac) to post
        </p>
      )}

      {/* Always rendered so screen readers pick up changes */}
      <p role="status" className="text-sm text-success-text empty:hidden">
        {status}
      </p>

      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="inline-flex h-11 items-center justify-center gap-2 self-end rounded-md bg-primary px-6 text-sm font-semibold text-white hover:bg-basil-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Posting..." : "Post comment"}
        <Send aria-hidden="true" className="size-4" />
      </button>
    </form>
  );
}
