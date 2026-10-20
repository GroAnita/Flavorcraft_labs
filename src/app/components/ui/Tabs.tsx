"use client";

import { useId, useRef, useState, type ReactNode } from "react";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  label: string; // read by screen readers to describe the group of tabs
  tabs: readonly Tab[];
  variant?: "underline" | "segmented";
};

const styles = {
  underline: {
    list: "flex border-b border-thyme-300",
    tab: "-mb-px flex-1 border-b-4 px-1 pb-2.5 text-sm font-medium whitespace-nowrap md:flex-none md:px-7 md:text-lg",
    selected: "border-basil-500 text-basil-500",
    unselected: "border-transparent text-thyme-600 hover:text-basil-500",
    panel: "pt-6 md:pt-9",
  },
  segmented: {
    list: "grid grid-cols-2 gap-1 rounded-lg bg-surface p-2",
    tab: "rounded-md px-4 py-2 text-sm font-medium",
    selected: "bg-basil-500 text-white",
    unselected: "text-thyme-600 hover:bg-oat-200",
    panel: "pt-2",
  },
};

// Follows the WAI-ARIA tabs pattern: Tab moves into and out of the tab list, and the
// arrow keys, Home and End move between tabs
export function Tabs({ label, tabs, variant = "underline" }: TabsProps) {
  const [selectedId, setSelectedId] = useState(tabs[0]?.id);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const style = styles[variant];

  function select(index: number) {
    const tab = tabs[index];
    setSelectedId(tab.id);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    const last = tabs.length - 1;
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[e.key];

    if (next === undefined) return;
    e.preventDefault();
    select(next);
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className={style.list}>
        {tabs.map((tab, index) => {
          const isSelected = tab.id === selectedId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              // Only the selected tab is in the Tab order
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelectedId(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`${style.tab} ${isSelected ? style.selected : style.unselected}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Every panel stays mounted, so typed values aren't lost when switching tabs */}
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== selectedId}
          className={style.panel}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
