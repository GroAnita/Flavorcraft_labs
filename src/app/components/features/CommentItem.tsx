import type { Comment } from "@/app/types/recipe";
import { Avatar } from "@/app/components/ui/Avatar";

type CommentItemProps = {
  text: Comment["text"];
  author: {
    name: string;
    avatar?: { url?: string | null } | null;
  };
};

export function CommentItem({ text, author }: CommentItemProps) {
  const name = author.name?.trim() || "Anonymous";

  return (
    <article className="flex items-center gap-3 rounded-lg bg-oat-200 p-3 sm:p-4">
      <Avatar name={name} src={author.avatar?.url} alt="" />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h3 className="wrap-anywhere text-base font-semibold">{name}</h3>
        <p className="whitespace-pre-line wrap-anywhere text-sm leading-5 text-muted-foreground">
          {text}
        </p>
      </div>
    </article>
  );
}
