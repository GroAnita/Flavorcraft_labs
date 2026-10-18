import { Suspense } from "react";
import { fetchComments } from "@/app/lib/recipe";
import {
  CommentList,
  type CommentsResult,
} from "@/app/components/features/CommentList";

type CommentSectionProps = {
  recipeId: string;
};

export function CommentSection({ recipeId }: CommentSectionProps) {
  // Not awaited: the heading renders right away and the list streams in.
  // Errors are turned into a value so CommentList can show a friendly message.
  const commentsPromise: Promise<CommentsResult> = fetchComments(recipeId).then(
    (comments) => ({ ok: true, comments }),
    () => ({ ok: false }),
  );

  return (
    <section aria-labelledby="comments-heading" className="flex flex-col gap-4">
      <h2
        id="comments-heading"
        className="text-[2rem] font-medium text-truffle-500"
      >
        Comments
      </h2>

      <Suspense fallback={<CommentListSkeleton />}>
        <CommentList commentsPromise={commentsPromise} />
      </Suspense>
    </section>
  );
}

export function CommentListSkeleton() {
  return (
    <div role="status" className="flex flex-col gap-2">
      <span className="sr-only">Loading comments…</span>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden="true"
          className="flex animate-pulse gap-3 rounded-lg bg-oat-200 p-3 sm:p-4"
        >
          <div className="size-11 shrink-0 rounded-lg bg-oat-500" />
          <div className="flex flex-1 flex-col gap-2 py-1">
            <div className="h-4 w-24 rounded bg-oat-500" />
            <div className="h-3 w-full max-w-md rounded bg-oat-500" />
          </div>
        </div>
      ))}
    </div>
  );
}
