"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { Check, CircleAlert, SquarePen, Trash2 } from "lucide-react";
import { deletePantryItem, updatePantryItem } from "@/app/actions/pantry";
import { Badge } from "@/app/components/ui/Badge";
import { Dropdown } from "@/app/components/ui/Dropdown";
import { PANTRY_UNITS, isOutOfStock } from "@/app/lib/pantryOptions";
import { formatUpdated } from "@/app/lib/pantryUtils";
import type { PantryItems } from "@/app/types/recipe";

type PantryItemRowProps = {
  item: PantryItems;
  now: number;
  onUpdated: (item: PantryItems) => void;
  onDeleted: (id: string) => void;
};

const FIELD =
  "h-9.5 w-full rounded-lg bg-salt-100 px-3 text-sm leading-none text-nori-500 inset-shadow-sm disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:outline-2 aria-invalid:outline-error-text";
const ACTION =
  "flex size-8 shrink-0 items-center justify-center rounded-lg disabled:cursor-not-allowed disabled:opacity-60";

export function PantryItemRow({ item, now, onUpdated, onDeleted }: PantryItemRowProps) {
  const id = useId();
  const quantityRef = useRef<HTMLInputElement>(null);
  const [quantity, setQuantity] = useState(String(item.quantity));
  const [unit, setUnit] = useState(item.unit);
  const [status, setStatus] = useState<"idle" | "saving" | "deleting">("idle");
  const [error, setError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);

  const amount = Number(quantity.replace(",", "."));
  const isDirty = amount !== item.quantity || unit !== item.unit;
  const isBusy = status !== "idle";
  const outOfStock = isOutOfStock(item);

  // Keep a unit from the API that isn't in our list, so it isn't lost
  const unitOptions = [
    ...(PANTRY_UNITS.includes(item.unit as (typeof PANTRY_UNITS)[number])
      ? []
      : [item.unit]),
    ...PANTRY_UNITS,
  ].map((value) => ({ value, label: value }));

  function showError(result: { error: string; needsLogin?: boolean }) {
    setError(result.error);
    setNeedsLogin(Boolean(result.needsLogin));
  }

  async function handleSave() {
    if (!quantity.trim() || !Number.isFinite(amount) || amount < 0) {
      setError("Enter a quantity of 0 or more");
      quantityRef.current?.focus();
      return;
    }
    setError("");
    setStatus("saving");
    const result = await updatePantryItem(item.id, { quantity: amount, unit });
    setStatus("idle");
    if (result.ok) onUpdated(result.item);
    else showError(result);
  }

  async function handleDelete() {
    setError("");
    setStatus("deleting");
    const result = await deletePantryItem(item.id);
    if (result.ok) {
      onDeleted(item.id);
      return;
    }
    setStatus("idle");
    showError(result);
  }

  return (
    <li className="flex flex-col gap-2 border-t border-oat-500 px-6 py-4 md:py-3">
      {/* Mobile: a bordered card with the actions stacked on the right. Desktop: one row */}
      <div className="grid grid-cols-[1fr_auto] gap-4 rounded-lg border border-oat-500 p-3 md:grid-cols-[1fr_auto_auto] md:items-end md:gap-6 md:rounded-none md:border-0 md:p-0">
        <div className="flex min-w-0 flex-col md:self-center">
          <p
            className={`flex items-center gap-2 text-lg leading-7 font-semibold ${
              outOfStock ? "text-oat-800" : "text-nori-500"
            }`}
          >
            <span className="truncate">{item.name}</span>
            {outOfStock && (
              <Badge variant="tag">
                <span aria-hidden="true">OUT</span>
                <span className="sr-only">Out of stock</span>
              </Badge>
            )}
          </p>
          {/* suppressHydrationWarning: the server and browser clocks can differ by a minute */}
          <p suppressHydrationWarning className="text-base leading-6 text-nori-300">
            {formatUpdated(item.updated, now)}
          </p>
        </div>

        <div className="col-start-2 row-start-1 flex flex-col gap-1 md:col-start-3 md:flex-row md:gap-2 md:pb-0.75">
          {isDirty ? (
            <button
              type="button"
              onClick={handleSave}
              disabled={isBusy}
              aria-busy={status === "saving"}
              aria-label={`Save changes to ${item.name}`}
              className={`${ACTION} bg-mint-500 text-basil-500 hover:bg-mint-600`}
            >
              <Check aria-hidden="true" className="size-4.5" />
            </button>
          ) : (
            // Moves focus to the quantity, where the item is edited
            <button
              type="button"
              onClick={() => quantityRef.current?.focus()}
              disabled={isBusy}
              aria-label={`Edit ${item.name}`}
              className={`${ACTION} bg-mint-500 text-basil-500 hover:bg-mint-600`}
            >
              <SquarePen aria-hidden="true" className="size-4.5" />
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isBusy}
            aria-busy={status === "deleting"}
            aria-label={`Delete ${item.name}`}
            className={`${ACTION} bg-error-bg text-error-text hover:brightness-95`}
          >
            <Trash2 aria-hidden="true" className="size-4.5" />
          </button>
        </div>

        <div aria-hidden="true" className="col-span-2 border-t border-oat-500 md:hidden" />

        <div className="col-span-2 flex gap-4 md:col-span-1 md:col-start-2 md:row-start-1">
          <div className="flex flex-1 flex-col gap-2 md:w-30 md:flex-none">
            <label htmlFor={`${id}-quantity`} className="text-sm leading-none text-nori-500">
              Quantity<span aria-hidden="true" className="ml-0.5 text-error-text">*</span>
            </label>
            <input
              ref={quantityRef}
              id={`${id}-quantity`}
              type="number"
              inputMode="decimal"
              min={0}
              step="any"
              required
              value={quantity}
              disabled={isBusy}
              onChange={(e) => setQuantity(e.target.value)}
              aria-invalid={error && !needsLogin ? true : undefined}
              className={FIELD}
            />
          </div>

          <div className="flex flex-1 flex-col gap-2 md:w-30 md:flex-none">
            <span id={`${id}-unit-label`} className="text-sm leading-none text-nori-500">
              Unit<span aria-hidden="true" className="ml-0.5 text-error-text">*</span>
            </span>
            <Dropdown
              labelId={`${id}-unit-label`}
              options={unitOptions}
              value={unit}
              onChange={setUnit}
              disabled={isBusy}
              className="h-9.5"
              buttonClassName="bg-salt-100 px-3 text-nori-500 inset-shadow-sm"
            />
          </div>
        </div>
      </div>

      {status === "saving" && (
        <p role="status" className="text-xs text-oat-800">
          Saving…
        </p>
      )}
      {error && (
        <p role="alert" className="flex items-center gap-1.5 text-xs font-medium text-error-text">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
          {needsLogin && (
            <Link href="/login" className="underline">
              Log in
            </Link>
          )}
        </p>
      )}
    </li>
  );
}
