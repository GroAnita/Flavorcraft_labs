"use client";

import { useId, useState } from "react";
import { ChevronDown, UserRound } from "lucide-react";
import { FormField } from "@/app/components/ui/FormField";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

type GeneralDetails = {
  name: string;
  email: string;
  skillLevel: string;
};

type FieldErrors = { name?: string; email?: string };

type ProfileGeneralFormProps = {
  // Used as the starting values until the user saves their own
  defaults: GeneralDetails;
  storageKey: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

export function ProfileGeneralForm({
  defaults,
  storageKey,
}: ProfileGeneralFormProps) {
  const [saved, save] = useLocalStorage(storageKey, defaults);
  // null until the user edits a field, so the form shows the saved values
  const [draft, setDraft] = useState<GeneralDetails | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState("");
  const skillId = useId();
  const headingId = useId();

  const values = draft ?? saved;

  function update(field: keyof GeneralDetails, value: string) {
    setDraft({ ...values, [field]: value });
    setStatus("");
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmed = {
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
    };
    const newErrors: FieldErrors = {};
    if (!trimmed.name) newErrors.name = "Name is required";
    if (!trimmed.email) newErrors.email = "Email is required";
    else if (!EMAIL_PATTERN.test(trimmed.email))
      newErrors.email = "Enter a valid email address";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setStatus("");
      return;
    }

    if (save(trimmed)) {
      setDraft(null);
      setStatus("Your details are saved.");
    } else {
      setStatus("Your details could not be saved in this browser.");
    }
  }

  function handleReset() {
    setDraft(null);
    setErrors({});
    setStatus("");
  }

  return (
    <section
      id="general-information"
      aria-labelledby={headingId}
      className="scroll-mt-6 rounded-lg bg-surface p-6 md:p-7"
    >
      <h2
        id={headingId}
        className="flex items-center gap-2 font-inter text-xl font-semibold text-truffle-500"
      >
        <UserRound aria-hidden="true" className="size-6 text-basil-500" />
        General information
      </h2>
      <p className="mt-2 text-sm text-thyme-600 md:text-base">
        Update your basic profile information
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 flex flex-col gap-5"
      >
        <FormField
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="Example Name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <FormField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Example@email.com"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />

        <div className="flex flex-col gap-2">
          <label
            htmlFor={skillId}
            className="text-sm leading-none text-truffle-500 md:text-base"
          >
            Cooking skill level
          </label>
          <div className="relative">
            <select
              id={skillId}
              name="skillLevel"
              value={values.skillLevel}
              onChange={(e) => update("skillLevel", e.target.value)}
              className="w-full appearance-none rounded-lg bg-salt-100 px-4 py-3.5 pr-11 text-sm leading-none text-truffle-500 inset-shadow-sm md:p-4 md:pr-11 md:text-base"
            >
              <option value="">Choose a level</option>
              {SKILL_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-truffle-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-thyme-600">
            These fields are only saved once you click &ldquo;Save
            details&rdquo;.
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="h-10 rounded-lg px-4 text-sm font-semibold text-truffle-500 hover:bg-oat-200"
            >
              Reset
            </button>
            <button
              type="submit"
              className="h-10 rounded-lg bg-basil-500 px-4 text-sm font-semibold text-white hover:bg-basil-700"
            >
              Save details
            </button>
          </div>
        </div>
      </form>

      {/* Always rendered, so screen readers announce the message when it changes */}
      <p role="status" className="mt-3 text-sm font-medium text-basil-500">
        {status}
      </p>
    </section>
  );
}
