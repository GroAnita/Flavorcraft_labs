import { forwardRef, InputHTMLAttributes, useId } from "react";
import { CircleAlert } from "lucide-react";

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
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="text-sm leading-none text-truffle-500 md:text-base"
        >
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
          className="w-full rounded-lg border border-transparent bg-salt-100 px-4 py-3.5 text-sm leading-none text-truffle-500 inset-shadow-sm placeholder:text-oat-700 md:p-4 md:text-base disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-error-text"
          {...inputProps}
        />

        {helperText && !error && (
          <p id={helperId} className="text-xs text-muted-foreground">
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
