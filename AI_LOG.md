# AI Usage Log - FlavorCraft Labs

## Purpose

This document records how AI tools were used during the development of FlavorCraft Labs.

The goal is to provide a transparent and consistent overview of AI-assisted work, including research, planning, design, coding, testing, and documentation.

Entries should explain what AI was asked to do, what it produced, how the output was used or modified, and how the result was verified.

## AI Approach

The team chose to use AI as an assistant rather than generate the entire application in one process.

AI supports research, planning, development, testing, design, and documentation, while team members remain responsible for evaluating suggestions, making decisions, and verifying results.

The log focuses on significant AI-assisted tasks, prompts, and decisions that may help the client or future developers understand and continue the project.

## Logging Guidelines

- Each entry must have a unique ID (e.g., AI-001, AI-002) (assigned by AI_LOG maintainer)
- Preserve important original prompts where available, especially those influencing major decisions or deliverables. Clearly label summaries when exact prompts are unavailable.
- Explain what the AI produced or recommended.
- Clearly distinguish between accepted, modified, and rejected suggestions.
- Document how the result was reviewed or tested.
- Include links to relevant files, tickets, pull requests, or documents when available.
- Record unfinished work and testing that has not yet been completed.
- Keep entries factual and concise.
- Focus on meaningful AI-assisted tasks and important iterations rather than documenting every individual interaction.

---

## AI Log Entries

<!--
### AI-XXX - [Task or topic]

**Date:** YYYY-MM-DD

**Team Member:** [Name / GitHub username]

**Related Tasks / Files:** [Ticket, PR, file paths or document]

**AI Tool / Model:** [Tool and model, if known]

**Purpose:** [Why AI assistance was used.]

**Key Prompt(s):** [Important original prompts, or a clearly labeled summary if exact wording is unavailable.]

**Outcome and Decisions:** [What AI produced, what was accepted, modified or rejected, and why.]

**Verification / Status:** [How the result was checked and what remains unfinished.]

**References:** [Links to relevant code, PRs, designs or documentation.]
-->

### AI-001 - Recipe Search

**Date:** 2026-10-07 (updated 2026-10-21)

**Team Member:** Emilie Sofie Fosmo / `Emifos`

**Related Tasks / Files:**

- Ticket #14 - Implement recipe search (rescoped from "search and category filtering")
- Branches: `feat/search-filter-14`, `feat-recipe-search-14`
- `components/features/SearchInput.tsx`
- `hooks/useSetSearchParam.ts`
- `hooks/useRecipeFilters.ts`, `lib/recipeFilters.ts`, `components/features/RecipeBrowser.tsx`, `components/layout/Header.tsx`

**AI Tool / Model:** Claude (claude.ai), Sonnet 5.5, and Claude Code (Claude Opus 5.5) in VS Code

**Purpose:** Build a recipe search in the header that shows matching recipes on `/recipes` and works together with the filter sidebar.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

- First version: the ticket checklist, the Noroff Recipe Book API docs, a wireframe and an existing search component, with a request to improve it and fix an ESLint error.
- Later: "When you search, you should be sent to the recipes page and see the results there."

**Outcome and Decisions:**

- **Accepted:** `SearchInput.tsx`, a debounced search input with whitespace trimming, a clear button and URL sync (`?search=`).
- **Accepted:** `useSetSearchParam.ts`, which updates URL parameters and resets pagination.
- **Modified:** URL/input sync was changed from a `useEffect` to a render-phase check after ESLint flagged `react-hooks/set-state-in-effect`.
- **Accepted:** `searchRecipes()` searches title, description and tags. It is case-insensitive and ignores surrounding spaces.
- **Accepted:** `/recipes` reads `?search=` and combines it with the sidebar filters. The header search now uses `resultsPath="/recipes"`. The result count shows the search term.
- **Accepted:** The search runs in the browser instead of the API, because all 52 recipes are already loaded. This also lets it search tags.
- **Removed:** A `CategoryFilter.tsx` component was also created in the first version. The ticket was later rescoped to search only, and the component was deleted in #202, as category filtering is now handled by the filter sidebar.
- **Rejected:** Ingredient chips and dietary filters from the wireframe, which were outside the scope of this ticket.

**Verification / Status:**

- `tsc` and `eslint` pass for the changed files.
- Tested with a script against the real API data: case, spaces, description and tag matches, search combined with filters, and no results.
- Tested in the browser.
- Done.

**References:**

