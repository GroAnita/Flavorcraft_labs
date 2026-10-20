"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Calendar,
  ChefHat,
  CirclePlus,
  Heart,
  House,
  LogIn,
  LogOut,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import { logout } from "@/app/actions/auth";
import { Avatar } from "@/app/components/ui/Avatar";

type IconLink = { label: string; href: string; icon: ReactNode };
type MenuLink = { label: string; href: string; icon: LucideIcon };

type Props = {
  iconLinks: readonly IconLink[]; // shown next to the menu button; label is read by screen readers
  isLoggedIn: boolean;
  // null when logged out, or for sessions created before the profile was saved
  profile: { name: string; avatarUrl?: string | null } | null;
  className: string; // hides the menu at the breakpoint where the desktop nav shows
};

const LOGGED_IN_LINKS: MenuLink[] = [
  { label: "Home", href: "/", icon: House },
  { label: "Recipes", href: "/recipes", icon: BookOpen },
  { label: "Meal plan", href: "/meal-plan", icon: Calendar },
  { label: "Pantry", href: "/pantry", icon: ChefHat },
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "Create recipe", href: "/recipes/create", icon: CirclePlus },
];

const LOGGED_OUT_LINKS = LOGGED_IN_LINKS.slice(0, 2);

const ACCOUNT_LINKS = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

// 24px icons with 16px gaps (144px for four, as in Figma). The before: layer
// enlarges the tap area to 40px without changing the layout.
const ICON_BUTTON =
  "relative flex size-6 items-center justify-center rounded text-basil-500 hover:text-basil-700 before:absolute before:-inset-2";

const OUTLINE_BUTTON =
  "flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-basil-500 text-sm font-semibold text-basil-500 hover:bg-sprout-200";

// "/" only matches the home page; other links also match their sub-pages
function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function MobileMenu({
  iconLinks,
  isLoggedIn,
  profile,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Wraps the menu button and the menu, so focus and clicks can be checked against both.
  const menuRef = useRef<HTMLDivElement>(null);

  const links = isLoggedIn ? LOGGED_IN_LINKS : LOGGED_OUT_LINKS;
  // /recipes/create should highlight Create recipe, not Recipes, so the longest match wins
  const currentHref = links
    .filter((link) => isCurrent(pathname, link.href))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;

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
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full z-10 divide-y divide-basil-500 bg-sprout-100 shadow-md"
          >
            {profile && (
              <div className="flex items-center gap-4 px-5 py-6">
                <Avatar
                  name={profile.name}
                  src={profile.avatarUrl}
                  alt=""
                  size="lg"
                />
                <div className="min-w-0">
                  <p className="truncate font-aptly text-2xl font-semibold text-truffle-500">
                    {profile.name}
                  </p>
                  <p className="truncate text-sm text-thyme-600">
                    @{profile.name.toLowerCase()}
                  </p>
                </div>
              </div>
            )}

            <nav aria-label="Main" className="px-5 py-6">
              <ul className="flex flex-col gap-1">
                {links.map(({ label, href, icon: Icon }) => {
                  const isActive = href === currentHref;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                          isActive
                            ? "bg-basil-500 text-white"
                            : "text-truffle-500 hover:bg-sprout-200"
                        }`}
                      >
                        <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-col gap-2 px-5 py-6">
              {isLoggedIn ? (
                <form action={logout}>
                  <button type="submit" className={OUTLINE_BUTTON}>
                    Log out
                    <LogOut aria-hidden="true" className="size-4" />
                  </button>
                </form>
              ) : (
                ACCOUNT_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={OUTLINE_BUTTON}
                  >
                    {link.label}
                    <LogIn aria-hidden="true" className="size-4" />
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
