import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CirclePlus, CircleUserRound, Heart, Plus } from "lucide-react";
import SearchInput from "@/app/components/features/SearchInput";
import MobileMenu from "@/app/components/layout/MobileMenu";
import ProfileMenu from "@/app/components/layout/ProfileMenu";
import { getAccessToken } from "@/app/lib/session";

const SEARCH_PLACEHOLDER = "What do you want to make today?";

const ACCOUNT_LINKS = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
] as const;

const NAV_LINKS = [
  { label: "Recipes", href: "/recipes" },
  { label: "Meal plan", href: "/meal-plan" },
  { label: "Pantry", href: "/pantry" },
  { label: "Favorites", href: "/favorites" },
] as const;

const CREATE_LINK = { label: "Create", href: "/recipes/create" } as const;

const MOBILE_ICON = "size-6";
const MOBILE_ICON_STROKE = 1.5; // thinner outline, as in Figma

// Favorites and Create are icons on mobile, so the menu only lists the remaining links.
const MOBILE_MENU_LINKS = NAV_LINKS.filter((link) => link.href !== "/favorites");

const MOBILE_ICON_LINKS = [
  {
    label: "Favorites",
    href: "/favorites",
    icon: <Heart aria-hidden="true" className={MOBILE_ICON} strokeWidth={MOBILE_ICON_STROKE} />,
  },
  {
    label: "Create recipe",
    href: CREATE_LINK.href,
    icon: <CirclePlus aria-hidden="true" className={MOBILE_ICON} strokeWidth={MOBILE_ICON_STROKE} />,
  },
];

const MOBILE_LOGIN_LINK = {
  label: "Login",
  href: "/login",
  icon: <CircleUserRound aria-hidden="true" className={MOBILE_ICON} strokeWidth={MOBILE_ICON_STROKE} />,
};

const BUTTON_CLASSES =
  "inline-flex h-10 items-center rounded-lg border border-basil-500 px-4 text-sm font-semibold text-basil-500 hover:bg-basil-500 hover:text-white";

// The logged-in nav needs more room, so it switches to the desktop layout at lg instead of md.
const LAYOUT = {
  loggedOut: {
    grid: "md:grid-cols-[auto_1fr_auto]",
    search: "md:col-span-1",
    desktop: "hidden md:block",
    mobile: "md:hidden",
  },
  loggedIn: {
    grid: "lg:grid-cols-[auto_1fr_auto]",
    search: "lg:col-span-1",
    desktop: "hidden lg:block",
    mobile: "lg:hidden",
  },
} as const;

// Shown while SearchInput (which reads the URL) loads, so the header keeps its size.
function SearchFallback() {
  return (
    <div
      aria-hidden="true"
      className="h-11 w-full rounded-lg bg-surface"
    />
  );
}

export default async function Header() {
  const isLoggedIn = Boolean(await getAccessToken());
  const layout = isLoggedIn ? LAYOUT.loggedIn : LAYOUT.loggedOut;

  return (
    <header className="relative bg-sprout-500">
      <div
        className={`mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4 px-5 py-4 md:gap-x-12 md:px-8 md:py-5 ${layout.grid}`}
      >
        <Link
          href="/"
          aria-label="FlavorCraft Labs – go to homepage"
          className="block w-fit rounded"
        >
          <Image
            src="/logo-header.svg"
            alt=""
            width={130}
            height={46}
            loading="eager"
          />
        </Link>

        <MobileMenu
          links={isLoggedIn ? MOBILE_MENU_LINKS : ACCOUNT_LINKS}
          linkClassName={BUTTON_CLASSES}
          iconLinks={isLoggedIn ? MOBILE_ICON_LINKS : [MOBILE_LOGIN_LINK]}
          profileIcon={
            isLoggedIn && (
              <CircleUserRound
                aria-hidden="true"
                className={MOBILE_ICON}
                strokeWidth={MOBILE_ICON_STROKE}
              />
            )
          }
          navLabel={isLoggedIn ? "Main" : "Account"}
          className={layout.mobile}
        />

        <div className={`col-span-2 md:w-full md:max-w-2xl ${layout.search}`}>
          <Suspense fallback={<SearchFallback />}>
            <SearchInput placeholder={SEARCH_PLACEHOLDER} />
          </Suspense>
        </div>

        {isLoggedIn ? (
          <nav aria-label="Main" className={layout.desktop}>
            <ul className="flex items-center gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded font-medium text-basil-500 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={CREATE_LINK.href}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-basil-500 px-3.5 text-sm font-semibold text-white hover:bg-basil-700"
                >
                  <Plus aria-hidden="true" className="size-4" />
                  {CREATE_LINK.label}
                </Link>
              </li>
              <li>
                <ProfileMenu buttonClassName="flex size-10 items-center justify-center rounded-full text-basil-500 hover:bg-basil-500/10">
                  <CircleUserRound aria-hidden="true" className="size-7" />
                </ProfileMenu>
              </li>
            </ul>
          </nav>
        ) : (
          <nav aria-label="Account" className={layout.desktop}>
            <ul className="flex items-center gap-2">
              {ACCOUNT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={BUTTON_CLASSES}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
