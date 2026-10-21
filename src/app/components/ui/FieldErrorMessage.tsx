import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

type FieldErrorMessageProps = {
  id: string;
  children: ReactNode;
  // Errors without their own field (e.g. "Add at least one ingredient")
  // can get focus when the form is sent
  focusable?: boolean;
};

// Same style as the error messages in FormField
export function FieldErrorMessage({
  id,
  children,
  focusable = false,
}: FieldErrorMessageProps) {
  return (
    <p
      id={id}
      tabIndex={focusable ? -1 : undefined}
      data-form-error={focusable || undefined}
      className="flex items-center gap-1.5 text-xs font-medium text-error-text"
    >
      <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
      {children}
    </p>
  );
}
