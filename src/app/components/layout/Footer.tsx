import Link from "next/link";
import type { ReactNode } from "react";

// TODO: confirm routes with the team. Recipes needs a dropdown
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Recipes", href: "/recipes" },
  { label: "Meal plan", href: "/meal-plan" },
  { label: "Pantry", href: "/pantry" },
  { label: "Favorites", href: "/favorites" },
];

// TODO: replace with the social URLs confirmed by the team.
const SOCIAL_LINKS: {
  label: string;
  href: string;
  filled: boolean;
  icon: ReactNode;
}[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    filled: false,
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    filled: true,
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    filled: true,
    icon: (
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-nori-500">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            aria-label="FlavorCraft Labs – go to homepage"
            className="w-fit outline-butter-500"
          >
            {/* The SVG is used as a mask so its color follows bg-* */}
            <span
              aria-hidden="true"
              className="block h-11.5 w-32.5 bg-butter-500 [mask:url(/logo-footer.svg)_no-repeat_center/contain]"
            />
          </Link>

          <ul className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  className="flex size-8 items-center justify-center rounded text-butter-500 outline-butter-500 hover:text-butter-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={social.filled ? "currentColor" : "none"}
                    stroke={social.filled ? "none" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-6"
                    aria-hidden="true"
                    focusable="false"
                  >
                    {social.icon}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <hr className="my-10 border-butter-700" />

        <div className="flex flex-col gap-10 md:flex-row-reverse md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-col gap-4 md:flex-row md:gap-7 md:text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sprout-300 outline-butter-500 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm text-sprout-300">
            &copy; {year} FlavorCraft Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
