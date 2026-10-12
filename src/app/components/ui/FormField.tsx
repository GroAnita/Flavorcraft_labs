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
      <div>
        <label htmlFor={id}>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          required={required}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...inputProps}
        />

        {helperText && !error && <p id={helperId}>{helperText}</p>}
        {error && (
          <p id={errorId} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
