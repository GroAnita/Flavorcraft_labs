import { forwardRef, InputHTMLAttributes, useId } from "react";
import { CircleAlert } from "lucide-react";
import {
  FIELD_HELPER_SM,
  FIELD_INPUT_SM,
  FIELD_LABEL_SM,
} from "@/app/lib/fieldStyles";

type FormFieldProps = {
  label: string;
  type?: "text" | "email" | "password" | "url";
  helperText?: string;
  error?: string;
  // "md": login and register, "sm": the compact fields in the recipe form
  size?: "md" | "sm";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size">;

const STYLES = {
  md: {
    label: "text-sm leading-none text-truffle-500 md:text-base",
    input:
      "w-full rounded-lg border border-transparent bg-salt-100 px-4 py-3.5 text-sm leading-none text-truffle-500 inset-shadow-sm placeholder:text-oat-700 md:p-4 md:text-base disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-error-text",
    helper: "text-xs text-muted-foreground",
  },
  sm: {
    label: FIELD_LABEL_SM,
    input: FIELD_INPUT_SM,
    helper: FIELD_HELPER_SM,
  },
} as const;

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(
    {
      label,
      type = "text",
      helperText,
      error,
      required,
      disabled,
      size = "md",
      ...inputProps
    },
    ref
  ) {
    const id = useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;
    const styles = STYLES[size];

    const describedBy =
      [error ? errorId : null, helperText ? helperId : null]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className="flex flex-col gap-2">
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && (
            <span aria-hidden="true" className="ml-0.5 text-error-text">
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={styles.input}
          {...inputProps}
        />

        {helperText && !error && (
          <p id={helperId} className={styles.helper}>
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
);
