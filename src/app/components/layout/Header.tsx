import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import SearchInput from "@/app/components/features/SearchInput";
import MobileMenu from "@/app/components/layout/MobileMenu";

const SEARCH_PLACEHOLDER = "What do you want to make today?";

const ACCOUNT_LINKS = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
] as const;

const BUTTON_CLASSES =
  "inline-flex h-10 items-center rounded-lg border border-basil-500 px-4 text-sm font-semibold text-basil-500 hover:bg-basil-500 hover:text-white";

// Shown while SearchInput (which reads the URL) loads, so the header keeps its size.
function SearchFallback() {
  return (
    <div
      aria-hidden="true"
      className="h-11 w-full rounded-lg bg-surface"
    />
  );
}

export default function Header() {
  return (
    <header className="relative bg-sprout-500">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[auto_1fr] items-center gap-x-4 gap-y-4 px-5 py-4 md:grid-cols-[auto_1fr_auto] md:gap-x-12 md:px-8 md:py-5">
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

        <MobileMenu links={ACCOUNT_LINKS} linkClassName={BUTTON_CLASSES} />

        <div className="col-span-2 md:col-span-1 md:w-full md:max-w-2xl">
          <Suspense fallback={<SearchFallback />}>
            <SearchInput placeholder={SEARCH_PLACEHOLDER} />
          </Suspense>
        </div>

        <nav aria-label="Account" className="hidden md:block">
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
      </div>
    </header>
  );
}
