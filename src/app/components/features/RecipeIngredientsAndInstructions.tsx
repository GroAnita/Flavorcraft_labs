'use client';

import { useId, useState, type KeyboardEvent, type ReactNode } from 'react';

type Tab = 'ingredients' | 'instructions';

type RecipeIngredientsAndInstructionsProps = {
  ingredients: ReactNode;
  instructions: ReactNode;
  // Shown below the active panel on mobile only, e.g. favorite and share buttons
  mobileFooter?: ReactNode;
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'ingredients', label: 'Ingredients' },
  { key: 'instructions', label: 'Instructions' },
];

// Tabs on mobile, side by side from md. The hidden panel stays mounted,
// so servings and checked steps are kept when switching tabs
export function RecipeIngredientsAndInstructions({
  ingredients,
  instructions,
  mobileFooter,
}: RecipeIngredientsAndInstructionsProps) {
  const [active, setActive] = useState<Tab>('ingredients');
  const id = useId();

  // Left and right arrows move between the tabs, as in the ARIA tabs pattern
  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const next: Tab = active === 'ingredients' ? 'instructions' : 'ingredients';
    setActive(next);
    document.getElementById(`${id}-${next}-tab`)?.focus();
  }

  const panelClass = (tab: Tab) => (active === tab ? '' : 'hidden md:block');

  return (
    <div className="flex flex-col gap-14 md:gap-0">
      <div
        role="tablist"
        aria-label="Recipe sections"
        className="grid grid-cols-2 gap-1 rounded-lg bg-salt-50 p-1 md:hidden"
      >
        {TABS.map((tab) => {
          const isSelected = active === tab.key;
          return (
            <button
              key={tab.key}
              id={`${id}-${tab.key}-tab`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`${id}-${tab.key}-panel`}
              // Only the selected tab is in the tab order, the arrows move between them
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActive(tab.key)}
              onKeyDown={handleKeyDown}
              className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isSelected
                  ? 'bg-primary text-salt-500'
                  : 'text-nori-400 hover:bg-oat-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-[minmax(0,3fr)_minmax(0,4fr)] md:gap-16">
        <div
          id={`${id}-ingredients-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-ingredients-tab`}
          className={panelClass('ingredients')}
        >
          {ingredients}
        </div>
        <div
          id={`${id}-instructions-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-instructions-tab`}
          className={panelClass('instructions')}
        >
          {instructions}
        </div>
      </div>

      {mobileFooter && <div className="md:hidden">{mobileFooter}</div>}
    </div>
  );
}
