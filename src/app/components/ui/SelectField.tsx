import { useId, type SelectHTMLAttributes } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { FIELD_INPUT_SM, FIELD_LABEL_SM } from "@/app/lib/fieldStyles";

type SelectOption = { label: string; value: string };

type SelectFieldProps = {
  label: string;
  options: SelectOption[];
  // Shown first with an empty value, e.g. "Choose a category"
  placeholder?: string;
  error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

// Same compact style as FormField size="sm", with a native select
export function SelectField({
  label,
  options,
  placeholder,
  error,
  required,
  ...selectProps
}: SelectFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

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
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`${FIELD_INPUT_SM} cursor-pointer appearance-none pr-10`}
          {...selectProps}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-truffle-500"
        />
      </div>

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
