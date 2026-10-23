"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { CircleAlert, CirclePlus } from "lucide-react";
import { addPantryItem } from "@/app/actions/pantry";
import { Dropdown } from "@/app/components/ui/Dropdown";
import { PANTRY_CATEGORIES, PANTRY_UNITS } from "@/app/lib/pantryOptions";
import type { PantryItems } from "@/app/types/recipe";

type AddPantryItemFormProps = {
  onAdded: (item: PantryItems) => void;
};

type FieldErrors = { name?: string; quantity?: string };

const CONTROL =
  "h-9.5 w-full rounded-lg bg-salt-100 px-3 text-sm leading-none text-nori-500 inset-shadow-sm placeholder:text-oat-700 disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:outline-2 aria-invalid:outline-error-text";

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        id={`${id}-label`}
        htmlFor={id}
        className="text-sm leading-none text-nori-500"
      >
        {label}
        <span aria-hidden="true" className="ml-0.5 text-error-text">
          *
        </span>
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
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

const toOptions = (values: readonly string[]) =>
  values.map((value) => ({ value, label: value }));
const UNIT_OPTIONS = toOptions(PANTRY_UNITS);
const CATEGORY_OPTIONS = toOptions(PANTRY_CATEGORIES);

// The shared dropdown (as used for sorting recipes), styled like the form inputs
function Select({
  id,
  value,
  options,
  disabled,
  onChange,
}: {
  id: string;
  value: string;
  options: { value: string; label: string }[];
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <Dropdown
      id={id}
      labelId={`${id}-label`}
      options={options}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="h-9.5"
      buttonClassName="bg-salt-100 px-3 text-nori-500 inset-shadow-sm"
    />
  );
}

export function AddPantryItemForm({ onAdded }: AddPantryItemFormProps) {
  const id = useId();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState<string>(PANTRY_UNITS[0]);
  const [category, setCategory] = useState<string>(PANTRY_CATEGORIES[0]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSaving) return;

    const trimmedName = name.trim();
    // Decimals are allowed, and 0 means the item is out of stock
    const amount = Number(quantity.replace(",", "."));

    const newErrors: FieldErrors = {};
    if (!trimmedName) newErrors.name = "Name is required";
    if (!quantity.trim()) newErrors.quantity = "Quantity is required";
    else if (!Number.isFinite(amount) || amount < 0)
      newErrors.quantity = "Enter 0 or more";

    setErrors(newErrors);
    setFormError("");
    setNeedsLogin(false);
    if (Object.keys(newErrors).length > 0) return;

    setIsSaving(true);
    const result = await addPantryItem({
      name: trimmedName,
      quantity: amount,
      unit,
      category,
    });
    setIsSaving(false);

    if (!result.ok) {
      // Keep what the user typed so they can try again
      setFormError(result.error);
      setNeedsLogin(Boolean(result.needsLogin));
      return;
    }

    onAdded(result.item);
    setName("");
    setQuantity("");
  }

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="flex flex-col gap-6 rounded-lg bg-salt-50 p-6"
    >
      <h2
        id={`${id}-title`}
        className="text-2xl leading-none font-medium text-nori-500"
      >
        Add an item
      </h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10"
      >
        {/* Mobile: Name and Category full width, Quantity and Unit side by side */}
        <div className="grid grid-cols-2 gap-4 md:flex md:flex-1 md:flex-row md:gap-3">
          <Field
            id={`${id}-name`}
            label="Name"
            error={errors.name}
            className="col-span-2 md:flex-1"
          >
            <input
              id={`${id}-name`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g. cheese"
              required
              disabled={isSaving}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              className={CONTROL}
            />
          </Field>

          <Field
            id={`${id}-quantity`}
            label="Quantity"
            error={errors.quantity}
            className="md:w-24"
          >
            <input
              id={`${id}-quantity`}
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="100"
              required
              disabled={isSaving}
              aria-invalid={errors.quantity ? true : undefined}
              aria-describedby={
                errors.quantity ? `${id}-quantity-error` : undefined
              }
              className={CONTROL}
            />
          </Field>

          <Field id={`${id}-unit`} label="Unit" className="md:w-26">
            <Select
              id={`${id}-unit`}
              value={unit}
              options={UNIT_OPTIONS}
              disabled={isSaving}
              onChange={setUnit}
            />
          </Field>

          <Field
            id={`${id}-category`}
            label="Category"
            className="col-span-2 md:w-60"
          >
            <Select
              id={`${id}-category`}
              value={category}
              options={CATEGORY_OPTIONS}
              disabled={isSaving}
              onChange={setCategory}
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          aria-busy={isSaving}
          // mt-5.5 lines the button up with the inputs below the labels on desktop
          className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg md:w-auto bg-basil-500 px-3 py-1.5 text-sm leading-6 font-semibold text-mint-500 hover:bg-basil-700 disabled:cursor-not-allowed disabled:opacity-60 md:mt-5.5 md:shrink-0"
        >
          <CirclePlus aria-hidden="true" className="size-4" />
          {isSaving ? "Adding..." : "Add ingredient"}
        </button>
      </form>

      {formError && (
        <p
          role="alert"
          className="rounded-md bg-error-bg px-3 py-2 text-sm text-error-text"
        >
          {formError}
          {needsLogin && (
            <>
              {" "}
              <Link href="/login" className="font-medium underline">
                Log in
              </Link>
            </>
          )}
        </p>
      )}
    </section>
  );
}
