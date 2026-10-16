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

### AI-001 - Recipe Search and Category Filtering

**Date:** 2026-10-07

**Team Member:** Emilie Sofie Fosmo / `Emifos`

**Related Tasks / Files:**

- Ticket #14 - Implement recipe search and category filtering
- Branch: `feat/search-filter-14`
- `components/features/CategoryFilter.tsx`
- `components/features/SearchInput.tsx`
- `hooks/useSetSearchParam.ts`

**AI Tool / Model:** Claude (claude.ai), Sonnet 5.5

**Purpose:** Improve an existing search component to meet the ticket requirements and build category filtering that works alongside search, before the framework and design were finalized.

**Key Prompt(s):** _(Summary provided by team member; not exact original prompts)_

Provided Claude with the ticket checklist and acceptance criteria, Noroff Recipe Book API documentation, a designer's wireframe, and an existing Next.js/TypeScript search component using `useSearchParams`.

Requested an improved implementation, followed by restructuring into two components and a shared hook, and assistance resolving an ESLint error.

**Outcome and Decisions:**

- **Accepted:** Used Claude's output as the basis for three files:
  - `useSetSearchParam.ts`: Updates URL query parameters and resets pagination when filters change.
  - `SearchInput.tsx`: Debounced search input with whitespace trimming, clearing, and URL synchronization.
  - `CategoryFilter.tsx`: Category buttons, including "All categories", using `aria-pressed`.
- **Accepted:** Used URL parameters (`search` and `category`) matching the API to allow combined server-side filtering.
- **Modified:** Changed URL/input synchronization from a `useEffect` to a render-phase previous-value check after ESLint flagged `react-hooks/set-state-in-effect`.
- **Rejected:** A separate `SearchFilter` wrapper component in favor of two components and one shared hook, with Suspense handled by the consuming page.
- **Rejected:** Ingredient chips and dietary filters shown in the wireframe because they were outside the ticket scope and unsupported by the API query parameters.
- **Modified:** Removed AI-suggested Tailwind styling pending approved designs.

**Verification / Status:**

- Reviewed the code in the editor using ESLint and addressed the reported hook-related issue.
- Components had not yet been tested because the framework and API setup were not ready.
- Remaining work: Confirm API category/search behavior, integrate components into a recipe-fetching page, add an empty state, test acceptance criteria with real data, verify keyboard/mobile behavior, run lint/type checks, and apply approved styling.

**References:**

- [Ticket #14](https://github.com/GroAnita/Flavorcraft_labs/issues/14)
- Branch: `feat/search-filter-14`

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

**Date:** 2026-10-13

**Team Member:** Emilie Sofie Fosmo / `Emifos`

**Related Tasks / Files:**

- Ticket #30 - Registration
- Branch: `feat/register-30`
- `src/app/lib/auth.ts`
- `src/app/types/auth.ts`
- `src/app/components/features/RegisterForm.tsx`

**AI Tool / Model:** Claude Code (VS Code extension), Opus 5.5

**Purpose:** Implement a registration API function using the Noroff API and create a registration form following the existing login architecture and Ticket #30 acceptance criteria.

**Key Prompt(s):** _(Original prompts, translated from Norwegian)_

1. "I need to create a fetch for register in `src/app/lib/auth.ts`. As you can see I already have `loginUser`, but now I need to make `registerUser`. I'm using Noroff's API, do you need any more info?"
2. "Now I'm going to create a file `components/features/RegisterForm.tsx` that follows the same structure as `LoginForm.tsx`, but register should have: Full name, email, password, and confirm password fields. 'Sign up' button."

   The second prompt also included the ticket's acceptance criteria covering validation, field-level errors, loading/success/error states, repeated submission prevention, redirect behavior, navigation, and accessibility.

**Outcome and Decisions:**

- **Accepted:** Added `RegisterRequest` and `RegisterResponse` types in `types/auth.ts`, following the existing login types. The registration response does not contain an access token because Noroff's registration endpoint does not automatically log users in.
- **Accepted:** Added `registerUser` in `lib/auth.ts`, sending a POST request to `/auth/register` using the shared `BASE_URL`.
- **Accepted:** Unlike `loginUser`, the registration function passes through API error messages (e.g. "Profile already exists") to explain registration failures.
- **Accepted:** Created `RegisterForm.tsx` based on `LoginForm.tsx`, reusing the shared `FormField` component and the same form-state patterns: `FieldErrors`, `formError`, `isLoading`, and `noValidate`.
- **Accepted:** Kept the `onSubmit` callback with separate `(name, email, password)` arguments to separate form presentation from API requests.
- **Accepted:** Added validation for required fields, email format, a minimum password length of **8 characters**, and matching password confirmation, with field-level error messages.
- **Accepted:** Added a success message using `role="status"`, a "Signing up..." loading label, and disabled inputs and the submit button while a request is pending.
- **Accepted:** Added navigation to `/login` after successful registration because the API does not automatically authenticate users.
- **Accepted:** Added a "Log in" link to `/login` using `next/link`.
- **Modified:** Initially rejected Claude's proposed file edits because the purpose of the additional types was unclear. After Claude explained their benefits and offered an alternative without types, the developer chose the typed implementation for consistency, type checking, and autocomplete.
- **Open:** The team must decide whether to rename the "Full name" field to "Username" or add client-side validation because Noroff does not accept spaces in usernames.
- **Open:** The redirect behavior may need adjustment if the team changes its authentication flow.
- **Open:** Login and registration pages were kept outside this branch's scope and will be implemented separately.

**Verification / Status:**

- `npx tsc --noEmit` completed without errors.
- Changes were reviewed in the editor. Existing authentication functionality, including `loginUser`, was left unchanged.
- Browser and API testing are pending until the login and registration pages are implemented.
- **Known issue:** Noroff's API only accepts letters, numbers, and underscores in usernames. The current "Full name" label allows users to enter spaces, which the API rejects. The team must decide whether to change the label to "Username" or add client-side validation.
- The registration success message is only briefly visible before redirecting to `/login`.
- The redirect behavior may need adjustment if the team changes its authentication flow.

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

**Verification / Status:**

- Reviewed and manually tested the header at desktop and mobile widths.
- Tested keyboard navigation and accessibility behavior of the mobile menu.
- Logged-in state, the final results page route, and automated tests remain unfinished.

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
