'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CircleAlert, Send } from 'lucide-react';
import { createComment } from '@/app/actions/comments';
import { Avatar } from '@/app/components/ui/Avatar';
import type { Comment } from '@/app/types/recipe';

type CommentFormProps = {
  recipeId: string;
  author: { name: string; avatarUrl?: string | null };
  onCommentAdded?: (comment: Comment) => void;
};

export function CommentForm({
  recipeId,
  author,
  onCommentAdded,
}: CommentFormProps) {
  const router = useRouter();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [needsLogin, setNeedsLogin] = useState(false);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  async function submitComment() {
    if (isLoading) return;

    setStatus('');
    if (!text.trim()) {
      setError('Write a comment before posting');
      setNeedsLogin(false);
      textareaRef.current?.focus();
      return;
    }

    setError('');
    setNeedsLogin(false);
    setIsLoading(true);
    const result = await createComment(recipeId, text);
    setIsLoading(false);

    if ('error' in result) {
      // Keep the text so the user can log in again or retry without retyping
      setError(result.error);
      setNeedsLogin(Boolean(result.needsLogin));
      textareaRef.current?.focus();
      return;
    }

    setText('');
    setStatus('Your comment was posted');
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
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      submitComment();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="w-full rounded-md border border-basil-500 p-3"
    >
      <div className="flex items-start gap-3">
        <Avatar name={author.name || 'You'} src={author.avatarUrl} alt="" />

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <label
            htmlFor={id}
            className="text-[18px] font-semibold leading-none text-nori-500"
          >
            Add a comment
          </label>

          <textarea
            ref={textareaRef}
            id={id}
            name="comment"
            rows={2}
            required
            readOnly={isLoading}
            placeholder="Ask a question or add a tip for everyone else!"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error && !needsLogin) setError('');
            }}
            onKeyDown={handleKeyDown}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : helperId}
            className="w-full resize-y rounded-md border border-transparent bg-salt-100 px-3 py-2 gap-6 text-xs text-truffle-500 inset-shadow-sm placeholder:text-oat-700 read-only:opacity-60 focus-visible:outline-2 focus-visible:outline-basil-500 aria-invalid:border-error-text"
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

          <p role="status" className="text-sm text-success-text empty:hidden">
            {status}
          </p>

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="inline-flex h-8 w-fit items-center justify-center gap-2 rounded-md bg-primary px-3 text-xs font-semibold text-white hover:bg-basil-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Posting...' : 'Send comment'}
          </button>
        </div>
      </div>
    </form>
  );
}
