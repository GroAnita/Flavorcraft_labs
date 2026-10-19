import { Suspense } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { fetchComments } from "@/app/lib/recipe";
import { getAccessToken } from "@/app/lib/session";
import {
  CommentList,
  type CommentsResult,
} from "@/app/components/features/CommentList";
import { CommentForm } from "@/app/components/features/CommentForm";

type CommentSectionProps = {
  recipeId: string;
};

export async function CommentSection({ recipeId }: CommentSectionProps) {
  // Started before the cookie check so the comments load in parallel.
  // Not awaited: the heading renders right away and the list streams in.
  // Errors are turned into a value so CommentList can show a friendly message.
  const commentsPromise: Promise<CommentsResult> = fetchComments(recipeId).then(
    (comments) => ({ ok: true, comments }),
    () => ({ ok: false })
  );

  // Only checks that a session cookie exists. An expired token is caught
  // when the comment is posted, and the user is asked to log in again.
  const isLoggedIn = Boolean(await getAccessToken());

  return (
    <section aria-labelledby="comments-heading" className="flex flex-col gap-4">
      <h2
        id="comments-heading"
        className="text-center text-[2rem] font-medium leading-none tracking-[0.01em] text-truffle-500"
      >
        Comments
      </h2>

      {isLoggedIn ? <CommentForm recipeId={recipeId} /> : <LoginPrompt />}

      <Suspense fallback={<CommentListSkeleton />}>
        <CommentList commentsPromise={commentsPromise} />
      </Suspense>
    </section>
  );
}

function LoginPrompt() {
  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-primary px-4 py-6">
      <span
        aria-hidden="true"
        className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-olive-500 text-salt-50"
      >
        <Lock className="size-4.5" />
      </span>
      <p className="text-sm font-medium leading-none text-primary">
        You have to be{" "}
        <Link
          href="/login"
          className="font-bold text-sprout-600 underline decoration-[1.5px] underline-offset-2 hover:text-sprout-700"
        >
          logged in
        </Link>{" "}
        to comment
      </p>
    </div>
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
