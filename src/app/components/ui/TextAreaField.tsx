import { useId, type TextareaHTMLAttributes } from "react";
import { CircleAlert } from "lucide-react";
import {
  FIELD_HELPER_SM,
  FIELD_LABEL_SM,
  FIELD_TEXTAREA_SM,
} from "@/app/lib/fieldStyles";

type TextAreaFieldProps = {
  label: string;
  helperText?: string;
  error?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

// Same compact style as FormField size="sm", for longer text
export function TextAreaField({
  label,
  helperText,
  error,
  required,
  ...textareaProps
}: TextAreaFieldProps) {
  const id = useId();
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;

  const describedBy =
    [error ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={FIELD_LABEL_SM}>
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-error-text">
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={FIELD_TEXTAREA_SM}
        {...textareaProps}
      />

      {helperText && !error && (
        <p id={helperId} className={FIELD_HELPER_SM}>
          {helperText}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-xs font-medium text-error-text"
        >
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
