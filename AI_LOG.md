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

### AI-013 - RecipeImage Component

**Date:** 2026-10-14

**Team Member:** Alexander Lislelid (AlexanderLislelid)

**Related Tasks / Files:**

- Ticket #45 - Create RecipeImage component (parent: Build recipe card)
- Branch: `feat/recipe-image-45`
- `src/app/components/ui/RecipeImage.tsx`
- Depends on `src/app/components/ui/Badge.tsx` (Ticket #44, branch `feat/badge-component-44`)

**AI Tool / Model:** Claude (Claude Code VS Code extension), Opus 5.5

**Purpose:** Build the recipe card image with a category badge over it, a consistent shape and crop, and a fallback for missing or broken images.

**Key Prompt(s):**

Provided the ticket text for #45 and asked Claude to implement it. Claude read the existing codebase, contributing guidelines, styles documentation and the Next.js 16 `Image` docs, and found the Badge component on the unmerged `feat/badge-component-44` branch.

Follow-ups: shared a screenshot of the recipe card design and asked for the image to match it, then asked whether the error-handling state was more complex than needed.

**Outcome and Decisions:**

- Used Claude's component as the basis for `RecipeImage.tsx`. It takes `src` (nullable, since `recipe.image` can be `null`), `alt` and an optional `category`.
- The image uses `next/image` with `fill` and `object-cover` inside a fixed aspect-ratio container, so every card has the same shape and crop.
- The category is shown with the shared `Badge` component (`variant="category"`), positioned top left.
- Missing or broken images show a neutral placeholder with a lucide `ImageOff` icon, keeping the card's size.
- The component contains no link or interactive elements, so the parent card can wrap it in a `Link`.
- Used `unoptimized` on `next/image`, because recipe images can come from any host and unlisted hosts would otherwise throw an error and break the card. Trade-off: Next.js does not resize or compress these images.
- Changed the aspect ratio from Claude's initial guess of 4:3 to 2:1 after comparing with the design screenshot.
- Simplified the error handling: replaced Claude's "remember which URL failed" state with a single `hasError` boolean, since cards are keyed by recipe ID and the extra handling was not needed.
- Left corner rounding to the parent card (`overflow-hidden` on the card) instead of the image component.

**Verification / Status:**

- `tsc --noEmit` and ESLint pass with the Badge component from #44 temporarily added.
- The build fails on this branch until #44 (Badge) is merged into `develop`.
- Not yet tested in the browser. Remaining work: check the image, badge position and fallback visually against Figma, test with a broken image URL, and confirm the 2:1 ratio and the placeholder color (`bg-oat-300`) with the designer.

**References:**

- Ticket #45
- Ticket #44 (Badge component)
- Branch: `feat/recipe-image-45`

### AI-014 - TagList Accessibility Fixes from QA

**Date:** 2026-10-15

**Team Member:** Thea (Theanordhoy)

**Related Tasks / Files:**

- Ticket #93 — TagList accessibility fixes
- Branch: `fix/tag-list-93`
- `src/app/components/features/TagList.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5

**Purpose:** Assist with implementing two accessibility fixes requested by QA for the TagList component.

**Key Prompt(s):**

- Shared two QA comments requesting `role="list"` on the `<ul>` element and a `title` attribute to display the full text of truncated tags on hover.
- Asked how to implement the requested changes.
- Asked for assistance when VoiceOver was not working as expected.

**Outcome and Decisions:**

- Both accessibility improvements originated from QA, not AI. AI provided implementation guidance.
- Added `role="list"` to the `<ul>` element to preserve list semantics in Safari/VoiceOver when list styling is removed.
- Added `title={tag}` to each `<li>` element rather than modifying the shared Badge component.
- Created a temporary page for manual testing, which was removed before committing.

**Verification / Status:**

- Confirmed that `role="list"` appears in the accessibility tree.
- Verified with VoiceOver in Safari that tags are announced as a list.
- Checked the layout using a temporary test page, which was subsequently removed.
- `npm run lint` passed with 0 errors and 1 pre-existing, unrelated warning in `layout.tsx`.
- `npm run build` passed.
- Awaiting QA re-verification.

**References:**

- Ticket #93
- [Original TagList PR #82](https://github.com/GroAnita/Flavorcraft_labs/pull/82)
- [Accessibility fixes PR #95](https://github.com/GroAnita/Flavorcraft_labs/pull/95)

### AI-015 - Cookie-Based Authentication

**Date:** 2026-10-15

**Team Member:** Thea (Theanordhoy)

**Related Tasks / Files:**

- Ticket #103 — Cookie-based authentication
- Branch: `feat/cookie-based-authentication-103`
- `src/app/lib/session.ts`
- `src/app/actions/auth.ts`
- `src/app/components/features/LoginForm.tsx`
- `src/app/components/features/LogoutButton.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5. A colleague also provided a code suggestion; its AI origin has not been confirmed.

**Purpose:** Understand how to store an access token in an HttpOnly cookie, review a colleague's code suggestion against the ticket requirements, and implement the necessary changes to session helpers, Server Actions, login, and logout functionality.

**Key Prompt(s):**

- Shared the ticket and a colleague's code suggestion, asking which parts were relevant and what needed to change.
- Asked which lines to remove from `LoginForm`, including `useRouter`, `router.push`, and the `loginUser` import.
- Asked how to handle the cookie-reading functionality described in the suggestion.
- Asked how to implement the logout button.

**Outcome and Decisions:**

- Accepted the session helpers, login and logout Server Actions, and `LoginForm` changes from the suggestion.
- Configured the authentication cookie with `httpOnly`, `sameSite: "lax"`, `path: "/"`, a seven-day lifetime, and `secure` enabled in production.
- Placed `redirect()` outside the `try/catch` block and returned login errors instead of throwing them, allowing the form to display the error message.
- Implemented `LogoutButton` as a server component containing a form that calls the `logout` Server Action, intended to display only for authenticated users.
- Decided to read `isLoggedIn` once on the server and pass it down as a prop rather than accessing the cookie separately in each component. Integration with `RecipeCard` and the like button remains pending.
- Rejected adding `server-only` because it would introduce a new dependency requiring team agreement.
- Excluded the temporary `LogoutButton` used for testing in `page.tsx`, along with unrelated formatting changes introduced by VS Code.

**Verification / Status:**

- Verified in DevTools that login sets the `accessToken` cookie with `HttpOnly`, `SameSite: Lax`, and path `/`.
- Tested cookie persistence after refresh, access through `document.cookie`, logout, and incorrect-password handling.
- `npm run build` passed.
- `npm run lint` reported no errors in the changed files. One existing error in `CategoryNavigation.tsx` and one warning in `layout.tsx` originated from `develop`.
- Remaining work includes connecting `isLoggedIn` to `RecipeCard` and the like button, and placing the logout button in the header.

**References:**

- Ticket #103
- Next.js authentication guide: `node_modules/next/dist/docs/01-app/02-guides/authentication.md`
- [Cookie-based authentication PR #105](https://github.com/GroAnita/Flavorcraft_labs/pull/105)

### AI-016 - FavoriteButton Component

**Date:** 2026-10-15

**Team Member:** Thea (Theanordhoy)

**Related Tasks / Files:**

- Ticket #98 — FavoriteButton component
- Branch: `feat/like-button-component-98`
- `src/app/components/ui/FavoriteButton.tsx`

**AI Tool / Model:** Claude (Anthropic), Claude Sonnet 5.5

**Purpose:** Assist with creating a reusable heart button for recipe cards, matching the Figma design, and understanding how to test its functionality and accessibility.

**Key Prompt(s):**

- Asked whether the heart button should be a separate component or part of the image component, providing the ticket requirements, including visibility only for authenticated users.
- Shared Figma measurements for the button size, border radius, background, icon size, and positioning, along with the designer's instructions for the filled heart.
- Requested the final implementation and corrected the stroke color after checking Figma.

**Outcome and Decisions:**

- Created a separate, reusable component accepting `isLiked` and `onToggle` props, without managing its own state.
- Followed AI guidance to position the button alongside the image link rather than inside it, avoiding invalid nested interactive elements.
- Added `preventDefault()` and `stopPropagation()` to prevent button clicks from triggering recipe navigation.
- Used an accessible `<button>` with a consistent `aria-label` and `aria-pressed` to communicate its toggle state.
- Added an `isLoggedIn` prop, defaulting to `false`, so the button renders nothing for unauthenticated users. This keeps the component independent of the session implementation.
- Used `fill-current` for the selected heart icon, matching the designer's requirement that its fill and stroke use the same color.
- Replaced AI's initial styling estimates with the actual Figma specifications: `size-8`, `rounded-xl`, `bg-oat-500`, `text-truffle-500`, a 16px icon, and 12px positioning from the corner.
- Corrected the AI's initial stroke color suggestion from `foreground` to `truffle-500` after reviewing Figma.

**Verification / Status:**

- Verified in DevTools that the button has `aria-label` and `aria-pressed`, and that the decorative icon is hidden from assistive technology.
- Tested the toggle interaction, prevention of link navigation, keyboard interaction, and visibility when logged out.
- Compared the component's appearance with Figma.
- `npm run build` passed.
- `npm run lint` reported no errors in the changed file. One existing error in `CategoryNavigation.tsx` and one warning in `layout.tsx` originated from `develop`.
- Remaining work includes integrating the button into `RecipeCard`, connecting `isLoggedIn` to the authentication session, and implementing the functionality for saving and removing likes.

**References:**

- Ticket #98
- Figma recipe card design
- Lucide `heart` icon
- [Cookie-based authentication PR #105](https://github.com/GroAnita/Flavorcraft_labs/pull/105)
- [FavoriteButton PR #106](https://github.com/GroAnita/Flavorcraft_labs/pull/106

### AI-017 - Recipe Detail Page Mockup

**Date:** 2026-10-13

**Team Member:** Helene Syre (helenesyre)

**Related Tasks / Files:**

- Recipe detail page: `/recipe-book/recipes/<id>`
- Specific ticket and files: Not specified

**AI Tool / Model:** Claude (Cowork), Opus 5.5

**Purpose:** Quickly visualize how data from the single-recipe API response could be presented on the recipe detail page before designing it in Figma.

**Key Prompt(s):**

- Asked Claude to create a mockup for `/recipe-book/recipes/<id>`, providing a sample JSON response for "Classic Margherita Pizza".
- The response included the recipe title, description, preparation and cooking times, servings, difficulty, category, ingredients, instructions, tags, image, owner, comments, favorite count, and timestamps.
- Provided findings from user interviews and personas to inform the design.

**Outcome and Decisions:**

- Claude generated an interactive design canvas with two artboards: mobile (390px) and desktop (fluid layout, maximum width 1200px).
- Displayed total preparation and cooking time as a combined time badge (35 minutes).
- Presented preparation time, cooking time, difficulty, and category as quick-fact tiles.
- Displayed `_count.favorites` as "Saved by 3 cooks".
- Presented recipe tags and category as links to similar recipes.
- Included an empty comment state with a comment input field.
- Incorporated features informed by user interviews:
  - An interactive servings stepper that adjusts ingredient quantities.
  - Ingredient checkboxes for tracking progress while cooking.
  - Large, numbered cooking instructions.
  - A "Start cooking mode" button intended to keep the screen active, based on Henrik's feedback.
- The generated mockup was used as a reference for the Figma design, not as a final design.

**Verification / Status:**

- The mockup has not yet been reviewed in detail.
- It requires comparison against the Figma designs, brand guide, and actual API response before further use.
- Remaining work:
  - Replace placeholder images with real images.
  - Test the layout with long recipe titles and recipes containing many ingredients or instructions.
  - Decide whether cooking mode and the servings stepper are within project scope.
  - Design the saved state (filled heart) and a populated comments list.

**References:**

- Noroff Recipe API
- User interview findings and personas

### AI-018 - Register Page (#30)

**Date:** 2026-10-15

**Team Member:** Emilie Sofie Fosmo (Emifos)

**Related Tasks / Files:**

- Ticket #30 — Register page
- Ticket #31 — Auth layout
- Ticket #32 — Form field
- Branch: `feat/register-page-30`
- `src/app/(pages)/register/page.tsx`
- `src/app/components/features/RegisterForm.tsx`
- `src/app/components/layout/AuthLayout.tsx`
- `src/app/components/ui/FormField.tsx`

**AI Tool / Model:** Claude Code (Claude Opus 5.5) in VS Code

**Purpose:** Build the register page from the Figma design, starting with mobile and adapting the layout for desktop, while reusing the shared authentication layout and form field components.

**Key Prompt(s):**

- Requested a register page using `AuthLayout` and `RegisterForm`, styled according to Figma with a mobile-first approach.
- Provided Figma Dev Mode specifications for dimensions, colors, spacing, and typography, first for mobile and then desktop.
- Requested validation error messages matching the design, using an icon and red text displayed only when validation fails.
- Requested email validation restricting registration to `@stud.noroff.no` addresses.

**Outcome and Decisions:**

- Created the register page, placing the "Already have an account? Login here!" link below the form to allow future integration of social sign-in (#33).
- Updated `RegisterForm` to call `registerUser` directly rather than accepting an `onSubmit` callback, because a Server Component page cannot pass an ordinary function to a Client Component.
- Added validation for `@stud.noroff.no` email addresses.
- Styled `AuthLayout`, `FormField`, the button, and navigation link using Tailwind CSS and Figma specifications, with `md:` breakpoints for desktop.
- Used the `CircleAlert` icon and `text-error-text` for validation errors.
- Removed helper text beneath form fields to match the design, displaying requirements through validation errors instead.
- Rejected AI-generated changes to `layout.tsx` and `globals.css` because they were outside the ticket's scope.
- Followed `styles.md` by avoiding arbitrary Tailwind font sizes. Used 30px on mobile and 36px on desktop instead of the Figma values of 32px and 40px.
- Preserved existing validation error messages rather than replacing them with Figma text. The message "Email is already in use" depends on the API response.

**Verification / Status:**

- `tsc --noEmit` and ESLint passed.
- Visually compared the page with Figma using `npm run dev`.
- Remaining work:
  - Add the missing register image (`public/images/register.jpg`).
  - Integrate social sign-in (#33).
  - Add Aptly Medium (500) to the Adobe Fonts kit. Until then, the heading renders at weight 400.
  - Resolve potential merge conflicts involving `AuthLayout` and `FormField`, which are also modified on the login branch.

**References:**

- Figma register design
- `src/app/docs/styles.md`
- Register page PR: Link not provided

### AI-019 - Login Page (#71)

**Date:** 2026-10-15

**Team Member:** Emilie Sofie Fosmo (Emifos)

**Related Tasks / Files:**

- Ticket #71 — Login page
- Branch: `feat/login-page-71`
- `src/app/(pages)/login/page.tsx`
- `src/app/components/features/LoginForm.tsx`

**AI Tool / Model:** Claude Code (Claude Opus 5.5) in VS Code

**Purpose:** Build the login page according to the Figma design using the shared `AuthLayout` and `FormField` components.

**Key Prompt(s):**

- Requested a login page using `AuthLayout` and `LoginForm`, following the mobile-first Figma design.
- Specified that social sign-in would be implemented later as a separate component.

**Outcome and Decisions:**

- Created the login page with a heading, description, form, and "Register here!" link to `/register`.
- Included a placeholder for future social sign-in functionality (#33).
- Updated `LoginForm` to call `loginUser` directly rather than accepting an `onSubmit` callback, because a Server Component page cannot pass an ordinary function to a Client Component.
- Added email format validation.
- Disabled the submit button while a login request is pending.
- Displayed the generic error message "Invalid email or password" after unsuccessful login attempts, without revealing whether an account exists.
- Styled the submit button and error message container.
- Kept `AuthLayout` and `FormField` styling changes on the register branch to reduce merge conflicts.
- Rejected an AI-generated modification to the root `layout.tsx` because it was outside the ticket's scope.
- Did not add "Forgot password?" functionality because the API does not support it.

**Verification / Status:**

- `tsc --noEmit` and ESLint passed.
- Remaining work:
  - Implement session handling after login (TODO in `LoginForm`).
  - Add the missing login image (`public/images/login.jpg`).
  - Integrate social sign-in (#33).
  - Incorporate shared `AuthLayout` and `FormField` styling once the register PR is merged into `develop`.

**References:**

- Figma login design
- `src/app/docs/auth.md`
- Login page PR: Link not provided

### AI-020 - AlternativeAuth Integration and Styling (#111)

**Date:** 2026-10-16

**Team Member:** Emilie Sofie Fosmo (Emifos)

**Related Tasks / Files:**

- Ticket #111 — Connect and style AlternativeAuth on login and register pages
- Ticket #33 — AlternativeAuth component
- Branch: `fix/alternative-auth-login-register-111`
- `src/app/components/ui/AlternativeAuth.tsx`
- `src/app/(pages)/login/page.tsx`
- `src/app/(pages)/register/page.tsx`

**AI Tool / Model:** Claude Code (Claude Opus 5.5) in VS Code

**Purpose:** Integrate the existing AlternativeAuth component into the login and register pages and style it according to the mobile and desktop Figma designs.

**Key Prompt(s):**

- Requested integration of `AlternativeAuth.tsx` into the login and register pages, following the Figma designs.
- Provided Figma Dev Mode specifications step by step, starting with mobile and then desktop.
- Specified that the social sign-in buttons should retain their intended colors while remaining non-interactive.

**Outcome and Decisions:**

- Added `<AlternativeAuth mode="login" />` and `<AlternativeAuth mode="register" />` to their respective pages.
- Removed duplicate login and registration links from the pages because AlternativeAuth already provides them.
- Removed `disabled:opacity-50` and `disabled:grayscale` to prevent disabled social sign-in buttons from appearing grey.
- Kept the buttons disabled because authentication providers are not connected. Screen readers continue to announce that the options are not available yet.
- Applied Figma styling:
  - "Or" text and navigation link: 14px on mobile and 16px on desktop.
  - Buttons: full available width using `flex-1`, 12px border radius, 12px/9px padding, `bg-salt-300`, and 28px icons.
  - Spacing around the component: 24px on mobile and 48px on desktop.
- Replaced arbitrary Tailwind values (`h-[52px]`, `w-[186px]`, `max-w-[388px]`) and non-design colors (`stone-100`, `green-700`) with standard Tailwind utilities and project design tokens.
- Removed the custom focus ring to use the shared focus styling from `globals.css`.
- Updated the link text from "Log in here!" to "Login here!" to match Figma.

**Verification / Status:**

- `tsc --noEmit` and ESLint passed.
- Remaining work:
  - Replace the plain green Google icon with a custom SVG to match the gradient in the Figma design.

**References:**

- Ticket #111
- Ticket #33
- Figma login and register designs
- `src/app/docs/styles.md`
- PR link: Not provided

### AI-021 - Homepage Font Weight and Size Adjustments (#119)

**Date:** 2026-10-16

**Team Member:** Emilie Sofie Fosmo (Emifos)

**Related Tasks / Files:**

- Ticket #119 — Homepage font weight and size adjustments
- Branch: `fix/font-weight-119`
- `src/app/components/HeroSection.tsx`
- `src/app/components/FeaturedRecipe.tsx`
- `src/app/components/features/CategoryNavigation.tsx`
- `src/app/components/features/RecipeSection.tsx`
- `src/app/components/ui/CategoryItem.tsx`

**AI Tool / Model:** Claude Code (Claude Opus 5.5) in VS Code

**Purpose:** Adjust font weights and sizes on the homepage to match the mobile and desktop Figma designs.

**Key Prompt(s):**

- Compared rendered typography with Figma using WhatFont.
- Provided Claude with a list of required font sizes and weights for individual elements, first for desktop and then for mobile.

**Outcome and Decisions:**

- Changed headings from `font-bold` to `font-medium` (500), including:
  - "What's on your plate today?"
  - "What everyone's cooking today"
  - Featured recipe title
  - Recipe section headings
  - Category names such as Breakfast and Lunch
- Applied typography sizes based on Figma:
  - Hero label: 12px mobile / 14px desktop.
  - Hero heading: 40px mobile / 48px desktop.
  - Hero description: 18px mobile / 20px desktop.
  - Section headings: 32px.
  - "See all" links: 16px.
- Used `text-[2rem]` and `text-[2.5rem]` to match the required 32px and 40px sizes. This was a deliberate exception to the project's `styles.md` guidelines.
- Identified that Aptly Medium (500) was missing from the Adobe Fonts kit (`xnz3twu`), causing `font-medium` to render at weight 400.
- The team added Aptly Medium to the Adobe Fonts kit, resolving the font weight issue without additional code changes.

**Verification / Status:**

- `tsc --noEmit` passed.
- ESLint passed.
- The desktop font size for "Let's make something delicious" was not specified, so it remains at 14px.

**References:**

- Ticket #119
- Figma homepage design
- Adobe Fonts kit `xnz3twu`
- PR link: Not provided
