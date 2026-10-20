"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type NavLink = { label: string; href: string };
type IconLink = NavLink & { icon: ReactNode };

type Props = {
  links: readonly NavLink[];
  linkClassName: string;
  iconLinks: readonly IconLink[]; // shown next to the menu button; label is read by screen readers
  navLabel: string;
  className: string; // hides the menu at the breakpoint where the desktop nav shows
};

// 24px icons with 16px gaps (144px for four, as in Figma). The before: layer
// enlarges the tap area to 40px without changing the layout.
const ICON_BUTTON =
  "relative flex size-6 items-center justify-center rounded text-basil-500 hover:text-basil-700 before:absolute before:-inset-2";

export default function MobileMenu({
  links,
  linkClassName,
  iconLinks,
  navLabel,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Wraps the menu button and the menu, so focus and clicks can be checked against both.
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the menu after navigating to another page.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Close when clicking or tapping outside the menu and its button.
  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(e: PointerEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }

  // Close when keyboard focus moves outside the menu and its button. relatedTarget is
  // null when clicking a non-focusable spot, which the pointerdown handler covers.
  function handleBlur(e: React.FocusEvent) {
    const next = e.relatedTarget;
    if (next && !menuRef.current?.contains(next)) setIsOpen(false);
  }

  return (
    <div
      className={`z-50 flex items-center gap-4 justify-self-end ${className}`}
    >
      {iconLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-label={link.label}
          className={ICON_BUTTON}
        >
          {link.icon}
        </Link>
      ))}
      <div
        ref={menuRef}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className="contents"
      >
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
          className={ICON_BUTTON}
        >
          {isOpen ? (
            <X aria-hidden="true" className="size-6" strokeWidth={1.5} />
          ) : (
            <Menu aria-hidden="true" className="size-6" strokeWidth={1.5} />
          )}
        </button>

        {isOpen && (
          <nav
            id="mobile-menu"
            aria-label={navLabel}
            className="absolute inset-x-0 top-full z-10 bg-sprout-500 px-5 pb-5 shadow-md"
          >
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`${linkClassName} w-full justify-center`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}
