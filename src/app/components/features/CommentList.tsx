"use client";

import { use, useEffect, useRef, useState } from "react";
import type { Comment } from "@/app/types/recipe";
import { CommentItem } from "@/app/components/ui/CommentItem";

export type CommentsResult =
  | { ok: true; comments: Comment[] }
  | { ok: false };

type CommentListProps = {
  commentsPromise: Promise<CommentsResult>;
};

const INITIAL_COUNT = 3;

export function CommentList({ commentsPromise }: CommentListProps) {
  const result = use(commentsPromise);
  const [showAll, setShowAll] = useState(false);
  const firstRevealedRef = useRef<HTMLLIElement>(null);

  // The button disappears on click, so move focus to the first new comment
  // instead of letting it fall back to the top of the page.
  useEffect(() => {
    if (showAll) firstRevealedRef.current?.focus();
  }, [showAll]);

  if (!result.ok) {
    return (
      <p role="alert" className="rounded-lg bg-error-bg p-4 text-error-text">
        We couldn&apos;t load the comments right now. Please try again in a
        moment.
      </p>
    );
  }

  if (result.comments.length === 0) {
    return (
      <p className="rounded-lg bg-oat-200 p-4 text-muted-foreground">
        No comments yet. Be the first to share your thoughts.
      </p>
    );
  }

  // Newest first
  const comments = [...result.comments].sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  );
  const visible = showAll ? comments : comments.slice(0, INITIAL_COUNT);
  const hasMore = !showAll && comments.length > INITIAL_COUNT;

  return (
    <div className="flex flex-col gap-6">
      <ul role="list" className="flex flex-col gap-2">
        {visible.map((comment, index) => (
          <li
            key={comment.id}
            ref={index === INITIAL_COUNT ? firstRevealedRef : undefined}
            tabIndex={index === INITIAL_COUNT ? -1 : undefined}
          >
            <CommentItem comment={comment} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="cursor-pointer self-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-basil-600"
        >
          See all comments
          <span className="sr-only"> ({comments.length})</span>
        </button>
      )}
    </div>
  );
}
