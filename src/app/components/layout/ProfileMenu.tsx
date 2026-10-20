"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth";

type Props = {
  buttonClassName: string;
  children: ReactNode; // the avatar icon
};

export default function ProfileMenu({ buttonClassName, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close when clicking or tapping outside the menu.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: PointerEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && isOpen) {
      // Stop the mobile menu around it from also reacting to Escape.
      e.stopPropagation();
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }

  return (
    <div ref={wrapperRef} onKeyDown={handleKeyDown} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label="Profile menu"
        onClick={() => setIsOpen((open) => !open)}
        className={buttonClassName}
      >
        {children}
      </button>

      {isOpen && (
        <div
          id={menuId}
          className="absolute top-full right-0 z-50 mt-3 min-w-40 rounded-lg bg-surface p-1 shadow-md"
        >
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-basil-500 hover:bg-basil-500/10"
            >
              <LogOut aria-hidden="true" className="size-4" />
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
