"use client";

import { useId } from "react";
import {
  Bean,
  Carrot,
  Citrus,
  EggOff,
  Ham,
  Milk,
  MilkOff,
  Nut,
  Salad,
  Shell,
  Vegan,
  WheatOff,
  type LucideIcon,
} from "lucide-react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

type DietAllergiesProps = {
  storageKey: string;
};

const OPTIONS: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "vegetarian", label: "Vegetarian", icon: Carrot },
  { id: "vegan", label: "Vegan", icon: Vegan },
  { id: "egg-free", label: "Egg-free", icon: EggOff },
  { id: "shellfish", label: "Shellfish", icon: Shell },
  { id: "pork", label: "Pork", icon: Ham },
  { id: "dairy", label: "Dairy", icon: Milk },
  { id: "lactose", label: "Lactose", icon: MilkOff },
  { id: "gluten", label: "Gluten", icon: WheatOff },
  { id: "nuts", label: "Nuts", icon: Nut },
  { id: "citrus", label: "Citrus", icon: Citrus },
  { id: "onion-garlic", label: "Onion/garlic", icon: Salad },
  { id: "soy", label: "Soy", icon: Bean },
];

const NONE: string[] = [];

// Choices are saved as soon as they are toggled
export function DietAllergies({ storageKey }: DietAllergiesProps) {
  const [selected, save] = useLocalStorage(storageKey, NONE);
  const headingId = useId();
  const descriptionId = useId();

  function toggle(id: string) {
    save(
      selected.includes(id)
        ? selected.filter((item) => item !== id)
        : [...selected, id]
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      className="rounded-lg bg-surface p-6 md:p-7"
    >
      <h2
        id={headingId}
        className="flex items-center gap-2 font-inter text-xl font-semibold text-truffle-500"
      >
        <Salad aria-hidden="true" className="size-6 text-basil-500" />
        Diet &amp; allergies
      </h2>
      <p id={descriptionId} className="mt-2 text-sm text-thyme-600 md:text-base">
        Choose the diets you follow and the ingredients you avoid.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
        {OPTIONS.map(({ id, label, icon: Icon }) => {
          const isSelected = selected.includes(id);
          return (
            <li key={id}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => toggle(id)}
                className={`flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg px-2 py-6 text-sm font-medium md:text-base ${
                  isSelected
                    ? "bg-basil-500 text-white hover:bg-basil-700"
                    : "bg-oat-200 text-basil-500 hover:bg-oat-400"
                }`}
              >
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
