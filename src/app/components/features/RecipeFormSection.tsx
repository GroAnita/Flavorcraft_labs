import { useId, type ReactNode } from "react";

type RecipeFormSectionProps = {
  title: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
};

// The heading, description and box around each part of the recipe form
export function RecipeFormSection({
  title,
  description,
  required = false,
  children,
}: RecipeFormSectionProps) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId} className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <h3
          id={headingId}
          className="text-xl font-medium leading-none text-truffle-500"
        >
          {title}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-error-text">
              *
            </span>
          )}
        </h3>
        {description && <p className="text-sm text-oat-800">{description}</p>}
      </div>

      <div className="rounded-lg border border-oat-300 p-4">{children}</div>
    </section>
  );
}
