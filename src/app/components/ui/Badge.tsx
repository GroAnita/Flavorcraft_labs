import type { ReactNode } from "react";

type BadgeVariant = "category" | "difficulty" | "tag";
type DifficultyLevel = "easy" | "medium" | "hard";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  level?: DifficultyLevel;
};

const variantStyles: Record<BadgeVariant, string> = {
  category:
    "h-6 bg-mint-500 px-2 text-sm font-medium leading-[18px] text-primary",
  difficulty:
    "h-[22px] px-2 text-xs font-medium leading-none tracking-[0.02em]",
  tag: "h-[22px] border border-border bg-transparent px-2 text-xs font-normal leading-none tracking-[0.02em] text-foreground",
};

const difficultyColors: Record<DifficultyLevel, string> = {
  easy: "bg-mint-500 text-primary",
  medium: "bg-butter-500 text-olive-500",
  hard: "bg-error-bg text-error-text",
};

export function Badge({
  children,
  variant = "category",
  level = "easy",
}: BadgeProps) {
  const colors = variant === "difficulty" ? difficultyColors[level] : "";

  return (
    <span
      className={`inline-flex max-w-full items-center justify-center rounded-full font-aptly ${variantStyles[variant]} ${colors}`}
    >
      <span className="truncate">{children}</span>
    </span>
  );
}
