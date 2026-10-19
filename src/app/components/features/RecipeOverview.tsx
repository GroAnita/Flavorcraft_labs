import { Fragment, type ReactNode } from "react";
import { Clock, CookingPot, MessageCircle, User } from "lucide-react";
import type { Recipe } from "@/app/types/recipe";
import { Avatar } from "@/app/components/ui/Avatar";
import { Badge } from "@/app/components/ui/Badge";

export type RecipeOverviewProps = Pick<
  Recipe,
  | "title"
  | "description"
  | "prepTime"
  | "cookTime"
  | "servings"
  | "difficulty"
  | "category"
  | "tags"
  | "owner"
> & {
  // Pass recipe.comments.length. Hidden when not passed
  commentCount?: number;
  // Edit and delete buttons for the owner, added in the recipe actions issue
  ownerActions?: ReactNode;
};

const difficultyLabels = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
} as const;

type Level = keyof typeof difficultyLabels;

function toLevel(difficulty?: string | null): Level | null {
  const value = difficulty?.trim().toLowerCase();
  if (value === "easy" || value === "medium" || value === "hard") return value;
  return null;
}

function isAvailable(value?: number | null): value is number {
  return typeof value === "number" && value > 0;
}

type MetaItem = {
  key: string;
  icon: ReactNode;
  text: string;
};

// Same icon size and separator style as RecipeMeta on the recipe card
const iconClass = "size-[18px] shrink-0";

export function RecipeOverview({
  title,
  description,
  prepTime,
  cookTime,
  servings,
  difficulty,
  category,
  tags,
  owner,
  commentCount,
  ownerActions,
}: RecipeOverviewProps) {
  const difficultyText = difficulty?.trim();
  const categoryText = category?.trim();
  const level = toLevel(difficulty);

  // Skip tags that repeat the difficulty, the category or each other
  const seen = new Set(
    [difficultyText, categoryText]
      .filter((value): value is string => Boolean(value))
      .map((value) => value.toLowerCase())
  );
  const uniqueTags = (tags ?? [])
    .map((tag) => tag.trim())
    .filter((tag) => {
      const key = tag.toLowerCase();
      if (!tag || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const meta: MetaItem[] = [];

  if (isAvailable(prepTime)) {
    meta.push({
      key: "prep",
      icon: <Clock aria-hidden="true" className={iconClass} />,
      text: `Prep: ${prepTime} min`,
    });
  }
  if (isAvailable(cookTime)) {
    meta.push({
      key: "cook",
      icon: <CookingPot aria-hidden="true" className={iconClass} />,
      text: `Cook: ${cookTime} min`,
    });
  }
  if (isAvailable(servings)) {
    meta.push({
      key: "servings",
      icon: <User aria-hidden="true" className={iconClass} />,
      text: `${servings} ${servings === 1 ? "serving" : "servings"}`,
    });
  }
  // 0 is shown too, so users can see that nobody has commented yet
  if (typeof commentCount === "number" && commentCount >= 0) {
    meta.push({
      key: "comments",
      icon: <MessageCircle aria-hidden="true" className={iconClass} />,
      text: `${commentCount} ${commentCount === 1 ? "comment" : "comments"}`,
    });
  }

  const hasBadges = Boolean(
    difficultyText || categoryText || uniqueTags.length
  );

  return (
    // 40px between the info block and the author row, same as the gap in RecipeHero
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        {hasBadges && (
          <ul role="list" className="flex flex-wrap gap-2">
            {difficultyText && (
              <li className="flex max-w-full">
                <span className="sr-only">Difficulty: </span>
                {level ? (
                  <Badge variant="difficulty" level={level} size="md">
                    {difficultyLabels[level]}
                  </Badge>
                ) : (
                  <Badge variant="tag" size="md">
                    {difficultyText}
                  </Badge>
                )}
              </li>
            )}
            {categoryText && (
              <li className="flex max-w-full">
                <span className="sr-only">Category: </span>
                <Badge variant="category" size="md">
                  {categoryText}
                </Badge>
              </li>
            )}
            {uniqueTags.map((tag) => (
              <li key={tag} title={tag} className="flex max-w-full">
                <Badge variant="tag" size="md">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-2">
          <h1 className="text-[40px] font-medium leading-none tracking-[0.01em] text-truffle-500">
            {title}
          </h1>

          {description?.trim() && (
            <p className="text-base leading-[1.2] text-oat-800 md:leading-6">
              {description}
            </p>
          )}
        </div>

        {meta.length > 0 && (
          <ul
            role="list"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium leading-none text-primary"
          >
            {meta.map((item, index) => (
              <Fragment key={item.key}>
                {index > 0 && (
                  <li aria-hidden="true" className="h-5.75 w-px bg-nori-300" />
                )}
                <li className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.text}</span>
                </li>
              </Fragment>
            ))}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar name={owner.name} src={owner.avatar?.url} alt="" size="lg" />
          <div className="flex min-w-0 flex-col gap-1">
            <p className="truncate font-aptly text-xl font-medium leading-6 text-foreground">
              {owner.name}
            </p>
            <p className="truncate text-base leading-tight text-oat-800">
              @{owner.name}
            </p>
          </div>
        </div>

        {ownerActions && (
          <div className="flex shrink-0 items-center gap-2">{ownerActions}</div>
        )}
      </div>
    </div>
  );
}
