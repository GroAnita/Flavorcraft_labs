import { Fragment, type ReactNode } from "react";
import { Clock, CookingPot, User } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";

type RecipeMetaProps = {
  prepTime?: number | null;
  cookTime?: number | null;
  servings?: number | null;
  difficulty?: string | null;
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
  label: string; // read by screen readers
  value: string; // shown on screen
};

const iconClass = "size-[18px] shrink-0";

export function RecipeMeta({
  prepTime,
  cookTime,
  servings,
  difficulty,
}: RecipeMetaProps) {
  const items: MetaItem[] = [];

  if (isAvailable(prepTime)) {
    items.push({
      key: "prep",
      icon: <Clock aria-hidden="true" className={iconClass} />,
      label: "Preparation time",
      value: `${prepTime} min`,
    });
  }
  if (isAvailable(cookTime)) {
    items.push({
      key: "cook",
      icon: <CookingPot aria-hidden="true" className={iconClass} />,
      label: "Cooking time",
      value: `${cookTime} min`,
    });
  }
  if (isAvailable(servings)) {
    items.push({
      key: "servings",
      icon: <User aria-hidden="true" className={iconClass} />,
      label: "Servings",
      value: String(servings),
    });
  }

  const level = toLevel(difficulty);
  const hasDifficulty = Boolean(difficulty?.trim());

  if (items.length === 0 && !hasDifficulty) return null;

  return (
    <div className="flex flex-col items-start gap-2 text-primary sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-4">
      {items.length > 0 && (
        <ul className="flex items-center gap-4 text-sm font-medium leading-none">
          {items.map((item, index) => (
            <Fragment key={item.key}>
              {index > 0 && (
                <li aria-hidden="true" className="h-5.75 w-px bg-nori-300" />
              )}
              <li className="flex items-center gap-2">
                {item.icon}
                <span className="sr-only">{item.label}: </span>
                <span>{item.value}</span>
              </li>
            </Fragment>
          ))}
        </ul>
      )}

      {hasDifficulty && (
        <div className="sm:only:ml-auto">
          {level ? (
            <Badge variant="difficulty" level={level}>
              {difficultyLabels[level]}
            </Badge>
          ) : (
            <Badge variant="tag">{difficulty}</Badge>
          )}
        </div>
      )}
    </div>
  );
}
