import { Badge } from "@/app/components/ui/Badge";

type TagListProps = {
  tags?: string[];
};

export function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <li key={`${tag}-${index}`} className="max-w-full">
          <Badge variant="tag">{tag}</Badge>
        </li>
      ))}
    </ul>
  );
}
