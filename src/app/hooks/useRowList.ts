import { useEffect, useRef } from "react";
import { moveRow } from "@/app/lib/recipeForm";

// Elements are found with data attributes, so the list markup decides
// which field is a row's first field and which buttons are its actions.
function rowSelector(id: string, target: string) {
  return `[data-row-id="${id}"] [${target}]`;
}

const FIRST_FIELD = "data-row-first-field";
const ADD_BUTTON = "[data-row-add]";

type RowListOptions = {
  // The fewest rows the list can have. Removing stops at this number
  minRows?: number;
};

// Add, edit, move and remove rows in a list that lives in the form state.
// Focus is set after the parent has re-rendered with the new rows: moving a
// row moves its DOM node, which drops focus, and a removed row takes its
// focus with it.
export function useRowList<T extends { id: string }>(
  rows: T[],
  onChange: (rows: T[]) => void,
  createRow: () => T,
  { minRows = 0 }: RowListOptions = {}
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<string | null>(null);
  const canRemove = rows.length > minRows;

  useEffect(() => {
    if (!pendingFocus.current) return;
    containerRef.current
      ?.querySelector<HTMLElement>(pendingFocus.current)
      ?.focus();
    pendingFocus.current = null;
  }, [rows]);

  function add() {
    const row = createRow();
    pendingFocus.current = rowSelector(row.id, FIRST_FIELD);
    onChange([...rows, row]);
  }

  function update(id: string, changes: Partial<T>) {
    onChange(rows.map((row) => (row.id === id ? { ...row, ...changes } : row)));
  }

  function move(index: number, direction: "up" | "down") {
    const to = direction === "up" ? index - 1 : index + 1;
    if (to < 0 || to >= rows.length) return;
    // Keep focus on the same button, so it can be pressed again
    pendingFocus.current = rowSelector(
      rows[index].id,
      `data-row-action="${direction}"`
    );
    onChange(moveRow(rows, index, to));
  }

  function remove(index: number) {
    // The list keeps at least minRows rows, even if the button is pressed
    if (!canRemove) return;
    // Focus the row that takes its place, the row before it, or the add button
    const neighbour = rows[index + 1] ?? rows[index - 1];
    pendingFocus.current = neighbour
      ? rowSelector(neighbour.id, FIRST_FIELD)
      : ADD_BUTTON;
    onChange(rows.filter((_, i) => i !== index));
  }

  return { containerRef, add, update, move, remove, canRemove };
}
