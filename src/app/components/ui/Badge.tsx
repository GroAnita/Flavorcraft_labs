import type { ReactNode } from "react";

type BadgeVariant = "category" | "difficulty" | "tag";
type DifficultyLevel = "easy" | "medium" | "hard";
// sm: recipe card, md: recipe detail page
type BadgeSize = "sm" | "md";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  level?: DifficultyLevel;
  size?: BadgeSize;
};

const smallSizes: Record<BadgeVariant, string> = {
  category: "h-6 px-2 text-sm leading-[18px]",
  difficulty: "h-[22px] px-2 text-xs leading-none tracking-[0.02em]",
  tag: "h-[22px] px-2 text-xs leading-none tracking-[0.02em]",
};

const mediumSize = "h-[27px] px-3 text-base leading-none tracking-[0.02em]";

const variantStyles: Record<BadgeVariant, string> = {
  category: "bg-mint-500 font-medium text-primary",
  difficulty: "font-medium",
  tag: "border border-border bg-transparent font-normal text-foreground",
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
  size = "sm",
}: BadgeProps) {
  const sizeClasses = size === "md" ? mediumSize : smallSizes[variant];
  const colors = variant === "difficulty" ? difficultyColors[level] : "";

  return (
    <span
      className={`inline-flex max-w-full items-center justify-center rounded-full font-aptly ${sizeClasses} ${variantStyles[variant]} ${colors}`}
    >
      <span className="truncate">{children}</span>
    </span>
  );
}
