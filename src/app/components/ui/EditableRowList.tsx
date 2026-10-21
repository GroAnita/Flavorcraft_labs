import { useId, type ReactNode, type RefObject } from "react";
import { CirclePlus } from "lucide-react";

type EditableRowListProps = {
  title: string;
  description: string;
  addLabel: string;
  onAdd: () => void;
  // Wraps the rows and the add button, so focus can be moved between them
  containerRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

export const ROW_INPUT_CLASSES =
  "w-full rounded-lg border border-transparent bg-salt-100 px-3 py-2.5 text-sm text-truffle-500 inset-shadow-sm placeholder:text-oat-700";

export function RowNumber({ number }: { number: number }) {
  return (
    <span
      aria-hidden="true"
      className="flex size-6 shrink-0 items-center justify-center rounded-full bg-basil-700 text-xs font-medium text-salt-50"
    >
      {number}
    </span>
  );
}

export function EditableRowList({
  title,
  description,
  addLabel,
  onAdd,
  containerRef,
  children,
}: EditableRowListProps) {
  const id = useId();
  const headingId = `${id}-heading`;
  const descriptionId = `${id}-description`;

  return (
    <section
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      className="flex flex-col gap-2"
    >
      <h3 id={headingId} className="text-xl text-foreground">
        {title}
        <span aria-hidden="true" className="ml-0.5 text-error-text">
          *
        </span>
      </h3>
      <p id={descriptionId} className="text-sm text-muted-foreground">
        {description}
      </p>

      <div
        ref={containerRef}
        className="flex flex-col gap-4 rounded-xl border border-oat-500 bg-surface p-4"
      >
        {children}

        {/* Lines up with the fields, past the row numbers, from md */}
        <button
          type="button"
          data-row-add
          onClick={onAdd}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-oat-100 md:ml-9 md:w-auto md:self-start"
        >
          <CirclePlus aria-hidden="true" className="size-4" />
          {addLabel}
        </button>
      </div>
    </section>
  );
}
