"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "My profile", href: "/profile" },
  { label: "My recipes", href: "/profile/recipes" },
  { label: "Favorites", href: "/favorites" },
  { label: "Settings", href: "/profile/settings" },
];

// Links rather than tabs, so each section has its own address that works on refresh
export function ProfileNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Profile">
      <ul className="flex border-b border-thyme-300">
        {LINKS.map((link) => {
          const isCurrent = pathname === link.href;
          return (
            <li key={link.href} className="-mb-px flex-1 md:flex-none">
              <Link
                href={link.href}
                aria-current={isCurrent ? "page" : undefined}
                className={`block border-b-4 px-1 pb-2.5 text-center text-sm font-medium whitespace-nowrap md:px-7 md:text-lg ${
                  isCurrent
                    ? "border-basil-500 text-basil-500"
                    : "border-transparent text-thyme-600 hover:text-basil-500"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
