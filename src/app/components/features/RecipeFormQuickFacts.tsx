'use client';

import type {
  Difficulty,
  RecipeFormSectionProps,
} from '@/app/types/recipeForm';
import { RECIPE_FILTER_GROUPS } from '@/app/lib/recipeFilters';
import { FIELD_LABEL_SM } from '@/app/lib/fieldStyles';
import { RecipeFormSection } from '@/app/components/features/RecipeFormSection';
import { FormField } from '@/app/components/ui/FormField';
import { SelectField } from '@/app/components/ui/SelectField';
import { ServingsControl } from '@/app/components/ui/ServingsControl';

// The same categories as the Mealtype filter, so new recipes can be found with it.
// Only the category options are used (Cakes is a tag, not a category)
const CATEGORY_OPTIONS =
  RECIPE_FILTER_GROUPS.find((group) => group.id === 'mealtype')
    ?.options.filter((option) => option.value.startsWith('category:'))
    .map((option) => ({ label: option.label, value: option.label })) ?? [];

const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

// Only digits, so the field can't get letters, "e" or minus signs
function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

export function RecipeFormQuickFacts({
  values,
  onChange,
  errors,
}: RecipeFormSectionProps) {
  return (
    <RecipeFormSection title="Quick facts">
      <div className="flex flex-col gap-6">
        {/* Mobile: prep and cook side by side, then servings and category on their own rows.
            Desktop: one row, with 120px for each time and the category filling the rest.
            items-start keeps the labels in line when a field shows an error */}
        <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-[120px_120px_auto_minmax(0,1fr)]">
          <FormField
            size="sm"
            label="Prep time (min)"
            required
            inputMode="numeric"
            placeholder="0"
            value={values.prepTime}
            error={errors?.prepTime}
            onChange={(e) => onChange({ prepTime: onlyDigits(e.target.value) })}
          />
          <FormField
            size="sm"
            label="Cook time (min)"
            required
            inputMode="numeric"
            placeholder="0"
            value={values.cookTime}
            error={errors?.cookTime}
            onChange={(e) => onChange({ cookTime: onlyDigits(e.target.value) })}
          />

          {/* Label next to the buttons on mobile, above them on desktop */}
          <div className="col-span-2 flex items-center justify-between gap-2 md:col-span-1 md:flex-col md:items-start">
            {/* ServingsControl is a group labelled "Servings" for screen readers,
                so the visible label is hidden from them to avoid reading it twice */}
            <span aria-hidden="true" className={FIELD_LABEL_SM}>
              Servings
            </span>
            <div className="flex items-center md:h-[38px]">
              <ServingsControl
                servings={values.servings}
                onChange={(servings) => onChange({ servings })}
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <SelectField
              label="Category"
              placeholder="Choose a category"
              options={CATEGORY_OPTIONS}
              value={values.category}
              onChange={(e) => onChange({ category: e.target.value })}
            />
          </div>
        </div>

        {/* Radio buttons give keyboard support for free: Tab into the group,
            and the arrow keys move between the options */}
        <fieldset>
          <legend className={`mb-2 ${FIELD_LABEL_SM}`}>Difficulty</legend>
          {/* 52px outer box with 8px padding, and a 36px track inside, as in Figma */}
          <div className="rounded-xl bg-salt-50 p-2">
            <div className="grid grid-cols-3 rounded-lg bg-salt-50 inset-shadow-[3px_3px_6px_rgb(0_0_0/0.05)]">
              {DIFFICULTIES.map((difficulty) => (
                <label
                  key={difficulty}
                  className="flex h-9 cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-sm leading-5 font-medium text-nori-400 transition-colors hover:bg-oat-100 has-checked:bg-primary has-checked:font-semibold has-checked:text-salt-500 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-foreground"
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={difficulty}
                    checked={values.difficulty === difficulty}
                    onChange={() => onChange({ difficulty })}
                    className="sr-only"
                  />
                  {difficulty}
                </label>
              ))}
            </div>
          </div>
        </fieldset>
      </div>
    </RecipeFormSection>
  );
}
