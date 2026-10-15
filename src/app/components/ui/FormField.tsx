import { forwardRef, InputHTMLAttributes, useId } from "react";

type FormFieldProps = {
  label: string;
  type?: "text" | "email" | "password";
  helperText?: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(
    {
      label,
      type = "text",
      helperText,
      error,
      required,
      disabled,
      ...inputProps
    },
    ref
  ) {
    const id = useId();
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const describedBy =
      [error ? errorId : null, helperText ? helperId : null]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium">
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
          className="h-11 w-full rounded-md border border-salt-700 bg-surface px-3 text-sm placeholder:text-salt-900 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-error-text"
          {...inputProps}
        />

        {helperText && !error && (
          <p id={helperId} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-error-text">
            {error}
          </p>
        )}
      </div>
    );
  }
);
