import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

type RowActionsProps = {
  // Names the row in the button labels, e.g. "ingredient 2"
  rowLabel: string;
  canMoveUp: boolean;
  canMoveDown: boolean;
  // False on the last row of a list that needs at least one row
  canRemove?: boolean;
  onMove: (direction: "up" | "down") => void;
  onRemove: () => void;
};

const BUTTON_CLASSES =
  "flex size-8 cursor-pointer items-center justify-center rounded-md";

const MOVE_CLASSES = `${BUTTON_CLASSES} bg-olive-500 text-salt-50 hover:bg-olive-700 aria-disabled:cursor-not-allowed aria-disabled:bg-olive-100 aria-disabled:hover:bg-olive-100`;

const REMOVE_CLASSES = `${BUTTON_CLASSES} bg-error-bg text-error-text hover:bg-error-text/15 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:hover:bg-error-bg`;

export function RowActions({
  rowLabel,
  canMoveUp,
  canMoveDown,
  canRemove = true,
  onMove,
  onRemove,
}: RowActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        data-row-action="up"
        aria-label={`Move ${rowLabel} up`}
        // aria-disabled instead of disabled so focus stays on the button after moving to the top
        aria-disabled={!canMoveUp}
        onClick={() => {
          if (canMoveUp) onMove("up");
        }}
        className={MOVE_CLASSES}
      >
        <ChevronUp aria-hidden="true" className="size-4" />
      </button>
      <button
        type="button"
        data-row-action="down"
        aria-label={`Move ${rowLabel} down`}
        aria-disabled={!canMoveDown}
        onClick={() => {
          if (canMoveDown) onMove("down");
        }}
        className={MOVE_CLASSES}
      >
        <ChevronDown aria-hidden="true" className="size-4" />
      </button>
      <button
        type="button"
        aria-label={
          canRemove
            ? `Remove ${rowLabel}`
            : `Remove ${rowLabel}, not available. At least one is required`
        }
        // aria-disabled instead of disabled, so the button can still be reached
        // with the keyboard and screen readers say why it can't be used
        aria-disabled={!canRemove}
        title={canRemove ? undefined : "At least one is required"}
        onClick={() => {
          if (canRemove) onRemove();
        }}
        className={REMOVE_CLASSES}
      >
        <Trash2 aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}
