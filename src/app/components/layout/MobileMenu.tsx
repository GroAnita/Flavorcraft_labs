"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Menu, X } from "lucide-react";

type Props = {
  links: readonly { label: string; href: string }[];
  linkClassName: string;
};

const ICON_BUTTON =
  "flex size-11 items-center justify-center rounded-lg text-basil-500 hover:bg-basil-500/10";

export default function MobileMenu({ links, linkClassName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the menu after navigating to another page.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      className="flex items-center gap-1 justify-self-end md:hidden z-50"
    >
      <Link href="/login" aria-label="Login" className={ICON_BUTTON}>
        <CircleUserRound aria-hidden="true" className="size-7" />
      </Link>
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
          <X aria-hidden="true" className="size-7" />
        ) : (
          <Menu aria-hidden="true" className="size-7" />
        )}
      </button>

      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Account"
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
  );
}