- [Ticket #14](Implement recipe search · Issue #14 · GroAnita/Flavorcraft_labs)
- Branches: `feat/search-filter-14`, `feat-recipe-search-14`

---

### AI-002 - Reusable Authentication Layout

**Date:** 2026-10-09

**Team Member:** Emilie Sofie Fosmo / `Emifos`

**Related Tasks / Files:**

- Ticket #31 - Build reusable authentication layout
- Branch: `feat/auth-layout-component-31`
- `components/layout/AuthLayout.tsx`

**AI Tool / Model:** Claude (claude.ai), Sonnet 5.5

**Purpose:** Build a shared authentication layout with an image panel and content panel for the login and registration pages.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

Provided Claude with the task card and login/register designs. Requested a reusable layout component accepting a heading, description, form content, and a page-specific image.

**Outcome and Decisions:**

- **Accepted:** Used Claude's `AuthLayout.tsx` as the basis for the implementation.
- **Accepted:** The component accepts `heading`, `description`, `imageSrc`, and `children`.
- **Accepted:** Implemented a two-column desktop layout and single-column mobile layout, with empty alt text for the decorative image.
- **Accepted:** Implemented the layout as a server component.
- **Modified:** Changed the mobile layout to display the image above the content rather than hiding it.
- **Modified:** Made `imageSrc` required because the login and registration pages use different images.
- **Modified:** Removed `main` and `min-h-screen` because the header and footer are outside the component.
- **Rejected:** A route-group `layout.tsx` because it could not receive the required page-specific props.

**Verification / Status:**

- Testing had not yet been completed.
- Remaining work: Export images from Figma, finalize styling, test with a temporary page, run lint/type checks, and connect the layout to the login and registration pages when their forms are ready.
  - **Status update (2026-10-22):** Done. `AuthLayout` is used on `/login` and `/register` with page-specific images (AI-020, AI-021).

**References:**

- [Ticket #31 - Reusable Authentication Layout](https://github.com/GroAnita/Flavorcraft_labs/issues/31)
- Branch: `feat/auth-layout-component-31`
- `components/layout/AuthLayout.tsx`

---

### AI-003 - Reusable FormField Component

**Date:** 2026-10-09

**Team Member:** Thea / `Theanordhoy`

**Related Tasks / Files:**

- Create shared FormField component for authentication forms
- `FormField.tsx`
- Pull Request #38

**AI Tool / Model:** Claude (Anthropic), Sonnet 5.5

**Purpose:** Evaluate whether login and registration forms should share components and obtain a draft of a reusable FormField component using React, Next.js, and TypeScript.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

Described the ticket and asked whether login and registration should use one shared form component or separate components, given their different designs.

Provided the FormField acceptance criteria and requested a component meeting those requirements, along with a simple explanation of the code.

Follow-up questions covered integration with LoginForm, the repeat-password field in registration, and when helper text should appear.

**Outcome and Decisions:**

- **Accepted:** Used the AI-generated `FormField.tsx` draft as the starting point for the implementation.
- **Accepted:** Followed the recommendation to use a shared `FormField` component for labels, inputs, helper text, and error messages, while keeping `LoginForm` and `RegisterForm` as separate components.
- **Accepted:** Kept form-specific validation, including password matching, in the individual forms rather than in `FormField`.
- **Modified:** Removed all AI-generated Tailwind classes.

**Verification / Status:**

- Code submitted for review against the ticket's acceptance criteria, including input types, labels, placeholders, required fields, autocomplete, helper text, validation errors, accessibility, focus states, disabled states, and password masking.
- Manual browser testing had not been completed because the relevant pages were not yet available.
- Review outcome was not confirmed in the submitted log.

**References:**

- [Pull Request #38 - Reusable FormField Component](https://github.com/GroAnita/Flavorcraft_labs/pull/38)
- [Ticket #32 - Build reusable form field component](https://github.com/GroAnita/Flavorcraft_labs/issues/32)

---

### AI-004 - Login Form Component

**Date:** 2026-10-09

**Team Member:** Thea / `Theanordhoy`

**Related Tasks / Files:**

- Login form component using the shared FormField
- `LoginForm.tsx`
- Pull Request #40

**AI Tool / Model:** Claude (Anthropic), Sonnet 5.5

**Purpose:** Adapt an existing LoginForm to use the shared FormField component and add validation, loading state, error handling, and redirect behavior.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

Shared the ticket and existing LoginForm implementation, which used separate labels and inputs with one shared error message.

Asked how to integrate the shared FormField component and requested explanations of the code.

Follow-up requests covered loading state, failed-login error messages, and redirecting after successful login.

**Outcome and Decisions:**

- **Accepted:** Replaced individual label/input blocks with the shared `FormField` component.
- **Accepted:** Introduced per-field validation errors (`FieldErrors`) instead of one shared error message.
- **Accepted:** Added `noValidate` to use custom validation messages instead of browser-native validation popups.
- **Accepted:** Added an `isLoading` state to disable inputs and the submit button and prevent repeated submissions.
- **Accepted:** Added a separate `formError` displayed with `role="alert"` for failed login attempts.
- **Accepted:** Added navigation using `router.push` after successful login.
- **Accepted:** Kept API integration separate by passing an `onSubmit` callback into `LoginForm`.
- **Modified:** Changed the redirect path to a temporary placeholder, adjusted error-message wording, and used `React.SubmitEvent` instead of `React.FormEvent`.
- **Open:** AuthContext, UserStatus, logout, session storage, and API integration were postponed until the authentication approach was agreed upon.
  - **Status update (2026-10-22):** Session storage, login API integration and logout were implemented with cookie-based authentication in AI-035. The logged-in header state was added in AI-013.

**Verification / Status:**

- Reviewed the implementation against the ticket requirements for labeled fields, required-field validation, loading state, repeated-submission prevention, and clear error messages.
- Browser testing had not been completed because the component did not yet have a page for integration.
- API integration, session handling, and logout remained outside the scope of this entry.

**References:**

- [Pull Request #40 - Login form](https://github.com/GroAnita/Flavorcraft_labs/pull/40)
- [Ticket #21 - Set up user login](https://github.com/GroAnita/Flavorcraft_labs/issues/21)

---

### AI-005 - Global Styles and Design Tokens

**Date:** 2026-10-12

**Team Member:** Alexander Lislelid / `AlexanderLislelid`

**Related Tasks / Files:**

- Ticket #48 - Set up shared colors and styles
- Branch: `chore/figma-colors-48`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `docs/styles.md`

**AI Tool / Model:** Claude (Claude Code desktop app), Opus 5.5

**Purpose:** Implement the agreed Figma design values, including colors, fonts, and base styles, to establish consistent styling across the application and document their usage.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

Asked Claude for a recap of custom colors in Tailwind CSS v4 and provided the ticket requirements, contributing guidelines, and screenshots of the Figma color palette (Neutrals, Yellows, Greens, and Feedback colors).

Requested help converting the palette into CSS variables, integrating Adobe Fonts and Inter in Next.js, defining a semantic border color, and documenting the styling system in `docs/styles.md`.

Also requested assistance preparing the pull request description and reviewing which ticket requirements had been completed.

**Outcome and Decisions:**

- **Accepted:** Used Claude's `@theme` block as the basis for the color palette, including 12 colors with a 50–900 scale (Figma base color = 500) and feedback colors for error, warning, success, and information states.
- **Accepted:** Made the colors available through Tailwind utilities such as `bg-basil-500` and `text-error-text`.
- **Accepted:** Configured Inter using `next/font` and Aptly using Adobe Fonts in `layout.tsx`, exposing them through `font-inter` and `font-aptly`.
- **Accepted:** Added base styles for page background, text color, and fonts, with semantic color utilities such as `bg-background`, `text-foreground`, and `border-border`.
- **Modified:** Used Claude's draft of `docs/styles.md` as a starting point and adapted it to match the actual project setup.
- **Modified:** Changed the page background from the suggested `cream-500` to `salt-500`.
- **Modified:** Selected `nori-500` for the border color after checking the tag stroke in Figma.
- **Modified:** Renamed the `next/font` variable to `--font-inter-next` to avoid a conflict with the Tailwind theme variable.
- **Modified:** Corrected the AI-generated PR description, moving focus styles from completed work to TODO because they had not been implemented.
- **Rejected:** Removing Tailwind's default colors using `--color-*: initial`, preserving utilities such as white and black.

**Verification / Status:**

- Hex values extracted from Figma screenshots were spot-checked against the original designs.
- Reviewed the PR description against the implemented code and corrected an inaccurate completion claim.
- Remaining work: Define heading sizes and weights, implement visible keyboard focus styles (`:focus-visible`), confirm the primary color, and add spacing, border-radius, and shadow tokens if specified in Figma.
  - **Status update (2026-10-22):** `:focus-visible` styles and base `h1`/`h2` rules are now in `globals.css`. Whether heading sizes, the primary color and spacing/radius/shadow tokens match Figma has not been confirmed.
- No additional testing or validation results were reported.

**References:**

- [Ticket #48 - Shared Colors and Styles](https://github.com/GroAnita/Flavorcraft_labs/issues/48)
- Branch: `chore/figma-colors-48`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `docs/styles.md`

---

### AI-006 - SEO & Analytics Research and Planning

**Date:** 2026-10-06 to 2026-10-12

**Team Member:** Tone Gjerde / `Tunegj`

**Related Tasks / Files:**

- Sprint 1 SEO & Analytics research and planning
- Sprint 2 SEO & Analytics ticket proposals
- `Sprint 2 - SEO & Analytics Dependencies & Handoff` (shared Google Doc)

**AI Tool / Model:** ChatGPT (OpenAI), GPT-6

**Purpose:** Research suitable SEO and analytics approaches for FlavorCraft Labs, identify implementation priorities, and plan tasks and dependencies for the development team.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

Asked ChatGPT to explain the responsibilities of an SEO & Analytics Lead and help identify appropriate tasks for the recipe application.

Discussed SEO metadata, OpenGraph tags, Recipe JSON-LD structured data, Lighthouse audits, and analytics tools including Microsoft Clarity, Google Analytics 4, Plausible, PostHog, and Hotjar.

Requested guidance on analytics event tracking, privacy consent requirements, testing dependencies, and how to organize and communicate Sprint 2 tasks.

**Outcome and Decisions:**

- **Accepted:** Identified dynamic page metadata, OpenGraph tags, and Recipe JSON-LD as SEO implementation priorities.
- **Accepted:** Selected Microsoft Clarity as the planned analytics tool for heatmaps and session recordings.
- **Accepted:** Identified the need for appropriate user consent before loading analytics.
- **Accepted:** Planned four custom analytics events: `recipe_searched`, `recipe_opened_from_search`, `recipe_favorited`, and `recipe_unfavorited`.
- **Accepted:** Identified Lighthouse auditing as a necessary SEO and performance validation activity.
- **Accepted:** Created five Sprint 2 SEO & Analytics tickets covering dynamic metadata and OpenGraph tags, Recipe JSON-LD, Microsoft Clarity, custom analytics events, and Lighthouse auditing. All five tickets were added to the project board and approved by the Scrum Master.
- **Accepted:** Created a dependency and handoff document identifying required pages, functionality, deployment access, and consent implementation.
- **Accepted:** Shared the handoff information with the team to coordinate upcoming work.

**Verification / Status:**

- Research and planning were reviewed against the project's requirements and implementation dependencies.
- The Sprint 2 handoff document was completed and shared with the team.
- SEO and analytics implementation, live event verification, and Lighthouse testing remained future tasks at the time of planning.
- No completed SEO implementation or analytics test results are claimed in this entry.

**References:**

- [Ticket #50 - Implement Dynamic Metadata & Open Graph](https://github.com/GroAnita/Flavorcraft_labs/issues/50)
- [Ticket #52 - Implement Recipe JSON-LD Structured Data](https://github.com/GroAnita/Flavorcraft_labs/issues/52)
- [Ticket #53 - Integrate Microsoft Clarity Analytics](https://github.com/GroAnita/Flavorcraft_labs/issues/53)
- [Ticket #54 - Implement Custom Analytics Events](https://github.com/GroAnita/Flavorcraft_labs/issues/54)
- [Ticket #55 - Establish Lighthouse Baseline & SEO QA](https://github.com/GroAnita/Flavorcraft_labs/issues/55)
- `Sprint 2 - SEO & Analytics Dependencies & Handoff` (shared Google Doc)

---

### AI-007 - Registration API Function and Register Form

**Date:** 2026-10-13 to 2026-10-14

**Team Member:** Emilie Sofie Fosmo (GitHub username: `emifos`)

**Related Tasks / Files:**

- Ticket #30 - Registration
- Branch: `feat/register-30`
- `src/app/lib/auth.ts`
- `src/app/types/auth.ts`
- `src/app/components/features/RegisterForm.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Opus 5.5

**Purpose:** Implement a registration API function using the Noroff API, following the existing login architecture, and create a registration form meeting Ticket #30's acceptance criteria. AI was also used to address feedback received during pull request QA.

**Key Prompt(s):** _(Original prompts, translated from Norwegian)_

1. "I need to create a fetch for register in `src/app/lib/auth.ts`. As you can see I already have `loginUser`, but now I need to make `registerUser`. I'm using Noroff's API, do you need any more info?"

2. "Now I'm going to create a file `components/features/RegisterForm.tsx` that follows the same structure as `LoginForm.tsx`, but register should have: Full name, email, password, and confirm password fields. 'Sign up' button."

   The second prompt also included Ticket #30's acceptance criteria covering required fields, email validation, minimum password length of eight characters, matching passwords, field-level errors, loading/success/error states, prevention of repeated submissions, redirect behavior, navigation, and accessibility.

3. **Prompt summary (not verbatim):** The developer shared the QA reviewer's pull request feedback with Claude and requested assistance implementing the suggested changes.

**Outcome and Decisions:**

- **Accepted:** Added `RegisterRequest` and `RegisterResponse` types in `types/auth.ts`, following the existing `LoginRequest` and `LoginResponse` patterns. The registration response does not include an access token because the Noroff registration endpoint does not automatically authenticate users.
- **Accepted:** Added `registerUser` in `lib/auth.ts`, sending a POST request to `/auth/register` using the shared `BASE_URL`.
- **Accepted:** Unlike `loginUser`, the registration function passes through API error messages (e.g., "Profile already exists") instead of using a fixed message, allowing users to understand why registration failed.
- **Modified:** Initially rejected Claude's proposed file edits because the purpose of the additional types was unclear. After Claude explained their benefits and offered an alternative without types, the developer chose the typed implementation for consistency, type checking, and autocomplete.
- **Accepted:** Created `RegisterForm.tsx` based on `LoginForm.tsx`, reusing the shared `FormField` component and existing form-state patterns: `FieldErrors`, `formError`, `isLoading`, and `noValidate`.
- **Accepted:** Kept the `onSubmit` callback with separate `(name, email, password)` arguments to maintain separation between form presentation and API requests.
- **Accepted:** Added validation for required fields, email format, a minimum password length of eight characters, and matching password confirmation, with field-level error messages.
- **Accepted:** Added a success message using `role="status"`, a "Signing up..." loading label, and disabled inputs and the submit button while a request is pending.
- **Accepted:** Added navigation to `/login` after successful registration because the API does not automatically authenticate users. This behavior may need adjustment if the team changes its authentication flow.
- **Accepted:** Added a "Log in" link to `/login` using `next/link`.
- **Scope decision:** Login and registration pages were kept outside this branch's scope and were planned for separate implementation.

**Changes After QA Review:**

- Renamed the "Full name" field to "Username" and added `autoComplete="username"`. Client-side validation using `/^\w+$/` and explanatory helper text were added because Noroff only accepts letters, numbers, and underscores in the username field. This differs from the ticket's original "Full name" wording.
- Changed the loading-state handling so `isLoading` is only reset when an error occurs. This keeps the form disabled during redirection and prevents repeated submissions.
- Added trimming of username and email values before validation and submission. Passwords are not trimmed because spaces may be intentional password characters.
- Added helper text explaining that a `@stud.noroff.no` email address is required.
- Updated `registerUser` to handle non-JSON responses, such as an HTML 502 error page, and throw a readable "Registration failed" error instead of exposing a JSON parsing error.
- Left the equivalent redirect and network-error behavior in `LoginForm` and `loginUser` unchanged, following QA feedback that these should be addressed separately.

**Verification / Status:**

- `npx tsc --noEmit` completed without errors.
- ESLint completed without errors after the QA changes.
- Changes were reviewed in the editor and through pull request QA.
- Existing login functionality was left unchanged, apart from necessary additions to shared files.
- Browser and API testing had not yet been completed at the time of this entry because the `/login` and `/register` pages were not implemented. These were planned for a separate branch.
  - **Status update (2026-10-22):** The `/login` and `/register` pages were built in AI-020 and AI-021, and the registration-to-login flow was tested in Chrome in AI-030.
- The registration success message is only briefly visible before redirection to `/login`.
- **Remaining follow-up:** Address equivalent redirect and network-error handling issues in `LoginForm` and `loginUser` separately.

**References:**

- [Ticket #30 - Registration](https://github.com/GroAnita/Flavorcraft_labs/issues/30)
- Branch: `feat/register-30`
- `src/app/lib/auth.ts`
- `src/app/types/auth.ts`
- `src/app/components/features/RegisterForm.tsx`
- [Noroff API v2 - Registration](https://docs.noroff.dev/docs/v2/auth/register)

---

### AI-008 - Header, Mobile Menu and Header Search

**Date:** 2026-10-13

**Team Member:** Alexander Lislelid / `AlexanderLislelid`

**Related Tasks / Files:**

- Ticket #41 - Header
- Branch: `feat/header-41`
- `src/app/components/layout/Header.tsx`
- `src/app/components/layout/MobileMenu.tsx`
- `src/app/components/features/SearchInput.tsx`
- `src/app/layout.tsx`
- `public/logo-header.svg`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension

**Purpose:** Assist with implementing a responsive, accessible header based on the Figma design and adapting the existing `SearchInput` component to support searching from any page.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

Asked Claude to create a header containing the logo, recipe search field, and Login/Register buttons, following the Figma design and shared color tokens.

Requested a mobile version with a user icon and hamburger menu. Also requested improvements to the search input, including a search icon, clear button, and navigation to the results page when searching from another page.

**Outcome and Decisions:**

- **Accepted:** Implemented `Header` as a server component using CSS Grid to position the logo, search, and account links in one row on desktop, with the search field on a separate row on mobile.
- **Accepted:** Created `MobileMenu` as a separate client component to limit client-side JavaScript to the interactive portion of the header. The menu uses `aria-expanded` and `aria-controls`, closes on Escape while restoring focus, and closes after navigation.
- **Accepted:** Wrapped `SearchInput` in `Suspense` with a same-sized fallback because it uses `useSearchParams`.
- **Accepted:** Updated `SearchInput` with Lucide search and clear icons, a `resultsPath` prop, and synchronization when URL parameters change externally. Search updates the URL while typing on the results page; submitting from another page navigates to the results page.
- **Modified:** Defined account links once in `ACCOUNT_LINKS` and reused them in desktop and mobile navigation to avoid duplication.
- **Open:** Login/Register links remain static because authenticated-user state has not yet been integrated.
  - **Status update (2026-10-22):** Done. The logged-in state was added to the header in AI-013.

**Verification / Status:**

- Reviewed and manually tested the header at desktop and mobile widths.
- Tested keyboard navigation and accessibility behavior of the mobile menu.
- Logged-in state, the final results page route, and automated tests remain unfinished.
  - **Status update (2026-10-22):** Logged-in state was added in AI-013, and the search results route is `/recipes` (AI-027). No automated tests have been added to the project.

**References:**

- [Ticket #41 - Header](https://github.com/GroAnita/Flavorcraft_labs/issues/41)
- Branch: `feat/header-41`
- Commits: `fbc67bb`, `7302cb0`, `6a86f9f`
- `src/app/components/layout/Header.tsx`
- `src/app/components/layout/MobileMenu.tsx`
- `src/app/components/features/SearchInput.tsx`

---

### AI-009 - Footer

**Date:** 2026-10-13

**Team Member:** Alexander Lislelid / `AlexanderLislelid`

**Related Tasks / Files:**

- Ticket #42 - Footer
- Branch: `feat/footer-42`
- `src/app/components/layout/Footer.tsx`
- `src/app/layout.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension

**Purpose:** Assist with implementing a responsive, accessible site footer based on the Figma design and shared color tokens.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

Asked Claude to create a footer containing the FlavorCraft Labs wordmark, social media links, navigation links, and a copyright notice, matching the Figma design across desktop and mobile layouts.

**Outcome and Decisions:**

- **Accepted:** Implemented `Footer` as a server component in the root layout, using `mt-auto` to keep the footer at the bottom of short pages.
- **Accepted:** Organized navigation and social media links into `NAV_LINKS` and `SOCIAL_LINKS` arrays, rendered using `map()` for easier maintenance.
- **Accepted:** Used inline SVG social icons with `aria-hidden` and accessible link labels indicating that links open in a new tab. External links use `target="_blank"` and `rel="noopener noreferrer"`.
- **Accepted:** Used `new Date().getFullYear()` to generate the copyright year automatically.
- **Modified / Temporary:** Used a styled text wordmark until the exported logo SVG becomes available.
- **Open:** Navigation routes and social media URLs remain placeholders with `TODO` comments. The Recipes navigation link is expected to require a dropdown.

**Verification / Status:**

- Reviewed and manually tested the footer at desktop and mobile widths.
- Checked keyboard focus behavior on footer links.
- The final logo SVG, confirmed navigation routes, real social media URLs, Recipes dropdown, and automated tests remain unfinished.
  - **Status update (2026-10-22):** The footer now uses `logo-footer.svg`, and all navigation links point to existing pages. Still open: social links go to the platforms' homepages (not FlavorCraft accounts), and there is no Recipes dropdown.

**References:**

- [Ticket #42 - Footer](https://github.com/GroAnita/Flavorcraft_labs/issues/42)
- Branch: `feat/footer-42`
- [Commit `3fa84e1`](https://github.com/GroAnita/Flavorcraft_labs/commit/3fa84e1)
- `src/app/components/layout/Footer.tsx`

---

### AI-010 - Auth API: Shared Authenticated Request Helper, Login Function and Auth Types

**Date:** 2026-10-12

**Team Member:** Thea / `Theanordhoy`

**Related Tasks / Files:**

- Ticket #49 - Auth API
- Branch: `feat/auth-api`
- `src/app/lib/api.ts`
- `src/app/lib/auth.ts`
- `src/app/lib/config.ts`
- `src/app/types/auth.ts`
- `src/app/docs/auth.md`

**AI Tool / Model:** Claude (Anthropic), Sonnet 5.5

**Purpose:** Understand which Noroff API endpoints require an API key, an access token, or both, and obtain implementation drafts for a shared authenticated request helper, login function, and authentication types. AI was also used to explain the code and underlying concepts before integrating authentication with the login form.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

Shared the ticket and Noroff authentication documentation, asking what was needed to satisfy each requirement.

Requested explanations of API keys and access tokens, assistance configuring `.env.local`, and help resolving an error when creating an API key.

Shared the existing `recipe.ts` and `types/recipe.ts` files and requested code consistent with the project's existing style.

Asked for line-by-line explanations of the authenticated request helper, `loginUser`, and authentication types, and whether `BASE_URL` could be defined centrally instead of repeated across files.

**Outcome and Decisions:**

- **Accepted:** Implemented `authFetch()` and `AuthError` in `lib/api.ts`. The helper adds `Authorization` and `X-Noroff-API-Key` headers and throws clear errors when an access token is missing or the API returns HTTP 401.
- **Accepted:** Implemented `loginUser()` in `lib/auth.ts`, calling `POST /auth/login` and returning user data including the access token.
- **Accepted:** Added `LoginRequest` and `LoginResponse` types in `types/auth.ts`.
- **Accepted:** Configured the API key using `API_KEY` in `.env.local`, with a placeholder in `.env.example`. The local environment file is ignored by Git.
- **Accepted:** Added documentation explaining the authenticated request helper in `src/app/docs/auth.md`.
- **Modified:** Moved `BASE_URL` into `lib/config.ts` and updated existing imports so the API base URL is maintained in one location.
- **Rejected:** Reusing the `Profile` type from `types/recipe.ts` for the login response, because authentication uses a separate API. Dedicated authentication types were created instead.
- **Not used:** A temporary test route for protected API requests.

**Verification / Status:**

- Checked authentication types and the login request body against Noroff's login documentation.
- Verified that `.env.local` does not appear in `git status`.
- Protected API requests have not yet been tested with valid, missing, or invalid credentials.
- Access token storage remains unfinished pending the team's session-management decision.
- Integration of `loginUser()` with `LoginForm` on the login page remains unfinished.
- The UI link prompting users to log in again has not yet been implemented.
  - **Status update (2026-10-22):** Token storage was implemented with an httpOnly cookie (AI-035), `loginUser()` is used by the login Server Action (AI-021, AI-035), and "Log in again" links were added for expired sessions (AI-041, AI-049).

**References:**

- [Ticket #49 - Auth API](https://github.com/GroAnita/Flavorcraft_labs/issues/49)
- [Pull Request #58 - Auth API and Documentation](https://github.com/GroAnita/Flavorcraft_labs/pull/58)
- Branch: `feat/auth-api`
- [Noroff API v2 - Login](https://docs.noroff.dev/docs/v2/auth/login)
- [Noroff API v2 - API Key](https://docs.noroff.dev/docs/v2/auth/api-key)
- [Noroff API v2 - Authentication](https://docs.noroff.dev/docs/v2/authentication)

---

### AI-011 - Recipe JSON-LD Structured Data

**Date:** 2026-10-13

**Team Member:** Tone / `Tunegj`

**Related Tasks / Files:**

- Ticket #52 - Recipe JSON-LD
- Branch: `feat/recipe-json-ld-52`
- `src/app/(pages)/recipes/[id]/page.tsx` (planned integration)

**AI Tool / Model:** ChatGPT (OpenAI), GPT-6

**Purpose:** Assist with implementing structured data for recipe pages using Schema.org's `Recipe` format, including mapping API data into JSON-LD and preparing it for validation.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Requested step-by-step guidance for implementing Recipe JSON-LD in Next.js with TypeScript.
- Discussed how recipe API fields should map to Schema.org properties.
- Requested help creating a reusable helper to generate structured data.
- Asked how to handle optional recipe information and convert preparation and cooking times to ISO 8601 duration format.
- Discussed how to test the generated structured data before integrating it into the recipe detail page.

**Outcome and Decisions:**

- **Accepted:** Created a reusable helper to generate Recipe JSON-LD from recipe data.
- **Accepted:** Mapped available recipe properties, including image, author, category, keywords, ingredients, instructions using `HowToStep`, servings, and preparation, cooking, and total durations.
- **Accepted:** Used ISO 8601 duration formatting for recipe times.
- **Accepted:** Handled optional data so missing recipe properties would not produce invalid or misleading values.
- **Accepted:** Kept the structured data generation separate from the page component to make it easier to maintain and test.

**Verification / Status:**

- Manually tested the helper with recipe data, including cases with and without images.
- Ran `npx tsc --noEmit` successfully.
- Committed and pushed the implementation to the feature branch.
- At the time of this work, integration into the dynamic recipe detail page and validation using Google Rich Results Test and Schema Markup Validator remained unfinished.
  - **Status update (2026-10-22):** Recipe JSON-LD is now rendered on `/recipes/[id]` (AI-046). Validation with Google Rich Results Test and Schema Markup Validator has not been confirmed.

**References:**

- [Ticket #52 - Implement Recipe JSON-LD Structured Data](https://github.com/GroAnita/Flavorcraft_labs/issues/52)
- Branch: `feat/recipe-json-ld-52`
- [Schema.org - Recipe](https://schema.org/Recipe)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)

---

### AI-012 - Microsoft Clarity, Consent Management and Privacy Policy Modal

**Date:** 2026-10-13 to 2026-10-14

**Team Member:** Tone / `Tunegj`

**Related Tasks / Files:**

- Ticket #53 - Microsoft Clarity and Consent
- Branch: `feat/microsoft-clarity-consent-53`
- `src/app/components/analytics/AnalyticsConsent.tsx`
- `src/app/components/analytics/AnalyticsManager.tsx`
- `src/app/components/analytics/ClarityTracker.tsx`
- `src/app/components/analytics/PrivacyPolicyModal.tsx`
- `src/app/layout.tsx`

**AI Tool / Model:** ChatGPT (OpenAI), GPT-6

**Purpose:** Assist with integrating Microsoft Clarity into the Next.js application while implementing consent management, privacy information, and accessible modal interactions. AI was used for technical guidance, code review, and testing suggestions.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Requested guidance on integrating Microsoft Clarity into a Next.js application.
- Discussed how to prevent analytics from loading before the user provides consent.
- Asked how to store consent preferences and allow users to change or withdraw consent later.
- Requested assistance implementing a consent interface and a privacy policy modal.
- Discussed clearing Clarity-related cookies when consent is withdrawn.
- Requested guidance on accessible modal behavior, including keyboard navigation and focus management.
- Asked how to test consent persistence, analytics initialization, and withdrawal behavior.

**Outcome and Decisions:**

- **Accepted:** Integrated Microsoft Clarity using the `@microsoft/clarity` package.
- **Accepted:** Implemented an opt-in consent approach so Clarity initializes only after analytics consent is granted.
- **Accepted:** Used `localStorage` to persist the user's consent preference across visits.
- **Accepted:** Created separate analytics components to manage consent, initialization, and tracking responsibilities.
- **Accepted:** Added Privacy Settings functionality so users can review and change their consent choices.
- **Accepted:** Implemented consent withdrawal behavior, including clearing relevant Clarity cookies.
- **Accepted:** Created a privacy policy modal explaining analytics usage, consent choices, cookies, and withdrawal, with a link to Microsoft's privacy information.
- **Modified:** Refactored the privacy policy modal to use Radix Dialog for more reliable accessibility behavior, including keyboard interaction, Escape-key handling, and focus restoration.
- **Not used:** The Clarity Identify API, as identifying individual users was unnecessary for the planned analytics implementation.

**Verification / Status:**

- Manually tested consent acceptance, withdrawal, persistence, and cookie clearing locally.
- Tested the privacy modal's keyboard interactions, Escape-key behavior, and focus restoration.
- Committed and pushed the implementation to the feature branch.
- Verification of Clarity behavior on the deployed application remained pending.

**References:**

- [Ticket #53 - Integrate Microsoft Clarity Analytics](https://github.com/GroAnita/Flavorcraft_labs/issues/53)
- Branch: `feat/microsoft-clarity-consent-53`
- [Microsoft Clarity Documentation](https://learn.microsoft.com/en-us/clarity/)
- [Radix Dialog Documentation](https://www.radix-ui.com/primitives/docs/components/dialog)

---

### AI-013 - Logged-in State in Header

**Date:** 2026-10-20

**Team Member:** Gro Anita / `GroAnita`

**Related Tasks / Files:**

- Ticket #199 - Add logged-in state to Header component
- Branch: `fix/header-logged-in-state-199`
- `src/app/components/layout/Header.tsx`
- `src/app/components/layout/MobileMenu.tsx`
- `src/app/components/layout/ProfileMenu.tsx`
- `src/app/components/layout/ProfileMenu.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Assist with showing different header controls for logged-in users, matching the Figma design for desktop and mobile.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Shared the ticket and a screenshot of the desktop design, and asked for the logged-in header.
- Shared a screenshot of the mobile design and asked for heart (Favorites) and plus (Create) icons next to the profile icon.
- Gave the Figma measurements: 24px icons, 144px total width for the four mobile icons, and thinner icon outlines.
- Asked for the avatar icon to open a menu with a log out option.

**Outcome and Decisions:**

- **Accepted:** `Header` reads the session cookie with the existing `getAccessToken()`, so the header is correct on first load and after a refresh, and updates after the login and logout redirects.
- **Accepted:** Logged-in desktop header shows Recipes, Meal plan, Pantry, Favorites, a "+ Create" button and a profile icon with an accessible label. Logged-out users keep the existing Login/Register header.
- **Accepted:** `MobileMenu` takes a list of icon links instead of a single profile link. Logged in, it shows Favorites, Create recipe and Profile icons; the menu lists Recipes, Meal plan and Pantry.
- **Accepted:** The logged-in header switches to the desktop layout at `lg` instead of `md`, because the extra links left almost no room for search at tablet width.
- **Modified:** Mobile icons resized to 24px with 16px gaps and a 1.5 stroke to match Figma. An invisible `before:` layer keeps a 40px tap area without changing the layout.
- **Accepted:** Added `ProfileMenu`, a client component that opens a dropdown with Log out from the avatar on desktop and mobile. It uses the existing `logout` action, closes on Escape (returning focus to the avatar) or an outside click, and replaces the link to `/profile`.
- **Open:** `/favorites`, `/profile` and `/recipes/create` do not exist yet. `/recipes/create` was a guess and must match the page when it is built.
  - **Status update (2026-10-22):** `/favorites` (AI-019) and `/profile` (AI-016) now exist. Create recipe became a modal instead of a page (AI-047), and no `/recipes/create` link remains.

**Verification / Status:**

- `npm run build` and TypeScript pass; ESLint passes for the changed files.
- Checked the rendered HTML of a production build with and without a session cookie: logged out shows Login/Register, logged in shows the new links and icons.
- Log out from the profile menu tested manually by the team member and works.
- Not yet tested in a browser at different screen sizes or with keyboard navigation.

**References:**

- [Ticket #199 - Add logged-in state to Header component](https://github.com/GroAnita/Flavorcraft_labs/issues/199)
- Branch: `fix/header-logged-in-state-199`
- `src/app/components/layout/Header.tsx`
- `src/app/components/layout/MobileMenu.tsx`

---

### AI-014 - Close Mobile Menu When Focus Leaves It

**Date:** 2026-10-20

**Team Member:** Gro Anita / `GroAnita`

**Related Tasks / Files:**

- Ticket #209 - Close mobile menu when focus leaves it
- Branch: `fix/header-accessibility-209`
- `src/app/components/layout/MobileMenu.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Run a keyboard navigation check on the header, and fix the mobile menu accessibility issue it found.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Asked for a keyboard navigation check of the header after the logged-in state work (#199).
- Asked to create a ticket for the issue found, and then to fix it on a new branch.

**Outcome and Decisions:**

- **Accepted:** The keyboard check found that the mobile menu stayed open when focus moved out of it, and that Escape no longer worked once focus had left. Ticket #209 was created for it.
- **Accepted:** The menu button and the menu are wrapped together. The menu closes when focus moves to an element outside the wrapper, and when clicking or tapping outside it. Clicking an empty spot inside the menu keeps it open.
- **Modified:** Moving from the open mobile menu to the profile menu now closes the mobile menu, so only one menu is open at a time.

**Verification / Status:**

- `npm run build`, TypeScript and ESLint for the changed files pass.
- 25 automated keyboard and click checks run in Chromium (Playwright) at 375px width, logged out and logged in, all passing: Tab and Shift+Tab out of the menu, click outside, click inside, Escape with focus return, toggle, profile menu, and closing after navigation.
- Not tested in Safari or Firefox, or with a screen reader.

**References:**

- [Ticket #209 - Close mobile menu when focus leaves it](https://github.com/GroAnita/Flavorcraft_labs/issues/209)
- Branch: `fix/header-accessibility-209`
- `src/app/components/layout/MobileMenu.tsx`

---

### AI-015 - Full-width Header and Footer, Smaller Create Text

**Date:** 2026-10-20

**Team Member:** Gro Anita / `GroAnita`

**Related Tasks / Files:**

- Ticket #212 - Header and footer: full width and smaller Create button text
- Branch: `style/header-footer-full-width-212`
- `src/app/components/layout/Header.tsx`
- `src/app/components/layout/Footer.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Create the ticket and adjust the header and footer layout and the Create button text to match the design.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Asked for a ticket and branch to make the header and footer full width and the Create button smaller: 40×15, 12px Inter text.
- When asked whether 40×15 was the whole button or the text, answered to keep the button as it is.

**Outcome and Decisions:**

- **Accepted:** Removed the `max-w-6xl` container from the header and footer, keeping the existing side padding (20px mobile, 32px from `md`).
- **Modified:** Applied 40×15 to the text only, since "+ Create" in 12px Inter cannot fit in a 40px-wide button. The text is now 12px Inter with a 15px line height; the button's shape, padding and colors are unchanged.

**Verification / Status:**

- `npm run build` and ESLint for the changed files pass.
- Measured in Chromium (Playwright): Create text box is 38.7×15px; header and footer logos align 32px from the edge at 1586px; no horizontal scrolling at 375px, 1024px and 1586px.
- Screenshots of the full-width header and footer reviewed by the team member.

**References:**

- [Ticket #212 - Header and footer: full width and smaller Create button text](https://github.com/GroAnita/Flavorcraft_labs/issues/212)
- Branch: `style/header-footer-full-width-212`
- `src/app/components/layout/Header.tsx`
- `src/app/components/layout/Footer.tsx`

---

### AI-016 - Profile Page: Sidebar and My Profile Tab

**Date:** 2026-10-20

**Team Member:** Gro Anita / `GroAnita`

**Related Tasks / Files:**

- Ticket #214 - Profile page: sidebar and My profile tab
- Branch: `feat/profile-page-214`
- `src/app/(pages)/profile/page.tsx`
- `src/app/components/features/ProfileTabs.tsx`, `ProfileGeneralForm.tsx`, `DietAllergies.tsx`, `ProfileSidebar.tsx`
- `src/app/components/ui/Tabs.tsx`, `ProfileStats.tsx`
- `src/app/hooks/useLocalStorage.ts`
- `src/app/lib/profile.ts`, `src/app/lib/session.ts`, `src/app/actions/auth.ts`, `src/app/types/auth.ts`
- `src/app/components/layout/Header.tsx`, `MobileMenu.tsx` (removed `ProfileMenu.tsx`)

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Create the ticket and build the profile page from the mobile and desktop designs, reusing the existing profile sidebar components.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Shared mobile and desktop screenshots of the profile page and asked for a ticket, branch and implementation.
- Chose to save the form and diet choices in the browser, and to build only the My profile tab in this ticket.
- Asked to remove the avatar dropdown in the header and link straight to the profile page.

**Outcome and Decisions:**

- **Accepted:** The API has no profile endpoint, so the profile from the login response is saved in a second httpOnly cookie next to the token, and removed on logout. Sessions without it are sent to log in again.
- **Accepted:** Four stats (Favorites, Recipes, Meals planned, Pantry items). Counts come from the API's `meta.totalCount`; recipes are counted by owner across all pages. A stat that can't load shows "–".
- **Accepted:** An accessible `Tabs` component (WAI-ARIA tabs pattern, arrow keys, Home/End) used for the main tabs and the General/Preferences switch. Other tabs show "coming soon".
- **Accepted:** General information form and Diet & allergies toggles saved to localStorage per user through a `useLocalStorage` hook built on `useSyncExternalStore`, avoiding hydration mismatches.
- **Modified:** Diet icons, heading icons and the diet description differ from the design, which used placeholder icons and text. Cards stack below 1536px because they were too narrow next to the sidebar.
- **Modified:** The header avatar now links straight to `/profile`; the dropdown with Log out was removed, and Log out stays in the profile sidebar.

**Verification / Status:**

- `npm run build`, TypeScript and ESLint for the changed files pass.
- 27 automated checks in Chromium (Playwright) with a test session: tab keyboard navigation, diet toggles with Enter/Space, email validation, Save and Reset, values kept after refresh, Edit profile link, mobile tabs on one line and no horizontal scroll. Logged-out users are redirected to `/login`.
- Tested with a real login by the team member.
- My recipes, Favorites, Settings and Preferences need their own tickets.

**References:**

- [Ticket #214 - Profile page: sidebar and My profile tab](https://github.com/GroAnita/Flavorcraft_labs/issues/214)
- Branch: `feat/profile-page-214`

---

### AI-017 - Mobile Menu Redesign

**Date:** 2026-10-20

**Team Member:** Gro Anita / `GroAnita`

**Related Tasks / Files:**

- Ticket #217 - Mobile menu redesign for logged-in and logged-out users
- Branch: `feat/mobile-menu-217`
- `src/app/components/layout/MobileMenu.tsx`
- `src/app/components/layout/Header.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Create the ticket and rebuild the mobile menu from the new logged-in and logged-out designs.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Shared screenshots of the new mobile menu, logged in and logged out, and asked for a ticket, branch and fix.

**Outcome and Decisions:**

- **Accepted:** Logged-in menu shows the avatar, name and @username, links with icons (Home, Recipes, Meal plan, Pantry, Favorites, Create recipe) and a Log out button. Logged-out menu shows Home and Recipes with Login and Register buttons.
- **Accepted:** The current page's link is highlighted and marked with `aria-current="page"`; the longest matching link wins, so `/recipes/create` highlights Create recipe.
- **Accepted:** `Header` reads the saved profile from the session and passes the name and avatar to the menu. Sessions without a saved profile show the menu without the profile block.
- **Modified:** Noroff accounts have no separate username, so @username is the account name in lowercase.
- **Kept:** Existing keyboard and click behavior from #209 (Escape, closing when focus leaves, closing on outside click).

**Verification / Status:**

- `npm run build`, TypeScript and ESLint for the changed files pass.
- 27 automated checks in Chromium (Playwright) at 400px, logged in and logged out: links, current page highlighting, profile block, navigation closing the menu, Escape and focus return, Tab out, click outside, log out removing the session, and no horizontal scroll.
- Screenshots of both states compared with the design and approved by the team member.

**References:**

- [Ticket #217 - Mobile menu redesign for logged-in and logged-out users](https://github.com/GroAnita/Flavorcraft_labs/issues/217)
- Branch: `feat/mobile-menu-217`

---

### AI-018 - Favorite Recipes from the Recipe Card

**Date:** 2026-10-20

**Team Member:** Gro Anita / `GroAnita`

**Related Tasks / Files:**

- Ticket #219 - Favorite recipes from the recipe card
- Branch: `feat/favorite-recipe-card-219`
- `src/app/components/features/FavoritesProvider.tsx`, `FavoritesBoundary.tsx`, `RecipeCard.tsx`
- `src/app/components/ui/Toast.tsx`, `FavoriteButton.tsx`
- `src/app/lib/favorites.ts`
- `src/app/page.tsx`, `src/app/(pages)/recipes/page.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Create the ticket and make the heart on recipe cards save and remove favorites for logged-in users, with a confirmation message from the design.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Shared screenshots of the recipe card, the filled heart and the confirmation message, and explained that the heart is only for logged-in users and saves the recipe to favorites.
- Chose that clicking a filled heart removes the favorite with a message, and that messages close after 5 seconds.

**Outcome and Decisions:**

- **Accepted:** `FavoritesBoundary` (server) loads the user's favorite recipe ids and wraps the cards in `FavoritesProvider` only when logged in, so logged-out users get no heart.
- **Accepted:** `FavoritesProvider` keeps the favorite state for every card on the page, fills or empties the heart immediately, saves with the existing `setFavorite` action, and undoes the change with an error message if saving fails. Requests per recipe are blocked while one is in progress.
- **Accepted:** A reusable `Toast` component with an always-rendered live region, auto close after 5 seconds, paused while hovered or focused.
- **Modified:** Restyled the card's heart button to the design's cream square and larger icon.
- **Found:** The home page and recipes page rendered cards without the logged-in state, so the heart was never shown before this change.

**Verification / Status:**

- `npm run build`, TypeScript and ESLint for the changed files pass.
- Automated checks in Chromium (Playwright) on `/` and `/recipes`: no heart when logged out, heart with accessible name when logged in, clicking doesn't open the recipe, double click sends one request, failed save reverts the heart and shows an error, message closes after 5 s and stays open while hovered.
- A real save could not be tested locally because `.env.local` with an API key was missing; this needs testing in an environment with the key.

**References:**

- [Ticket #219 - Favorite recipes from the recipe card](https://github.com/GroAnita/Flavorcraft_labs/issues/219)
- Branch: `feat/favorite-recipe-card-219`

---

### AI-019 - Profile Area and Favorites Page

**Date:** 2026-10-20

**Team Member:** Gro Anita / `GroAnita`

**Related Tasks / Files:**

- Ticket #155 - Build Profile area and favorites page, with sub-issues #157, #158, #159, #160, #161 and #162
- Branch: `feat/favorites-page-155`
- `src/app/(pages)/(profile)/layout.tsx`, `profile/page.tsx`, `profile/recipes/page.tsx`, `profile/settings/page.tsx`, `favorites/page.tsx`, `favorites/loading.tsx`
- `src/app/components/features/ProfileNavigation.tsx`, `ProfileSections.tsx` (was `ProfileTabs.tsx`), `ProfileComingSoon.tsx`, `FavoritesGrid.tsx`, `FavoritesEmptyState.tsx`, `FavoritesError.tsx`, `FavoritesProvider.tsx`, `ProfileSidebar.tsx`
- `public/images/favorites-empty.png`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Read issue #155 and its sub-issues on GitHub, including the attached designs, and build the shared profile layout and the favorites page.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Asked to look at issue #155 and all its sub-issues on GitHub.
- Supplied the empty-state sushi illustration.
- Chose to keep `/favorites` with `/profile/...` for the other sections, and to build all sub-issues on one branch with one PR.

**Outcome and Decisions:**

- **Accepted:** A `(profile)` route group with a shared layout (sidebar, profile navigation, redirect to login) for `/profile`, `/profile/recipes`, `/profile/settings` and `/favorites`. The client-side tabs became links with `aria-current`, so each section works on direct load and refresh.
- **Accepted:** `FavoritesGrid` reuses `RecipeCard` inside `FavoritesProvider`. After a successful removal the card is hidden, focus moves to the list heading or empty-state heading, and `router.refresh()` updates the sidebar's Favorites count.
- **Accepted:** Loading placeholders (`loading.tsx`), an error message with a Try again button, a Log in link for expired sessions, and the designed empty state, shown only after a successful load.
- **Modified:** Three columns only from 1536px, because at 1280px the cards were too narrow and the recipe times wrapped. The "Go to favorites" arrow is hidden in messages on the favorites page itself.
- **Checked:** The Noroff docs confirm each favorite includes the full recipe, so the page needs one request.

**Verification / Status:**

- `npm run build`, TypeScript and ESLint for the changed files pass.
- 39 automated checks in Chromium (Playwright) against a local mock of the Noroff API with real recipe data: grid, removal, focus, sidebar count, empty state, error and retry, expired session, loading placeholders, navigation on direct load, refresh and keyboard, logged-out redirect, and mobile layout. The temporary API address used for the mock was reverted before committing.
- Screenshots compared with the desktop, mobile and empty-state designs.

**References:**

- [Ticket #155 - Build Profile area and favorites page](https://github.com/GroAnita/Flavorcraft_labs/issues/155)
- Branch: `feat/favorites-page-155`

---

### AI-020 - Register Page Implementation (#30)

**Date:** 2026-10-15

**Team Member:** Emilie Sofie Fosmo (GitHub username: `Emifos`)

**Related Tasks / Files:**

- Ticket #30 - Register Page
- Ticket #31 - Auth Layout
- Ticket #32 - Form Field
- Branch: `feat/register-page-30`
- `src/app/(pages)/register/page.tsx`
- `src/app/components/features/RegisterForm.tsx`
- `src/app/components/layout/AuthLayout.tsx`
- `src/app/components/ui/FormField.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Implement the registration page based on the Figma design, following a mobile-first approach and extending the layout for desktop. Reuse existing authentication layout and form field components while maintaining consistency with the project's styling conventions.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Create `src/app/(pages)/register/page.tsx` using the existing `AuthLayout` and `RegisterForm` components, following the Figma design with mobile as the default layout.
2. Apply Figma Dev Mode specifications for dimensions, colors, spacing, and typography, beginning with mobile and then implementing desktop styling.
3. Match the error message presentation to the design, using an icon and red text that appear only when validation fails.
4. Restrict registration to email addresses ending in `@stud.noroff.no`.

**Outcome and Decisions:**

- **Accepted:** Created the registration page using the existing authentication components and the Figma design as the visual reference.
- **Accepted:** Placed the "Already have an account? Login here!" link below the registration form at page level. This leaves room for the planned social sign-in component (Ticket #33) between the form button and the login link.
- **Modified:** Updated `RegisterForm` to call `registerUser` directly instead of receiving an `onSubmit` callback prop. This was necessary because the Server Component page cannot pass a regular function directly to a Client Component.
- **Accepted:** Added validation restricting registration email addresses to the `@stud.noroff.no` domain.
- **Accepted:** Styled `AuthLayout`, `FormField`, the registration button, and the login link using Tailwind CSS values based on the Figma specifications.
- **Accepted:** Used mobile-first styling with `md:` responsive classes for desktop layouts.
- **Accepted:** Updated validation messages to display the `CircleAlert` icon alongside text styled with `text-error-text`.
- **Modified:** Removed helper text beneath the form fields to match the Figma design. Field requirements are instead communicated through validation error messages.
- **Rejected:** AI-proposed changes to `layout.tsx` and `globals.css` because they were outside the scope of the registration page task.
- **Modified:** Avoided arbitrary Tailwind values such as `text-[32px]` in accordance with `src/app/docs/styles.md`. As a result, the heading uses 30px on mobile and 36px on desktop instead of the exact Figma values of 32px and 40px.
- **Modified:** Retained the existing validation error messages rather than copying all Figma error text. For example, "Email is already in use" can only be determined after receiving an API response.

**Verification / Status:**

- TypeScript validation using `tsc --noEmit` completed without errors.
- ESLint completed without errors.
- The registration page was visually reviewed in the browser using `npm run dev` and compared against the Figma design.
- **Outstanding:** The registration image (`public/images/register.jpg`) was missing at the time of testing.
  - **Status update (2026-10-22):** Done. The page uses `public/images/categories/register-image.jpg`.
- **Outstanding:** Social sign-in functionality (Ticket #33) had not yet been implemented.
- **Outstanding:** Aptly Medium (500) was missing from the Adobe Fonts kit, causing the heading to render at weight 400 until the font weight is added.
  - **Status update (2026-10-22):** Done. Aptly Medium was added to the Adobe Fonts kit (AI-023).
- **Merge consideration:** Both `AuthLayout` and `FormField` were also modified on `feat/login-page-30`. A merge conflict was anticipated for whichever branch was merged last.

**References:**

- [Ticket #30 - Registration](https://github.com/GroAnita/Flavorcraft_labs/issues/30)
- Branch: `feat/register-page-30`
- Figma registration page design
- `src/app/docs/styles.md`
- `src/app/(pages)/register/page.tsx`
- `src/app/components/features/RegisterForm.tsx`
- `src/app/components/layout/AuthLayout.tsx`
- `src/app/components/ui/FormField.tsx`
- Pull request: Link not provided in original entry

---

### AI-021 - Login Page Implementation (#71)

**Date:** 2026-10-15

**Team Member:** Emilie Sofie Fosmo (GitHub username: `Emifos`)

**Related Tasks / Files:**

- Ticket #71 - Login Page
- Branch: `feat/login-page-71`
- `src/app/(pages)/login/page.tsx`
- `src/app/components/features/LoginForm.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Implement the login page based on the Figma design, using the shared `AuthLayout` and `FormField` components while following the project's existing authentication architecture and mobile-first styling approach.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Create `src/app/(pages)/login/page.tsx` using `AuthLayout` and `LoginForm`, following the Figma design with mobile as the default layout.
2. Leave space for social sign-in functionality, which will be implemented separately as a reusable component.

**Outcome and Decisions:**

- **Accepted:** Created the login page with a heading, description, login form, and a "Register here!" link navigating to `/register`.
- **Accepted:** Included a placeholder for the planned social sign-in component (Ticket #33).
- **Modified:** Updated `LoginForm` to call `loginUser` directly instead of receiving an `onSubmit` callback prop. This was necessary because the Server Component page cannot pass a regular function directly to a Client Component.
- **Accepted:** Added client-side email format validation.
- **Accepted:** Disabled the login button while an authentication request is pending to prevent repeated submissions.
- **Accepted:** Displayed a generic "Invalid email or password" message when authentication fails, avoiding disclosure of whether an account exists.
- **Accepted:** Styled the login button and error message container within `LoginForm` according to the Figma design.
- **Modified:** Moved shared `AuthLayout` and `FormField` styling work to the registration branch to reduce potential merge conflicts.
- **Rejected:** AI-proposed modifications to the root `layout.tsx` because they were outside the scope of the login page task.
- **Scope decision:** Did not implement a "Forgot password?" link because the available API did not provide the required password recovery functionality.

**Verification / Status:**

- TypeScript validation using `tsc --noEmit` completed without errors.
- ESLint completed without errors.
- **Outstanding:** Session handling after successful login remained unimplemented, with a TODO comment in `LoginForm`.
  - **Status update (2026-10-22):** Done. Session handling was implemented with cookie-based authentication (AI-035), and no TODO comments remain in the code.
- **Outstanding:** The login image (`public/images/login.jpg`) was missing.
  - **Status update (2026-10-22):** Done. The page uses `public/images/categories/login-image.jpg`.
- **Outstanding:** Social sign-in functionality (Ticket #33) had not yet been implemented.
- **Dependency:** Styling for `AuthLayout` and `FormField` was expected to become available after the registration pull request was merged into `develop`.

**References:**

- [Ticket #71 - Login Page](https://github.com/GroAnita/Flavorcraft_labs/issues/71)
- Branch: `feat/login-page-71`
- Figma login page design
- `src/app/docs/auth.md`
- `src/app/(pages)/login/page.tsx`
- `src/app/components/features/LoginForm.tsx`
- Pull request: Link not provided in original entry

---

### AI-022 - Connect and Style AlternativeAuth on Login and Register (#111)

**Date:** 2026-10-16

**Team Member:** Emilie Sofie Fosmo (GitHub username: `Emifos`)

**Related Tasks / Files:**

- Ticket #111 - Connect and Style AlternativeAuth
- Related Ticket #33 - Social Sign-In Component
- Branch: `fix/alternative-auth-login-register-111`
- `src/app/components/ui/AlternativeAuth.tsx`
- `src/app/(pages)/login/page.tsx`
- `src/app/(pages)/register/page.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Integrate the existing `AlternativeAuth` component into the login and registration pages and style it according to the mobile and desktop Figma designs. Preserve the appearance of the social sign-in buttons while keeping them non-functional until authentication providers are implemented.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Connect `AlternativeAuth.tsx` to the login and registration pages and style the component according to the Figma design.
2. Apply the Figma Dev Mode specifications step by step, beginning with mobile and then adapting the component for desktop.
3. Keep the social sign-in buttons' intended colors while ensuring they remain non-clickable.

**Outcome and Decisions:**

- **Accepted:** Added `<AlternativeAuth mode="login" />` to the login page and `<AlternativeAuth mode="register" />` to the registration page.
- **Accepted:** Removed the individual "Register here!" and "Login here!" links from the pages because the shared `AlternativeAuth` component already includes the relevant navigation links.
- **Modified:** Removed `disabled:opacity-50` and `disabled:grayscale` because these styles made the social sign-in buttons appear grey instead of matching the Figma design.
- **Accepted:** Kept the social sign-in buttons disabled because no authentication providers were connected. Accessible text continues to communicate that the options are "not available yet."
- **Accepted:** Applied responsive typography from Figma, using 14px on mobile and 16px on desktop for the "Or" separator and navigation link.
- **Accepted:** Styled the buttons with flexible full-width sizing (`flex-1`), a 12px border radius, responsive padding of 12px and 9px, the `bg-salt-300` design token, and 28px icons.
- **Accepted:** Applied responsive spacing, using 24px on mobile and 48px around the component on desktop.
- **Modified:** Replaced arbitrary Tailwind values such as `h-[52px]`, `w-[186px]`, and `max-w-[388px]` with standard Tailwind spacing and sizing utilities.
- **Modified:** Replaced colors outside the project's design system, including `stone-100` and `green-700`, with established design tokens.
- **Modified:** Removed the component-specific focus ring styling to rely on the shared focus styles defined in `globals.css`.
- **Modified:** Changed the navigation text from "Log in here!" to "Login here!" to match the Figma design.

**Verification / Status:**

- TypeScript validation using `tsc --noEmit` completed without errors.
- ESLint completed without errors.
- The social sign-in buttons remain disabled until the corresponding authentication functionality is implemented.
- **Outstanding:** The Google icon was rendered in a single green color rather than the gradient shown in the Figma design. Matching the design requires a custom SVG.

**References:**

- [Ticket #111 - Connect and Style AlternativeAuth](https://github.com/GroAnita/Flavorcraft_labs/issues/111)
- Related Ticket #33 - Social Sign-In Component
- Branch: `fix/alternative-auth-login-register-111`
- Figma login and registration page designs
- `src/app/docs/styles.md`
- `src/app/components/ui/AlternativeAuth.tsx`
- `src/app/(pages)/login/page.tsx`
- `src/app/(pages)/register/page.tsx`
- Pull request: Link not provided in original entry

---

### AI-023 - Homepage Font Weight and Size Adjustments (#119)

**Date:** 2026-10-16

**Team Member:** Emilie Sofie Fosmo (GitHub username: `Emifos`)

**Related Tasks / Files:**

- Ticket #119 - Homepage Font Weight and Size
- Branch: `fix/font-weight-119`
- `src/app/components/HeroSection.tsx`
- `src/app/components/FeaturedRecipe.tsx`
- `src/app/components/features/CategoryNavigation.tsx`
- `src/app/components/features/RecipeSection.tsx`
- `src/app/components/ui/CategoryItem.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Adjust homepage typography to match the Figma design across mobile and desktop layouts, including font weights, heading sizes, and supporting text.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Compare the homepage's existing font sizes and weights with the Figma design using measurements gathered through the WhatFont browser extension.
2. Apply the provided typography corrections to individual homepage elements, beginning with desktop and then adjusting mobile styles.
3. Investigate why the intended medium font weight was not rendering correctly despite using Tailwind's `font-medium` utility.

**Outcome and Decisions:**

- **Accepted:** Changed relevant homepage headings from `font-bold` to `font-medium` (500), including "What's on your plate today?", "What everyone's cooking today", the featured recipe title, and section headings.
- **Accepted:** Updated category names, such as Breakfast and Lunch, to use `font-medium` for consistency with the Figma design.
- **Accepted:** Adjusted the hero section's typography for mobile and desktop:
  - Hero label: 12px mobile / 14px desktop.
  - Hero heading: 40px mobile / 48px desktop.
  - Hero supporting text: 18px mobile / 20px desktop.
- **Accepted:** Set section headings to 32px and "See all" links to 16px.
- **Modified:** Used arbitrary Tailwind values `text-[2rem]` and `text-[2.5rem]` to achieve the exact 32px and 40px sizes specified in Figma. This was a deliberate exception to the project's `styles.md` guidance, prioritizing design accuracy.
- **Investigated:** AI identified that Aptly Medium (500) was missing from the Adobe Fonts kit (`xnz3twu`). Consequently, elements styled with `font-medium` were rendering at weight 400.
- **Resolved:** The team added the missing Medium font weight to the Adobe Fonts kit. No additional code changes were required to resolve this issue.

**Verification / Status:**

- TypeScript validation using `tsc --noEmit` completed without errors.
- ESLint completed without errors.
- The missing Aptly Medium font weight was addressed through the Adobe Fonts configuration.
- **Outstanding:** The desktop font size for "Let's make something delicious" was not specified in the provided design measurements and was therefore left at 14px.

**References:**

- [Ticket #119 - Homepage Font Weight and Size](https://github.com/GroAnita/Flavorcraft_labs/issues/119)
- Branch: `fix/font-weight-119`
- Figma homepage design
- Adobe Fonts kit: `xnz3twu`
- `src/app/components/HeroSection.tsx`
- `src/app/components/FeaturedRecipe.tsx`
- `src/app/components/features/CategoryNavigation.tsx`
- `src/app/components/features/RecipeSection.tsx`
- `src/app/components/ui/CategoryItem.tsx`
- Pull request: Link not provided in original entry

---

### AI-024 - RecipeHero Component (#125)

**Date:** 2026-10-16

**Team Member:** Emilie Sofie Fosmo (GitHub username: `emifos`)

**Related Tasks / Files:**

- Ticket #125 - RecipeHero Component
- Branch: `feat/recipeHero-125`
- `src/app/components/features/RecipeHero.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Create a reusable layout component for the recipe detail page, arranging the recipe image and overview content according to the mobile and desktop Figma designs. Keep the component focused on layout and avoid changes to unrelated files.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Create a component that arranges the recipe image and overview content according to the requirements in Ticket #125, without modifying other files.
2. Apply the Figma Dev Mode specifications for mobile, followed by the desktop layout, including image dimensions, spacing, background colors, and responsive behavior.

**Outcome and Decisions:**

- **Accepted:** Created the `RecipeHero` component with an `image` prop containing the image URL and alternative text, and a `children` prop for the recipe overview content.
- **Accepted:** Kept the component responsible only for layout. Recipe-specific content, including tags, title, metadata, author information, and action buttons, is provided by the recipe detail page through `children`.
- **Accepted:** Implemented a stacked mobile layout with a 350px image (`h-87.5`) and an overview section styled using `p-6`, `gap-10`, and `bg-salt-50`.
- **Accepted:** Implemented a side-by-side desktop layout within a rounded container (`rounded-2xl`), with the image occupying 55% (`md:w-11/20`) and the overview occupying 45% (`md:w-9/20`) of the available width.
- **Accepted:** Applied `md:p-8` for desktop spacing. The proportions were based on the Figma design dimensions of approximately 720px for the image and 590px for the overview within a 1310px layout.
- **Accepted:** Added a fallback for missing or broken recipe images, displaying an `ImageOff` icon against a `bg-oat-300` background.
- **Scope decision:** Did not modify the existing `RecipeImage.tsx` component because its fixed image height was designed for recipe cards and it was already used by `RecipeCard`.
- **Modified:** Duplicated the image rendering and fallback logic within `RecipeHero` rather than changing the shared `RecipeImage` component. This avoided introducing changes to existing card functionality.

**Verification / Status:**

- TypeScript validation completed without errors for the component.
- ESLint completed without errors for the component.
- **Pending testing:** The component had not been tested in the browser because the recipe detail page was not yet available. Visual and responsive testing was planned once that page was implemented.
  - **Status update (2026-10-22):** `RecipeHero` is used on the recipe detail page (AI-046), which was tested against Figma at 1440px and 402px.
- **Potential improvement:** The overview section may feel narrow on tablet screens between 768px and 1024px. Moving the side-by-side breakpoint from `md:` to `lg:` could be considered after responsive testing.
- **Potential refactoring:** The existing `RecipeImage` component could later accept a `className` prop to support different image sizes and reduce duplicated rendering and fallback logic.

**References:**

- [Ticket #125 - RecipeHero Component](https://github.com/GroAnita/Flavorcraft_labs/issues/125)
- Branch: `feat/recipeHero-125`
- Figma recipe detail page design
- `src/app/components/features/RecipeHero.tsx`
- `src/app/components/features/RecipeImage.tsx`
- Pull request: Link not provided in original entry

---

### AI-025 - Basic Recipes Page (#182)

**Date:** 2026-10-19

**Team Member:** Emilie Sofie Fosmo (GitHub username: `emifos`)

**Related Tasks / Files:**

- Ticket #182 - Basic Recipes Page
- Branch: `feat/recipe-page-182`
- `src/app/(pages)/recipes/page.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Create a basic `/recipes` page to provide a working foundation for the upcoming filter sidebar implementation (cards 4–6). The page was intentionally limited in scope, with additional functionality planned for later tasks.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Create a simple recipes page that can be used as a starting point for building the filter functionality. Keep the implementation minimal, as the remaining page features will be added later.

**Outcome and Decisions:**

- **Accepted:** Created the `/recipes` route in `src/app/(pages)/recipes/page.tsx`.
- **Accepted:** Used the existing `fetchRecipes()` function to retrieve the available recipes.
- **Accepted:** Displayed the recipes in a responsive grid using the existing `RecipeCard` component.
- **Accepted:** Added an empty `<aside>` element as a placeholder for the upcoming filter sidebar.
- **Accepted:** Reused the homepage's existing error-handling approach for recipe fetching.
- **Accepted:** Reused existing components and functionality rather than introducing unnecessary new components.
- **Scope decision:** Limited changes to the recipes page without modifying unrelated files.
- **Deferred:** Filter chips, sorting, pagination, and the mobile filter button were intentionally excluded because they belong to later implementation tasks.

**Verification / Status:**

- TypeScript validation completed without errors.
- ESLint completed without errors.
- **Completed:** Basic recipes page with recipe fetching, responsive card layout, error handling, and a placeholder for the filter sidebar.
- **Outstanding:** Filter sidebar implementation and integration.
- **Outstanding:** Filter chips, sorting, pagination, and mobile filter controls, planned for subsequent tasks.
  - **Status update (2026-10-22):** The filter sidebar, chips and mobile filter controls were added in AI-026, and sorting in AI-028. The recipes page does not paginate; it shows all recipes.

**References:**

- [Ticket #182 - Basic Recipes Page](https://github.com/GroAnita/Flavorcraft_labs/issues/182)
- Branch: `feat/recipe-page-182`
- Figma recipes page design
- `src/app/(pages)/recipes/page.tsx`
- Pull request: Link not provided in original entry

---

### AI-026 - Recipe Filter Sidebar and Integration (#172–#177, #189, #201, #202)

**Date:** 2026-10-19 to 2026-10-20

**Team Member:** Emilie Sofie Fosmo (GitHub username: `Emifos`)

**Related Tasks / Files:**

- Tickets #172–#177 - Recipe Filter Sidebar (Cards 1–6)
- Ticket #182 - Basic Recipes Page
- Ticket #189 - Filter Link Helpers
- Ticket #201 - Active Filters and Suggestions
- Ticket #202 - Filter Fixes
- `src/app/components/ui/FilterOption.tsx`
- `src/app/components/ui/FilterGroup.tsx`
- `src/app/components/ui/SavedRecipesLink.tsx`
- `src/app/components/features/RecipeBrowser.tsx`
- `src/app/components/features/RecipeFilterSidebar.tsx`
- `src/app/lib/recipeFilters.ts`
- `src/app/hooks/useRecipeFilters.ts`
- `src/app/(pages)/recipes/page.tsx`
- `src/app/(pages)/recipes/loading.tsx`
- `src/app/components/features/CategoryNavigation.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Implement the recipe filtering interface based on the issue requirements and Figma designs, using separate pull requests for individual tasks. Connect the filter controls to recipe results, support responsive layouts, and coordinate shared filtering behavior with other team members.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement the recipe filtering functionality incrementally using each ticket's description and acceptance criteria, with one small pull request per card.
2. Apply Figma Dev Mode specifications for individual components, beginning with mobile and then adapting the layout for desktop.
3. Analyze the available recipe API data to determine which filtering options can be supported and how they should match recipe properties.
4. Connect filter selections to the recipe results while supporting URL-based state, navigation history, and combinations of different filter types.
5. Address questions and integration requirements raised by teammates, including URL formatting and reusable filter link helpers.

**Outcome and Decisions:**

**Reusable Filter Components**

- **Accepted:** Created `FilterOption` as a reusable checkbox row and `FilterGroup` as a collapsible filter section with a badge, chevron, and `aria-expanded` attribute.
- **Accepted:** Implemented both as controlled components, keeping the selected values and expanded state in the parent rather than duplicating state across individual controls.

**Filter Configuration and Matching Logic**

- **Accepted:** Created `recipeFilters.ts` to define the filter groups and options based on the Figma design.
- **Accepted:** Assigned each filter option a stable identifier using the `field:option` format, such as `category:dinner`, alongside a `matches` function.
- **Accepted:** Used AI to analyze the available API dataset of 52 recipes and map filter options to supported recipe properties.
- **Team decision:** Cooking-time filters use total recipe time.
- **Team decision:** Filter options without matching data display a count of zero.
- **Team decision:** Diet and allergy filters only match explicitly provided tags. Dietary suitability is not inferred from ingredient lists.

**Filter State and Recipe Results**

- **Accepted:** Stored selected filters in the URL using the `?filters=` query parameter and `router.push`.
- **Accepted:** Supported persistence of filter selections across page refreshes, shared links, and browser back/forward navigation.
- **Team decision:** Multiple selections within the same filter type use OR logic, while selections across different types use AND logic.
- **Team decision:** Diet and allergy selections use AND logic.
- **Team decision:** Filter counts are calculated from the full recipe dataset rather than dynamically reflecting other active selections.
- **Accepted:** Connected the filtering functionality to the `/recipes` page, which displays recipe cards in a responsive grid.
- **Accepted:** Added a loading skeleton and an error message for recipe loading states.

**Responsive Interface and Navigation**

- **Accepted:** Created `RecipeFilterSidebar` as a persistent sidebar for desktop layouts.
- **Accepted:** Implemented a full-screen `<dialog>` for mobile filtering, opened through a "Filter (n)" button displaying the number of selected filters.
- **Accepted:** Connected active filter chips, the suggestion row, and the result count to the same filter state to keep the interface synchronized.
- **Accepted:** Created `SavedRecipesLink` as an outlined navigation button. Authenticated users are directed to `/favorites`, while unauthenticated users are directed to `/login`, based on the `accessToken` cookie.

**Integration and Follow-up Fixes**

- **Accepted:** Created reusable `filterHref()` and `tagToFilterValue()` helpers following a teammate's request for integration with `SimilarRecipes`.
- **Accepted:** Updated `CategoryNavigation` to generate links using the `/recipes?filters=…` URL format.
- **Modified:** Corrected the "Cakes" filter so it combines with other category selections using OR logic.
- **Team decision:** Removed the unused `CategoryFilter.tsx` component after agreeing with the team that it was no longer needed.

**Rejected or Deferred:**

- Dynamic desktop filter counts that respond to other selected filters were postponed as a possible future improvement.
- Trending functionality, pagination, and the designed no-results page were left for subsequent recipes page tasks.
- Search integration on `/recipes` (Ticket #14) was kept outside this work's scope.

**Verification / Status:**

- TypeScript validation completed successfully.
- ESLint and `npm run build` passed for the relevant changes, with an existing unrelated lint issue in `AnalyticsManager.tsx` noted separately.
- Filter matching logic was tested using scripts against the actual recipe API data, including combination rules, the "Cakes" OR behavior, and reusable link helpers.
- All 20 reported link helper tests passed.
- Components were tested in the browser using temporary test pages, which were removed before committing.
- The integrated `/recipes` page was tested on mobile and desktop, including keyboard interaction and authenticated/unauthenticated navigation.
- **Outstanding:** The `/favorites` route had not yet been implemented and returned a 404 error.
  - **Status update (2026-10-22):** Done. `/favorites` was built in AI-019.
- **Outstanding:** Search functionality had not yet been connected to `/recipes`.
  - **Status update (2026-10-22):** Done. Search was connected in AI-027.

**References:**

- [Tickets #172–#177 - Recipe Filter Sidebar](https://github.com/GroAnita/Flavorcraft_labs/issues/172)
- [Ticket #182 - Basic Recipes Page](https://github.com/GroAnita/Flavorcraft_labs/issues/182)
- [Ticket #189 - Filter Link Helpers](https://github.com/GroAnita/Flavorcraft_labs/issues/189)
- [Ticket #201 - Active Filters and Suggestions](https://github.com/GroAnita/Flavorcraft_labs/issues/201)
- [Ticket #202 - Filter Fixes](https://github.com/GroAnita/Flavorcraft_labs/issues/202)
- Figma recipes page and filter designs
- [Noroff API v2 - Recipes](https://docs.noroff.dev/docs/v2/recipe-book/recipes)
- Related pull requests: #172–#177, #182, #189, #201, #202 (as identified in the original entry)

---

### AI-027 - Recipe Search Implementation (#14)

**Date:** 2026-10-20

**Team Member:** Emilie Sofie Fosmo (GitHub username: `Emifos`)

**Related Tasks / Files:**

- Ticket #14 - Recipe Search
- Branch: `feat-recipe-search-14`
- `src/app/lib/recipeFilters.ts`
- `src/app/hooks/useRecipeFilters.ts`
- `src/app/components/features/RecipeBrowser.tsx`
- `src/app/components/layout/Header.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Implement functional recipe search through the website header, directing users to the `/recipes` page and displaying matching recipes. Integrate search with the existing filtering functionality while keeping the task focused on search rather than category filtering.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement header search so that submitting a search redirects users to the `/recipes` page and displays recipes matching the search term.
2. Integrate search with the existing recipe filters so users can combine a search query with selected filtering options.
3. Adjust the ticket scope to focus on recipe search only, as category filtering was already implemented through the filter sidebar.

**Outcome and Decisions:**

- **Accepted:** Added a `searchRecipes()` function that searches recipe titles, descriptions, and tags.
- **Accepted:** Implemented case-insensitive matching and trimmed surrounding whitespace from search queries to improve usability.
- **Accepted:** Updated `useRecipeFilters` to read the search query from the `?search=` URL parameter.
- **Accepted:** Extended the existing `clearAll()` functionality to remove both the active search query and selected filters.
- **Accepted:** Combined search and filtering using AND logic, meaning a recipe must match both the search term and all applicable filter conditions to appear in the results.
- **Accepted:** Updated the recipe result count to include the active search term, providing clearer feedback about the displayed results.
- **Accepted:** Added a no-results state with a "Clear search & filters" button, allowing users to reset their search and filter selections.
- **Accepted:** Updated the header search to use `resultsPath="/recipes"`, ensuring submitted searches navigate to the recipes page.
- **Team coordination:** The header change was intentionally postponed until a teammate's header pull request had been merged. This reduced the risk of merge conflicts and allowed the integration to be completed with a one-line change.
- **Implementation decision:** Used client-side search rather than making additional API requests because all 52 recipes were already loaded in the browser.
- **Implementation decision:** Client-side search allowed straightforward integration with the existing filtering logic and supported searching recipe tags alongside titles and descriptions.
- **Scope decision:** Category filtering was excluded from this ticket because it was already handled by the recipe filter sidebar.

**Verification / Status:**

- TypeScript validation completed without errors for the changed files.
- ESLint completed without errors for the changed files.
- Search functionality was tested using a script against the actual recipe API data.
- Script testing covered case-insensitive matching, surrounding whitespace, matches in descriptions and tags, combined search and filtering, and searches returning no results.
- Functionality was also tested manually in the browser.
- **Status:** Implementation and documented testing completed.

**References:**

- [Ticket #14 - Recipe Search](https://github.com/GroAnita/Flavorcraft_labs/issues/14)
- Branch: `feat-recipe-search-14`
- [Noroff API v2 - Recipes](https://docs.noroff.dev/docs/v2/recipe-book/recipes)
- `src/app/lib/recipeFilters.ts`
- `src/app/hooks/useRecipeFilters.ts`
- `src/app/components/features/RecipeBrowser.tsx`
- `src/app/components/layout/Header.tsx`
- Pull request: Link not provided in original entry

---

### AI-028 - Recipe Sorting and No-Results Page (#221)

**Date:** 2026-10-20

**Team Member:** Emilie Sofie Fosmo (GitHub username: `Emifos`)

**Related Tasks / Files:**

- Ticket #221 - Recipe Sorting and No-Results Page
- Branch: `feat/recipe-trending-no-result-221`
- `src/app/components/features/RecipeBrowser.tsx`
- `src/app/hooks/useRecipeFilters.ts`
- `src/app/lib/recipeFilters.ts`
- `public/images/categories/no-results.png`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Implement recipe sorting options and the designed no-results page on `/recipes`. Use the Figma specifications for responsive layouts and refine the sorting interface based on developer feedback.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Add a "Trending" sorting dropdown and implement the no-results page. Since the dropdown design was not yet available, create an initial version that fits the existing application.
2. Apply the Figma Dev Mode specifications for the no-results page, beginning with mobile and then adapting the layout for desktop.
3. Refine the sorting dropdown after reviewing its appearance. The developer's feedback was: "The dropdown is ugly and square, make it nicer and take inspiration from our design."

**Outcome and Decisions:**

**Sorting Functionality**

- **Accepted:** Added `sortRecipes()`, `parseSort()`, and `SORT_OPTIONS` to support sorting recipes.
- **Accepted:** Implemented four sorting options:
  - **Trending:** Sorts recipes by the number of favorites, as the API does not provide a dedicated trending value.
  - **Newest:** Sorts recipes by recency.
  - **Quickest:** Sorts recipes by preparation time, placing recipes without time information last.
  - **A–Z:** Sorts recipes alphabetically by title.
- **Accepted:** Updated `useRecipeFilters` to read and write the selected sorting option using the `?sort=` URL parameter.
- **Accepted:** Omitted the default sorting option from the URL to avoid unnecessary query parameters.

**Sorting Dropdown Design**

- **Modified:** Initially implemented sorting with a native `<select>` element.
- **Rejected/Modified:** Replaced the native select after the developer found that its open menu could not be styled sufficiently to match the application's design.
- **Accepted:** Implemented a custom dropdown following the ARIA listbox pattern to support keyboard navigation and screen reader interaction.
- **Modified:** Corrected a focus outline that appeared as a double border.
- **Modified:** Fixed text clipping at the bottom of the dropdown.

**No-Results Page**

- **Accepted:** Implemented the no-results page according to the mobile and desktop Figma designs.
- **Accepted:** Added the provided illustration, heading, supporting text, and two action buttons.
- **Accepted:** Kept the "Clear search & filters" action to allow users to reset their selections and display all available recipes.
- **Modified:** Set the "Look at other recipes" button to navigate to the homepage rather than duplicating the functionality of the clear-filters button.

**Verification / Status:**

- TypeScript validation using `tsc` completed without errors.
- ESLint completed without errors.
- `npm run build` completed successfully.
- Sorting functionality was tested against the actual recipe API data.
- The sorting dropdown and no-results page were manually reviewed in the browser.
- **Outstanding:** The visual design of the expanded sorting dropdown still required confirmation from the designer.

**References:**

- [Ticket #221 - Recipe Sorting and No-Results Page](https://github.com/GroAnita/Flavorcraft_labs/issues/221)
- Branch: `feat/recipe-trending-no-result-221`
- Figma recipes page and no-results designs
- `src/app/components/features/RecipeBrowser.tsx`
- `src/app/hooks/useRecipeFilters.ts`
- `src/app/lib/recipeFilters.ts`
- `public/images/categories/no-results.png`
- Pull request: Link not provided in original entry

---

### AI-029 - Cache Recipe List to Reduce Server Response Time (#229)

**Date:** 2026-10-21

**Team Member:** Emilie Sofie Fosmo (GitHub username: `Emifos`)

**Related Tasks / Files:**

- Ticket #229 - Cache Recipe List to Reduce Server Response Time
- Branch: `fix/slow-server-response-229`
- `src/app/lib/recipe.ts`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Investigate the slow server response identified in the mobile Lighthouse audit, which reported a Time to First Byte (TTFB) of 797 ms. Identify the underlying causes and implement a targeted performance improvement without affecting unrelated functionality.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Investigate the slow document response reported by Lighthouse, using the ticket description and acceptance criteria.
2. Explain briefly what is currently causing the slow server response.
3. Identify which files would need to be modified so the proposed changes could be communicated to the team before implementation.
4. Implement an appropriate caching solution while keeping the changes limited in scope.

**Outcome and Decisions:**

**Performance Investigation**

- **Investigated:** AI identified that the application's build marked all pages as dynamic because `Header.tsx` reads the authentication cookie.
- **Investigated:** Found that `fetchRecipes()` requested recipe data from the Noroff API on every visit without caching the response.
- **Measured:** The recipe API response time ranged from approximately 0.17 to 0.59 seconds.
- **Identified:** The server waiting for the external recipe API response before returning the page was a significant contributor to the slow TTFB.

**Caching Implementation**

- **Accepted:** Added a 60-second cache to `fetchRecipes()` using Next.js fetch configuration:

  `next: { revalidate: 60 }`

- **Accepted:** Checked the caching approach against the Next.js 16 documentation used by the project.
- **Accepted:** Limited the implementation to `src/app/lib/recipe.ts`, avoiding changes to unrelated components or functionality.
- **Scope decision:** Authentication, favorites, and individual recipe fetching were left unchanged.
- **Trade-off:** Newly created or updated recipes may take up to 60 seconds to appear in the cached recipe list.

**Deferred Changes**

- **Rejected/Postponed:** Did not modify `Header.tsx` to remove its dependency on authentication cookies, despite its impact on dynamic rendering.
- **Reason:** Refactoring the header would require a larger architectural change to a component owned by another team member.
- **Recommendation:** Handle the header's impact on dynamic rendering as a separate ticket if further performance improvements are needed.

**Verification / Status:**

- TypeScript validation completed without errors.
- ESLint completed without errors.
- `npm run build` completed successfully.
- Performance was measured locally using a production build (`next start`), comparing behavior before and after the caching change.
- **Measured improvement:** Homepage TTFB decreased from approximately 0.27 seconds to 0.09 seconds in the local production environment.
- The change was limited to one file.
- **Outstanding:** Rerun Lighthouse against the deployed website after the pull request is merged, in coordination with the SEO/Analytics Lead, to verify whether the improvement is reflected in production measurements.

**References:**

- [Ticket #229 - Cache Recipe List to Reduce Server Response Time](https://github.com/GroAnita/Flavorcraft_labs/issues/229)
- Branch: `fix/slow-server-response-229`
- Lighthouse mobile audit (2026-10-21)
- [Next.js Documentation - fetch](https://nextjs.org/docs/app/api-reference/functions/fetch)
- `src/app/lib/recipe.ts`
- Pull request: Link not provided in original entry

---

### AI-030 - Fix Login Email Autofill After Registration (#241)

**Date:** 2026-10-21

**Team Member:** Emilie Sofie Fosmo (GitHub username: `Emifos`)

**Related Tasks / Files:**

- Ticket #241 - Prefill Email Instead of Username on Login
- Branch: `fix/prefill-login-241`
- `src/app/components/features/RegisterForm.tsx`
- `src/app/components/features/LoginForm.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Claude Opus 5.5

**Purpose:** Fix an autofill issue where the browser populated the login form's email field with the user's username instead of their email address after registration.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Investigate the reported bug where the username was automatically filled into the login email field after registration.
2. Fix the issue by using `autoComplete="nickname"` for the registration username field.
3. Review the initial solution after browser testing showed that the username was still being autofilled incorrectly.
4. Identify and apply the correct autocomplete attributes so browsers recognize the email address as the login identifier.

**Outcome and Decisions:**

**Initial Investigation and Fix**

- **Investigated:** AI explained that `autoComplete="username"` identifies a field as the account's login identifier for browsers and password managers.
- **Identified:** The registration form's username field used this attribute, which could cause browsers to save and reuse the username instead of the email address.
- **Accepted:** Changed the registration username field to `autoComplete="nickname"` to distinguish it from the login identifier.
- **Testing feedback:** Browser testing showed that this change alone did not resolve the issue. Chrome continued to autofill the username into the login email field.

**Revised Solution**

- **Modified:** Updated the email fields in both `RegisterForm.tsx` and `LoginForm.tsx` to use `autoComplete="username"`.
- **Reason:** Although the login identifier is an email address, `username` is the appropriate autocomplete token for identifying the account credential used to sign in.
- **Accepted:** Kept `autoComplete="nickname"` on the registration username field to prevent it from being treated as the login credential.
- **Corrected:** AI acknowledged and corrected its earlier suggestion to use `autoComplete="username email"`, which is not a valid autocomplete value.
- **Implementation decision:** Used standard HTML autocomplete attributes rather than introducing custom autofill handling.

**Verification / Status:**

- TypeScript validation completed without errors.
- ESLint completed without errors.
- Tested locally in a regular Chrome browser window after removing previously saved passwords.
- Confirmed that Chrome now prefills the email address correctly on `/login`.
- **Known limitation:** Previously saved browser credentials may still contain the username and could continue producing incorrect autofill behavior until updated or removed.
- **Status:** Bug fix implemented and locally verified.

**References:**

- [Ticket #241 - Prefill Email Instead of Username on Login](https://github.com/GroAnita/Flavorcraft_labs/issues/241)
- Branch: `fix/prefill-login-241`
- `src/app/components/features/RegisterForm.tsx`
- `src/app/components/features/LoginForm.tsx`
- Pull request: Link not provided in original entry

---

### AI-031 - Reusable Badge Component (#44)

**Date:** 2026-10-14

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #44 - Badge Component
- Branch: `feat/badge-component`
- `src/app/components/ui/Badge.tsx`
- `src/app/globals.css`

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5

**Purpose:** Create a reusable Badge component for recipe categories, difficulty levels, and tags based on the Figma design. Understand the component implementation and how to apply the project's existing design tokens from `globals.css`.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #44 and the provided screenshots to understand the Badge component requirements.
2. Create a reusable component matching the Figma specifications for category, difficulty, and tag badges, using the provided colors, typography, padding, and border radius.
3. Use the existing design tokens from `globals.css` wherever they match the Figma design.
4. Explain the implementation line by line to support understanding of the component structure and styling decisions.

**Outcome and Decisions:**

**Component Structure**

- **Accepted:** Created a single reusable `Badge` component with a `variant` prop supporting `category`, `difficulty`, and `tag`, rather than implementing three separate components.
- **Reason:** All three variants share common styling and behavior, including shape, typography, alignment, and text truncation.
- **Accepted:** Used `children` to pass the badge's text content.
- **Accepted:** Added a `level` prop supporting `easy`, `medium`, and `hard` to determine difficulty badge colors.

**Styling and Design Decisions**

- **Accepted:** Applied the Figma difficulty colors: green for easy, yellow for medium, and red for hard.
- **Accepted:** Reused the existing `error-bg` and `error-text` colors for the red difficulty badge.
- **Accepted:** Used fixed heights of 24px and 22px instead of vertical padding to approximate the Figma design's cap-height trim, which is not directly supported by Tailwind.
- **Accepted:** Used `rounded-full` for all variants because it produces the intended rounded shape at the specified badge heights.
- **Accepted:** Reused semantic design tokens such as `text-primary`, `text-foreground`, and `border-border` wherever they matched the design.
- **Accepted:** Used palette colors including `bg-mint-500`, `bg-butter-500`, and `text-olive-500` where required by Figma.

**Accessibility and Responsibility**

- **Accepted:** Rendered the badge as a non-interactive `<span>` element because it functions as a display label rather than a button or link.
- **Accepted:** Applied `truncate` to prevent long labels from disrupting the layout.
- **Scope decision:** Did not include logic for mapping the API's `difficulty` values to the component's `level` prop. This responsibility remains with the components that use `Badge`.

**Verification / Status:**

- Compared the implemented styling values against the Figma design specifications for each badge variant.
- **Outstanding:** Integrate the Badge component into the recipe card, tag list, and recipe information components.
  - **Status update (2026-10-22):** Done. `Badge` is used by `TagList` (AI-032), `RecipeMeta` (AI-033) and `RecipeCard` (AI-037).
- No TypeScript, ESLint, or browser testing results were specified in the original entry.

**References:**

- [Ticket #44 - Badge Component](https://github.com/GroAnita/Flavorcraft_labs/issues/44)
- [Pull Request #79 - Created Badge for Recipe Card](https://github.com/GroAnita/Flavorcraft_labs/pull/79)
- Figma recipe card designs
- `src/app/components/ui/Badge.tsx`
- `src/app/globals.css`

---

### AI-032 - Reusable TagList Component (#47)

**Date:** 2026-10-14

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #47 - TagList Component
- Branch: `feat/tag-list`
- `src/app/components/features/TagList.tsx`
- Dependency: `src/app/components/ui/Badge.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5

**Purpose:** Create a reusable TagList component that displays recipe tags as a responsive, wrapping list of badges. Reuse the existing Badge component, follow the Figma design, and understand the implementation and component organization.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Create a TagList component that reuses the outlined Badge variant, wraps tags onto additional lines, and renders nothing when no tags are provided.
2. Explain whether TagList should belong in `components/features` or `components/ui`.
3. Clarify whether the new branch should be created from the existing Badge feature branch, since that component had not yet been merged.
4. Explain the implementation line by line to support understanding of the component's structure and behavior.
5. Compare the spacing between tags with the provided Figma measurements.

**Outcome and Decisions:**

**Component Structure and Behavior**

- **Accepted:** Created `TagList` with an optional `tags` array prop.
- **Accepted:** Returned `null` when the array is missing or empty, preventing unnecessary empty space in the recipe card.
- **Accepted:** Reused the existing `Badge` component with `variant="tag"` rather than duplicating badge styling.
- **Accepted:** Used `flex flex-wrap` to allow tags to wrap onto additional lines in narrower containers.
- **Accepted:** Applied `gap-2` to provide consistent spacing between badges.
- **Accepted:** Used semantic `<ul>` and `<li>` elements so assistive technologies can identify the tags as a list.
- **Accepted:** Generated React keys using the tag value combined with its index, allowing duplicate tag values without duplicate keys.
- **Accepted:** Applied `max-w-full` to individual list items so long tags can be truncated by the Badge component instead of overflowing their container.

**Design and Architecture Decisions**

- **Verified:** Confirmed that the 8px spacing specified in Figma matches Tailwind's `gap-2` utility. No adjustment was necessary.
- **Accepted:** Placed `TagList` in `components/features` alongside other recipe-related components.
- **Deferred:** Moving the component to `components/ui` remains an option if the team later decides it should be treated as a general-purpose UI component.
- **Rejected:** Did not create the new branch from the existing Badge feature branch, even though Badge had not yet been merged.
- **Decision:** Created the TagList branch from `develop` to maintain the team's branching workflow.

**Verification / Status:**

- Tested the component on a temporary page, which was removed after verification.
- Confirmed that tags wrap correctly inside a narrow container.
- Confirmed that an empty array or missing `tags` prop renders nothing.
- Confirmed that long tag labels are truncated rather than overflowing.
- Verified that spacing matches the Figma design.
- `npm run lint` completed with zero errors. One existing warning in `layout.tsx` was unrelated to this work.
- `npm run build` completed successfully.
- **Outstanding:** Integrate `TagList` into the recipe card as part of the main recipe card implementation task.
  - **Status update (2026-10-22):** Done in AI-037.

**References:**

- [Ticket #47 - TagList Component](https://github.com/GroAnita/Flavorcraft_labs/issues/47)
- [Pull Request #82 - TagList](https://github.com/GroAnita/Flavorcraft_labs/pull/82)
- [Pull Request #79 - Badge Component](https://github.com/GroAnita/Flavorcraft_labs/pull/79)
- Figma recipe card design
- `src/app/components/features/TagList.tsx`
- `src/app/components/ui/Badge.tsx`

---

### AI-033 - Reusable RecipeMeta Component (#46)

**Date:** 2026-10-14

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #46 - RecipeMeta Component
- Branch: `feat/recipe-meta-46`
- `src/app/components/features/RecipeMeta.tsx`
- Dependency: `src/app/components/ui/Badge.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5

**Purpose:** Create a reusable RecipeMeta component displaying preparation time, cooking time, servings, and difficulty according to the Figma design. Ensure the component handles missing data, supports accessibility and responsive layouts, and understand the implementation.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #46 and the Figma design, then create a RecipeMeta component that displays recipe information with icons, accessible labels, separators, and the existing Badge component.
2. Ensure missing values are hidden, separators appear only between available values, and the layout works on smaller screens.
3. Adjust typography, icon sizes, spacing, and responsive behavior using the provided mobile and desktop Figma measurements.
4. Explain the implementation and help investigate editor warnings from cSpell and Tailwind.
5. Investigate and resolve a failed build caused by a previously deleted temporary test page.

**Outcome and Decisions:**

**Component Structure and Data Handling**

- **Accepted:** Created `RecipeMeta` with the props `prepTime`, `cookTime`, `servings`, and `difficulty`.
- **Accepted:** Displayed only available values, treating `0`, `null`, and missing values as unavailable.
- **Accepted:** Returned `null` when all values were unavailable, preventing empty content from occupying space.
- **Accepted:** Implemented separators as separate 23px elements, rendered only between existing values using `index > 0`.
- **Reason:** This prevents unnecessary separators when one or more recipe properties are missing.

**Accessibility and Difficulty Handling**

- **Accepted:** Marked decorative icons with `aria-hidden` so screen readers do not announce them unnecessarily.
- **Accepted:** Added visually hidden descriptive labels, such as "Preparation time: ...", to provide meaningful information to screen reader users.
- **Accepted:** Reused the existing `Badge` component for difficulty levels.
- **Accepted:** Matched difficulty values case-insensitively to the supported `level` values: `easy`, `medium`, and `hard`.
- **Accepted:** Displayed unknown difficulty values using a neutral tag badge rather than assigning an incorrect difficulty color.

**Styling and Responsive Layout**

- **Modified:** Updated typography and spacing after comparing the implementation with the Figma specifications:
  - Text: 14px Inter.
  - Icons: 18px.
  - Spacing: 8px and 16px gaps.
- **Accepted:** Used the same typography and icon dimensions on mobile and desktop.
- **Modified:** Adjusted the responsive layout after reviewing the mobile design.
- **Accepted:** On mobile, the difficulty badge appears on a separate line and is left-aligned.
- **Accepted:** From the `sm` breakpoint upward, the difficulty badge appears on the same line as the other metadata and is right-aligned.
- **Modified:** Replaced the arbitrary Tailwind height `h-[23px]` with `h-5.75` following an editor suggestion.

**Development and Troubleshooting**

- **Investigated:** Used AI assistance to understand cSpell and Tailwind editor warnings.
- **Investigated:** Received assistance diagnosing a failed build related to a deleted temporary test page.

**Verification / Status:**

- Tested the component on a temporary page, which was removed after verification.
- Tested the following scenarios:
  - All metadata values available.
  - Some values missing.
  - Only one value available.
  - All values missing.
  - Unknown difficulty values.
  - Narrow containers.
  - Mobile and desktop layouts compared with Figma.
- `npm run lint` completed with zero errors. One existing warning in `layout.tsx` was unrelated to this work.
- `npm run build` completed successfully.
- **Outstanding:** Confirm whether the API provides `prepTime` and `cookTime` in minutes.
- **Outstanding:** Verify which difficulty values are returned by the API.
- **Outstanding:** Integrate `RecipeMeta` into the recipe card as part of the main recipe card implementation task.
  - **Status update (2026-10-22):** Done in AI-037.

**References:**

- [Ticket #46 - RecipeMeta Component](https://github.com/GroAnita/Flavorcraft_labs/issues/46)
- [Pull Request #87 - RecipeMeta Component](https://github.com/GroAnita/Flavorcraft_labs/pull/87)
- Figma recipe card design
- `src/app/components/features/RecipeMeta.tsx`
- `src/app/components/ui/Badge.tsx`

---

### AI-034 - TagList Accessibility Fixes Following QA Feedback (#93)

**Date:** 2026-10-15

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #93 - TagList Accessibility Fixes
- Branch: `fix/tag-list-93`
- `src/app/components/features/TagList.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5

**Purpose:** Implement two accessibility improvements requested by QA for the existing TagList component. Ensure that assistive technologies correctly identify the tags as a list and that users can access the full text of truncated tags.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review the two accessibility issues identified by QA and explain how to implement the requested fixes:
   - Add `role="list"` to the `<ul>` element.
   - Add a `title` attribute so the full text of truncated tags is available on hover.
2. Provide guidance on testing the component with VoiceOver when difficulties were encountered getting the screen reader to work.

**Outcome and Decisions:**

**Accessibility Improvements**

- **QA-driven changes:** Both accessibility improvements originated from QA feedback, not from AI suggestions. AI was used to explain and assist with their implementation.
- **Accepted:** Added `role="list"` to the `<ul>` element to preserve list semantics in Safari and VoiceOver when CSS removes default list styling.
- **Accepted:** Added `title={tag}` to each `<li>` element, allowing the full tag text to be displayed on hover when the visible label is truncated.
- **Implementation decision:** Applied the `title` attribute to the list item rather than modifying the shared `Badge` component to accept an additional prop.
- **Reason:** This kept the change focused on TagList and avoided unnecessary modifications to a reusable UI component.

**Testing Approach**

- **Accepted:** Created a temporary test page to verify the changes manually.
- **Accepted:** Removed the temporary test page before committing, keeping the pull request limited to the intended accessibility fixes.
- **AI assistance:** Used Claude to troubleshoot difficulties with VoiceOver testing.

**Verification / Status:**

- Confirmed that `role="list"` appeared in the browser's accessibility tree.
- Tested with VoiceOver in Safari and confirmed that the tags were announced as a list.
- Checked the component layout on a temporary test page, which was removed after testing.
- `npm run lint` completed with zero errors. One existing warning in `layout.tsx` was unrelated to this work.
- `npm run build` completed successfully.
- **Outstanding:** Awaiting QA re-review and confirmation of the accessibility fixes.

**References:**

- [Ticket #93 - TagList Accessibility Fixes](https://github.com/GroAnita/Flavorcraft_labs/issues/93)
- [Pull Request #95 - TagList Accessibility Fixes](https://github.com/GroAnita/Flavorcraft_labs/pull/95)
- [Pull Request #82 - Original TagList Component](https://github.com/GroAnita/Flavorcraft_labs/pull/82)
- `src/app/components/features/TagList.tsx`

---

### AI-035 - Cookie-Based Authentication (#103)

**Date:** 2026-10-15

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #103 - Cookie-Based Authentication
- Branch: `feat/cookie-based-authentication-103`
- `src/app/lib/session.ts`
- `src/app/actions/auth.ts`
- `src/app/components/features/LoginForm.tsx`
- `src/app/components/features/LogoutButton.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5. A colleague also provided a code suggestion for this ticket; whether that suggestion was originally AI-generated was not confirmed.

**Purpose:** Understand how to store authentication access tokens securely in an HttpOnly cookie, evaluate a colleague's suggested implementation against the ticket requirements, and integrate the relevant changes into the project's session helpers, Server Actions, login form, and logout functionality.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #103 and the code suggestion provided by a colleague. Identify which parts are relevant to the requirements and what should be adapted for the existing project.
2. Explain how to update `LoginForm`, including whether to remove `useRouter`, `router.push`, and the direct `loginUser` import.
3. Clarify how the suggested cookie-reading functionality should be implemented and where authentication state should be accessed.
4. Explain how to create and integrate a logout button using the new authentication approach.

**Outcome and Decisions:**

**Session Management and Authentication**

- **Accepted:** Implemented session helpers and login/logout Server Actions based on the reviewed code suggestion.
- **Accepted:** Stored the authentication access token in a cookie with the following configuration:
  - `httpOnly: true` to prevent client-side JavaScript from accessing the token.
  - `sameSite: "lax"` to provide protection against certain cross-site requests.
  - `path: "/"` to make the cookie available across the application.
  - Seven-day expiration.
  - `secure: true` in production to restrict transmission to HTTPS.
- **Accepted:** Updated `LoginForm` to use the new authentication flow rather than handling login navigation directly through `useRouter` and `router.push`.
- **Accepted:** Placed `redirect()` outside the `try/catch` block so Next.js redirect behavior is not accidentally caught as an application error.
- **Accepted:** Returned authentication errors from the login Server Action rather than throwing them, allowing the form to display an appropriate error message.

**Logout Functionality**

- **Accepted:** Created `LogoutButton` as a Server Component containing a form that invokes the logout Server Action.
- **Accepted:** Designed the button to be displayed only when the user is authenticated.
- **Scope decision:** Did not add the logout button to the application header as part of this ticket.

**Authentication State and Component Architecture**

- **Accepted:** Decided that `isLoggedIn` should be determined once on the server, at page level, and passed to child components through props.
- **Reason:** This avoids repeatedly reading the authentication cookie inside individual components.
- **Deferred:** Connecting `isLoggedIn` to `RecipeCard` and its like button because those components were not available on the current branch.
- **Rejected:** Did not add the `server-only` package because introducing a new dependency required agreement from the team.

**Testing and Scope Control**

- **Accepted:** Temporarily added `LogoutButton` to `page.tsx` to test the authentication flow.
- **Removed:** Excluded the temporary test button from the final pull request.
- **Rejected:** Excluded unrelated formatting changes automatically introduced by VS Code in `page.tsx`.
- **Scope decision:** Kept the pull request focused on session handling, login, and logout functionality.

**Verification / Status:**

- Verified in browser DevTools that logging in creates an `accessToken` cookie.
- Confirmed the cookie attributes `HttpOnly`, `SameSite: Lax`, and `Path: /`.
- Tested cookie persistence after refreshing the page.
- Checked that the HttpOnly token was not accessible through `document.cookie`.
- Tested logout behavior and login with an incorrect password.
- `npm run build` completed successfully.
- ESLint reported no errors in the changed files.
- An existing error in `CategoryNavigation.tsx` and a warning in `layout.tsx` were inherited from `develop` and were unrelated to this work.
- **Outstanding:** Connect server-derived `isLoggedIn` state to `RecipeCard` and the like button.
  - **Status update (2026-10-22):** Done. Login state reaches the cards through `FavoritesBoundary` (AI-018).
- **Outstanding:** Integrate `LogoutButton` into the application header.
  - **Status update (2026-10-22):** Log out was placed in the mobile menu (AI-017) and the profile sidebar (AI-016) instead of the desktop header.

**References:**

- [Ticket #103 - Cookie-Based Authentication](https://github.com/GroAnita/Flavorcraft_labs/issues/103)
- [Pull Request #105 - Cookie-Based Authentication](https://github.com/GroAnita/Flavorcraft_labs/pull/105)
- Next.js authentication guide: `node_modules/next/dist/docs/01-app/02-guides/authentication.md`
- `src/app/lib/session.ts`
- `src/app/actions/auth.ts`
- `src/app/components/features/LoginForm.tsx`
- `src/app/components/features/LogoutButton.tsx`

---

### AI-036 - Reusable FavoriteButton Component (#98)

**Date:** 2026-10-15

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #98 - FavoriteButton Component
- Branch: `feat/like-button-component-98`
- `src/app/components/ui/FavoriteButton.tsx`
- Related authentication work: Ticket #103

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5

**Purpose:** Create a reusable heart-shaped favorite button for recipe cards, matching the Figma design and supporting accessible interaction. Understand the component's structure, placement, and testing requirements while keeping authentication and favorite persistence outside its scope.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #98 and its acceptance criteria, including the requirement that the favorite button should only be visible to authenticated users.
2. Explain whether the heart button should be implemented as a separate component or included inside the recipe image component.
3. Implement the button using the provided Figma measurements for dimensions, border radius, background color, icon size, and positioning.
4. Apply the designer's guidance for the filled heart appearance.
5. Correct the icon stroke color to `truffle-500` after comparing the initial implementation with Figma.

**Outcome and Decisions:**

**Component Structure and Behavior**

- **Accepted:** Created a separate reusable `FavoriteButton` component with `isLiked` and `onToggle` props.
- **Accepted:** Kept the component controlled, with no internal state for the favorite status.
- **Accepted:** Positioned the button alongside the recipe image link within the card rather than nesting it inside the image component.
- **Reason:** Nesting a button inside a link would create invalid interactive HTML and could cause button clicks to trigger recipe navigation.
- **Accepted:** Used `preventDefault()` and `stopPropagation()` in the click handler to prevent the favorite action from opening the recipe.

**Accessibility and Authentication**

- **Accepted:** Used a semantic `<button>` element with a stable `aria-label` and an `aria-pressed` attribute reflecting the current favorite state.
- **Accepted:** Kept the accessible label unchanged when toggling the button, allowing `aria-pressed` to communicate its state without changing the meaning of the action.
- **Accepted:** Hid the decorative heart icon from assistive technologies.
- **Accepted:** Added an `isLoggedIn` prop with a default value of `false`.
- **Accepted:** Returned `null` when `isLoggedIn` is `false`, ensuring the button is not displayed to logged-out users.
- **Implementation decision:** Kept authentication state outside the component rather than introducing a dependency on the session implementation being developed in Ticket #103.

**Styling and Design Decisions**

- **Accepted:** Used `fill-current` for the filled heart so the fill and stroke share the same color, following the designer's instructions.
- **Modified:** Replaced the AI's initial styling estimates with measurements taken directly from Figma:
  - Button dimensions: `size-8`.
  - Border radius: `rounded-xl`.
  - Background color: `bg-oat-500`.
  - Icon color: `text-truffle-500`.
  - Heart icon size: 16px.
  - Position: 12px from the image corner.
- **Human correction:** The AI initially suggested `foreground` for the heart stroke. After checking Figma, the developer corrected this to `truffle-500`.

**Verification / Status:**

- Inspected the component in browser DevTools and confirmed the presence of `aria-label` and `aria-pressed`.
- Confirmed that the heart icon was hidden from assistive technologies.
- Tested toggling the favorite state.
- Verified that clicking the button did not trigger navigation through the recipe link.
- Tested keyboard interaction.
- Confirmed that the button was not rendered when `isLoggedIn` was `false`.
- Compared the button's styling and positioning with the Figma design.
- `npm run build` completed successfully.
- ESLint reported no errors in the changed file.
- An existing error in `CategoryNavigation.tsx` and a warning in `layout.tsx` were inherited from `develop` and were unrelated to this work.
- **Outstanding:** Integrate `FavoriteButton` into `RecipeCard`.
- **Outstanding:** Connect the `isLoggedIn` prop to the cookie-based authentication system.
- **Outstanding:** Implement the functionality for saving and removing favorite recipes.
  - **Status update (2026-10-22):** Done. `FavoriteButton` is used in `RecipeCard` (AI-037) and is connected to the login state and the favorites API (AI-018).

**References:**

- [Ticket #98 - FavoriteButton Component](https://github.com/GroAnita/Flavorcraft_labs/issues/98)
- [Pull Request #106 - FavoriteButton](https://github.com/GroAnita/Flavorcraft_labs/pull/106)
- [Pull Request #105 - Cookie-Based Authentication](https://github.com/GroAnita/Flavorcraft_labs/pull/105)
- Figma recipe card design
- Lucide Heart icon
- `src/app/components/ui/FavoriteButton.tsx`

---

### AI-037 - RecipeCard Component (#43)

**Date:** 2026-10-16

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #43 - RecipeCard Component
- Branch: `feat/recipe-card-43`
- `src/app/components/features/RecipeCard.tsx`
- `src/app/components/ui/RecipeImage.tsx` - Image height adjustment
- `src/app/components/features/TagList.tsx` - List item display adjustment

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5

**Purpose:** Combine existing recipe components into a reusable RecipeCard that matches the Figma designs, displays real API data, supports responsive layouts and accessible interactions, and can be tested across different scenarios.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #43 and the Figma designs for the homepage, search page, and recipe detail page. Identify which measurements are needed to implement the recipe card accurately.
2. Use the provided mobile and desktop Figma specifications, including padding, spacing, typography, colors, and card dimensions, to help implement the component.
3. Review the existing `RecipeImage` component and explain how to integrate it into `RecipeCard`.
4. Investigate why the recipe title appeared underlined in Safari but not in Chrome.
5. Explain whether recipe images require a maximum width to maintain the intended layout.

**Outcome and Decisions:**

**Component Structure and Data Handling**

- **Accepted:** Created `RecipeCard` to receive a single recipe object, typed using `Pick<Recipe, ...>`, and an optional `isLoggedIn` prop.
- **Accepted:** Reused existing components for the recipe image, metadata, tags, and favorite button rather than duplicating their functionality.
- **Accepted:** Designed the card to display real recipe API data while handling missing or incomplete values through the existing components.

**Navigation and Accessibility**

- **Accepted:** Used a single stretched link on the recipe title with `after:absolute after:inset-0` to make the entire card clickable.
- **Rejected/Modified:** AI initially suggested wrapping the image in a separate link with `aria-hidden`. The developer identified that this approach would also hide the category badge from screen readers.
- **Human decision:** Used a single stretched title link instead, preserving the accessibility of the category badge while making the card clickable.
- **Accepted:** Applied `z-10` to the favorite button so it remains interactive above the stretched link.
- **Accepted:** Kept the favorite button separate from the navigation link to avoid nested interactive elements.

**Styling and Layout**

- **Accepted:** Applied spacing and typography based on the Figma measurements:
  - Card padding: `p-4`.
  - Layout spacing: `gap-6`, `gap-4`, and `gap-2`.
  - Recipe title: `font-medium`.
  - Description color: `text-oat-800`.
  - Description typography: 14px font size with 20px line height.
- **Accepted:** Applied `line-clamp-2` to both the title and description to prevent long text from disrupting the layout.
- **Accepted:** Used `mt-auto` on the tag section to keep tags aligned at the bottom of cards displayed in a grid.
- **Modified:** Removed `hover:underline` from the title link because the Figma design did not specify an underline hover state. The AI had introduced this styling without a design requirement.
- **Modified:** Changed the image height in `RecipeImage` to a fixed 186px after checking the Figma measurements.
- **Team coordination:** Informed the owner of `RecipeImage` about the image height adjustment.
- **Modified:** Changed the `TagList` list items to use `flex`, ensuring the tag row matched the 22px height specified in Figma.

**Scope Decisions**

- **Deferred:** Saving and removing favorite recipes, which belonged to a separate issue.
- **Deferred:** Reading the authentication cookie at page level and passing login state to the card.
- **Not included:** Additional hover styling, as no corresponding design was provided.

**Verification / Status:**

- Tested the component using real API data on a temporary page, which was removed after verification.
- Tested multiple layouts, including:
  - Recipe card grids.
  - Horizontal card rows.
  - Narrow and wide card containers.
- Tested edge cases, including missing images, broken images, missing descriptions, missing tags, missing preparation times, unknown difficulty values, and very long text.
- Confirmed that clicking the favorite button did not navigate to the recipe detail page.
- Verified keyboard navigation, including Tab focus moving to the favorite button and then to the recipe title link.
- Compared the component's appearance in Safari and Chrome and confirmed consistent rendering.
- `npm run build` completed successfully.
- ESLint reported no errors in the changed files.
- An existing error in `CategoryNavigation.tsx` and a warning in `layout.tsx` were inherited from `develop` and were unrelated to this work.
- **Outstanding:** Peer review, design review, and QA had not yet been completed.
- **Outstanding:** The recipe detail page route was based on an assumption and required confirmation.
  - **Status update (2026-10-22):** Confirmed. The recipe detail page is at `/recipes/[id]` (AI-046).

**References:**

- [Ticket #43 - RecipeCard Component](https://github.com/GroAnita/Flavorcraft_labs/issues/43)
- [Pull Request #112 - RecipeCard Component](https://github.com/GroAnita/Flavorcraft_labs/pull/112)
- Figma recipe card designs
- Related component pull requests: Badge, TagList, RecipeMeta, FavoriteButton, and RecipeImage
- `src/app/components/features/RecipeCard.tsx`
- `src/app/components/ui/RecipeImage.tsx`
- `src/app/components/features/TagList.tsx`

---

### AI-038 - Hero Illustration and Category Section Styling (#118)

**Date:** 2026-10-16

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #118 - Hero Illustration and Category Section
- Branch: `fix/hero-image-and-background-color`
- `src/app/components/features/HeroSection.tsx`
- `src/app/components/features/CategoryNavigation.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5

**Purpose:** Adjust the homepage hero illustration so it extends below the hero section as specified in Figma, correct the missing category section background color, and investigate visual differences between the implementation and the design across browsers.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review the existing `CategoryNavigation` component and the Figma design to identify missing styling, particularly the section background color.
2. Examine `HeroSection` and explain why the tomato illustration was not extending below the hero section as intended.
3. Investigate differences in illustration positioning between Chrome and Safari using browser screenshots, Safari DevTools, and Figma measurements.
4. Compare screenshots of the implemented homepage with Figma to evaluate whether the illustration's size and position matched the design.

**Outcome and Decisions:**

**Category Section Styling**

- **Accepted:** Applied the Figma background color `salt-100` to the category navigation section.
- **Accepted:** Reused the existing design token from `globals.css` rather than introducing a new color value.

**Hero Illustration Positioning**

- **Accepted:** Applied `z-10` to the hero section to prevent the following section from covering the illustration's overhanging portion.
- **Accepted:** Removed `overflow-hidden` so the illustration could extend beyond the bottom edge without being clipped.
- **Accepted:** Set the illustration width to 64% of its container.
- **Accepted:** Used a negative bottom offset in viewport-width units (`bottom-[-2.1vw]`) so the overhang scales proportionally with the browser width.

**Rejected and Corrected AI Suggestions**

- **Rejected:** The initial combination of `translate-y-[9%]` and `-bottom-8`.
- **Reason:** Applying both offsets caused the illustration to move down twice as far as intended. The developer identified the issue and kept only the negative bottom positioning.
- **Rejected:** The suggested `overflow-x-clip` styling because it behaved differently in Safari and was unnecessary when the illustration did not extend beyond the horizontal boundaries.
- **Rejected:** Rebuilding the hero layout using CSS Grid instead of absolute positioning. The existing layout worked after the duplicated offset was removed.
- **Human correction:** AI initially claimed that some changes had resolved the positioning issue, but browser comparisons showed that the results were still incorrect. The developer accepted changes only after verifying them against Figma.
- **Human correction:** AI initially miscalculated the hero section height because it did not account for the header being included in Figma's `Top` measurement.

**Scope Decisions**

- **Not included:** The "Plan your meals" button shown in Figma, because the meal planner functionality was outside the scope of this work.
- **Accepted:** Kept the implementation focused on correcting the hero illustration and category section styling rather than restructuring the page unnecessarily.

**Verification / Status:**

- Compared the implementation in Chrome with the Figma design at matching viewport widths.
- Confirmed that the illustration's internal elements and bottom overhang were positioned within approximately 1% of the viewport width compared with the design.
- Used screenshots and browser DevTools to investigate layout differences.
- **Outstanding:** Safari rendering was not fully verified. The illustration appeared in a different position, and the underlying cause had not been identified.
- **Outstanding:** A detailed comparison of text sizes against Figma had not been completed.
- **Outstanding:** The mobile hero layout had not yet been reviewed.
- No TypeScript, ESLint, or production build results were specified in the original entry.

**References:**

- [Ticket #118 - Hero Illustration and Category Section](https://github.com/GroAnita/Flavorcraft_labs/issues/118)
- [Pull Request #122 - Hero Section and Category Navigation Background Fix](https://github.com/GroAnita/Flavorcraft_labs/pull/122)
- Figma homepage design
- `src/app/components/features/HeroSection.tsx`
- `src/app/components/features/CategoryNavigation.tsx`
- `src/app/globals.css`

---

### AI-039 - Reusable Breadcrumb Component (#124)

**Date:** 2026-10-16

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #124 - Breadcrumb Component
- Branch: `feature/breadcrumbs-component-124`
- `src/app/components/ui/Breadcrumb.tsx`
- `src/types/breadcrumb.ts`
- Design reference: `src/app/globals.css`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Create a reusable breadcrumb navigation component that matches the desktop and mobile Figma designs, meets the accessibility requirements in the ticket, and handles long page titles without causing horizontal overflow.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #124 and the provided Figma screenshot, then implement a breadcrumb component that meets the design and accessibility requirements.
2. Explain whether the component should belong in `components/ui` or `components/features`, considering that it will be reused across multiple pages.
3. Suggest how to test the component before the recipe detail page is available.
4. Investigate why long page titles were not truncating and instead caused horizontal overflow.
5. Apply the provided desktop and mobile Figma measurements, including typography, spacing, icon dimensions, and colors.
6. Replace hardcoded colors with existing design tokens after reviewing `globals.css`.
7. Investigate a build error and review the implementation against the ticket's acceptance criteria.

**Outcome and Decisions:**

**Component Structure and Reusability**

- **Accepted:** Created a reusable `Breadcrumb` component in `components/ui` rather than a recipe-specific component in `components/features`.
- **Accepted:** Used an `items` prop instead of a single `title` prop, allowing the component to support different pages and multiple navigation levels.
- **Accepted:** Rendered the final breadcrumb item as the current page, with `aria-current="page"`, rather than making it a link.
- **Rejected:** A recipe-specific `RecipeBreadcrumb` component because the navigation pattern was intended for use across multiple pages.

**Accessibility and Semantic Structure**

- **Accepted:** Used a semantic `<nav>` element with `aria-label="Breadcrumb"`.
- **Accepted:** Structured the navigation as an ordered list using `<ol>` and `<li>` elements.
- **Accepted:** Used chevron separators marked with `aria-hidden` to prevent screen readers from announcing decorative icons.
- **Accepted:** Kept only navigable breadcrumb links keyboard-focusable, while the current page remained non-interactive.

**Styling and Responsive Behavior**

- **Accepted:** Applied the Figma typography and spacing specifications:
  - Font: Inter, 16px.
  - Line height: 24px.
  - Gap: 4px.
  - Separator: `ChevronRight` from `lucide-react`.
  - Chevron size: 24px with a 1.5px stroke.
- **Accepted:** Used `text-primary` for the current page, corresponding to the semantic `basil-500` color.
- **Accepted:** Used `text-oat-800` for breadcrumb links and separators because no matching semantic token was available.
- **Accepted:** Applied `truncate` to the current page title and `min-w-0` to the final list item so long titles display an ellipsis instead of overflowing.

**Corrected AI Suggestions**

- **Modified:** AI initially used hardcoded hexadecimal colors because it had not been provided with the project's design system.
- **Human correction:** After the developer shared `globals.css`, the implementation was updated to reuse existing design tokens.
- **Investigated:** A long title caused the temporary test page to become wider than the viewport instead of truncating correctly.
- **Human correction:** The issue was traced to a missing `min-w-0` on the test page's `<main>` element, rather than an error in the Breadcrumb component itself.
- **Accepted:** Kept the component implementation unchanged after identifying the actual cause of the overflow.

**Verification / Status:**

- Tested the component on a temporary page, which was removed before committing.
- Tested desktop and mobile layouts, including an iPhone SE viewport.
- Confirmed that long page titles truncate correctly.
- Tested breadcrumb navigation containing three levels.
- Compared the implementation with Figma using browser DevTools.
- Confirmed that the navigation height was 24px and that widths and colors matched the design.
- Checked keyboard navigation and confirmed that only links received focus.
- Inspected the accessibility tree in DevTools to verify the semantic structure.
- `npm run lint` completed successfully.
- `npm run build` completed successfully.
- **Outstanding:** Integrate Breadcrumb into the recipe detail page once that page is implemented.
  - **Status update (2026-10-22):** Done. `Breadcrumb` is used on the recipe detail page (AI-046).
- **Outstanding:** Confirm the `/recipes` route when the relevant page is created.
  - **Status update (2026-10-22):** Done. `/recipes` was created in AI-025.

**References:**

- [Ticket #124 - Breadcrumb Component](https://github.com/GroAnita/Flavorcraft_labs/issues/124)
- [Pull Request #129 - Breadcrumb Component](https://github.com/GroAnita/Flavorcraft_labs/pull/129)
- Figma recipe detail page designs (desktop and mobile)
- `src/app/components/ui/Breadcrumb.tsx`
- `src/types/breadcrumb.ts`
- `src/app/globals.css`

---

### AI-040 - RecipeOverview Component (#126)

**Date:** 2026-10-19

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #126 - Recipe Overview
- Branch: `feature/recipe-overview-126`
- `src/app/components/features/RecipeOverview.tsx`
- `src/app/components/ui/Badge.tsx`
- `src/app/components/ui/Avatar.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Build a reusable RecipeOverview component for the recipe detail page, displaying tags, title, description, recipe information, and author details. Match the desktop and mobile Figma designs while reusing existing components and avoiding unnecessary duplication.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review the remaining recipe detail page requirements and identify which parts of the Figma design were already covered by existing components, including `RecipeHero`, `IngredientsList`, `InstructionsList`, `KeepScreenOnToggle`, and `ServingsControl`.
2. Review the existing recipe types, shared components, and component folder structure to determine how RecipeOverview should be implemented.
3. Reuse existing components such as `Badge`, `Avatar`, `TagList`, and `RecipeMeta` where appropriate.
4. Apply the provided Figma measurements for desktop and mobile, including typography, colors, spacing, and responsive layout behavior.

**Outcome and Decisions:**

**Component Structure and Reusability**

- **Accepted:** Created `RecipeOverview` in `components/features`, using props selected from the existing `Recipe` type.
- **Accepted:** Designed the component so recipe properties can be passed directly using object spread syntax.
- **Accepted:** Reused `Badge` to display difficulty, category, and recipe tags together in a single wrapping list.
- **Accepted:** Removed duplicate tags from the displayed badge list.
- **Accepted:** Added an optional `size` prop to `Badge` (`md`) and `Avatar` (`lg`), preserving their existing default sizes to avoid affecting recipe cards.
- **Accepted:** Added an optional `commentCount` prop to support the comment count displayed in the Figma design.
- **Accepted:** Added an optional `ownerActions` slot in the author row to support future edit and delete buttons.

**Component Reuse Decisions**

- **Rejected:** Reusing `TagList` directly because it renders its own list, preventing difficulty, category, and tag badges from wrapping together as one group.
- **Rejected:** Reusing `RecipeMeta` because it was designed specifically for recipe cards, with shorter values, right-aligned difficulty, and no wrapping.
- **Corrected:** AI initially created a new Avatar implementation before being shown that a shared `Avatar` component already existed.
- **Corrected:** AI initially generated separate tag and metadata rendering logic before reviewing the existing `TagList` and `RecipeMeta` components.
- **Human decision:** Evaluated the existing components and chose direct Badge reuse while keeping the overview-specific metadata layout.

**Styling and Responsive Layout**

- **Accepted:** Applied the Figma typography, spacing, and color specifications using existing design tokens:
  - `text-primary`
  - `text-foreground`
  - `text-oat-800`
  - `text-truffle-500`
- **Accepted:** Used 40px spacing between the recipe information block and author row, consistent with the `RecipeHero` layout.
- **Rejected:** Changing the category badge color from green to yellow. The developer confirmed that the "Dinner" badge should remain green, following the existing Badge design.
- **Rejected:** Applying `lg:flex-nowrap` to the metadata row because longer values could overflow the available space.
- **Modified:** Corrected initially estimated styles after checking Figma, including title size, description color, author name color, username size, and spacing.
- **Modified:** Applied `size="md"` consistently to the difficulty and category badges after identifying a visual size difference between "Easy" and "Dinner".

**Development and Troubleshooting**

- **Investigated:** A TypeScript error involving the `size` prop was caused by the shared `Badge` component not yet being updated to support it.
- **Resolved:** Updated the shared component to support the new size prop.
- **Investigated:** The metadata row wrapped unexpectedly in the temporary test layout.
- **Clarified:** The test page was initially narrower than the Figma design. At the intended Figma width, the content still required wrapping because its total width closely matched the available space.
- **Accepted:** Allowed the metadata row to wrap rather than forcing a single-line layout that could overflow.

**Scope Decisions**

- **Deferred:** Edit, delete, and other recipe action buttons, which belonged to a separate issue.
- **Deferred:** Changing the avatar initial to use the Aptly font because this would affect a shared component and required team agreement.
- **Deferred:** Final confirmation that the displayed `@name` should use the API's `owner.name` property.

**Verification / Status:**

- Tested `RecipeOverview` on a temporary page inside `RecipeHero`.
- Tested desktop layout at the Figma design width and mobile layout at 402px.
- Tested edge cases including:
  - Long recipe titles.
  - Empty descriptions.
  - Singular metadata labels.
  - Hard difficulty.
  - Duplicate tags.
  - Broken avatar images.
- Compared component measurements against Figma using browser DevTools.
- Confirmed the following dimensions:
  - Badges: 27px high.
  - Recipe title: 40px.
  - Avatar: 56px.
  - Author row: 56px.
- Compared the mobile content blocks and spacing with the Figma design.
- Verified that changes to the shared Badge and Avatar components did not alter the recipe cards on the homepage.
- `npm run lint` completed successfully.
- `npm run build` completed successfully.
- **Outstanding:** Integrate RecipeOverview into the recipe detail page.
  - **Status update (2026-10-22):** Done. `RecipeOverview` is used on the recipe detail page (AI-046).
- **Outstanding:** Confirm the avatar font with the team.
  - **Status update (2026-10-22):** `Avatar` now uses `font-aptly`. Check that the team agreed on this.
- **Outstanding:** Verify that `owner.name` is the correct source for the displayed `@name`.

**References:**

- [Ticket #126 - Recipe Overview](https://github.com/GroAnita/Flavorcraft_labs/issues/126)
- [Pull Request #180 - Recipe Overview](https://github.com/GroAnita/Flavorcraft_labs/pull/180)
- Figma recipe detail page designs (desktop and mobile)
- `src/app/components/features/RecipeOverview.tsx`
- `src/app/components/ui/Badge.tsx`
- `src/app/components/ui/Avatar.tsx`
- Related components: `RecipeHero`, `TagList`, and `RecipeMeta`

---

### AI-041 - Comments for Authenticated Users (#142)

**Date:** 2026-10-19

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #142 - Comments for Logged-In Users
- Branch: `feature/comments-auth-142`
- `src/app/actions/comments.ts`
- `src/app/components/features/CommentSection.tsx`
- `src/app/components/features/CommentForm.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Implement authentication-aware commenting functionality using the existing session management, API integration, and comment components. Show the comment form only to authenticated users, provide a login link for logged-out visitors, refresh comments after posting, and handle expired or invalid sessions.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Evaluate whether the authenticated comments ticket or the similar recipes ticket should be implemented first, considering existing dependencies.
2. Review the `accessToken` cookie in DevTools and the existing authentication, API, recipe, Server Action, and comment component implementations to identify what was missing.
3. Provide the implementation for authenticated commenting and a temporary test page for verification.
4. Apply the Figma specifications for the logged-out comment section, including typography, icon dimensions, spacing, and link styling.
5. Clarify whether redesigning the comment form belonged within the scope of this ticket.
6. Review the completed implementation against the ticket's acceptance criteria.

**Outcome and Decisions:**

**Task Prioritization and Dependencies**

- **Accepted:** Prioritized authenticated commenting over the similar recipes ticket.
- **Reason:** The authentication system and comment API integration were already available, while similar recipes depended on an unfinished recipes page and an agreed URL format.

**Authentication and Comment Visibility**

- **Accepted:** Updated `CommentSection` to read the session cookie on the server.
- **Accepted:** Displayed `CommentForm` when the user was authenticated.
- **Accepted:** Displayed a login prompt with a link to the login page when the user was not authenticated.
- **Accepted:** Reused the existing authentication and comment functionality rather than introducing a separate client-side authentication system.

**Comment Submission and Session Handling**

- **Accepted:** Used `router.refresh()` after successful comment submission so Server Components retrieve the updated comments instead of maintaining a separate client-side comments list.
- **Accepted:** Updated the comment Server Action to handle `AuthError` by deleting the session cookie and returning `needsLogin: true`.
- **Accepted:** Displayed a "Log in again" link when the user's session had expired or become invalid.
- **Accepted:** Preserved the user's comment text when authentication failed, preventing the loss of their input.

**Styling and Design Decisions**

- **Accepted:** Styled the logged-out comment section according to the Figma design:
  - Icon container: 40px.
  - Supporting text: Inter Medium, 14px.
  - Login link: bold and underlined.
  - Section heading: Aptly, 32px.
- **Modified:** Replaced the AI's initial estimated styling values after comparing them with Figma.
- **Human correction:** The first implementation used a 46px icon container, 16px text, and a semibold link. These were corrected using the actual design measurements.
- **Rejected:** Changes to the existing comment form and comment card styling because redesigning those components was outside the scope of this ticket.
- **Deferred:** The complete logged-in form design, including its card layout, authenticated user's avatar, text styling, and button.
- **Deferred:** Adjusting the login link to a darker color for improved contrast.

**Scope Decisions**

- **Rejected:** Modifying the login Server Action to redirect users back to the recipe after authentication.
- **Reason:** This would change the shared login flow and should be handled in a separate issue.
- **Deferred:** Integrating the completed comment section into the recipe detail page.

**Verification / Status:**

- Tested the functionality on a temporary page using a real recipe from the API.
- Tested the following scenarios:
  - Logged-out users see the login prompt.
  - Logged-in users see the comment form.
  - Successful comment submission.
  - Comment submission after deleting the session cookie.
  - Comment submission using an invalid authentication token.
  - Empty comment submission.
  - Keyboard interaction.
  - Mobile layout at a 375px viewport.
- Confirmed that a successfully posted comment appeared with the authenticated user's name, verifying its association with the logged-in account.
- ESLint passed for the changed files.
- `npm run build` completed successfully.
- **Outstanding:** Integrate `CommentSection` into the recipe detail page.
  - **Status update (2026-10-22):** Done. `CommentSection` is used on the recipe detail page (AI-046).
- **Outstanding:** Implement a redirect back to the recipe after login in a separate task.
- **Outstanding:** Complete the Figma styling for the logged-in comment form and comment cards.
- **Outstanding:** Review and improve the contrast of the login link.

**References:**

- [Ticket #142 - Comments for Logged-In Users](https://github.com/GroAnita/Flavorcraft_labs/issues/142)
- [Pull Request #185 - Comment Authentication](https://github.com/GroAnita/Flavorcraft_labs/pull/185)
- [Noroff API v2 - Authentication/Login](https://docs.noroff.dev/docs/v2/auth/login)
- [Noroff API v2 - Recipes](https://docs.noroff.dev/docs/v2/recipe-book/recipes)
- Figma recipe detail page and comments designs
- `src/app/actions/comments.ts`
- `src/app/components/features/CommentSection.tsx`
- `src/app/components/features/CommentForm.tsx`

---

### AI-042 - Similar Recipes Section (#137)

**Date:** 2026-10-19

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #137 - Similar Recipes Section
- Branch: `feature/similar-recipes-137`
- `src/app/components/features/SimilarRecipes.tsx`
- Dependency: `src/app/lib/recipeFilters.ts`
- Dependency: `src/app/components/ui/Badge.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Build a reusable SimilarRecipes section for the recipe detail page that links recipe tags to the recipes page with the corresponding filters applied. Ensure the component matches the desktop and mobile Figma designs and integrates with the team's existing filtering system.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review the existing `CategoryFilter`, `CategoryNavigation`, `FilterGroup`, and `FilterOption` components to understand how filtering and navigation work on the recipes page.
2. Evaluate the filter URL format, supported filter values, and helper functions based on information provided by the teammate responsible for recipe filtering.
3. Implement the SimilarRecipes component using the desktop and mobile Figma measurements.
4. Explain how to test the component before the required filter helper functions were merged.

**Outcome and Decisions:**

**Filter Navigation and Team Coordination**

- **Accepted:** Used the agreed filter URL format, `/recipes?filters=group:value`, for links to the recipes page.
- **Identified:** AI highlighted an inconsistency between existing navigation patterns:
  - `CategoryFilter` used `?category=`.
  - `CategoryNavigation` used `/categories/…`.
- **Human decision:** Confirmed the correct URL structure with the teammate responsible for recipe filtering rather than choosing an existing format without verification.
- **Accepted:** The teammate would add `filterHref` and `tagToFilterValue` helper functions to `recipeFilters.ts`.
- **Accepted:** Kept filter mapping logic centralized so the SimilarRecipes component uses the same values as the recipes page.
- **AI contribution:** Helped prepare a detailed description of the required helper functions, including expected behavior, examples, and edge cases, to support coordination with the teammate.
- **Rejected:** Constructing filter URLs directly from tag text because some tags require mapping to different filter values, such as `Italian` mapping to `cuisine:european`.
- **Rejected:** Using `useRecipeFilters` because that hook manages filter state on the recipes page, while SimilarRecipes only needs to generate navigation links.

**Component Structure and Behavior**

- **Accepted:** Created `SimilarRecipes` with `difficulty`, `category`, and `tags` props.
- **Accepted:** Displayed only tags that have a corresponding supported filter.
- **Accepted:** Removed duplicate tags based on their mapped filter values rather than their displayed text.
- **Accepted:** Hid the entire section when no tags could be mapped to filters.
- **Rejected:** Displaying unsupported tags as plain text because non-interactive tags in a section intended to help users find similar recipes could be misleading.

**Styling and Accessibility**

- **Accepted:** Reused the shared `Badge` component with `variant="tag"` and `size="md"` to match the Figma design.
- **Accepted:** Wrapped each badge in a Next.js `Link` with `rounded-full` so the keyboard focus ring follows the shape of the tag.
- **Accepted:** Included the horizontal divider lines above and below the content within the component itself.
- **Reason:** The dividers belong to the section frame in Figma and should disappear when the entire section is hidden.
- **Modified:** Corrected the divider color from the AI's initial suggestion of `oat-700` to `thyme-500` after checking the Figma design.

**Development and Dependency Decisions**

- **Accepted:** Used temporary stub implementations of the filter helper functions to test the component's layout before the teammate's changes were available.
- **Accepted:** Kept the temporary stubs out of the committed code.
- **Accepted:** Opened the implementation as a draft pull request while waiting for the required dependencies.
- **Dependency:** `filterHref` and `tagToFilterValue` needed to be available from `recipeFilters.ts`.
- **Dependency:** The shared `Badge` component needed the `size` prop introduced in the RecipeOverview pull request.

**Verification / Status:**

- Tested the component layout using temporary filter function stubs.
- Verified that supported tags were displayed correctly.
- Tested duplicate filter mappings and confirmed that duplicate links were removed.
- Confirmed that the section was hidden when no tags had supported filters.
- Checked keyboard focus behavior on the linked badges.
- Tested the mobile layout at a 375px viewport.
- Compared dimensions and spacing with the desktop and mobile Figma designs.
- **Status:** Draft pull request opened, awaiting dependent changes.
- **Outstanding:** Test that each tag link opens the recipes page with the correct filter applied.
- **Outstanding:** Run `npm run build` after the required dependencies are merged.
- **Outstanding:** Complete integration verification before the pull request is ready for review.
  - **Status update (2026-10-22):** `SimilarRecipes` now uses `filterHref` and `tagToFilterValue` and is used on the recipe detail page (AI-046), which builds successfully. Whether each tag link opens the correct filter has not been rechecked.

**References:**

- [Ticket #137 - Similar Recipes Section](https://github.com/GroAnita/Flavorcraft_labs/issues/137)
- [Draft Pull Request #187 - Similar Recipes](https://github.com/GroAnita/Flavorcraft_labs/pull/187)
- Figma recipe detail page designs (Similar Recipes, desktop and mobile)
- Teammate's documentation of the filter URL format and values in `src/app/lib/recipeFilters.ts`
- `src/app/components/features/SimilarRecipes.tsx`
- `src/app/components/ui/Badge.tsx`
- Related components: `CategoryFilter`, `CategoryNavigation`, `FilterGroup`, and `FilterOption`

---

### AI-043 - Recipe Actions Component (#131)

**Date:** 2026-10-19

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #131 - Recipe Actions
- Branch: `feat/recipe-actions-131`
- `src/app/components/features/RecipeActions.tsx`
- `src/app/components/ui/FavoriteButton.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Build the share, meal planner, print, and favorite controls for the recipe detail page, matching the desktop, mobile, and logged-out Figma designs. Reuse existing components, maintain accessibility, and separate the presentation logic from API integration.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review the existing `FavoriteButton` component and determine how it could be reused within the recipe detail page actions.
2. Explain how to investigate the intended meal planner flow and evaluate the information found.
3. Implement the action controls using the provided desktop and mobile Figma measurements, including the selected ("Clicked") state and the design for logged-out visitors.
4. Compare the Figma blur specification with the CSS implementation to ensure the visual effect matched the design.

**Outcome and Decisions:**

**Component Structure and Reusability**

- **Accepted:** Created `RecipeActions` to receive the recipe title, authentication state, favorite state, and action callbacks through props.
- **Accepted:** Kept API calls outside the component, allowing the actions to be connected to the relevant functionality during integration.
- **Accepted:** Reused the existing `FavoriteButton` component instead of creating a separate favorite control.
- **Accepted:** Extended `FavoriteButton` with optional `variant` and `disabled` props.
- **Accepted:** Preserved the existing default values so recipe cards using `FavoriteButton` would not be affected.
- **Rejected:** Using a `className` prop to override the button's positioning and dimensions because conflicting Tailwind utility classes would not provide a reliable override mechanism.

**Sharing and Action Behavior**

- **Accepted:** Used the Web Share API through `navigator.share` when supported by the browser.
- **Accepted:** Added a copy-link fallback for environments where native sharing is unavailable.
- **Accepted:** Treated cancellation of the native share sheet as a normal user action rather than displaying an error.
- **Accepted:** Included print functionality and a callback interface for the meal planner action.
- **Accepted:** Used `aria-disabled` instead of the native `disabled` attribute while an action was processing, allowing the button to retain keyboard focus.

**Favorite State and Accessibility**

- **Accepted:** Applied the Figma "Clicked" styling to the active favorite state, including a dark green background, light text, and filled heart.
- **Accepted:** Kept the favorite button's accessible label consistent while using `aria-pressed` to communicate its toggle state.
- **Rejected:** Changing the favorite button label to "Saved" when selected because a toggle button should retain a stable action label.
- **Modified:** Replaced the AI's initially estimated favorite hover styling with the actual selected-state specifications from Figma.

**Responsive Layout and Logged-Out State**

- **Accepted:** Used a CSS container query so the action tiles switch to a single row based on the component's available width rather than the viewport width.
- **Accepted:** Displayed blurred, non-interactive action tiles for logged-out visitors using `inert`, following the visitor design.
- **Corrected:** AI initially hid the Meal Planner and Favorite controls for logged-out visitors.
- **Human correction:** After reviewing the visitor design in Figma, the developer changed the implementation to display these controls in a blurred, unavailable state instead.
- **Accepted:** Matched the visual blur effect to the Figma specification.
- **Verified:** The Figma blur value of 4 corresponded to the intended CSS `blur(2px)` effect.

**Scope Decisions**

- **Deferred:** Displaying a toast notification after successfully saving a recipe as a favorite.
- **Deferred:** Connecting the meal planner action to its complete user flow.
- **Deferred:** Connecting the favorite control to the real favorite API.
- **Not included:** Recipe edit and delete buttons, which belonged to separate functionality.
- **Not included:** The wide mobile "Add to favorites" and "Share" buttons shown in Figma.

**Verification / Status:**

- Tested the component on a temporary page using a simulated favorite request.
- Tested desktop and mobile layouts.
- Verified the logged-out visitor presentation.
- Tested native sharing and the copy-link fallback.
- Tested the print action.
- Tested the meal planner callback.
- Tested favorite toggling, repeated clicks, and error handling.
- Checked keyboard interaction and inspected the accessibility tree.
- Confirmed that the existing favorite heart on recipe cards remained visually unchanged.
- Compared the blur effect against the Figma design.
- ESLint passed for the changed files.
- `npm run build` completed successfully.
- **Outstanding:** Connect the meal planner flow and favorite API during integration.
  - **Status update (2026-10-22):** The favorites API was connected in AI-046. The meal planner button opens the `/meal-plan` page, which is still a page shell.
- **Outstanding:** Implement the favorite confirmation toast.
- **Outstanding:** Confirm the favorite heart color and logged-out visitor behavior with the team.

**References:**

- [Ticket #131 - Recipe Actions](https://github.com/GroAnita/Flavorcraft_labs/issues/131)
- [Pull Request #188 - Recipe Actions](https://github.com/GroAnita/Flavorcraft_labs/pull/188)
- Figma recipe detail page action designs (desktop, mobile, and logged-out visitor states)
- [MDN - Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
- [MDN - Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)
- `src/app/components/features/RecipeActions.tsx`
- `src/app/components/ui/FavoriteButton.tsx`

---

### AI-044 - Pantry Page Layout (#165)

**Date:** 2026-10-19

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #165 - Pantry Page
- Branch: `feat/pantry-page-165`
- `src/app/(pages)/pantry/page.tsx`
- `src/app/layout.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Create the `/pantry` page using the shared header and footer, matching the desktop and mobile Figma designs. Establish the page route and layout so other parts of the application can link to it before the pantry content is ready.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #165 and identify the requirements for creating the Pantry page.
2. Review the existing `layout.tsx`, `not-found.tsx`, SEO utilities, and login page to ensure the new page follows the project's established structure.
3. Implement the Pantry page using the provided desktop Figma measurements.
4. Review the mobile Figma design and adjust the typography and spacing to match the smaller viewport.

**Outcome and Decisions:**

**Page Structure and Metadata**

- **Accepted:** Created the Pantry page at `src/app/(pages)/pantry/page.tsx`, using the existing Next.js App Router structure.
- **Accepted:** Used the page's `metadata` export to define its browser tab title.
- **Accepted:** Reused the shared header and footer from the root layout rather than duplicating them in the page.
- **Accepted:** Matched the content width to the existing recipe pages to maintain consistency across the application.

**Shared Layout and Footer Behavior**

- **Identified:** The existing `min-h-full` styling on `<body>` did not reliably make short pages fill the viewport because the `<html>` element did not have an explicit height.
- **Accepted:** Replaced `min-h-full` with `min-h-svh` on `<body>` in `layout.tsx`.
- **Accepted:** Applied `flex-1` to `<main>` so the main content area expands to occupy the available vertical space.
- **Result:** The footer remains at the bottom of the viewport on short pages, while the layout can still expand naturally when a page contains more content.
- **Human verification:** Checked the impact of the shared layout change on other pages to ensure the footer continued to display correctly.

**Desktop and Mobile Styling**

- **Accepted:** Applied the Figma typography and spacing specifications:
  - Desktop heading: 40px.
  - Desktop top spacing: approximately 120px.
  - Mobile heading: 32px.
  - Mobile top spacing: approximately 68px.
- **Modified:** Corrected the initial mobile implementation, which used a 40px heading and an estimated 64px top spacing.
- **Human correction:** Updated the values after reviewing the actual mobile Figma design.
- **Clarified:** AI pointed out that the mobile Figma `Top` measurement included the phone's status bar, which needed to be considered when comparing spacing with the browser implementation.

**Scope Decisions**

- **Deferred:** The "Coming Soon" content for the Pantry page because the design had not yet been finalized.
- **Not included:** The Meal Planner page, which belonged to a separate ticket.
- **Outstanding team decision:** Agree on a consistent page title format across the application.

**Verification / Status:**

- Tested the Pantry page on desktop and mobile.
- Verified layouts at 375px and 402px viewport widths.
- Compared heading typography and spacing with Figma.
- Confirmed that the page did not introduce horizontal scrolling.
- Verified that the footer stayed at the bottom of the viewport on short pages.
- Tested the layout with taller content to confirm that the page could expand vertically.
- Checked the browser tab title.
- Verified that the shared footer still displayed correctly on other pages after the root layout change.
- ESLint passed for the changed files.
- `npm run build` completed successfully.
- **Outstanding:** Add the "Coming Soon" content when the design becomes available.
- **Outstanding:** Agree on a consistent page title format with the team.

**References:**

- [Ticket #165 - Pantry Page](https://github.com/GroAnita/Flavorcraft_labs/issues/165)
- [Pull Request #190 - Pantry Layout](https://github.com/GroAnita/Flavorcraft_labs/pull/190)
- Figma Pantry page designs (desktop and mobile)
- Team discussion about "Coming Soon" pages for Pantry and Meal Planner
- `src/app/(pages)/pantry/page.tsx`
- `src/app/layout.tsx`

---

### AI-045 - Meal Planner Page Shell (#169)

**Date:** 2026-10-19

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #169 - Meal Planner Page Shell
- Branch: `feat/meal-planner-page-169`
- `src/app/(pages)/meal-plan/page.tsx`
- Dependency: `src/app/layout.tsx` - Shared layout improvements from the Pantry page

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Create the Meal Planner page shell at the agreed route, using the shared header and footer while matching the desktop and mobile Figma designs. Establish a working page that can be linked to before the meal planner functionality is implemented.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #169 and identify the requirements for the Meal Planner page shell.
2. Determine the correct route by examining the URL opened by the existing "Meal plan" footer link on the deployed website.
3. Provide the page implementation using the established project structure and the layout approach from the Pantry page.

**Outcome and Decisions:**

**Routing and Navigation**

- **Accepted:** Created the page at `/meal-plan`, matching the existing footer navigation.
- **AI contribution:** Suggested checking the footer and header links to identify the route already used by the application.
- **Human verification:** Confirmed that the deployed website's "Meal plan" footer link navigated to `/meal-plan`.
- **Rejected:** Using `/meal-planner`, as this would not match the existing navigation links.
- **Accepted:** Preserved the established URL structure rather than introducing a new route unnecessarily.

**Page Structure and Reusability**

- **Accepted:** Created the page at `src/app/(pages)/meal-plan/page.tsx` using the existing Next.js App Router structure.
- **Accepted:** Reused the shared header and footer from the root layout rather than duplicating them.
- **Accepted:** Followed the same structure, typography, spacing, and content width as the Pantry page.
- **Accepted:** Used "Meal planner" as the page's `<h1>`.
- **Accepted:** Used the page title specified in the ticket for the browser tab metadata.

**Shared Layout and Footer Behavior**

- **Accepted:** Built on the `min-h-svh` change introduced in `layout.tsx` during the Pantry page implementation.
- **Accepted:** Reused the shared layout behavior that allows the main content area to expand and keeps the footer at the bottom of short pages.
- **Human decision:** Kept the page implementation consistent with the existing Pantry page rather than introducing separate layout logic.

**Scope Decisions**

- **Not included:** Meal planner content and interactive functionality, which were planned for later tickets.
- **Outstanding team decision:** Agree on a consistent page title format across the application.

**Verification / Status:**

- Tested the page on desktop and mobile.
- Verified layouts at 375px and 402px viewport widths.
- Checked the heading typography and spacing against the Figma design.
- Confirmed that the page did not introduce horizontal scrolling.
- Verified that the footer remained at the bottom of the viewport on the short page.
- Tested the layout with taller content to confirm that the page could expand vertically.
- Checked the browser tab title.
- Confirmed that the existing "Meal plan" link in the footer opened the new page.
- ESLint passed for the changed file.
- `npm run build` completed successfully.
- **Outstanding:** Implement the meal planner content and functionality in later tickets.
- **Outstanding:** Agree on a consistent page title format with the team.

**References:**

- [Ticket #169 - Meal Planner Page Shell](https://github.com/GroAnita/Flavorcraft_labs/issues/169)
- [Pull Request #192 - Meal Planner Layout](https://github.com/GroAnita/Flavorcraft_labs/pull/192)
- Figma Meal Plans page designs (desktop and mobile)
- [FlavorCraft Labs - Deployed Website](https://flavorcraftlabs.netlify.app/)
- Existing "Meal plan" footer navigation
- `src/app/(pages)/meal-plan/page.tsx`
- `src/app/layout.tsx`
- Related implementation: Pantry page layout (#165)

---

### AI-046 - Recipe Detail Page Integration (#143)

**Date:** 2026-10-20

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #143 - Recipe Detail Page
- Branch: `feat/recipe-detail-page-143`
- `src/app/(pages)/recipes/[id]/page.tsx`
- `src/app/(pages)/recipes/[id]/loading.tsx`
- `src/app/(pages)/recipes/[id]/error.tsx`
- `src/app/lib/favorites.ts`
- `src/app/actions/favorites.ts`
- `src/app/hooks/useShareLink.ts`
- `src/app/components/features/RecipeIngredients.tsx`
- `src/app/components/features/RecipeIngredientsAndInstructions.tsx`
- `src/app/components/features/RecipeFavoriteProvider.tsx`
- `src/app/components/features/RecipeDetailActions.tsx`
- `src/app/components/features/RecipeMobileActions.tsx`
- Modified: `src/app/lib/recipe.ts`
- Modified: `src/app/components/features/InstructionsList.tsx`
- Modified: `src/app/components/features/RecipeActions.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Integrate the existing recipe detail components into a complete, dynamic recipe page with loading, error, and not-found states, working favorite functionality, and responsive layouts matching the desktop and mobile Figma designs.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #143, the existing recipe card navigation, page structure, recipe components, and favorite-related utilities and Server Actions to determine what was needed for integration.
2. Review `recipes/page.tsx` and `recipes/loading.tsx` to ensure the detail page follows the existing Next.js architecture.
3. Implement the recipe detail page using the provided desktop and mobile Figma measurements, including the mobile ingredients and instructions tabs.
4. Evaluate how to integrate favorite functionality, sharing, and recipe-specific state across desktop and mobile controls.
5. Clarify whether edit and delete buttons and additional mobile actions should be included.
6. Review ESLint output and `git status` to identify implementation issues and verify the changed files.

**Outcome and Decisions:**

**Dynamic Routing and Server-Side Rendering**

- **Accepted:** Created a dynamic Server Component page at `/recipes/[id]`, matching the URL already used by `RecipeCard`.
- **Accepted:** Implemented `generateMetadata` for recipe-specific page metadata.
- **Accepted:** Included recipe JSON-LD structured data.
- **Accepted:** Added route-specific `loading.tsx` and `error.tsx` files.
- **AI contribution:** Identified that the existing `recipes/loading.tsx` would otherwise also apply to the nested recipe detail route.
- **Accepted:** Introduced `RecipeNotFoundError` in `fetchRecipe` to distinguish missing recipes from other request failures.
- **Accepted:** Used the not-found page for missing recipes and the error page for other failures.

**Server and Client Component Integration**

- **Accepted:** Introduced a client-side wrapper for `RecipeActions` because a Server Component cannot directly pass interactive callback functions to a Client Component.
- **Accepted:** Kept recipe data fetching and page-level rendering on the server while placing interactive behavior in client components.
- **Accepted:** Used `key={recipe.id}` to reset recipe-specific client state when navigating to another recipe.

**Favorite Functionality and State Management**

- **Accepted:** Implemented favorite-related functionality in `lib/favorites.ts` and `actions/favorites.ts`.
- **AI contribution:** Reviewed the Noroff API documentation and identified that there was no dedicated endpoint for checking whether a single recipe was already favorited.
- **Modified:** Extended the favorite utilities to include `fetchFavorites` and a `needsLogin` response after the developer shared the requirements for the separate favorites page ticket.
- **Reason:** These additions allow the favorites page to reuse the same functionality rather than implementing duplicate logic.
- **Accepted:** Created `RecipeFavoriteProvider` to share favorite state between the desktop hero action tiles and the mobile action buttons.
- **Rejected:** Maintaining separate favorite state in each component because this could cause the desktop and mobile controls to become inconsistent.
- **Accepted:** Created `useShareLink` to centralize sharing behavior and avoid duplicating share logic across components.

**Mobile Tabs and Accessibility**

- **Accepted:** Implemented mobile tabs for ingredients and instructions using the ARIA tabs pattern.
- **Accepted:** Supported keyboard navigation with arrow keys.
- **Accepted:** Kept the inactive tab panel mounted rather than removing it from the component tree.
- **Reason:** Preserving the panel prevents the servings selection and checked instruction steps from being reset when switching tabs.
- **Accepted:** Maintained separate desktop and mobile presentations while sharing the underlying recipe data and interactive state.

**Layout and Figma Corrections**

- **Modified:** Replaced the AI's initially estimated layout measurements with values taken directly from Figma.
- **Human correction:** The initial implementation used approximately 1166px section widths and incorrect spacing.
- **Accepted:** Updated the layout to use the specified 1310px and 1090px widths, with 80px gaps.
- **Accepted:** Added the mobile tab layout after reviewing the mobile Figma design.
- **Deferred:** Final adjustments to the exact appearance of the mobile tabs and action buttons pending designer confirmation.

**Development and Troubleshooting**

- **Investigated:** The generated `PageProps<"/recipes/[id]">` type failed because the Next.js-generated route types had been removed with the `.next` directory.
- **Accepted:** Replaced the generated type dependency with a small, explicit `RecipePageProps` type.
- **Corrected:** AI initially reported nine new files because it counted the `[id]` directory as a single item.
- **Human correction:** The developer verified the actual changes using Git and identified 11 new files and three modified files.
- **Rejected:** Adding placeholder edit and delete buttons that did not have working functionality.
- **Human decision:** Left these controls out until the corresponding features could be implemented properly.

**Scope Decisions**

- **Not included:** Recipe edit and delete functionality for the recipe owner.
- **Deferred:** Final styling confirmation for the mobile tabs and action buttons.

**Verification / Status:**

- Tested navigation to a recipe from a recipe card.
- Tested opening a recipe directly by URL and refreshing the page.
- Verified that the correct recipe data was displayed.
- Tested servings adjustments and recipe-specific state resets.
- Tested authenticated and unauthenticated states.
- Tested favorite functionality, including:
  - Saving a recipe.
  - Removing a saved recipe.
  - Synchronization between desktop and mobile controls.
  - Repeated clicks.
  - Expired authentication sessions.
- Tested 404, error, and loading states.
- Verified the browser page title and heading order.
- Tested keyboard interaction and mobile tab navigation.
- Compared the layout against Figma at 1440px desktop and 402px mobile viewport widths.
- ESLint passed for the files changed in this pull request.
- `npm run build` completed successfully.
- **Known unrelated issue:** The full `npm run lint` command failed because of errors in `HeroSection.tsx` and `AnalyticsManager.tsx`, neither of which was part of this pull request.
- **Team communication:** Reported the unrelated lint errors to the team.
- **Outstanding:** Implement recipe owner edit and delete functionality.
  - **Status update (2026-10-22):** Edit was implemented in AI-059. Delete has not been implemented.
- **Outstanding:** Confirm the final mobile tab and action button styling with the designer.

**References:**

- [Ticket #143 - Recipe Detail Page](https://github.com/GroAnita/Flavorcraft_labs/issues/143)
- [Pull Request #206 - Recipe Detail Page](https://github.com/GroAnita/Flavorcraft_labs/pull/206)
- [Noroff API v2 - Recipes](https://docs.noroff.dev/docs/v2/recipe-book/recipes)
- [Noroff API v2 - Favorites](https://docs.noroff.dev/docs/v2/recipe-book/favorites)
- Figma recipe detail page designs (desktop and mobile)
- `src/app/(pages)/recipes/[id]/page.tsx`
- `src/app/lib/favorites.ts`
- `src/app/actions/favorites.ts`
- `src/app/components/features/RecipeFavoriteProvider.tsx`
- `src/app/hooks/useShareLink.ts`

---

### AI-047 - Create Recipe Modal and Shared Form State (#231)

**Date:** 2026-10-21

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #231 - Create Recipe Modal and Form State
- Branch: `feat/create-recipe-modal-231`
- `src/app/types/recipeForm.ts`
- `src/app/components/features/CreateRecipeButton.tsx`
- `src/app/components/features/RecipeFormDialog.tsx`
- `src/app/components/features/RecipeForm.tsx`
- `src/app/components/features/RecipeFormSection.tsx`
- `src/app/components/features/RecipeFormBasics.tsx` - Placeholder
- `src/app/components/features/RecipeFormQuickFacts.tsx` - Placeholder
- `src/app/components/features/RecipeFormIngredients.tsx` - Placeholder
- `src/app/components/features/RecipeFormSteps.tsx` - Placeholder
- `src/app/components/features/RecipeFormTags.tsx` - Placeholder
- Modified: `src/app/components/layout/Header.tsx`
- Modified: `src/app/components/layout/MobileMenu.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Create the modal and shared form state for adding recipes, accessible from the desktop header and mobile menu. Establish a reusable component structure and shared TypeScript types so teammates can implement individual form sections in parallel without unnecessary merge conflicts.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review the Create Recipe Figma design and help divide the feature into a parent issue and smaller implementation tickets, incorporating the designer's answers to outstanding questions.
2. Review the existing `Header.tsx`, `MobileMenu.tsx`, and `FormField.tsx` components to determine how to begin implementing the modal.
3. Implement the modal structure and shared form state using the desktop and mobile Figma measurements, and suggest appropriate tests.
4. Review a teammate's proposed props for the ingredients and instructions sections and determine whether the shared form implementation needed adjustments.

**Outcome and Decisions:**

**Task Planning and Team Coordination**

- **Accepted:** Organized the Create Recipe feature into a parent issue with six sub-issues.
- **Accepted:** Defined the shared form state and component structure in the first sub-issue so subsequent form sections could be developed in parallel.
- **AI contribution:** Helped structure the tickets and identify dependencies between the shared form and individual sections.
- **Human decision:** Used the designer's answers to clarify requirements before finalizing the implementation plan.
- **Accepted:** Created a separate placeholder component for each form section to establish clear ownership and reduce merge conflicts between teammates.

**Modal Architecture and Navigation**

- **Identified:** The existing desktop header and mobile menu linked to `/recipes/create`, while the Figma design specified a modal rather than a separate page.
- **Human verification:** Raised the discrepancy with the team and confirmed that the Create Recipe feature should open in a modal.
- **Accepted:** Implemented a modal instead of a dedicated Create Recipe page.
- **Accepted:** Used the native HTML `<dialog>` element with `showModal()` to support modal focus management, Escape handling, and returning focus to the trigger.
- **Accepted:** Added scroll locking to prevent the page behind the modal from scrolling while it was open.
- **Accepted:** Created a reusable `CreateRecipeButton` trigger for the header, mobile menu, and potential future use on the profile page.
- **Accepted:** Prevented Escape from bubbling to the mobile menu so closing the recipe modal would not also close the menu behind it.
- **Rejected:** Using Next.js intercepting routes to give the modal its own URL.
- **Reason:** This approach would require changes to the root layout and introduce additional complexity that was unnecessary for the agreed design.

**Shared Form State and Component Structure**

- **Accepted:** Created a shared `RecipeFormValues` type to define the form data structure.
- **Accepted:** Used stable row IDs for dynamically managed form entries.
- **Accepted:** Stored numeric form inputs as text in form state to support editing before validation and conversion.
- **Accepted:** Created the shared form container and section components as a foundation for later implementation.
- **Accepted:** Kept the individual form section files as placeholders because their fields and functionality belonged to separate tickets.

**Integration With Teammates' Components**

- **Accepted:** Supported the teammate's proposed controlled-component interface for ingredients and steps, using props such as `ingredients` and `onChange(ingredients)`.
- **AI contribution:** Suggested connecting these callbacks through `updateValues` rather than spreading the current `values` object, reducing the risk of losing updates when multiple form sections change state.
- **Rejected:** Rewriting the existing form architecture solely to match the teammate's prop pattern.
- **Reason:** Both approaches could work within the shared form structure, so changing the existing implementation was unnecessary.
- **Human decision:** Preserved compatibility with the teammate's component interface while keeping the shared state management consistent.

**Styling and Figma Corrections**

- **Modified:** Replaced the AI's initially estimated modal dimensions and styling with values taken from Figma.
- **Human correction:** The first implementation used a width of 714px, `rounded-2xl`, and 20px padding.
- **Accepted:** Updated the modal to match the design:
  - Width: 800px.
  - Border radius: `rounded-lg`.
  - Padding: 24px.
- **Accepted:** Applied the corresponding desktop and mobile layout specifications.

**Scope Decisions**

- **Not included:** The actual fields and content of the individual recipe form sections.
- **Not included:** Form validation and recipe publishing functionality.
- **Not included:** A separate URL for the Create Recipe modal.
- **Deferred:** Completing the form sections through their respective sub-issues.

**Verification / Status:**

- Tested opening the modal from the appropriate navigation controls.
- Tested closing the modal using the trigger interaction, Cancel button, and Escape key.
- Verified focus trapping and focus return when the modal closed.
- Tested background scroll locking.
- Inspected the accessibility tree in browser DevTools.
- Tested the mobile trigger icon and interaction with the mobile menu.
- Compared modal dimensions and layout against Figma at:
  - Desktop: 1440px.
  - Mobile: 402px.
  - Mobile: 375px.
- Checked that the shared header retained its existing appearance on other pages.
- ESLint passed for the changed files.
- `npm run build` completed successfully.
- **Known unrelated issue:** The full `npm run lint` command failed because of errors in `HeroSection.tsx` and `AnalyticsManager.tsx`, neither of which was part of this pull request.
- **Outstanding:** Implement the individual form section fields.
- **Outstanding:** Add form validation.
- **Outstanding:** Implement recipe publishing and connect the form to the API.
  - **Status update (2026-10-22):** Done. The form sections were built in AI-048, AI-057 and AI-058, and validation and publishing in AI-049.

**References:**

- [Ticket #231 - Create Recipe Modal and Form State](https://github.com/GroAnita/Flavorcraft_labs/issues/231)
- [Pull Request #240 - Create Recipe Modal](https://github.com/GroAnita/Flavorcraft_labs/pull/240)
- Figma Create Recipe modal designs (desktop and mobile)
- [MDN - HTML dialog Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog)
- Designer's clarifications and teammate's proposed ingredients and steps component interfaces
- `src/app/types/recipeForm.ts`
- `src/app/components/features/RecipeFormDialog.tsx`
- `src/app/components/features/RecipeForm.tsx`
- `src/app/components/layout/Header.tsx`
- `src/app/components/layout/MobileMenu.tsx`

---

### AI-048 - Recipe Form: Basics and Quick Facts (#233)

**Date:** 2026-10-21

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #233 - Recipe Form: Basics and Quick Facts
- Branch: `feat/create-recipe-form-basics-233`
- `src/app/components/features/RecipeFormBasics.tsx`
- `src/app/components/features/RecipeFormQuickFacts.tsx`
- `src/app/components/ui/TextAreaField.tsx` - New component
- `src/app/components/ui/SelectField.tsx` - New component
- `src/app/lib/fieldStyles.ts` - New shared styling utility
- Modified: `src/app/components/ui/FormField.tsx`
- Modified: `src/app/components/features/RecipeFormSection.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Implement the Basics and Quick Facts sections of the Create Recipe form, matching the desktop and mobile Figma designs while reusing and extending existing form components without affecting their use elsewhere in the application.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review Ticket #233 and `recipeFilters.ts` to identify the required form fields, category options, and existing functionality that could be reused.
2. Implement the Basics and Quick Facts sections using the provided desktop Figma measurements for fields, image preview, columns, metadata inputs, and difficulty selector.
3. Adjust the components to match the mobile Figma design.
4. Investigate why the form fields rendered at 43px instead of the intended height and why the servings label was misaligned.
5. Review ESLint, build, and Git status output to verify the implementation and identify unrelated errors.

**Outcome and Decisions:**

**Form Components and Reusability**

- **Accepted:** Reused the existing `FormField` component and extended it with an optional `size` prop.
- **Accepted:** Preserved the default `FormField` styling so the Login and Register forms would remain unchanged.
- **Accepted:** Created reusable `TextAreaField` and `SelectField` components following the same structure and conventions as `FormField`.
- **Accepted:** Extracted shared input styling into `fieldStyles.ts` to reduce duplication and maintain consistency between form components.
- **Corrected:** AI initially placed `fieldStyles.ts` in `components/ui`.
- **Human correction:** Moved the utility to `src/app/lib` because the project's `components/ui` directory was reserved for components.

**Category and Difficulty Selection**

- **Accepted:** Used category options from the existing `Mealtype` filter group in `recipeFilters.ts`.
- **Reason:** Reusing the existing filter values ensures that newly created recipes use categories consistent with the recipes page rather than introducing a separate list.
- **Accepted:** Implemented difficulty selection using native radio buttons inside a `<fieldset>`.
- **Reason:** Native radio controls provide established keyboard and screen reader behavior without requiring custom interaction logic.
- **Modified:** Updated the difficulty selector after comparing it with Figma:
  - Outer container: 52px.
  - Inner track: 36px.
  - No gap between options.
  - Selected option text: semibold.

**Time Inputs and Image Preview**

- **Accepted:** Stored time inputs as text with `inputMode="numeric"` and a digits-only input filter.
- **Reason:** Avoided the browser behavior of `type="number"`, including accepting characters such as `e` and changing values with arrow keys.
- **Accepted:** Added an image preview for the recipe image URL.
- **Accepted:** Restricted preview loading to HTTP and HTTPS URLs.
- **Accepted:** Displayed a status message when an image failed to load.

**Styling and Figma Corrections**

- **Modified:** Replaced the AI's initially estimated field dimensions and styling with the actual Figma measurements.
- **Human correction:** The first implementation used field heights between 46px and 54px, 16px labels, and an incorrect border color.
- **Accepted:** Updated the components to match the specified typography, colors, dimensions, and spacing.
- **Investigated:** Inputs and selects rendered at 43px instead of the intended 38px, causing alignment problems with the servings label.
- **Corrected:** Identified browser-applied line-height behavior as the cause and applied a fixed height to achieve the intended 38px field height and consistent label alignment.
- **Modified:** Updated the mobile layout after reviewing the mobile Figma measurements.
- **Accepted:** Positioned the servings label beside its buttons on mobile.
- **Accepted:** Adjusted the image preview text to 12px on mobile.

**Shared Component and Scope Decisions**

- **Rejected:** Changing the shared `ServingsControl` component to use 40px buttons.
- **Reason:** `ServingsControl` was also used on the recipe detail page, and changing its dimensions could affect that implementation.
- **Deferred:** The 40px servings button requirement.
- **Not included:** Form validation and error messages, which belonged to a separate validation issue.

**Verification / Status:**

- Tested the Basics and Quick Facts fields on a temporary implementation.
- Verified the image preview, including its loading and failure behavior.
- Tested numeric time inputs.
- Tested category selection.
- Tested difficulty selection using both mouse and keyboard.
- Verified that form values reset when the modal was closed.
- Compared component sizes and spacing against Figma using DevTools at:
  - Desktop: 1440px.
  - Mobile: 402px.
- Confirmed that the existing Login and Register forms retained their appearance after the shared `FormField` changes.
- ESLint passed for the changed files.
- `npm run build` completed successfully.
- **Known unrelated issue:** The full `npm run lint` command failed because of errors in files outside this pull request.
- **Outstanding:** Implement form validation and error messages in the separate validation issue.
  - **Status update (2026-10-22):** Done in AI-049.
- **Outstanding:** Resolve the 40px servings button requirement without unintentionally changing the shared recipe detail component.

**References:**

- [Ticket #233 - Recipe Form: Basics and Quick Facts](https://github.com/GroAnita/Flavorcraft_labs/issues/233)
- [Pull Request #246 - Recipe Form Basics and Quick Facts](https://github.com/GroAnita/Flavorcraft_labs/pull/246)
- Figma Create Recipe modal designs (Basics and Quick Facts, desktop and mobile)
- `src/app/lib/recipeFilters.ts`
- `src/app/components/features/RecipeFormBasics.tsx`
- `src/app/components/features/RecipeFormQuickFacts.tsx`
- `src/app/components/ui/FormField.tsx`
- `src/app/components/ui/TextAreaField.tsx`
- `src/app/components/ui/SelectField.tsx`
- `src/app/lib/fieldStyles.ts`

---

### AI-049 - Recipe Form Validation and Publishing (#237)

**Date:** 2026-10-21

**Team Member:** Thea (GitHub username: `Theanordhoy`)

**Related Tasks / Files:**

- Ticket #237 - Recipe Form Validation and Publishing
- Branch: `feat/create-recipe-validation-237`
- `src/app/lib/recipeFormValidation.ts` - New validation utility
- `src/app/actions/recipes.ts` - New Server Action
- `src/app/components/ui/FieldErrorMessage.tsx` - New component
- Modified: `src/app/types/recipeForm.ts`
- Modified: `src/app/components/features/RecipeForm.tsx`
- Modified: `src/app/components/features/RecipeFormDialog.tsx`
- Modified: `src/app/components/features/RecipeFormBasics.tsx`
- Modified: `src/app/components/features/RecipeFormQuickFacts.tsx`
- Modified: `src/app/components/features/RecipeFormIngredients.tsx`
- Modified: `src/app/components/features/RecipeFormSteps.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Opus 5.5

**Purpose:** Implement validation, accessible error messages, and API publishing for the Create Recipe form. Allow authenticated users to submit recipes through a Server Action, while keeping the form reusable for future recipe editing functionality.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review the completed `RecipeForm.tsx`, `RecipeFormIngredients.tsx`, `RecipeFormSteps.tsx`, and shared `recipeForm.ts` types after the related form components were merged.
2. Provide the complete implementation for form validation, error handling, and recipe publishing.
3. Prepare a testing checklist covering validation rules, API submission, authentication failures, accessibility, and responsive behavior.

**Outcome and Decisions:**

**Task Dependencies and Implementation Order**

- **Accepted:** Waited until the Basics and Quick Facts pull request was merged before starting validation and publishing.
- **Reason:** Building on merged components reduced the risk of conflicts and avoided depending on unfinished code.
- **Accepted:** Proceeded without waiting for the Tags section because tags were not required for recipe publishing.
- **Rejected:** Starting the implementation before the Basics pull request was merged.

**Shared Validation Architecture**

- **Accepted:** Created a single validation function in `recipeFormValidation.ts` for use in both the browser and the Server Action.
- **Reason:** Sharing validation rules prevents inconsistencies between client-side feedback and server-side validation.
- **Accepted:** Structured the validation logic so it could also be reused by future recipe editing functionality.
- **Accepted:** Ignored completely empty ingredient rows and instruction steps rather than treating them as invalid entries.
- **Accepted:** Displayed a validation error for partially completed ingredient rows.
- **Accepted:** Added an optional `errors` prop to the existing ingredient and step components.
- **Human decision:** Preserved the teammates' existing component interfaces and behavior rather than restructuring their implementations unnecessarily.

**Accessible Error Handling**

- **Accepted:** Created a reusable `FieldErrorMessage` component for displaying field-level validation feedback.
- **Accepted:** Focused the first invalid field after an unsuccessful submission.
- **Accepted:** Made list-level error messages focusable when an error could not be associated with an individual input.
- **Accepted:** Updated the Quick Facts layout from `items-end` to `items-start` so field labels remained aligned when validation messages appeared.
- **Accepted:** Mapped an API 400 response relating to the recipe image to an error on the image field, providing more specific feedback.

**Recipe Publishing and Submission State**

- **Accepted:** Implemented recipe publishing through a Server Action in `actions/recipes.ts`.
- **Accepted:** Added a ref-based guard against duplicate submissions.
- **Reason:** React state updates are not immediate, so a ref provides a synchronous way to prevent repeated submissions from rapid clicks.
- **Accepted:** Added `onSubmit`, `onSuccess`, and `initialValues` props to `RecipeForm`.
- **Reason:** These props allow the same form to support future recipe editing without duplicating the entire component.
- **Accepted:** Closed the Create Recipe modal before navigating to the newly published recipe.
- **Reason:** The modal is rendered from the shared header and could otherwise remain open during navigation.

**Authentication and Session Handling**

- **Accepted:** Kept the existing session cookie unchanged when authentication failed during publishing.
- **AI contribution:** Explained that changing cookies in a Server Action can trigger a page refresh, potentially closing the modal and causing the user to lose their entered form values.
- **Accepted:** Provided a way to open the login page in a new tab when the session had expired.
- **Reason:** This allows the user to authenticate again without immediately losing the unfinished recipe form.
- **Accepted:** Preserved the form's contents when publishing could not proceed because of an expired session.

**Scope Decisions**

- **Deferred:** Tags integration, which belonged to a separate issue and would be included when the relevant component was merged.
- **Not included:** Deleting recipes created during testing.
- **Accepted:** Kept the implementation focused on validation, submission, error handling, and the shared form architecture.

**Verification / Status:**

- Tested required field validation.
- Tested numeric input rules.
- Tested completely empty and partially completed ingredient rows and instruction steps.
- Tested invalid image URLs and image-related API errors.
- Successfully published recipes through the API.
- Tested repeated submission attempts, including rapid double-clicking.
- Tested expired authentication sessions and opening the login page in a new tab.
- Tested submission behavior while offline.
- Verified keyboard focus behavior when validation errors occurred.
- Inspected the accessibility tree in browser DevTools.
- Tested the form on mobile.
- Confirmed that a newly published recipe opened on its recipe detail page.
- Confirmed that the published recipe also appeared on `/recipes`.
- ESLint passed for the changed files.
- `npm run build` completed successfully.
- **Known unrelated issue:** The full `npm run lint` command failed because of errors in files outside this pull request.
- **Outstanding:** Remove the test recipes created in the API during verification.

**References:**

- [Ticket #237 - Recipe Form Validation and Publishing](https://github.com/GroAnita/Flavorcraft_labs/issues/237)
- [Pull Request #247 - Create Recipe Validation](https://github.com/GroAnita/Flavorcraft_labs/pull/247)
- [Noroff API v2 - Recipes](https://docs.noroff.dev/docs/v2/recipe-book/recipes)
- Figma Create Recipe modal design
- `src/app/lib/recipeFormValidation.ts`
- `src/app/actions/recipes.ts`
- `src/app/components/ui/FieldErrorMessage.tsx`
- `src/app/components/features/RecipeForm.tsx`
- `src/app/components/features/RecipeFormDialog.tsx`

---

### AI-050 - RecipeImage Component (#45)

**Date:** 2026-10-14

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #45 - Create RecipeImage Component (parent: Build Recipe Card)
- Branch: `feat/recipe-image-45`
- `src/app/components/ui/RecipeImage.tsx`
- Dependency: Ticket #44 - Badge Component (`feat/badge-component-44`)

**AI Tool / Model:** Claude (Claude Code VS Code extension), Opus 5.5

**Purpose:** Implement a reusable recipe card image component with consistent dimensions, image cropping, a category badge, and a fallback for missing or broken images.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement Ticket #45 using the existing project structure, contributing guidelines, styling documentation, and Next.js 16 Image documentation.
2. Review the recipe card design screenshot and adjust the component to match the intended appearance.
3. Evaluate whether the proposed image error-handling state was more complex than necessary.

**Outcome and Decisions:**

**Component Architecture and Reusability**

- **Accepted:** Used Claude's initial implementation as the foundation for `RecipeImage.tsx`.
- **Accepted:** Defined `src` as nullable because `recipe.image` can be `null`, alongside `alt` and an optional `category` prop.
- **Accepted:** Used `next/image` with `fill` and `object-cover` inside a fixed aspect-ratio container to maintain consistent card dimensions and cropping.
- **Accepted:** Displayed the category using the shared `Badge` component with `variant="category"`, positioned in the top-left corner.
- **Accepted:** Kept the component free of links and interactive elements so the parent `RecipeCard` could handle navigation.
- **Accepted:** Left corner rounding to the parent card through `overflow-hidden`, avoiding duplicate styling responsibilities.

**Image Fallback and Performance Trade-offs**

- **Accepted:** Added a neutral placeholder with the Lucide `ImageOff` icon for missing or broken images, preserving the card's dimensions.
- **Accepted:** Used `unoptimized` with `next/image` because recipe images may originate from hosts not listed in the Next.js image configuration.
- **Trade-off:** This avoids errors from unconfigured image hosts but means Next.js does not automatically resize or compress these images.

**Human Corrections to AI Suggestions**

- **Modified:** Changed Claude's initially suggested 4:3 image aspect ratio to 2:1 after comparing the implementation with the design screenshot.
- **Simplified:** Replaced Claude's proposed state tracking for previously failed image URLs with a single `hasError` boolean.
- **Reason:** Recipe cards are keyed by recipe ID, so the additional error-state complexity was unnecessary.
- **Human decision:** Kept the implementation focused on image presentation rather than adding navigation or other card responsibilities.

**Dependency and Integration**

- **AI contribution:** Identified the existing Badge component on the unmerged `feat/badge-component-44` branch.
- **Accepted:** Reused that component instead of creating a separate badge implementation.
- **Dependency:** The RecipeImage branch required Ticket #44 to be merged before a successful standalone build.

**Verification / Status:**

- `tsc --noEmit` passed with the Badge component temporarily available.
- ESLint passed with the Badge component temporarily available.
- The build could not complete on this branch because the Badge component had not yet been merged into `develop`.
- **Not yet tested:** Browser rendering and visual comparison against Figma.
- **Outstanding:** Verify category badge positioning and image cropping.
- **Outstanding:** Test the fallback using a broken image URL.
  - **Status update (2026-10-22):** `RecipeImage` is used in `RecipeCard`, which was tested with real data, missing images and broken images (AI-037).
- **Outstanding:** Confirm the 2:1 aspect ratio and placeholder color (`bg-oat-300`) with the designer.

**References:**

- [Ticket #45 - RecipeImage Component](https://github.com/GroAnita/Flavorcraft_labs/issues/45)
- [Ticket #44 - Badge Component](https://github.com/GroAnita/Flavorcraft_labs/issues/44)
- Branch: `feat/recipe-image-45`
- `src/app/components/ui/RecipeImage.tsx`
- Recipe card design screenshot
- Next.js 16 Image documentation

---

### AI-051 - IngredientsList Component and Quantity Scaling (#133)

**Date:** 2026-10-18

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #133 - Ingredients List
- Parent task: Build Ingredients List and Servings Control
- Branch: `feat/ingredients-list-133`
- `src/app/components/features/IngredientsList.tsx`
- `src/app/lib/ingredients.ts` - `scaleQuantity` and `formatQuantity`
- Dependency: Ticket #134 - ServingsControl

**AI Tool / Model:** Claude Code (Anthropic), Claude Opus 5.5

**Purpose:** Build a reusable ingredients list that displays ingredient quantities, units, and names, with quantities scaled according to the selected number of servings.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement Ticket #133, including ingredient quantity scaling using `original quantity × selected servings ÷ original servings`, readable number formatting, support for non-numeric quantities, and responsive styling.
2. Review the implementation against a screenshot of the Figma design.
3. Correct the typography to use 16px text across screen sizes, semibold quantities, and regular-weight ingredient names in `nori-300`.
4. Remove the temporary test page before committing.

**Outcome and Decisions:**

**API Data and Quantity Handling**

- **Accepted:** AI inspected the available API data before implementation.
- **Finding:** All ingredient quantities across the 52 inspected recipes were numeric, although some units were empty or unusual (`""`, `"1"`, `"test"`).
- **Accepted:** Included defensive handling for non-numeric quantities such as `"to taste"`, even though none were found in the inspected data.
- **Accepted:** Preserved non-numeric quantities without scaling them.
- **Accepted:** Displayed only the unit when a quantity was missing or zero.
- **Accepted:** Kept quantities unscaled when `originalServings` was missing or zero to avoid invalid calculations such as `NaN`.

**Reusable Calculation Utilities**

- **Accepted:** Implemented `scaleQuantity` and `formatQuantity` in `src/app/lib/ingredients.ts` rather than embedding the logic inside the component.
- **Reason:** Separating calculations from presentation makes them easier to test and reuse.
- **Accepted:** Used `Intl.NumberFormat` to format quantities with a maximum of two decimal places and without unnecessary trailing zeros.
- **Accepted:** Calculated scaled amounts based on the ratio between selected and original servings.

**Component Architecture**

- **Accepted:** Implemented `IngredientsList` without `"use client"` because the component does not manage its own interactive state.
- **Accepted:** Kept the selected servings value in the parent component and passed it to `IngredientsList` through props.
- **Accepted:** Included an empty state: "This recipe has no ingredients yet."
- **Rejected:** AI's suggestion to add an "Ingredients" heading and a `servingsControl` prop after reviewing the design screenshot.
- **Human decision:** Reverted these additions to keep `IngredientsList` responsible only for rendering the ingredient list. The parent component would handle the heading and servings control.

**Styling and Figma Corrections**

- **Modified:** Updated the typography following the developer's instructions:
  - Ingredient text: `text-base` (16px) across all screen sizes.
  - Quantity and unit: `font-semibold` (600).
  - Ingredient name: `font-normal` (400) and `text-muted-foreground` (`nori-300`).
- **Outstanding design clarification:** Figma displayed quantities with one decimal place, such as `1.0 ball` and `200.0 g`, while the implemented formatting produced `1 ball` and `200 g`.
- **Human decision:** Followed the ticket's requirement to avoid unnecessary decimal values until the difference could be clarified with the designer.

**Verification / Status:**

- ESLint passed for the new and changed files.
- `npx tsc --noEmit` passed.
- `npm run build` completed successfully.
- AI spot-checked the quantity formatting with Node, including:
  - Scaling 1 to 0.75 for 3 of 4 servings.
  - Scaling 250 to 187.5 for 3 of 4 servings.
  - Scaling 0.33 to 0.58 for 7 of 4 servings.
  - Preserving `"to taste"` unchanged.
  - Handling `null`, zero quantities, and zero original servings.
- The developer tested the component on a temporary page with sample ingredients, non-numeric amounts, and a stand-in servings control.
- Screenshots were taken during visual testing.
- The temporary test page was removed before committing.
- **Outstanding:** Connect the component to `ServingsControl` (#134), which was being developed on a separate branch.
- **Outstanding:** Integrate the component into the recipe detail page when that page becomes available.
  - **Status update (2026-10-22):** Done. `IngredientsList` and `ServingsControl` are combined in `RecipeIngredients.tsx` on the recipe detail page (AI-046).
- **Outstanding:** Confirm the decimal formatting difference with the designer.

**References:**

- [Ticket #133 - Ingredients List](https://github.com/GroAnita/Flavorcraft_labs/issues/133)
- [Ticket #134 - ServingsControl](https://github.com/GroAnita/Flavorcraft_labs/issues/134)
- Branch: `feat/ingredients-list-133`
- [MDN - Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
- `src/app/components/features/IngredientsList.tsx`
- `src/app/lib/ingredients.ts`
- Figma ingredients list design

---

### AI-052 - ServingsControl Component (#134)

**Date:** 2026-10-18

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #134 - Create ServingsControl Component
- Parent task: Build Ingredients List and Servings Control
- Branch: `feat/servings-control-component-134`
- `src/app/components/ui/ServingsControl.tsx`

**AI Tool / Model:** Claude Code (Anthropic), Claude Opus 5.5

**Purpose:** Build a reusable and accessible control for increasing or decreasing the number of recipe servings, based on the ticket requirements and the supplied design screenshot.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement Ticket #134 using the provided requirements and design screenshot, including controlled props, increment/decrement buttons, a minimum serving count of one, and accessible keyboard interaction.
2. Create a temporary test page to verify the component visually and functionally, then remove it before committing.

**Outcome and Decisions:**

**Component Architecture**

- **Accepted:** Created `ServingsControl` in `components/ui/` as a reusable controlled component.
- **Accepted:** Used `servings: number` and `onChange: (servings: number) => void` props, leaving the selected serving count under the parent component's control.
- **Accepted:** Used Lucide `Minus` and `Plus` icons.
- **Accepted:** Used existing theme tokens to match the design: `olive-500` for buttons, `olive-700` for hover states, and `salt-50` for the serving count display.
- **Modified:** The developer changed the button corners from `rounded-md` to `rounded-sm` to better match the design screenshot.

**Accessibility and Interaction**

- **Accepted:** Prevented the serving count from decreasing below one.
- **Accepted:** Used `aria-disabled` instead of the native `disabled` attribute for the decrease button at the minimum value.
- **Reason:** This keeps the button keyboard-focusable even when the serving count reaches one.
- **Accepted:** Added descriptive button labels: "Decrease servings" and "Increase servings".
- **Accepted:** Grouped the controls under the accessible label "Servings".
- **Accepted:** Added `aria-live="polite"` to the serving count so assistive technologies can announce changes, such as "5 servings".
- **Accepted:** Used native button behavior to support keyboard activation with Enter and Space.

**Scope Decisions**

- **Not included:** A maximum serving count, because the ticket did not specify one.
- **Not included:** Integration with the ingredients list, which belonged to the parent task.

**Verification / Status:**

- ESLint passed for the new component.
- `npx tsc --noEmit` passed.
- `npm run build` completed successfully.
- The developer tested keyboard navigation and activation using Tab, Enter, and Space.
- The component was visually tested and documented with screenshots on a temporary test page.
- The temporary test page was deleted before committing.
- **Outstanding:** Integrate `ServingsControl` with the ingredients list through the parent task.
  - **Status update (2026-10-22):** Done. Combined with `IngredientsList` in `RecipeIngredients.tsx` (AI-046).
- **Outstanding:** Test the component with an actual screen reader; accessible labels and live-region behavior had not yet been verified using assistive technology.

**References:**

- [Ticket #134 - ServingsControl Component](https://github.com/GroAnita/Flavorcraft_labs/issues/134)
- Branch: `feat/servings-control-component-134`
- [Lucide Icons](https://lucide.dev/icons/)
- `src/app/components/ui/ServingsControl.tsx`
- ServingsControl design screenshot

---

### AI-053 - InstructionsList Component (#135)

**Date:** 2026-10-18

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #135 - InstructionsList Component
- Branch: `feat/interactive-instructions-135`
- `src/app/components/features/InstructionsList.tsx`

**AI Tool / Model:** Claude Code (Anthropic), Claude Opus 5.5

**Purpose:** Build an interactive instructions list for the recipe detail page, displaying numbered cooking steps that users can mark as completed without modifying the original recipe data.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement Ticket #135 using the provided requirements and design screenshot, including numbered steps, interactive checkboxes, responsive layouts, and resetting completion when switching recipes.
2. Match the colors exactly to the designer's specifications.
3. Investigate why the layout jumped when switching recipes on the temporary test page.
4. Remove the temporary test page after visual testing and styling adjustments.

**Outcome and Decisions:**

**Component Structure and Interaction**

- **Accepted:** Created `InstructionsList` with `recipeId` and `steps: string[]` props, matching the recipe API's `instructions` data.
- **Accepted:** Displayed an "Instructions (n)" heading and an ordered list of step cards.
- **Accepted:** Wrapped each step in a `<label>` containing a native checkbox, allowing users to toggle completion by clicking anywhere on the step.
- **Accepted:** Styled the checkbox as a circle with a check icon while preserving native keyboard interaction and the global focus outline.
- **Accepted:** Included an empty state: "This recipe has no instructions yet."

**Accessibility**

- **Accepted:** Added a visually hidden "Step n:" prefix so screen readers can identify each instruction by its step number.
- **Accepted:** Hid the decorative number badge from screen readers to prevent duplicate announcements.
- **Accepted:** Preserved native checkbox behavior for keyboard users.

**Completion State Management**

- **Accepted:** Stored completed steps in a `Set` of step indexes, creating a new copy when updating state.
- **Reason:** This avoids mutating the `steps` prop or the underlying recipe data.
- **Accepted:** Kept completion state local to the component without persistence, so progress resets on refresh.
- **Accepted:** Reset completion when `recipeId` changes using React's pattern for adjusting state when props change.

**Styling and Human Corrections**

- **Modified:** Claude initially selected darker green colors (`sprout-800` for text and `sprout-700` for checkboxes) because the lighter design color had insufficient contrast against white.
- **Human decision:** Replaced those colors with the designer's specified `sprout-500` for completed text, checkboxes, and number badges.
- **Known accessibility concern:** The completed text color has an approximate contrast ratio of 1.9:1 against white, below the WCAG minimum of 4.5:1 for normal text.
- **Outstanding:** This contrast issue requires QA attention despite the decision to follow the supplied design.

**Test Page Troubleshooting**

- **Investigated:** The instructions list appeared to jump horizontally when switching between recipes on the temporary test page.
- **AI-assisted finding:** The issue came from `mx-auto` on `<main>` inside a flex `<body>`, allowing the page width to depend on its content.
- **Accepted:** Added `w-full` to the test page's `<main>` element.
- **Result:** The layout issue was resolved without modifying `InstructionsList`, which was not responsible for the problem.

**Verification / Status:**

- ESLint passed for the new component.
- `npx tsc --noEmit` passed.
- `npm run build` completed successfully.
- Tested the component on a temporary page with three sample recipes containing seven steps, three steps, and no steps.
- Tested marking and unmarking instructions.
- Tested switching between recipes to verify completion-state reset.
- Captured screenshots during visual testing.
- Removed the temporary test page before committing.
- **Known issue:** Completed instruction text using `sprout-500` does not meet WCAG 4.5:1 contrast requirements and should be reviewed during QA.

**References:**

- [Ticket #135 - InstructionsList Component](https://github.com/GroAnita/Flavorcraft_labs/issues/135)
- Branch: `feat/interactive-instructions-135`
- `src/app/components/features/InstructionsList.tsx`
- InstructionsList design screenshot

---

### AI-054 - KeepScreenOnToggle Component (#136)

**Date:** 2026-10-18

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #136 - Add Keep-Screen-On Toggle
- Branch: `feat/screen-toggle-136`
- `src/app/components/features/KeepScreenOnToggle.tsx`

**AI Tool / Model:** Claude Code (Anthropic), Claude Opus 5.5

**Purpose:** Build an accessible toggle using the Screen Wake Lock API to prevent the device screen from sleeping while users follow cooking instructions, with appropriate status feedback, error handling, and cleanup.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement Ticket #136 using the supplied design and acceptance criteria, including Wake Lock API integration, toggle behavior, tooltip accessibility, status messages, and cleanup.
2. Review the completed implementation against every task requirement and acceptance criterion.
3. Prepare the AI usage log and pull request description.

**Outcome and Decisions:**

**Component Architecture and Accessibility**

- **Accepted:** Implemented `KeepScreenOnToggle` using a native `<button>` with `role="switch"` and `aria-checked`.
- **Accepted:** Connected the switch to its visible label so users could activate it by clicking either the control or the text.
- **Accepted:** Preserved keyboard interaction using Tab, Space, and Enter.
- **Accepted:** Connected the informational tooltip to the switch using `aria-describedby`, allowing screen readers to access the explanation without opening the tooltip.
- **Accepted:** Supported tooltip interaction through hover, focus, and tap.

**Screen Wake Lock Management**

- **Accepted:** Requested a screen wake lock through an effect while the toggle was enabled.
- **Accepted:** Released the lock and removed the `visibilitychange` listener during effect cleanup, covering disabling the toggle and unmounting the component.
- **Accepted:** Released any pending wake lock request that completed after the toggle was disabled or the component unmounted.
- **Accepted:** Requested a new wake lock when the user returned to the tab and the toggle was still enabled.
- **Accepted:** Kept two separate state values:
  - `enabled` - Whether the user wants the screen kept awake.
  - `isActive` - Whether the browser is actually holding the wake lock.
- **Reason:** The user's preference and the browser's actual wake lock status are not always the same.

**Status Messages and Error Handling**

- **Accepted:** Displayed "Your screen will stay on while this page is open." only when the wake lock was actually active.
- **Accepted:** Displayed a specific message when the browser did not support the Screen Wake Lock API.
- **Accepted:** Handled failed wake lock requests, such as failures caused by battery-saving restrictions, by disabling the toggle and showing a separate message.
- **Accepted:** Used a `role="status"` region for status and error feedback.

**AI Review and Human Verification**

- **AI-assisted finding:** During a review against the ticket's acceptance criteria, Claude identified a tooltip interaction bug.
- **Issue:** Clicking or tapping the information icon could open and immediately close the tooltip because hover or focus opened it before the click handler toggled it closed.
- **Accepted correction:** Changed the click behavior so it opens the tooltip rather than immediately toggling it closed.
- **Accepted correction:** Added Escape-key dismissal when the tooltip was opened through hover, addressing the dismissibility requirement in WCAG 1.4.13.
- **Human decision:** Requested a separate acceptance-criteria review instead of relying only on the initial implementation.

**Styling and Design Decisions**

- **Accepted provisionally:** Used `thyme-300` for the disabled/off appearance and `primary` for the enabled/on appearance.
- **Design limitation:** The supplied screenshot showed only the off state.
- **Outstanding:** Confirm the on-state color with the designer.

**Verification / Status:**

- ESLint passed for the new component.
- `npx tsc --noEmit` passed.
- `npm run build` completed successfully.
- Tested the component on a temporary page with a button to mount and unmount it, simulating navigation away from the recipe page.
- Removed the temporary test page before committing.
- **Testing limitation:** The Screen Wake Lock API requires a secure context, such as HTTPS or `localhost`.
- **Observed behavior:** Accessing the development server from a phone through its local IP address displayed the unsupported-browser message because the page was not running in a secure context.
- **Outstanding:** Confirm the enabled-state color with the designer.

**References:**

- [Ticket #136 - Keep-Screen-On Toggle](https://github.com/GroAnita/Flavorcraft_labs/issues/136)
- Branch: `feat/screen-toggle-136`
- [MDN - Screen Wake Lock API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API)
- [WAI-ARIA - Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
- [WCAG 2.2 - Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)
- `src/app/components/features/KeepScreenOnToggle.tsx`
- Keep-Screen-On Toggle design screenshot

---

### AI-055 - Recipe Comments Section (#139)

**Date:** 2026-10-18

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #139 - Recipe Comments
- Branch: `feat/recipe-comments-139`
- `src/app/lib/recipe.ts` - `fetchComments`
- `src/app/components/features/CommentSection.tsx`
- `src/app/components/features/CommentList.tsx`
- Dependency: `CommentItem` component developed by another team member

**AI Tool / Model:** Claude Code (Anthropic), Claude Opus 5.5

**Purpose:** Implement a reusable comments section for individual recipes, including streamed loading, error and empty states, comment cards, and an expandable list matching the desktop and mobile Figma designs.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement Ticket #139 with a Comments heading, recipe-specific comments rendered through `CommentItem`, loading/error/empty states, and a "See all comments" control.
2. Clarify the scope: another developer was responsible for `CommentItem`, the recipe detail page was not yet available, and the button should expand comments on the same page.
3. Match the comment layout and button styling to the supplied Figma screenshot.

**Outcome and Decisions:**

**API Integration and Component Architecture**

- **Accepted:** Added `fetchComments(recipeId)` for `GET /recipe-book/recipes/<id>/comments`.
- **Accepted:** Split the implementation into a Server Component (`CommentSection`) and Client Component (`CommentList`).
- **Accepted:** Started the comments request on the server without awaiting it, then passed the promise to the client.
- **Accepted:** Used React's `use` API inside `Suspense`, following the Next.js streaming-data pattern.
- **Reason:** The Comments heading can render immediately while the comments list loads.
- **Accepted:** Kept comment card rendering delegated to the existing `CommentItem` interface rather than duplicating another developer's component.

**Loading, Error, and Empty States**

- **Accepted:** Converted fetch failures into an `{ ok: false }` result so the component could display a friendly error without a separate error boundary.
- **Accepted:** Used a pulsing loading placeholder with screen-reader text.
- **Accepted:** Displayed "No comments yet. Be the first to share your thoughts." when no comments were available.

**Comment Expansion and API Limitations**

- **Accepted:** Implemented "See all comments" as client-side expansion rather than navigation to another page.
- **AI-assisted finding:** Testing indicated that the comments API ignored `limit` and `page` parameters and returned empty pagination metadata.
- **Decision:** Loaded the returned comments and initially displayed a subset, expanding the list locally when requested.
- **Accepted:** Moved keyboard focus to the first newly revealed comment after expansion, preventing users from losing their position when the button disappeared.

**Design Decisions and Assumptions**

- **Provisional decision:** Initially display three comments, sorted newest first.
- **Accepted:** Used existing theme colors, including `bg-primary` for the expansion button and `oat-200` for the loading placeholder.
- **Outstanding:** Confirm the initial comment count and sorting order with the designer.

**Verification / Status:**

- ESLint passed for the new and changed files.
- TypeScript checking was otherwise successful but could not fully pass because the separately developed `CommentItem` module was not yet available.
- Manually inspected the comments API using `curl`, including response structure, pagination parameters, and an invalid recipe ID.
- **Outstanding:** Integrate the `CommentItem` component when available.
- **Outstanding:** Integrate the comments section into the recipe detail page.
  - **Status update (2026-10-22):** Done. `CommentList` uses `CommentItem`, and `CommentSection` is used on the recipe detail page (AI-046).
- **Outstanding:** Confirm the initial comment count and sorting order with the designer.

**References:**

- [Ticket #139 - Recipe Comments](https://github.com/GroAnita/Flavorcraft_labs/issues/139)
- Branch: `feat/recipe-comments-139`
- [React - `use` API](https://react.dev/reference/react/use)
- Next.js documentation: `node_modules/next/dist/docs/01-app/01-getting-started/06-fetching-data.md` - "Streaming data with the `use` API"
- Figma comments section design
- `src/app/lib/recipe.ts`
- `src/app/components/features/CommentSection.tsx`
- `src/app/components/features/CommentList.tsx`

---

### AI-056 - CommentItem Component Review and PR Documentation (#140)

**Date:** 2026-10-18

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #140 - CommentItem Component
- Branch: `feat/comment-item-140`
- `src/app/components/features/CommentItem.tsx`
- `Avatar.tsx`
- Original implementation commit: `0faa57a`

**AI Tool / Model:** Claude Code (Anthropic), Claude Opus 5.5

**Purpose:** Review the developer's existing `CommentItem` and `Avatar` implementations against the ticket requirements, make a small styling adjustment, and prepare a draft pull request description. Both components were written and committed by the developer before AI was used.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Review the five requirements from Ticket #140 and check whether the existing implementation satisfies them.
2. Replace `text-[18px]` with the equivalent Tailwind utility `text-lg`, without making other changes.
3. Draft an English pull request description covering the implementation, requirements, and testing.

**Outcome and Decisions:**

**Code Review and Requirements Verification**

- **AI contribution:** Reviewed `CommentItem.tsx`, `Avatar.tsx`, and the `Comment` type against the five ticket requirements.
- **Accepted:** AI's assessment that the implementation met all five requirements.
- **Accepted:** AI verified that the project's Tailwind CSS version (4.3.3) supports the `wrap-anywhere` utility.
- **Important distinction:** AI did not generate the original components. Alexander implemented and committed them independently in commit `0faa57a`.

**Styling Adjustment**

- **Accepted:** Replaced `text-[18px]` with `text-lg` for the comment author's name.
- **Human decision:** Limited the change to the requested utility replacement. No additional component changes were made.

**Rejected Suggestion**

- **Rejected:** AI pointed out that the comment did not display a date.
- **Reason:** Displaying a date was not part of Ticket #140, so Alexander chose not to expand the scope.

**Pull Request Documentation**

- **AI contribution:** Prepared an English PR description containing a summary, implementation changes, a requirements checklist, and suggested testing steps.
- **Human oversight:** Alexander retained responsibility for reviewing and editing the description before using it.

**Verification / Status:**

- AI reviewed the implementation against all five ticket requirements.
- Alexander selected which AI suggestions to accept and reject.
- The original components were committed before the AI review.
- Alexander retained responsibility for reviewing and approving the final changes and PR description before merge.
- No additional automated test results were documented in this entry.

**References:**

- [Ticket #140 - CommentItem Component](https://github.com/GroAnita/Flavorcraft_labs/issues/140)
- Branch: `feat/comment-item-140`
- Commit: `0faa57a`
- `src/app/components/features/CommentItem.tsx`
- `Avatar.tsx`

---

### AI-057 - Create Recipe: Ingredients and Steps (#234)

**Date:** 2026-10-21

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #234 - Create Recipe: Ingredients and Steps
- Parent issue: #230 - Create Recipe
- Dependency: #231 - Create Recipe Modal and Shared Form State
- Branch: `feat/ingredients-steps-234`
- `src/app/components/features/RecipeFormIngredients.tsx`
- `src/app/components/features/RecipeFormSteps.tsx`
- `src/app/components/ui/EditableRowList.tsx`
- `src/app/components/ui/RowActions.tsx`
- `src/app/hooks/useRowList.ts`
- `src/app/lib/recipeForm.ts`
- `src/app/types/recipe.ts`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Implement dynamic ingredient and instruction-step sections for the Create Recipe form, using reusable row management, accessible keyboard interactions, and the supplied desktop and mobile designs.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement Ticket #234 using its requirements and the desktop and mobile design screenshots.
2. Prepare a pull request description and an AI usage log documenting the implementation.

**Outcome and Decisions:**

**Component Architecture and Team Integration**

- **Accepted:** Created separate `RecipeFormIngredients` and `RecipeFormSteps` components.
- **Accepted:** Used controlled props for the rows and their change handlers, following the shared form contract defined in Ticket #231.
- **Reason:** This allowed development to proceed independently before the modal and shared form state were merged.
- **Accepted:** Created reusable `EditableRowList` and `RowActions` components to avoid duplicating row management behavior.
- **Accepted:** Extracted row operations into a shared `useRowList` hook.

**Dynamic Row Management and Accessibility**

- **Accepted:** Implemented adding, updating, moving, and removing rows.
- **Accepted:** Used stable row IDs to preserve the correct input values when rows were reordered or removed.
- **Accepted:** Added focus management for each operation:
  - **Add:** Focus moves to the newly created row.
  - **Move:** Focus remains on the button used to move the row.
  - **Remove:** Focus moves to the next row, then the previous row, or finally the Add button.
- **Accepted:** Used `aria-disabled` instead of native `disabled` for unavailable move actions.
- **Reason:** This follows the existing `ServingsControl` approach and prevents keyboard focus from disappearing when a row reaches the top or bottom of the list.

**Ingredient Units and API Data**

- **Accepted:** Built the unit options from ingredient units found across 52 recipes in the Noroff API.
- **Accepted:** Consolidated plural forms and alternative spellings.
- **Accepted:** Excluded invalid or test values such as `1`, `2`, and `test`.
- **Accepted:** Preserved units not present in the predefined list when editing an existing recipe, preventing previously saved values from disappearing.

**Design Corrections and Validation Scope**

- **Modified:** Replaced the duplicated steps helper text shown under Ingredients in the design with ingredient-specific guidance.
- **Modified:** Corrected the design's "Ingridient" spelling to "Ingredient".
- **Human decision:** Allowed users to remove all ingredient and instruction rows.
- **Reason:** Enforcing a minimum of one ingredient and one step belongs to the separate validation task (#237), rather than the row management components.

**Hydration and Integration Considerations**

- **Identified:** Default rows use randomly generated IDs.
- **Decision for Ticket #231:** Generate these IDs in the browser when the modal opens, rather than during server rendering, to avoid hydration mismatches.
- **Outstanding:** Test the completed sections inside the shared Create Recipe modal after Ticket #231 is merged.

**Verification / Status:**

- TypeScript checks passed for the changed files.
- ESLint passed for the changed files.
- Tested the components in Chrome using Playwright on a temporary test page.
- Verified adding, editing, moving, and removing rows.
- Confirmed that input values remained associated with the correct rows after reordering.
- Tested keyboard focus after each row operation.
- Checked unavailable move actions on the first and last rows.
- Verified accessible button labels.
- Compared screenshots at 1280px desktop and 390px mobile widths against the designs.
- Removed the temporary test page before committing.
- **Outstanding:** Integration testing inside the Create Recipe modal, which had not yet been merged at the time of this implementation.
  - **Status update (2026-10-22):** Done. The sections were tested inside the modal in AI-049 and AI-059.

**References:**

- [Ticket #234 - Create Recipe: Ingredients and Steps](https://github.com/GroAnita/Flavorcraft_labs/issues/234)
- [Parent Issue #230 - Create Recipe](https://github.com/GroAnita/Flavorcraft_labs/issues/230)
- [Dependency #231 - Create Recipe Modal and Shared Form State](https://github.com/GroAnita/Flavorcraft_labs/issues/231)
- Branch: `feat/ingredients-steps-234`
- Desktop and mobile Create Recipe form designs
- `src/app/components/features/RecipeFormIngredients.tsx`
- `src/app/components/features/RecipeFormSteps.tsx`
- `src/app/hooks/useRowList.ts`
- `src/app/components/ui/EditableRowList.tsx`

---

### AI-058 - Create Recipe: Tags (#236)

**Date:** 2026-10-21

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #236 - Create Recipe: Tags
- Parent issue: #230 - Create Recipe
- Dependency: #231 - Create Recipe Modal and Shared Form State
- Branch: `feat/create-recipe-tags-236`
- `src/app/components/features/RecipeFormTags.tsx`
- Modified: `src/app/components/ui/Badge.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Implement the Tags section of the Create Recipe form, allowing users to select suggested tags and add custom tags while maintaining compatibility with the existing form state and recipe filters.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement Ticket #236 using the provided requirements and Figma screenshot.
2. Show the implementation visually at desktop and mobile viewport widths.
3. Create a local test page for verifying the form without including it in the Git commit.

**Outcome and Decisions:**

**Suggested Tags and Accessibility**

- **Accepted:** Implemented six suggested tags: Vegetarian, Vegan, Gluten-free, Lactose-free, Quick, and Healthy.
- **Accepted:** Used toggle buttons with `aria-pressed` to communicate their selected state.
- **Accepted:** Reused the existing `Badge` component for tag presentation.
- **Accepted:** Added an optional `selected` prop to `Badge` to support the filled appearance of selected tags.
- **Accepted:** Preserved the existing appearance and behavior of other Badge usages.

**Custom Tag Management**

- **Accepted:** Allowed users to add custom tags using the Add button or Enter.
- **Accepted:** Used `preventDefault()` when Enter adds a tag to avoid submitting the entire recipe form.
- **Accepted:** Prevented empty tags and case-insensitive duplicates.
- **Accepted:** Displayed a short duplicate-tag message through an `aria-live` region.
- **Accepted:** Matched typed suggested tags to their predefined spelling. For example, entering "vegan" selects "Vegan".
- **Reason:** This maintains consistency with the existing recipe filter values.
- **Accepted:** Displayed custom tags after suggested tags, with accessible removal buttons labelled "Remove tag …".

**Shared Form State and Filter Integration**

- **Accepted:** Read and updated tags through `values.tags`, following the shared form state established in Ticket #231.
- **Verified:** Used `tagToFilterValue` from `recipeFilters.ts` to check whether suggested tags corresponded to existing filters.
- **Finding:** Vegetarian, Vegan, Gluten-free, Lactose-free, and Quick mapped to supported filters.
- **Known limitation:** Healthy did not have a corresponding filter. It could be saved as a recipe tag but could not yet be found through an existing filter.

**AI Design Decisions and Outstanding Issues**

- **AI decision:** Used a green selected state with `bg-primary`, although the design did not explicitly specify the selected appearance.
- **AI decision:** Introduced a maximum custom tag length of 30 characters, which was not specified in the design.
- **Outstanding:** Confirm these additional design and input constraints if necessary.
- **Identified issue:** The lower parts of letters such as "y" and "g" were slightly clipped in `Badge` because of the combination of `truncate` and `leading-none`.
- **Not fixed:** The clipping also affected existing badges, so it remained an outstanding shared-component issue.

**Verification / Status:**

- `npx tsc --noEmit` passed.
- ESLint passed for the changed files.
- Tested `tagToFilterValue` against all six suggested tags; five mapped to existing filters, while Healthy did not.
- Tested the form inside the modal using Playwright with Chromium at 1280px and 390px.
- Verified that selecting a suggested tag set `aria-pressed="true"`.
- Verified that Enter added a custom tag without submitting the form.
- Verified that duplicate tags were rejected.
- No console errors were observed during testing.
- Compared screenshots against the desktop and mobile designs.
- Used a local test page at `src/app/dev-test/recipe-form`, excluded from Git.
- **Outstanding:** Resolve the shared Badge text-clipping issue.
- **Outstanding:** Confirm the selected-state styling and 30-character limit.
- **Outstanding:** Determine whether Healthy should receive a corresponding recipe filter.

**References:**

- [Ticket #236 - Create Recipe: Tags](https://github.com/GroAnita/Flavorcraft_labs/issues/236)
- [Parent Issue #230 - Create Recipe](https://github.com/GroAnita/Flavorcraft_labs/issues/230)
- [Dependency #231 - Create Recipe Modal and Shared Form State](https://github.com/GroAnita/Flavorcraft_labs/issues/231)
- Branch: `feat/create-recipe-tags-236`
- Figma Create Recipe Tags section design
- `src/app/components/features/RecipeFormTags.tsx`
- `src/app/components/ui/Badge.tsx`
- `src/app/lib/recipeFilters.ts`

---

### AI-059 - Edit Recipe for Owners (#238)

**Date:** 2026-10-21

**Team Member:** Alexander Lislelid (GitHub username: `AlexanderLislelid`)

**Related Tasks / Files:**

- Ticket #238 - Edit Recipe
- Branch: `feat/edit-recipe-238`
- `src/app/actions/recipes.ts`
- `src/app/components/features/EditRecipeButton.tsx`
- `src/app/components/features/RecipeFormDialog.tsx`
- `src/app/components/features/RecipeForm.tsx`
- `src/app/components/features/RecipeOverview.tsx`
- `src/app/types/recipeForm.ts`
- `src/app/(pages)/recipes/[id]/page.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Allow recipe owners to edit their recipes directly from the recipe detail page by reusing the existing Create Recipe form and modal. Verify that saving works correctly and that expired authentication sessions do not cause users to lose their changes.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement recipe editing for owners using the existing Create Recipe form and modal components.
2. Investigate whether removing the `accessToken` cookie while the edit modal is open displays the appropriate login message and preserves the entered form values.
3. Check whether deleting all browser cookies produces the same authentication behavior.

**Outcome and Decisions:**

**Shared Create and Edit Functionality**

- **Accepted:** Reused the existing `RecipeForm` and `RecipeFormDialog` components rather than building a separate editing form.
- **Accepted:** Introduced a shared `sendRecipe` helper for `createRecipe` and `updateRecipe`, handling POST and PUT requests with operation-specific error messages.
- **Accepted:** Revalidated `/recipes` and the relevant recipe detail route after successful saves.
- **Reason:** This allows updated recipe information to appear on the detail page without requiring manual navigation or a full page reload.
- **Modified:** Changed the shared validation message from "…before you can publish." to "…before you can save." so it applies to both creating and editing recipes.

**Edit Modal and Form Values**

- **Accepted:** Created `EditRecipeButton` to open `RecipeFormDialog` in edit mode.
- **Accepted:** Used `updateRecipe.bind(null, recipeId)` to associate the update action with the correct recipe.
- **Accepted:** Prefilled the form with the recipe's existing values.
- **Accepted:** Used "Save changes" and "Saving…" labels for edit mode.
- **Accepted:** Closed the dialog after a successful update, relying on route revalidation to refresh the displayed recipe.
- **Accepted:** Created `toRecipeFormValues` to convert API recipe data into the shared form structure.
- **Accepted:** Added an empty row when a recipe had no ingredients or instruction steps.
- **Accepted:** Normalized difficulty values through `toDifficulty`, including converting values such as `"easy"` to `"Easy"`.

**Recipe Ownership and Authorization**

- **Accepted:** Displayed the Edit button only when the profile cookie name matched `recipe.owner.name`.
- **Accepted:** Retained API-side authorization checks when saving, rather than relying on the visibility of the Edit button for security.
- **Accepted:** Returned the message "Only the owner can edit this recipe." when the API responded with HTTP 403.
- **Important distinction:** Hiding the button is a UI decision; the API remains responsible for enforcing ownership.

**Expired Session Handling**

- **Checked:** When `authFetch` throws `AuthError`, `sendRecipe` returns `needsLogin: true` without modifying cookies.
- **Reason:** Avoiding cookie changes in the Server Action prevents an unwanted page refresh that could close the modal and discard unsaved changes.
- **Accepted:** Preserved the user's form values and displayed a "Log in again (opens in a new tab)" option.
- **Verified:** Removing the `accessToken` cookie produced the message "You need to log in to do this."
- **Verified:** The message "Your session has expired…" was reserved for cases where the API returned HTTP 401.
- **Verified:** Removing all cookies produced the same missing-token behavior because the action reads `accessToken`.
- **Human verification:** Confirmed that the login recovery flow preserved the editing state rather than clearing the form.

**Additional Investigation**

- **Checked:** A recipe previously believed to be missing was found in the Noroff API.
- **Result:** Confirmed that the recipe had been saved.

**Verification / Status:**

- Tested the expected behavior while authenticated.
- Successfully created a new recipe.
- Successfully edited the newly created recipe.
- Checked the expected behavior of the expired-session and missing-cookie flows.
- Confirmed that the tested create and edit functionality worked as expected.
- No separate ESLint, TypeScript, or production build results were documented in this entry.

**References:**

- [Ticket #238 - Edit Recipe](https://github.com/GroAnita/Flavorcraft_labs/issues/238)
- Branch: `feat/edit-recipe-238`
- `src/app/actions/recipes.ts`
- `src/app/components/features/EditRecipeButton.tsx`
- `src/app/components/features/RecipeFormDialog.tsx`
- `src/app/components/features/RecipeForm.tsx`
- `src/app/(pages)/recipes/[id]/page.tsx`

---

### AI-060 - General AI Use: SEO & Analytics Reports and Clarity Recording Summaries

**Date:** 2026-10-06 – ongoing

**Team Member:** Tone Gjerde (GitHub username: `Tunegj`), SEO & Analytics Lead

**Related Tasks / Files:**

- All SEO & Analytics reports produced during the project
- Microsoft Clarity session recordings from user testing

**AI Tool / Model:** ChatGPT (OpenAI), GPT-6; Microsoft Clarity's built-in AI (Copilot)

**Purpose:** Use AI to review and format SEO & Analytics reports, and to summarize test users' Clarity session recordings so patterns could be found more efficiently.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

- **Reports:** The team member's own findings and analyses were given to AI as the prompt, with a request to review and format them into a report.
- **Clarity:** Clarity's built-in AI was used to summarize the test users' session recordings.

**Outcome and Decisions:**

- **Accepted:** All SEO & Analytics reports were reviewed and formatted by AI. The findings, analyses and conclusions are the team member's own. AI was used for structure, wording and review, not to produce the findings.
- **Accepted:** Clarity's AI summaries were used as a starting point for analyzing user behavior in the recordings.
- **Human verification:** Every issue in a Clarity AI summary was checked against the actual recording before being included in a report. For example, when a dead click was reported, the recording was watched to confirm whether it was a real dead click or not.

**Verification / Status:**

- Clarity AI summaries were checked against the actual session recordings.
- AI-formatted reports were checked against the team member's own findings and analyses.

**References:**

- [Microsoft Clarity Documentation](https://learn.microsoft.com/en-us/clarity/)
- [Ticket #53 - Integrate Microsoft Clarity Analytics](https://github.com/GroAnita/Flavorcraft_labs/issues/53)

---

### AI-061 - Reusable Alternative Authentication Component (#33)

**Date:** 2026-10-08 to 2026-10-14

**Team Member:** Lise Ervik (GitHub username: `Liz-nor`)

**Related Tasks / Files:**

- Ticket #33 - Reusable Alternative Authentication
- Branch: `reusable-sign-in-33`
- `AlternativeAuth.tsx`
- `SocialAuthButton.tsx`
- `page.tsx`

**AI Tool / Model:** ChatGPT (OpenAI), Claude Code (Anthropic), Claude Opus 5.5

**Purpose:** Develop reusable and accessible alternative authentication components for login and registration pages, while handling social authentication providers that were not yet configured.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Plan reusable component structure and responsive styling.
2. Review accessibility requirements, including provider icons, accessible names, and keyboard focus.
3. Determine how to represent unavailable or unconfigured authentication providers.

**Outcome and Decisions:**

**Reusable Components**

- **Accepted:** Created `AlternativeAuth` and `SocialAuthButton` to reduce duplicated authentication UI.
- **Accepted:** Added provider icons, accessible names, keyboard focus styles, and disabled states.
- **Accepted:** Used a `providerHandlers` prop to identify configured providers.

**Provider Availability**

- **Accepted:** Disabled provider buttons when no handler was configured.
- **Accepted:** Allowed providers to be hidden when explicitly excluded.
- **Accepted:** Hid the divider when no providers were displayed.
- **Accepted:** Applied existing design tokens and followed the Figma styling.

**Verification / Status:**

- Google and Facebook authentication had not been integrated, so both provider buttons remained disabled.
- Browser and screen-reader testing were still outstanding at the time of this entry.

**References:**

- [Ticket #33](https://github.com/GroAnita/Flavorcraft_labs/issues/33)
- Branch: `reusable-sign-in-33`

---

### AI-062 - Category Navigation Component (#66)

**Date:** 2026-10-13

**Team Member:** Lise Ervik (GitHub username: `Liz-nor`)

**Related Tasks / Files:**

- Ticket #66 - Category Navigation
- Branch: `feature/category-navigation-66`
- `src/app/components/features/CategoryNavigation.tsx`
- `src/app/components/ui/CategoryItem.tsx`
- `public/images/categories/`

**AI Tool / Model:**

- ChatGPT (OpenAI), GPT-6 - Planning and initial implementation
- Claude Code (Anthropic), VS Code extension, Claude Opus 5.5 - Reusable component extraction

**Purpose:** Build responsive category navigation for the recipe application, using reusable React components, Next.js, TypeScript, Tailwind CSS, and the existing design system.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Plan category navigation using the supplied category images.
2. Determine suitable component structure, image organization, responsive layout, and use of custom theme colors.
3. Extract a reusable `CategoryItem` component for each linked image and label.

**Outcome and Decisions:**

**Category Navigation**

- **Accepted:** Created navigation for six categories: Breakfast, Lunch, Dinner, Snack, Dessert, and Drink.
- **Accepted:** Used a category data array and `.map()` to avoid repeating JSX.
- **Accepted:** Implemented a responsive CSS Grid with six columns on desktop, three on tablet, and two on mobile.

**Component Reusability**

- **Accepted:** Claude Code extracted the linked category image and label into `CategoryItem`.
- **Accepted:** Defined reusable `name`, `image`, and `href` props.
- **Accepted:** Kept category data and list markup in `CategoryNavigation`.

**Verification / Status:**

- Confirmed that category image paths matched files in `public/images/categories/`.
- The component had not yet been rendered on a page, so browser testing was not completed.
- **Outstanding:** Integrate the component into a page, verify responsive behavior against Figma, implement `/categories/[slug]` destinations, decide on image alt text, and run lint and TypeScript checks.
  - **Status update (2026-10-22):** `CategoryNavigation` is on the homepage. It links to `/recipes?filters=category:…` (AI-026) instead of `/categories/[slug]`, and the images use the category name as alt text.

**References:**

- [Ticket #66](https://github.com/GroAnita/Flavorcraft_labs/issues/66)
- Branch: `feature/category-navigation-66`
- Figma category navigation design

---

### AI-063 - Hero Section Component and Responsive Design (#67)

**Date:** 2026-10-14

**Team Member:** Lise Ervik (GitHub username: `Liz-nor`)

**Related Tasks / Files:**

- Ticket #67 - Hero Section
- Branch: `comp/hero-section-67`
- `HeroSection.tsx`
- `page.tsx`
- Mobile and desktop illustrations

**AI Tool / Model:** ChatGPT (OpenAI), GPT-6; Claude also mentioned, specific model not confirmed

**Purpose:** Develop a responsive homepage Hero Section based on the Figma design using Next.js, TypeScript, and Tailwind CSS.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Determine appropriate component placement and project structure.
2. Implement responsive images and layouts based on the Figma design.
3. Apply the project's existing styling conventions and design tokens.

**Outcome and Decisions:**

- **Accepted:** Created `HeroSection.tsx` outside the shared `ui` folder as a Server Component.
- **Accepted:** Added a heading, description, and call-to-action linking to `/recipes`.
- **Accepted:** Reused design tokens defined in `globals.css`.
- **Accepted:** Implemented separate desktop and mobile illustrations using `next/image` and responsive Tailwind classes.
- **Accepted:** Used empty alt text for decorative illustrations.
- **Accepted:** Applied `priority` to above-the-fold images.
- **Temporary implementation:** Imported the component into `page.tsx` for preview.

**Verification / Status:**

- The implementation was documented, but visual verification against Figma was not confirmed.
- **Outstanding:** Finalize homepage integration, verify the `/recipes` destination, consider `next/link` for navigation, and run lint and TypeScript checks.
  - **Status update (2026-10-22):** `HeroSection` is on the homepage and links to `/recipes`. The link is still a plain `<a>` rather than `next/link`.

**References:**

- [Ticket #67](https://github.com/GroAnita/Flavorcraft_labs/issues/67)
- Branch: `comp/hero-section-67`
- Figma Hero Section design

---

### AI-064 - Featured Recipe Section (#68)

**Date:** 2026-10-15

**Team Member:** Lise Ervik (GitHub username: `Liz-nor`)

**Related Tasks / Files:**

- Ticket #68 - Featured Recipe Section
- Branch: `comp/featured-recipe-section-68`
- `src/app/components/FeaturedRecipe.tsx`
- `src/app/lib/recipe.ts`
- `src/app/types/recipe.ts`

**AI Tool / Model:** Not specified in the supplied log; confirmation needed

**Purpose:** Build a homepage section highlighting a selected recipe from the Noroff Recipe Book API, following the Figma design.

**Key Prompt(s):**

- **Not documented:** The original entry did not specify the AI prompts used. These should be added by the team member if available.

**Outcome and Decisions:**

**API Integration**

- Added `fetchRecipe(id)` to retrieve an individual recipe and return the API response's `data` field.
- Built `FeaturedRecipeSection` as an asynchronous Server Component.
- Selected the agreed featured recipe, "Smash and Grab Burgers", using a fixed recipe ID rather than dynamic selection.
- Returned `null` when fetching failed so the homepage could continue rendering if the API was unavailable.

**Component Content and Styling**

- Displayed the recipe image, "Today's favorite" badge, total preparation and cooking time, difficulty, title, and a link to `/recipes/[id]`.
- Reused the shared `Badge` component.
- Updated the `_count` type from `object` to `{ favorites: number }` to reflect the API response.
- Used shared Tailwind tokens including `saffron`, `truffle`, `basil`, and `salt`.

**Verification / Status:**

- The component had not yet been imported into the homepage at the time of this entry.
- The recipe link depended on the recipe detail page being implemented.
  - **Status update (2026-10-22):** `FeaturedRecipeSection` is on the homepage, and the recipe detail page exists (AI-046).
- A dynamic featured recipe selection remained a possible future change if required.
- **Documentation outstanding:** Confirm the AI tool/model and summarize the actual AI prompts before finalizing the log.

**References:**

- [Ticket #68](https://github.com/GroAnita/Flavorcraft_labs/issues/68)
- Branch: `comp/featured-recipe-section-68`
- `src/app/components/FeaturedRecipe.tsx`

---

### AI-065 - Profile Sidebar Components (#156)

**Date:** 2026-10-19

**Team Member:** Lise Ervik (GitHub username: `Liz-nor`)

**Related Tasks / Files:**

- Ticket #156 - Profile Sidebar
- Branch: `comp/profileSidebar#156`
- Commit: `7536b88`
- AI-assisted: `src/app/components/ui/ProfileStats.tsx`
- AI-assisted: `src/app/components/ui/ProfileBanner.tsx`
- Written by the developer: `src/app/components/features/ProfileSidebar.tsx`
- Written by the developer: `src/app/components/ui/Avatar.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Generate initial drafts for reusable profile sidebar components based on ticket acceptance criteria, while reusing the existing Avatar component and logout action.

**Key Prompt(s):** _(Summarized, not verbatim)_

1. Implement a profile sidebar displaying the logged-in user's cover image, avatar, name, email, biography, and profile statistics.
2. Include fallbacks for missing images, an Edit Profile action, and the existing logout functionality.
3. Match the supplied requirements for responsive layout and design.

**Outcome and Decisions:**

**Profile Statistics**

- **Accepted, then modified:** AI created `ProfileStats` using a semantic `<dl>` for Favorites and Recipes counts.
- **Accepted:** Used `flex-col-reverse` to position numbers above their labels visually while preserving the definition-list markup.
- **Human modifications:** Left-aligned the statistics, increased text size, and removed singular/plural label variations to match Figma.

**Profile Banner**

- **Accepted, then modified:** AI created a Client Component supporting a cover image and a gradient fallback for missing or failed images.
- **Accepted:** Treated the banner as decorative by default.
- **Human modifications:** Replaced the AI-generated gradient with the Figma gradient and set a fixed height of 124px.

**Rejected AI Implementation**

- **Rejected:** AI's proposed `ProfileSidebar` implementation and 96px `xl` Avatar size.
- **Human decision:** Stopped the AI session and implemented `ProfileSidebar` manually to match the design.
- **Human implementation:** Used an overlapping avatar, an 88px `xl` Avatar size, the Aptly font, outlined Edit Profile and Log Out buttons, and a "No profile description yet." fallback.
- **Important distinction:** `ProfileSidebar.tsx` and `Avatar.tsx` were written by Lise, not AI.

**Design Limitations**

- AI did not have direct access to Figma and based its suggestions on existing components and `styles.md`.
- Lise handled the final design adjustments.

**Verification / Status:**

- AI did not run ESLint, a build, or the application during this session.
- Lise performed review, design matching, and testing before committing.
- The implementation was later updated under Ticket #214, including four statistics, a `stats` prop, and the `/profile#general-information` edit link.
- Further profile layout changes were made under Ticket #155.
- Related earlier AI logs: AI-016 and AI-019.

**References:**

- [Ticket #156 - Profile Sidebar](https://github.com/GroAnita/Flavorcraft_labs/issues/156)
- Branch: `comp/profileSidebar#156`
- Commit: `7536b88`
- Related logs: AI-016 and AI-019

---

### AI-066 - Recipe Page Opening at the Comments (#274)

**Date:** 2026-10-22

**Team Member:** Gro Anita / `GroAnita`

**Related Tasks / Files:**

- Ticket #274 - Recipe page opens scrolled to the comments when clicked from far down a page
- Branch: `fix/recipe-scroll-position-274`
- `src/app/(pages)/recipes/[id]/loading.tsx`
- `src/app/(pages)/recipes/loading.tsx`

**AI Tool / Model:** Claude Code (Anthropic), VS Code extension, Claude Opus 5.5

**Purpose:** Find out why recipes opened at the comments section when clicked from further down a page, and fix it.

**Key Prompt(s):** _(Summary of prompts; not exact original wording)_

- Described that recipes clicked near the top open correctly, but recipes clicked further down open at the comments section, and asked for the cause without changes.
- Asked for a ticket, a branch and the best fix.

**Outcome and Decisions:**

- **Found:** The recipe loading screen was shorter than the screen plus the header. Replacing a long, scrolled list with it clamped the scroll position to its bottom, where its top was still visible, so Next.js skipped scrolling to the top. When the recipe arrived, the browser's scroll anchoring kept the footer in place and pushed the view to the bottom of the recipe.
- **Accepted:** Added `min-h-svh` to the recipe and recipes loading screens, with comments explaining why. This fixes the cause instead of adding scroll code or turning off scroll anchoring for the whole site.
- **Rejected:** A component that forces `window.scrollTo(0, 0)` on the recipe page, because it would also break returning to the list with the back button and works around Next.js instead of with it.

**Verification / Status:**

- `npm run build` passes.
- Reproduced on the deployed `develop` site with Playwright by tracing scroll events, and confirmed the scroll anchoring part by turning it off in the test browser only.
- 10 automated checks in Chromium at 1280px and 390px against a production build: cards near the top and far down on `/recipes` and in the last home page section open at the top, and the back button returns to the previous position. The same test without the fix failed on desktop (opened at the bottom), confirming the fix.

**References:**

- [Ticket #274 - Recipe page opens scrolled to the comments](https://github.com/GroAnita/Flavorcraft_labs/issues/274)
- Branch: `fix/recipe-scroll-position-274`
- [Next.js scrolling behavior on navigation](https://nextjs.org/docs/app/api-reference/components/link#scroll)
