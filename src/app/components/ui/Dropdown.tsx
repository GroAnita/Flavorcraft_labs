"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type DropdownOption<T extends string> = {
  value: T;
  label: string;
};

type DropdownProps<T extends string> = {
  options: readonly DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  // Use `labelId` when a visible <label> names the dropdown, otherwise `ariaLabel`
  labelId?: string;
  ariaLabel?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
  // Styles for the closed button, so each place can match its design
  buttonClassName?: string;
};

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-basil-500";

// Custom dropdown styled like the rest of the design. Follows the ARIA
// listbox pattern: arrow keys move, Enter/Space selects, Escape closes.
export function Dropdown<T extends string>({
  options,
  value,
  onChange,
  labelId,
  ariaLabel,
  id,
  disabled = false,
  className = "",
  buttonClassName = "",
}: DropdownProps<T>) {
  const generatedId = useId();
  const buttonId = id ?? `${generatedId}-button`;
  const listId = `${generatedId}-list`;
  const optionId = (index: number) => `${generatedId}-option-${index}`;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0
  );
  const selectedLabel = options[selectedIndex]?.label;

  // Move focus into the list when it opens
  useEffect(() => {
    if (isOpen) listRef.current?.focus();
  }, [isOpen]);

  // Keep the active option visible when the list scrolls
  useEffect(() => {
    if (!isOpen) return;
    document
      .getElementById(`${generatedId}-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex, generatedId]);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  function open() {
    setActiveIndex(selectedIndex);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    buttonRef.current?.focus();
  }

  function select(index: number) {
    onChange(options[index].value);
    close();
  }

  function handleButtonKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      open();
    }
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => Math.min(index + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) => Math.max(index - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        select(activeIndex);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        // With a visible label the name is "<label> <value>", e.g. "Unit g"
        aria-labelledby={labelId ? `${labelId} ${buttonId}` : undefined}
        aria-label={labelId ? undefined : `${ariaLabel}: ${selectedLabel}`}
        onClick={() => (isOpen ? close() : open())}
        onKeyDown={handleButtonKeyDown}
        className={`flex h-full w-full items-center justify-between gap-2 rounded-lg text-sm leading-5 disabled:cursor-not-allowed disabled:opacity-60 ${FOCUS_RING} ${buttonClassName}`}
      >
        {selectedLabel}
        <ChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-label={labelId ? undefined : ariaLabel}
          aria-activedescendant={optionId(activeIndex)}
          onKeyDown={handleListKeyDown}
          className="absolute top-full right-0 left-0 z-20 mt-1 flex max-h-72 min-w-max flex-col gap-0.5 overflow-y-auto rounded-lg border border-oat-500 bg-salt-50 p-1 shadow-md focus-visible:outline-none"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;
            return (
              <li
                key={option.value}
                id={optionId(index)}
                role="option"
                aria-selected={isSelected}
                onClick={() => select(index)}
                onMouseMove={() => setActiveIndex(index)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm leading-5 ${
                  isSelected ? "font-medium text-basil-500" : "text-nori-500"
                } ${isActive ? "bg-mint-500" : ""}`}
              >
                {option.label}
                {isSelected && (
                  <Check aria-hidden="true" className="size-4 shrink-0" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
