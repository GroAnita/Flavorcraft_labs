# AI Usage Log - FlavorCraft Labs

## Purpose and Approach

This document records how AI tools were used to build FlavorCraft Labs, so the client and future developers can understand and continue the project.

The team used AI as an assistant, not to generate the whole application. Team members asked for drafts, explanations, reviews and research, then evaluated, corrected and tested the results. Every decision recorded here was made or approved by a team member.

This condensed log is made by Claude Code (Anthropic), and reviewed by the team, from the full `AI_LOG.md` entries, summarizing the key points, decisions, and outcomes for each feature area.

## How to Read This Log

1. **Start with the [Handover Summary](#handover-summary).** It gives the current architecture, conventions, known pitfalls and open work.
2. **Use the [entries](#ai-log-entries)** when you need the history behind a specific feature. They are grouped by feature area. Each group starts with its **current state** and then lists the entries that led there.
3. Outcome markers: **✔ Accepted**, **✎ Modified** (AI output changed by a team member), **✘ Rejected**, **⏸ Deferred**. **Human fix** marks a case where a team member corrected an AI mistake.

**Standard checks.** Unless an entry says otherwise, every change passed ESLint for the changed files, TypeScript (`tsc --noEmit`) and `npm run build`. Temporary test pages were deleted before committing. Entries only list verification beyond these checks.

**Prompts.** Unless marked as verbatim, prompts are summaries provided by the team member, not the original wording.

---

## Handover Summary

### Team and tools

| Member             | GitHub              | Main AI tool(s)                                                   |
| ------------------ | ------------------- | ----------------------------------------------------------------- |
| Emilie Sofie Fosmo | `Emifos`            | Claude (claude.ai, Sonnet 5.5); Claude Code in VS Code (Opus 5.5) |
| Thea               | `Theanordhoy`       | Claude (claude.ai, Sonnet 5.5 → Opus 5.5)                         |
| Alexander Lislelid | `AlexanderLislelid` | Claude Code (desktop app / VS Code extension, Opus 5.5)           |
| Tone Gjerde        | `Tunegj`            | ChatGPT (GPT-6); Microsoft Clarity AI (recording summaries)       |
| Gro Anita          | `GroAnita`          | Claude Code in VS Code (Opus 5.5)                                 |
| Lise Ervik         | `Liz-nor`           | ChatGPT (GPT-6); Claude Code in VS Code (Opus 5.5)                |

### Architecture decisions (current state)

- **Auth:** the access token is stored in an `httpOnly`, `sameSite=lax`, 7-day cookie (`secure` in production) and set by login/logout Server Actions (`actions/auth.ts`, `lib/session.ts`). The API has no profile endpoint, so the profile from the login response is stored in a second httpOnly cookie. `authFetch()` in `lib/api.ts` adds the `Authorization` and `X-Noroff-API-Key` headers and throws `AuthError`. `BASE_URL` lives in `lib/config.ts`, and the API key goes in `API_KEY` in `.env.local`. _(AI-010, AI-035, AI-016)_
- **Login state** is read on the server, at page or layout level, and passed down as props. Components don't each read the cookie. _(AI-035, AI-013)_
- **Recipes page state lives in the URL:** `?filters=group:value,…`, `?search=` and `?sort=`. All filtering, searching and sorting happens client-side over the full recipe list (52 recipes at the time). Use `filterHref()` / `tagToFilterValue()` from `lib/recipeFilters.ts` to link into filters. Never build filter URLs from raw tag text. _(AI-026–028, AI-042)_
- **The recipe list is cached for 60 s** (`next: { revalidate: 60 }` in `fetchRecipes`). New or edited recipes can take up to 60 s to show up in the list. _(AI-029)_
- **Favorites:** `FavoritesBoundary`/`FavoritesProvider` on lists, `RecipeFavoriteProvider` on the detail page. Both use optimistic updates with rollback and a per-recipe lock against double requests. The API has no "is this recipe favorited?" endpoint. _(AI-018, AI-046)_
- **Create/Edit recipe** is a single native `<dialog>` modal (`RecipeFormDialog` + `RecipeForm`) opened from the header and mobile menu. There is no `/recipes/create` page. Validation (`lib/recipeFormValidation.ts`) is shared by the browser and the Server Actions. `createRecipe`/`updateRecipe` share `sendRecipe` in `actions/recipes.ts`. _(AI-047–049, AI-059)_
- **Expired sessions in forms:** Server Actions return `needsLogin: true` and **do not change cookies**, because changing a cookie refreshes the page and would close the modal and lose the user's input. Users get a "Log in again (opens in a new tab)" link. _(AI-049, AI-059)_
- **Profile area:** the `(profile)` route group shares a layout (sidebar, navigation, redirect to login) for `/profile`, `/profile/recipes`, `/profile/settings` and `/favorites`. Profile form and diet choices are saved to `localStorage` per user with `useLocalStorage` (`useSyncExternalStore`). _(AI-016, AI-019)_
- **Analytics:** Microsoft Clarity loads only after opt-in consent stored in `localStorage`. Withdrawing consent clears the Clarity cookies. The privacy modal uses Radix Dialog. _(AI-006, AI-012)_
- **Styling:** design tokens are defined in `globals.css` (`@theme`, 50–900 scale, Figma base = 500) and documented in `docs/styles.md`. Avoid arbitrary Tailwind values. The documented exceptions are `text-[2rem]`/`text-[2.5rem]` on the homepage and `bottom-[-2.1vw]` in the hero. _(AI-005, AI-023, AI-038)_

### Conventions the team settled on

- Shared components get **optional props with unchanged defaults** (`size`, `variant`, `selected`, `disabled`), so existing uses stay the same. This applies to Badge, Avatar, FavoriteButton and FormField.
- Use `aria-disabled` instead of `disabled` when a button must keep keyboard focus (ServingsControl, row move buttons, RecipeActions).
- Toggle buttons use `aria-pressed` and keep a **stable label**. Don't switch the label to "Saved".
- A Server Component page can't pass functions to a Client Component. Use Server Actions or a small client wrapper instead.
- Put `redirect()` outside `try/catch` in Server Actions.
- Branch from `develop`, keep PRs to one ticket, and don't let AI change files outside the ticket's scope. Unrequested edits to `layout.tsx` and `globals.css` were rejected several times.

### Known pitfalls when working with AI on this project

These came up repeatedly. Check for them when you use AI on this codebase:

- **AI guesses measurements.** Almost every entry has a case where AI estimated sizes, colors or spacing and a team member replaced them with Figma values. Always give AI the exact Dev Mode values.
- **AI rebuilds what already exists.** Show it the existing components first (Avatar, TagList and RecipeMeta were duplicated before AI was shown them).
- **Mobile Figma `Top` values include the status bar or header.** Account for this when comparing spacing.
- **Test page layout bugs aren't component bugs.** Missing `min-w-0`/`w-full` on a test `<main>` caused false overflow and layout jumps twice.
- **AI can overstate its results.** For example, it claimed fixes worked when they didn't, and it miscounted changed files. Check with the browser and `git status`.
- Generated `PageProps<…>` types disappear when `.next` is deleted, so the detail page uses an explicit `RecipePageProps` type.
- The Screen Wake Lock API only works in a secure context (HTTPS or `localhost`), so it fails on a phone that opens the dev server by its IP address.
- The comments API ignores `limit`/`page`, so comments are expanded client-side.
- For login autofill, use `autoComplete="username"` on **email** fields and `nickname` on the registration username field. `"username email"` is not a valid value.

### Open items (checked against the code on 2026-10-22)

| Item                                                                                                                                                                                                                                                                   | Source                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Full `npm run lint` fails on `react-hooks/set-state-in-effect` in `HeroSection.tsx` and `AnalyticsManager.tsx`                                                                                                                                                         | AI-046–049                 |
| Recipe **delete** for owners has not been implemented (edit has)                                                                                                                                                                                                       | AI-046, AI-059             |
| Completed instruction text (`sprout-500`) has ~1.9:1 contrast, which fails WCAG 4.5:1                                                                                                                                                                                  | AI-053                     |
| Badge clips descenders ("g", "y") because of `truncate` + `leading-none`                                                                                                                                                                                               | AI-058                     |
| "Healthy" suggested tag has no matching filter                                                                                                                                                                                                                         | AI-058                     |
| Create-recipe servings buttons should be 40px without changing the shared `ServingsControl`                                                                                                                                                                            | AI-048                     |
| Remove test recipes created in the API during verification                                                                                                                                                                                                             | AI-049                     |
| Header reads cookies, so every page is dynamic. A possible performance ticket                                                                                                                                                                                          | AI-029                     |
| Rerun Lighthouse on the deployed site after the caching change                                                                                                                                                                                                         | AI-029                     |
| Redirect back to the recipe after logging in from comments                                                                                                                                                                                                             | AI-041                     |
| Social sign-in buttons are visual only (disabled). The Google icon needs a gradient SVG                                                                                                                                                                                | AI-022                     |
| Pantry and Meal Planner are page shells with no content. The page title format still needs agreeing                                                                                                                                                                    | AI-044, AI-045             |
| Profile sections My recipes and Settings are placeholders                                                                                                                                                                                                              | AI-016, AI-019             |
| Footer social links go to the platforms' homepages, not FlavorCraft accounts. No Recipes dropdown                                                                                                                                                                      | AI-009                     |
| Hero call-to-action is a plain `<a>`, not `next/link`                                                                                                                                                                                                                  | AI-063                     |
| Validate recipe JSON-LD with Google Rich Results Test and Schema Markup Validator                                                                                                                                                                                      | AI-011                     |
| AI tool and prompts for the Featured Recipe section are not documented                                                                                                                                                                                                 | AI-064                     |
| **Designer confirmation pending:** mobile tabs and action buttons on detail page, sort dropdown, keep-screen-on "on" color, selected tag style and 30-char limit, comment count and order (3, newest first), ingredient decimals (`1` vs `1.0`), RecipeImage 2:1 ratio | various                    |
| **Not yet tested:** Safari position of the hero illustration, screen reader on ServingsControl, Safari/Firefox and screen reader on the mobile menu, browser and screen reader on AlternativeAuth, Clarity on the deployed site                                        | AI-038, 052, 014, 061, 012 |

---

## AI Log Entries

Entry IDs are unchanged from the full log. Within each group, entries are listed in the order they were built, not by ID.

### Entry template

```markdown
#### AI-XXX · Task (#ticket, PR #n)

Date · GitHub user · Tool / model
**Prompt:** what AI was asked.

- ✔/✎/✘/⏸ decision — reason
  **Verified:** anything beyond the standard checks. **Open:** what remains.
```

---

### 1. Styling Foundation and Homepage

**Current state:** design tokens are in `globals.css` and `docs/styles.md`. Inter loads via `next/font` and Aptly via the Adobe Fonts kit `xnz3twu` (Medium 500 has been added). The header and footer are full width. The homepage shows `HeroSection`, `CategoryNavigation` (links to `/recipes?filters=category:…`), `FeaturedRecipeSection` and recipe rows.

#### AI-005 · Global styles and design tokens (#48)

2026-10-12 · AlexanderLislelid · Claude Code (desktop), Opus 5.5
**Prompt:** Recap custom colors in Tailwind v4, convert Figma palette screenshots to CSS variables, set up Adobe Fonts and Inter, document in `docs/styles.md`, help with the PR description.

- ✔ `@theme` with 12 colors (50–900) plus feedback colors. Semantic `bg-background`, `text-foreground`, `border-border`. `font-inter` / `font-aptly`.
- ✎ Background `cream-500` → `salt-500`. Border set to `nori-500` from Figma. `next/font` variable renamed `--font-inter-next` to avoid a clash with the theme variable.
- ✘ Removing Tailwind default colors (`--color-*: initial`).
- Human fix: the AI-written PR description claimed focus styles were done, which they weren't.
  **Verified:** hex values spot-checked against Figma.

#### AI-062 · Category navigation (#66)

2026-10-13 · Liz-nor · ChatGPT, GPT-6 (planning and first version); Claude Code (VS Code), Opus 5.5 (component extraction)
**Prompt:** Plan category navigation from the supplied images: component structure, image organization, responsive layout and theme colors. Then extract a reusable item component.

- ✔ Six categories rendered from a data array with `.map()`. CSS Grid with 6 columns on desktop, 3 on tablet and 2 on mobile.
- ✔ Claude Code extracted `CategoryItem` (`name`, `image`, `href`). The data and list stay in `CategoryNavigation`.
- Since then: the planned `/categories/[slug]` pages were never built. Links now use `filterHref()` (AI-026), and the images use the category name as alt text.

#### AI-063 · Hero section (#67)

2026-10-14 · Liz-nor · ChatGPT, GPT-6 (Claude also mentioned, model not confirmed)
**Prompt:** Where should the component go, how to make the images and layout responsive from Figma, and how to use the existing design tokens.

- ✔ Server component outside `components/ui`, with heading, description and a call-to-action to `/recipes`. Separate desktop and mobile illustrations with `next/image`, empty alt text and `priority`.
  **Open:** the call-to-action is still a plain `<a>`, not `next/link`. Later styling fixes are in AI-023 and AI-038.

#### AI-064 · Featured recipe section (#68)

2026-10-15 · Liz-nor · AI tool not documented
**Prompt:** Not documented.

- ✔ `fetchRecipe(id)` and an async server component showing a fixed recipe ("Smash and Grab Burgers") with image, "Today's favorite" badge, time, difficulty, title and a link to `/recipes/[id]`. Returns `null` if the fetch fails so the homepage still renders.
- ✔ Reuses `Badge`. The `_count` type changed from `object` to `{ favorites: number }`.
  **Open:** the team member should add the AI tool and prompts. Choosing the featured recipe dynamically is a possible future change.

#### AI-023 · Homepage font weight and size (#119)

2026-10-16 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Compare homepage typography (measured with WhatFont) against Figma and fix it, then explain why `font-medium` rendered at 400.

- ✔ Headings and category names changed to `font-medium`. Hero: label 12/14px, heading 40/48px, text 18/20px. Section headings 32px, "See all" 16px.
- ✎ Used `text-[2rem]` / `text-[2.5rem]` as a deliberate exception to `styles.md`.
- AI found that Aptly Medium was missing from the Adobe kit. The team added it, and no code change was needed.
  **Open:** desktop size of "Let's make something delicious" isn't specified (left at 14px).

#### AI-038 · Hero illustration and category section (#118, PR #122)

2026-10-16 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Find the missing category background and why the tomato illustration didn't extend below the hero. Compare with Chrome, Safari and Figma.

- ✔ Category section `bg-salt-100`. Hero `z-10`, `overflow-hidden` removed, illustration width 64%, `bottom-[-2.1vw]`.
- ✘ `translate-y-[9%]` together with `-bottom-8` (this moved it down twice). ✘ `overflow-x-clip` (inconsistent in Safari). ✘ Rebuilding with CSS Grid.
- Human fix: AI claimed the fix worked when it didn't, and it miscalculated the hero height because Figma's `Top` includes the header.
  **Verified:** Chrome result within ~1% of viewport width of Figma. **Open:** Safari position, text sizes, mobile hero.

#### AI-015 · Full-width header/footer, smaller Create text (#212)

2026-10-20 · GroAnita · Claude Code (VS Code), Opus 5.5
**Prompt:** Make the header and footer full width and the Create button 40×15 with 12px Inter.

- ✔ Removed `max-w-6xl`, kept the side padding.
- ✎ Applied 40×15 to the text only (it doesn't fit in a 40px button). The button itself is unchanged.
  **Verified:** Playwright measurements, no horizontal scroll at 375/1024/1586px.

---

### 2. Layout and Navigation

**Current state:** `Header` (server) reads the session and shows logged-in or logged-out controls, switching to the desktop layout at `lg` when logged in. `MobileMenu` (client) shows profile info, icon links with `aria-current` and Log out, and it closes on Escape, when focus leaves it, or on an outside click. The header avatar links to `/profile`. The footer stays at the bottom of short pages (`min-h-svh` on body, `flex-1` on main).

#### AI-008 · Header, mobile menu and header search (#41)

2026-10-13 · AlexanderLislelid · Claude Code (VS Code)
**Prompt:** Build the header from Figma with logo, search and Login/Register, plus a mobile hamburger menu. Make search work from any page.

- ✔ `Header` as a server component with CSS Grid. `MobileMenu` as a separate client component (`aria-expanded`, Escape with focus return). `SearchInput` in `Suspense`, with a `resultsPath` prop and Lucide icons.
- ✎ Account links defined once in `ACCOUNT_LINKS`.
  **Verified:** manual desktop/mobile and keyboard testing.

#### AI-009 · Footer (#42)

2026-10-13 · AlexanderLislelid · Claude Code (VS Code)
**Prompt:** Build the footer from Figma with wordmark, social links, navigation and copyright.

- ✔ Server component with `mt-auto`, `NAV_LINKS`/`SOCIAL_LINKS` arrays, inline SVG icons (`aria-hidden`), `rel="noopener noreferrer"`, automatic year.
- ✎ Used a text wordmark until the logo SVG was ready.
  **Verified:** manual testing and keyboard focus.

#### AI-013 · Logged-in state in header (#199)

2026-10-20 · GroAnita · Claude Code (VS Code), Opus 5.5
**Prompt:** Build the logged-in header from desktop and mobile screenshots, using exact Figma icon sizes, with an avatar menu containing Log out.

- ✔ Reads the cookie with `getAccessToken()`. Logged-in links are Recipes, Meal plan, Pantry, Favorites, + Create and profile. Desktop layout switches at `lg`.
- ✎ Mobile icons 24px with a 1.5 stroke, and an invisible `before:` layer keeps a 40px tap area.
- `ProfileMenu` dropdown was added here and later removed in AI-016.
  **Verified:** production HTML checked with and without a cookie.

#### AI-014 · Close mobile menu when focus leaves (#209)

2026-10-20 · GroAnita · Claude Code (VS Code), Opus 5.5
**Prompt:** Run a keyboard check of the header, create a ticket for the issue found and fix it.

- ✔ AI found that the menu stayed open when focus left it. Fixed by closing it on focus-out or outside click. Opening the profile menu closes the mobile menu.
  **Verified:** 25 Playwright keyboard and click checks at 375px. **Open:** Safari/Firefox and screen reader.

#### AI-017 · Mobile menu redesign (#217)

2026-10-20 · GroAnita · Claude Code (VS Code), Opus 5.5
**Prompt:** Rebuild the mobile menu from the new logged-in and logged-out screenshots.

- ✔ Avatar, name and @username, icon links, Log out. `aria-current` uses the longest match. Profile data is read from the session.
- ✎ @username is the lowercase account name, because Noroff has no separate username.
  **Verified:** 27 Playwright checks at 400px. Approved by the team member.

#### AI-044 · Pantry page layout (#165, PR #190)

2026-10-19 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Create `/pantry` following existing page structure and Figma (desktop, then mobile).

- ✔ Page with `metadata` title. AI found that `min-h-full` on body did nothing, so it was replaced with `min-h-svh`, plus `flex-1` on main, so the footer stays at the bottom.
- ✎ Mobile values corrected from Figma (heading 32px, ~68px top). AI pointed out that mobile `Top` includes the status bar.
  **Verified:** 375/402px, footer on short and tall pages, other pages unaffected.

#### AI-045 · Meal planner page shell (#169, PR #192)

2026-10-19 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Create the meal planner page at the route the existing navigation uses.

- ✔ `/meal-plan`, the route the footer link already used. Same structure as Pantry.
- ✘ `/meal-planner`, because it didn't match existing links.

---

### 3. Authentication

**Current state:** `/login` and `/register` use `AuthLayout`, `FormField` and `AlternativeAuth`. The forms call Server Actions directly. Registration requires a `@stud.noroff.no` email, and the username field only accepts `/^\w+$/`. The token and profile are stored in httpOnly cookies (see the [Handover Summary](#architecture-decisions-current-state)).

#### AI-002 · Reusable AuthLayout (#31)

2026-10-09 · Emifos · Claude (claude.ai), Sonnet 5.5
**Prompt:** Build a reusable layout from the task card and designs with heading, description, form and a page-specific image.

- ✔ Server component with props `heading`, `description`, `imageSrc`, `children`. Two columns on desktop, one on mobile. Decorative image with empty alt.
- ✎ Image shown above the content on mobile instead of hidden. `imageSrc` made required. `main`/`min-h-screen` removed.
- ✘ A route-group `layout.tsx`, because it can't take page-specific props.

#### AI-003 · Reusable FormField (#32, PR #38)

2026-10-09 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Should login and register share one form component? Draft a FormField that meets the acceptance criteria and explain it.

- ✔ Shared `FormField` (label, input, helper, error), with separate `LoginForm`/`RegisterForm`. Form-specific validation stays in each form.
- ✎ All AI Tailwind classes removed.

#### AI-004 · LoginForm (#21, PR #40)

2026-10-09 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Adapt the existing LoginForm to FormField, and add loading, error and redirect behavior.

- ✔ Per-field `FieldErrors`, `noValidate`, `isLoading`, `formError` with `role="alert"`.
- ✎ `React.SubmitEvent` and wording changes. The `onSubmit` callback was later replaced in AI-021.

#### AI-010 · Auth API: authFetch, loginUser, types (#49, PR #58)

2026-10-12 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Explain which Noroff endpoints need an API key or token, then draft the request helper, login and types to match `recipe.ts`. Includes line-by-line explanations.

- ✔ `authFetch()` + `AuthError` in `lib/api.ts`, `loginUser()`, `LoginRequest`/`LoginResponse`, `API_KEY` in `.env.local` (with `.env.example`), `src/app/docs/auth.md`.
- ✎ `BASE_URL` moved to `lib/config.ts`.
- ✘ Reusing the recipe `Profile` type, because auth is a separate API.

#### AI-007 · registerUser and RegisterForm (#30)

2026-10-13–14 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt (verbatim, translated from Norwegian):** "I need to create a fetch for register in `src/app/lib/auth.ts`… now I need to make `registerUser`." Then: "create `RegisterForm.tsx` that follows the same structure as `LoginForm.tsx`…" with the acceptance criteria. Then the QA feedback.

- ✔ `registerUser` passes API error messages through ("Profile already exists"). Redirects to `/login` because registering doesn't log the user in. Success message uses `role="status"`.
- ✎ Typed request/response chosen after AI explained the benefits.
- After QA: "Full name" became "Username" with `/^\w+$/`. Inputs trimmed (not passwords). Form stays disabled during redirect. Non-JSON (HTML 502) responses are handled. Helper text explains the `@stud.noroff.no` requirement.

#### AI-020 · Register page (#30)

2026-10-15 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Build `/register` mobile-first from Figma Dev Mode, with errors shown as an icon and red text, restricted to `@stud.noroff.no`.

- ✔ `RegisterForm` calls `registerUser` directly, because a server page can't pass functions. `CircleAlert` error messages.
- ✎ Helper text removed to match the design. Heading 30/36px instead of 32/40px to avoid arbitrary values.
- ✘ AI edits to `layout.tsx`/`globals.css` (out of scope).

#### AI-021 · Login page (#71)

2026-10-15 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Build `/login` with `AuthLayout` and `LoginForm`, mobile-first, leaving room for social sign-in.

- ✔ `LoginForm` calls `loginUser` directly. Generic "Invalid email or password" message. Button disabled while pending.
- ✘ Edits to the root layout. ⏸ No "Forgot password?", because the API doesn't support it.

#### AI-035 · Cookie-based authentication (#103, PR #105)

2026-10-15 · Theanordhoy · Claude, Sonnet 5.5, plus a colleague's code suggestion (whether that was AI-generated wasn't confirmed)
**Prompt:** Review the colleague's suggestion against the ticket, then explain the LoginForm changes, cookie reading and a logout button.

- ✔ Session helpers and login/logout Server Actions. Cookie settings as in the [Handover Summary](#architecture-decisions-current-state). `redirect()` outside `try/catch`. The action returns errors instead of throwing.
- ✔ `LogoutButton` as a server component with a form. `isLoggedIn` is read once at page level.
- ✘ The `server-only` package (new dependency, needs team agreement). ✘ Unrelated VS Code formatting changes.
  **Verified:** in DevTools the cookie flags are correct, the token can't be read with `document.cookie`, it survives a refresh, and logout and a wrong password work.

#### AI-061 · Reusable AlternativeAuth component (#33)

2026-10-08–14 · Liz-nor · ChatGPT; Claude Code, Opus 5.5
**Prompt:** Plan a reusable component structure and responsive styling. Review accessibility (icons, accessible names, keyboard focus). How should unconfigured providers be shown?

- ✔ `AlternativeAuth` + `SocialAuthButton` with provider icons, accessible names, focus styles and disabled states.
- ✔ A `providerHandlers` prop decides which providers work: providers without a handler are disabled, excluded providers are hidden, and the divider is hidden when no providers are shown.
  **Open:** Google and Facebook sign-in aren't connected. Browser and screen reader testing haven't been done.

#### AI-022 · AlternativeAuth on login and register (#111)

2026-10-16 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Connect and style `AlternativeAuth` from Figma. Keep the button colors, but make them non-clickable.

- ✔ `<AlternativeAuth mode="login|register" />` replaces the page links. Buttons stay disabled with "not available yet" text.
- ✎ Removed `disabled:opacity-50`/`grayscale`, arbitrary sizes and off-palette colors. Uses the global focus styles.
  **Open:** the Google icon needs a gradient SVG.

#### AI-030 · Login email autofill after registration (#241)

2026-10-21 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Fix Chrome autofilling the username into the login email field.

- ✎ First fix (`nickname` on the username field) wasn't enough. Final fix: `autoComplete="username"` on the email fields of both forms, and `nickname` on the registration username.
- Human fix: AI suggested `"username email"`, which is not a valid value.
  **Verified:** Chrome, after clearing saved passwords. Credentials saved earlier may still autofill the wrong value.

---

### 4. Recipe Card Components

**Current state:** `RecipeCard` combines `RecipeImage` (2:1, `next/image` `unoptimized`, fallback icon), `Badge`, `TagList`, `RecipeMeta` and `FavoriteButton`. The whole card is clickable through a stretched title link, and the favorite button sits above it with `z-10`.

#### AI-031 · Badge (#44, PR #79)

2026-10-14 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Build one component for category, difficulty and tag badges from Figma, using existing tokens, with line-by-line explanation.

- ✔ A single `Badge` with `variant` and `level` (easy/medium/hard → green/yellow/red). Non-interactive `<span>` with `truncate`. Fixed 24/22px heights to approximate Figma's cap-height trim. Mapping API values is left to callers.

#### AI-032 · TagList (#47, PR #82)

2026-10-14 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Build a wrapping list of tag badges that renders nothing when empty. Where should it live? Which branch should it come from?

- ✔ `<ul>`/`<li>`, `flex-wrap gap-2` (matches Figma's 8px), keys built from tag + index, `max-w-full` so badges truncate. Placed in `components/features`.
- ✘ Branching from the unmerged Badge branch. Branched from `develop` instead.

#### AI-033 · RecipeMeta (#46, PR #87)

2026-10-14 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Show prep/cook time, servings and difficulty with icons and accessible labels, hiding missing values. Match Figma, explain editor warnings and a failed build.

- ✔ `0`/`null` treated as missing. Separators only between values. Hidden labels like "Preparation time: …". Unknown difficulty shows a neutral badge.
- ✎ 14px text, 18px icons. Difficulty on its own line on mobile, right-aligned from `sm`. `h-[23px]` → `h-5.75`.

#### AI-034 · TagList accessibility fixes from QA (#93, PR #95)

2026-10-15 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Implement QA's two fixes, and help get VoiceOver working.

- ✔ `role="list"` (Safari/VoiceOver drops list semantics when list styling is removed). `title={tag}` on the `<li>` instead of a new Badge prop. The fixes came from QA, not from AI.
  **Verified:** accessibility tree, and VoiceOver in Safari.

#### AI-036 · FavoriteButton (#98, PR #106)

2026-10-15 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Should the heart be a separate component or part of the image? Build it from Figma measurements and the designer's guidance on the filled state.

- ✔ Controlled component (`isLiked`, `onToggle`). Sits beside the image link, not inside it, to avoid a button nested in a link. `preventDefault` + `stopPropagation`. Stable `aria-label` + `aria-pressed`. Returns `null` when logged out.
- ✎ Values taken from Figma: `size-8`, `rounded-xl`, `bg-oat-500`, 16px icon. Human fix: stroke color `foreground` → `truffle-500`.

#### AI-050 · RecipeImage (#45)

2026-10-14 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Implement the ticket using the project docs and Next.js 16 Image docs, then match the design screenshot. Is the error state too complex?

- ✔ Nullable `src`, `next/image` `fill` + `object-cover`, category badge, `ImageOff` fallback. `unoptimized` because images come from unknown hosts (trade-off: no automatic resizing).
- ✎ Aspect ratio 4:3 → 2:1. AI's per-URL error tracking replaced with a single `hasError` boolean.

#### AI-037 · RecipeCard (#43, PR #112)

2026-10-16 · Theanordhoy · Claude, Sonnet 5.5
**Prompt:** Combine the existing components into a card from Figma specs. Why is the title underlined in Safari only? Does the image need a max width?

- ✔ `Pick<Recipe, …>` props. Stretched title link (`after:inset-0`). `line-clamp-2`. `mt-auto` on tags.
- ✘ Human fix: AI suggested a second image link with `aria-hidden`, which would also hide the category badge from screen readers.
- ✎ Removed `hover:underline` (not in the design). `RecipeImage` set to a fixed 186px (owner informed). TagList items use `flex` to get the 22px row.
  **Verified:** real API data, edge cases (missing image, text, tags, times, unknown difficulty, long text), keyboard, Safari and Chrome.

---

### 5. Recipes Page: Filters, Search, Sorting, Performance

**Current state:** `/recipes` (`RecipeBrowser`, `useRecipeFilters`, `lib/recipeFilters.ts`) has a desktop sidebar, a full-screen `<dialog>` for mobile filters, filter chips, search, a custom sort listbox and a no-results page. All state is in the URL (see the [Handover Summary](#architecture-decisions-current-state)). The original `CategoryFilter.tsx` from AI-001 has been removed.

#### AI-001 · Search and category filtering, first version (#14)

2026-10-07 · Emifos · Claude (claude.ai), Sonnet 5.5
**Prompt:** Using the ticket, API docs, wireframe and an existing search component, improve it, split it into components and fix an ESLint error.

- ✔ `useSetSearchParam`, a debounced `SearchInput`, `CategoryFilter` with `aria-pressed`, and URL params that match the API.
- ✎ Replaced a `useEffect` sync with a render-phase check (`react-hooks/set-state-in-effect`). AI styling removed.
- ✘ A `SearchFilter` wrapper. ✘ Ingredient and diet chips (out of scope, and the API doesn't support them).
- Later replaced by AI-026 and AI-027.

#### AI-025 · Basic recipes page (#182)

2026-10-19 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Create a minimal `/recipes` page to build the filters on.

- ✔ `fetchRecipes()` + a `RecipeCard` grid + an empty `<aside>` placeholder, reusing the homepage error handling.

#### AI-026 · Filter sidebar and integration (#172–177, #189, #201, #202)

2026-10-19–20 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Build the filters one ticket and PR at a time from Figma. Analyze the API data for supported filters. Sync with the URL and history. Answer teammates' integration questions.

- ✔ Controlled `FilterOption`/`FilterGroup`. Option IDs use the form `field:option`, each with a `matches` function. `?filters=` with `router.push`. Desktop sidebar plus a mobile "Filter (n)" `<dialog>`. Chips, suggestions and counts share one state.
- ✔ Team decisions: cooking time means total time. Options with no matches show 0. Diet and allergy filters match only explicit tags. OR within a group, AND across groups (diet and allergy use AND). Counts are calculated from the full dataset.
- ✔ `filterHref()`/`tagToFilterValue()` for SimilarRecipes. `CategoryNavigation` uses `/recipes?filters=…`. `SavedRecipesLink` goes to `/favorites` or `/login`. "Cakes" fixed to use OR.
- ⏸ Dynamic counts.
  **Verified:** matching logic scripted against real API data, 20 link-helper tests, browser testing on mobile and desktop.

#### AI-027 · Recipe search (#14)

2026-10-20 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Make header search open `/recipes` with results, combined with filters. Search only (category filtering already exists).

- ✔ `searchRecipes()` searches title, description and tags, case-insensitive and trimmed. Uses `?search=`. AND with filters. `clearAll()` clears both. Result count shows the term. No-results state.
- ✔ Client-side search because all recipes are already loaded. Header change (`resultsPath="/recipes"`) made after a teammate's header PR was merged.
  **Verified:** scripted against real data, plus the browser.

#### AI-028 · Sorting and no-results page (#221)

2026-10-20 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt (partly verbatim):** Add a "Trending" sort and the no-results page. Later: "The dropdown is ugly and square, make it nicer and take inspiration from our design."

- ✔ `sortRecipes`/`parseSort`/`SORT_OPTIONS`: Trending (number of favorites, since the API has no trending value), Newest, Quickest (no time = last), A–Z. Uses `?sort=` (default left out of the URL).
- ✎ Native `<select>` replaced with an ARIA listbox (the native menu couldn't be styled). Double focus ring and text clipping fixed. "Look at other recipes" goes to the homepage.
  **Open:** designer to confirm the dropdown.

#### AI-029 · Cache recipe list (#229)

2026-10-21 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Investigate the 797 ms mobile TTFB from Lighthouse, explain the cause, list the affected files for the team, then implement a limited fix.

- AI found that every page is dynamic because `Header` reads the cookie, and that `fetchRecipes()` was uncached (API took 0.17–0.59 s).
- ✔ `next: { revalidate: 60 }` in `lib/recipe.ts` only, checked against the Next.js 16 docs.
- ⏸ Header refactor (bigger change, owned by another team member).
  **Verified:** local production build, homepage TTFB ~0.27 s → 0.09 s.

---

### 6. Recipe Detail Page

**Current state:** `/recipes/[id]` is a server page with `generateMetadata`, JSON-LD, its own `loading.tsx`/`error.tsx`, and not-found handling through `RecipeNotFoundError`. It combines Breadcrumb, RecipeHero, RecipeOverview (with EditRecipeButton for owners), desktop and mobile actions sharing `RecipeFavoriteProvider`, ingredients with servings scaling, instructions, KeepScreenOnToggle, SimilarRecipes and CommentSection. Mobile shows ingredients and instructions as ARIA tabs.

#### AI-024 · RecipeHero (#125)

2026-10-16 · Emifos · Claude Code (VS Code), Opus 5.5
**Prompt:** Build a layout-only component for image and overview from Figma (mobile, then desktop) without touching other files.

- ✔ `image` + `children`. Stacked layout on mobile (350px image). Desktop split 55/45 (`md:w-11/20` / `md:w-9/20`) in `rounded-2xl`. `ImageOff` fallback.
- ✎ Duplicated the image fallback logic instead of changing the card-specific `RecipeImage`. Possible refactor: a `className` prop on `RecipeImage`.

#### AI-039 · Breadcrumb (#124, PR #129)

2026-10-16 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Build it from Figma and the ticket's accessibility rules. Should it go in ui or features? How can it be tested before the page exists? Long titles overflow.

- ✔ Generic `items` prop in `components/ui`. `<nav aria-label="Breadcrumb">` + `<ol>`. Last item gets `aria-current="page"`. `ChevronRight` (`aria-hidden`). `truncate` + `min-w-0`.
- ✘ A recipe-specific `RecipeBreadcrumb`.
- Human fix: AI used hex colors, which were replaced with tokens. The overflow came from the test page's `<main>`, not the component.

#### AI-040 · RecipeOverview (#126, PR #180)

2026-10-19 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Find what's already covered by existing components, then build the overview (tags, title, description, info, author) from Figma and reuse what exists.

- ✔ Props picked from `Recipe` and spreadable. Difficulty, category and tags in one wrapping Badge list with duplicates removed. Optional `size` on `Badge` (`md`) and `Avatar` (`lg`). `commentCount` and an `ownerActions` slot.
- ✘ Reusing `TagList`/`RecipeMeta` (wrong layout for this purpose). ✘ Making the category badge yellow. ✘ `lg:flex-nowrap` (would overflow).
- Human fix: AI rebuilt Avatar, tags and meta before being shown the existing ones. It also estimated styles that had to be replaced with Figma values.
  **Verified:** the card's Badge/Avatar unchanged on the homepage. **Open:** Aptly on avatar initial, and confirm that `owner.name` is right for `@name`.

#### AI-043 · RecipeActions (#131, PR #188)

2026-10-19 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Reuse FavoriteButton. Investigate the meal planner flow. Build share, meal planner, print and favorite from Figma, including the logged-out state.

- ✔ All actions come in through props, so there are no API calls inside the component. `FavoriteButton` gets optional `variant`/`disabled`. Web Share with a copy-link fallback (cancelling isn't treated as an error). `aria-disabled` while busy. A container query decides the single-row layout.
- ✘ Using `className` to override FavoriteButton (Tailwind conflicts). ✘ Changing the label to "Saved".
- Human fix: AI hid the actions when logged out. They're now shown blurred and `inert`, as in the design (Figma blur 4 = CSS `blur(2px)`).

#### AI-051 · IngredientsList and quantity scaling (#133)

2026-10-18 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Scale quantities as `qty × selected ÷ original`, format them readably and handle non-numeric values. Fix the typography from Figma.

- ✔ AI checked 52 recipes: all quantities are numeric, but some units are odd (`""`, `"1"`, `"test"`). `scaleQuantity`/`formatQuantity` in `lib/ingredients.ts` (`Intl.NumberFormat`, max 2 decimals). Non-numeric values stay unscaled. No scaling if original servings is 0. Server component.
- ✘ AI adding a heading and a `servingsControl` prop, which belong in the parent.
  **Open:** designer shows `1.0 ball` while the code shows `1 ball`.

#### AI-052 · ServingsControl (#134)

2026-10-18 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Controlled +/- control with a minimum of 1 and keyboard support, from the design screenshot.

- ✔ `servings` + `onChange`. `aria-disabled` at 1. Labels "Decrease/Increase servings". `aria-live="polite"` count. No max (none specified).
- ✎ `rounded-md` → `rounded-sm`.
  **Open:** screen reader testing.

#### AI-053 · InstructionsList (#135)

2026-10-18 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Numbered steps that can be checked off and reset when the recipe changes, in exact designer colors.

- ✔ `<label>` + native checkbox. Hidden "Step n:" prefix. Completed steps stored in a `Set` (without mutating props). Resets when `recipeId` changes.
- ✎ AI chose darker greens for contrast. The team member used the designer's `sprout-500` instead, which gives a **known ~1.9:1 contrast issue**.
- The jumping layout was caused by the test page (`mx-auto` in a flex body), fixed with `w-full`.

#### AI-054 · KeepScreenOnToggle (#136)

2026-10-18 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Use the Wake Lock API with a switch, tooltip, status messages and cleanup. Then review against every acceptance criterion and draft the PR text.

- ✔ `<button role="switch" aria-checked>`. Tooltip linked with `aria-describedby`. Separate `enabled` (user wants it) and `isActive` (lock is held). Lock re-acquired on `visibilitychange`, released on cleanup. Unsupported and failed states use `role="status"`.
- AI review found that the tooltip opened and closed again on tap, so it was fixed, and Escape dismissal was added (WCAG 1.4.13).
  **Open:** designer to confirm the "on" color. Needs a secure context to test.

#### AI-041 · Comments for logged-in users (#142, PR #185)

2026-10-19 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Comments or similar recipes first? Review the existing auth and comment code, implement logged-in commenting and style the logged-out state from Figma.

- ✔ `CommentSection` reads the session on the server: logged in shows the form, logged out shows a login link. `router.refresh()` after posting. On `AuthError` the cookie is deleted and `needsLogin` is returned, with a "Log in again" link and the text kept.
- ✎ Human fix: icon 46 → 40px, text 16 → 14px, link semibold → bold.
- ✘ Redesigning the form or cards, and changing the login redirect (out of scope).

#### AI-055 · Comments section (#139)

2026-10-18 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Heading, list via `CommentItem` (owned by a teammate), loading, error and empty states, and "See all comments" expanding on the same page.

- ✔ `fetchComments()`. Server `CommentSection` passes an un-awaited promise to the client `CommentList`, which reads it with `use()` inside `Suspense`. Errors become `{ ok: false }`. Focus moves to the first newly revealed comment.
- AI found that the API ignores `limit`/`page`, so all comments are loaded and the list expands locally. Shows 3, newest first (provisional).

#### AI-056 · CommentItem review and PR text (#140)

2026-10-18 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Review the team member's own `CommentItem`/`Avatar` (commit `0faa57a`, not AI-written) against 5 requirements, swap `text-[18px]` for `text-lg`, and draft the PR text.

- ✔ All requirements met. Confirmed Tailwind 4.3.3 supports `wrap-anywhere`. ✘ Adding a date (not in the ticket).

#### AI-042 · Similar recipes (#137, PR #187)

2026-10-19 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Understand the existing filter navigation, agree the URL format with the filter owner, build from Figma, and find a way to test before the helpers were merged.

- AI spotted inconsistent formats (`?category=` vs `/categories/…`). The team member confirmed `?filters=` with the filter owner. AI drafted the spec for `filterHref`/`tagToFilterValue`.
- ✔ Only tags that map to a filter are shown, deduplicated by filter value. The section is hidden if nothing maps. Linked `Badge` with `rounded-full` focus. Dividers are inside the component.
- ✘ Building URLs from tag text ("Italian" → `cuisine:european`). ✘ `useRecipeFilters` here. ✘ Plain-text unsupported tags.
- ✎ Divider `oat-700` → `thyme-500`.

#### AI-046 · Recipe detail page integration (#143, PR #206)

2026-10-20 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Review the ticket, card navigation, components and favorites code. Follow the `recipes/` structure. Build it from desktop and mobile Figma. Plan favorites and share across desktop and mobile. Review ESLint and `git status`.

- ✔ Dynamic server page with metadata, JSON-LD, its own loading and error files (AI noted that `recipes/loading.tsx` would otherwise apply). `RecipeNotFoundError` → 404.
- ✔ Client wrapper for actions. `key={recipe.id}` resets state. `lib/favorites.ts` + `actions/favorites.ts` (with `fetchFavorites` and `needsLogin`, reused by the favorites page). `RecipeFavoriteProvider` syncs desktop and mobile. `useShareLink`.
- ✔ Mobile ARIA tabs with arrow keys. The inactive panel stays mounted so servings and checked steps survive.
- ✎ Human fix: widths 1166px → 1310/1090px with 80px gaps. AI counted 9 new files when there were 11 new and 3 modified.
- ✔ Explicit `RecipePageProps` (generated types vanish with `.next`). ✘ Placeholder edit/delete buttons.
  **Verified:** card navigation, direct URL and refresh, logged in and out, favorites (repeat clicks, expired session, desktop/mobile sync), 404/error/loading, heading order, keyboard tabs, 1440/402px against Figma.

---

### 7. Favorites and Profile

**Current state:** hearts on cards appear only when logged in (`FavoritesBoundary`). Optimistic toggles show a 5 s `Toast`. `/favorites` and `/profile/*` share the `(profile)` layout with sidebar stats.

#### AI-065 · Profile sidebar components (#156)

2026-10-19 · Liz-nor · Claude Code (VS Code), Opus 5.5
**Prompt:** Build a profile sidebar with cover image, avatar, name, email, bio and stats, with fallbacks for missing images, an Edit Profile action and the existing logout.

- ✎ `ProfileStats`: AI used a semantic `<dl>` with `flex-col-reverse`. The team member left-aligned it, made the text larger and removed the singular/plural labels to match Figma.
- ✎ `ProfileBanner`: AI built a client component with a gradient fallback. The team member swapped in the Figma gradient and a fixed 124px height.
- ✘ AI's `ProfileSidebar` and its 96px Avatar size. The team member stopped the session and wrote `ProfileSidebar.tsx` and `Avatar.tsx` by hand: overlapping avatar, 88px `xl` size, Aptly font, outlined buttons, "No profile description yet." fallback.
- AI had no access to Figma and worked from existing components and `styles.md`. It didn't run ESLint, the build or the app. The team member reviewed and tested the result before committing. Later extended in AI-016 and AI-019.

#### AI-016 · Profile page: sidebar and My profile tab (#214)

2026-10-20 · GroAnita · Claude Code (VS Code), Opus 5.5
**Prompt:** Build the profile page from mobile and desktop screenshots. Save form and diet data in the browser. Remove the avatar dropdown.

- ✔ Profile cookie (no API endpoint). Stats use `meta.totalCount` ("–" if unavailable). Accessible `Tabs` (WAI-ARIA, arrows, Home/End). `useLocalStorage` on `useSyncExternalStore` (no hydration mismatch).
- ✎ Icons and text differ from the placeholder design. Cards stack below 1536px. Avatar links to `/profile`, and Log out is in the sidebar.
  **Verified:** 27 Playwright checks, plus a real login.

#### AI-018 · Favorite from the recipe card (#219)

2026-10-20 · GroAnita · Claude Code (VS Code), Opus 5.5
**Prompt:** Make the card heart save and remove favorites with the designed confirmation. Messages close after 5 s.

- ✔ `FavoritesBoundary` (server) + `FavoritesProvider`: optimistic, rollback with an error message, per-recipe lock. `Toast` with a permanent live region that pauses on hover or focus. AI found that cards never received the logged-in state before this change.
- ✎ Heart restyled to the cream square.
  **Verified:** Playwright, including double-click (one request) and failure rollback. A real save wasn't testable locally (no API key at the time).

#### AI-019 · Profile area and favorites page (#155, #157–162)

2026-10-20 · GroAnita · Claude Code (VS Code), Opus 5.5
**Prompt:** Read issue #155 and its sub-issues with designs on GitHub and build the shared profile layout and favorites page on one branch.

- ✔ `(profile)` route group. Tabs became links with `aria-current`. `FavoritesGrid` reuses `RecipeCard`. After a removal, focus moves to the heading and `router.refresh()` updates the count. Loading, error with retry, expired session and empty state. AI confirmed in the docs that favorites include the full recipe (one request).
- ✎ 3 columns only from 1536px.
  **Verified:** 39 Playwright checks against a local API mock (mock address reverted before committing).

---

### 8. Create and Edit Recipe

**Current state:** `CreateRecipeButton` opens `RecipeFormDialog` (native `<dialog>`, scroll lock, Escape doesn't reach the mobile menu). `RecipeForm` holds `RecipeFormValues` (stable row IDs, numbers kept as text) and renders the Basics, Quick Facts, Ingredients, Steps and Tags sections. It also handles validation and create/update. Owners edit through `EditRecipeButton` on the detail page.

#### AI-047 · Modal and shared form state (#231, PR #240)

2026-10-21 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Split the Figma feature into a parent issue and sub-issues (using the designer's answers). Build the modal and shared state. Review a teammate's proposed props.

- ✔ Parent issue #230 with 6 sub-issues. One placeholder file per section so teammates could work in parallel.
- ✔ A modal, not a page (the team member raised the `/recipes/create` mismatch with the team). `<dialog>` + `showModal()`.
- ✔ Teammate's `ingredients` + `onChange` interface connected through `updateValues` (AI: avoids lost updates).
- ✘ Intercepting routes for a modal URL (too complex). ✘ Rewriting to the teammate's prop pattern.
- ✎ Human fix: 714px, `rounded-2xl`, 20px → 800px, `rounded-lg`, 24px.

#### AI-048 · Basics and Quick Facts (#233, PR #246)

2026-10-21 · Theanordhoy · Claude, Opus 5.5
**Prompt:** Find fields and categories (`recipeFilters.ts`), build from desktop and mobile Figma, and explain why fields were 43px.

- ✔ `FormField` `size` prop (login and register unchanged). New `TextAreaField`, `SelectField` and `lib/fieldStyles.ts`. Categories from the `Mealtype` filter group. Difficulty as native radios in a `<fieldset>`. Times as text with `inputMode="numeric"` (avoids `type="number"` quirks). Image preview for http(s) URLs only.
- ✎ Human fix: `fieldStyles.ts` moved from `components/ui` to `lib`. Field sizes and colors taken from Figma. 43 → 38px with a fixed height (line-height issue).
- ✘ 40px buttons in the shared `ServingsControl` (would change the detail page).

#### AI-057 · Ingredients and Steps (#234)

2026-10-21 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Implement the ticket from desktop and mobile designs, then draft the PR text and log.

- ✔ Controlled sections following #231's contract. Shared `EditableRowList`, `RowActions` and `useRowList`. Stable IDs. Focus handling for add, move and remove. `aria-disabled` move buttons.
- ✔ Units built from the API data (plurals merged, `1`/`2`/`test` dropped). Unknown units are kept when editing.
- ✎ Fixed the design's duplicated helper text and the "Ingridient" typo. Allowed 0 rows (minimums belong to validation in #237).
- Note for #231: generate default row IDs in the browser when the modal opens, to avoid hydration mismatches.

#### AI-058 · Tags (#236)

2026-10-21 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Implement from the ticket and Figma, show desktop and mobile, and make a local test page outside git.

- ✔ 6 suggested toggle tags (`aria-pressed`). `Badge` gets an optional `selected` prop. Custom tags via Add or Enter (`preventDefault`), with no empty or case-insensitive duplicates (`aria-live` message). Typed suggestions snap to their canonical spelling.
- AI's own choices, not yet confirmed: green selected state, 30-character limit.
- Found: "Healthy" has no filter, and Badge clips descenders (shared issue, not fixed).
  **Verified:** Playwright at 1280/390px. Test page at `src/app/dev-test/recipe-form` (not in git).

#### AI-049 · Validation and publishing (#237, PR #247)

2026-10-21 · Theanordhoy · Claude, Opus 5.5
**Prompt:** After the sections were merged, implement validation, errors and publishing, plus a test checklist.

- ✔ Waited for Basics to merge (didn't wait for Tags). One validation function for client and Server Action. Fully empty rows are ignored, partial rows are errors. Optional `errors` props on teammates' components.
- ✔ `FieldErrorMessage`. Focus moves to the first invalid field. List errors are focusable. Quick Facts uses `items-start`. An API 400 about the image is shown on the image field.
- ✔ Server Action in `actions/recipes.ts`. Ref-based double-submit guard (state updates too late). `onSubmit`/`onSuccess`/`initialValues` props so editing can reuse the form. The modal closes before navigating to the new recipe.
- ✔ Cookies are left unchanged on auth failure (AI: changing them refreshes the page and closes the modal). Login opens in a new tab.
  **Verified:** validation rules, real publishing, double-click, expired session, offline, focus, mobile, and the recipe showing on `/recipes`.

#### AI-059 · Edit recipe for owners (#238)

2026-10-21 · AlexanderLislelid · Claude Code (VS Code), Opus 5.5
**Prompt:** Reuse the create form and modal for editing. Check that removing the `accessToken` cookie (or all cookies) while editing shows the login message and keeps the input.

- ✔ `sendRecipe` shared by `createRecipe` (POST) and `updateRecipe` (PUT). Revalidates `/recipes` and the detail route. `updateRecipe.bind(null, id)`. `toRecipeFormValues` + `toDifficulty` ("easy" → "Easy"). Empty rows added if needed. "Save changes" / "Saving…".
- ✔ The Edit button shows only when the profile name equals `recipe.owner.name`. **The API still enforces ownership** (403 → "Only the owner can edit this recipe.").
- ✎ "…before you can publish." → "…before you can save."
  **Verified:** create and edit, missing token → "You need to log in to do this.", and API 401 → "Your session has expired…", with the form kept. Lint, type and build results weren't recorded.

---

### 9. SEO and Analytics

**Current state:** recipe JSON-LD is rendered on `/recipes/[id]` (`lib/seo/recipeJsonLd`). Clarity loads after consent, and the custom events (`recipe_searched`, `recipe_favorited`, …) are typed in `trackClarityEvent.ts`.

#### AI-006 · SEO and analytics research and planning

2026-10-06–12 · Tunegj · ChatGPT, GPT-6
**Prompt:** Explain the SEO and Analytics Lead role. Compare metadata/OG, JSON-LD and Lighthouse options, and analytics tools (Clarity, GA4, Plausible, PostHog, Hotjar), as well as consent and event tracking. Plan Sprint 2.

- ✔ Priorities: dynamic metadata/OG, Recipe JSON-LD, Lighthouse. Clarity chosen for heatmaps and recordings. Consent required. 4 events planned. Tickets #50, #52, #53, #54, #55 approved by the Scrum Master. A dependency and handoff doc was shared with the team (Google Doc "Sprint 2 - SEO & Analytics Dependencies & Handoff").

#### AI-011 · Recipe JSON-LD (#52)

2026-10-13 · Tunegj · ChatGPT, GPT-6
**Prompt:** Step-by-step guide to Recipe JSON-LD in Next.js/TypeScript: field mapping, a helper, optional data, ISO 8601 durations, testing.

- ✔ A separate helper maps image, author, category, keywords, ingredients, `HowToStep` instructions, servings and times. Missing fields are left out.
  **Verified:** manually tested with and without images. **Open:** check with Google Rich Results Test and Schema Markup Validator.

#### AI-012 · Microsoft Clarity, consent and privacy modal (#53)

2026-10-13–14 · Tunegj · ChatGPT, GPT-6
**Prompt:** Integrate Clarity without loading it before consent. Store, change and withdraw consent (clearing cookies). Build an accessible privacy modal. How should it be tested?

- ✔ `@microsoft/clarity`, opt-in, `localStorage` consent, separate consent/manager/tracker components, Privacy Settings, cookie clearing on withdrawal, privacy policy modal.
- ✎ Modal refactored to Radix Dialog. Not used: the Identify API.
  **Verified:** local consent flows, and the modal's keyboard, Escape and focus behavior. **Open:** verify on the deployed site.

#### AI-060 · General AI use: reports and Clarity recording summaries

2026-10-06 – ongoing · Tunegj (SEO & Analytics Lead) · ChatGPT, GPT-6; Microsoft Clarity's built-in AI (Copilot)
**Prompt:** For reports, the team member's own findings and analyses were given as the prompt, and AI was asked to review and format them. For Clarity, the built-in AI summarized the test users' session recordings.

- ✔ All SEO & Analytics reports were reviewed and formatted by AI. The findings, analysis and conclusions are the team member's own. AI handled structure, wording and review only.
- ✔ Clarity's AI summaries were used to find patterns in test users' recordings faster.
- Human check: every issue in a summary was compared with the actual recording before it was reported. For example, when a dead click was reported, the recording was watched to confirm whether it was a real dead click.
  **Verified:** summaries checked against the recordings. Report contents checked against the team member's own findings.
