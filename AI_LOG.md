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

**Team Member:** Emilie Sofie Fosmo (GitHub username: Emifos)

**Related Tasks / Files:**

- Ticket #14 - Implement recipe search and category filtering
- Branch: `feat/search-filter-14`
- `components/features/CategoryFilter.tsx`
- `components/features/SearchInput.tsx`
- `hooks/useSetSearchParam.ts`

**AI Tool / Model:** Claude (claude.ai), Sonnet 5.5

**Purpose:** Improve an existing search component to meet the ticket requirements and build category filtering that works alongside search, before the framework and design were finalized.

**Key Prompt(s):** _(Summary provided by team member)_

Provided Claude with the ticket checklist and acceptance criteria, Noroff Recipe Book API documentation, a designer's wireframe, and an existing Next.js/TypeScript search component using `useSearchParams`.

Requested an improved implementation, followed by restructuring into two components and a shared hook, and assistance resolving an ESLint error.

**Outcome and Decisions:**

- Used Claude's output as the basis for three files:
  - `useSetSearchParam.ts`: Updates the URL query parameters and resets pagination when filters change.
  - `SearchInput.tsx`: Debounced search input with whitespace trimming, clearing, and URL synchronization.
  - `CategoryFilter.tsx`: Category buttons, including "All categories", using `aria-pressed`.
- Search and category filters use URL parameters (`search` and `category`) matching the API, allowing combined server-side filtering.
- Changed URL/input synchronization from a `useEffect` to a render-phase previous-value check after ESLint flagged `react-hooks/set-state-in-effect`.
- Rejected a separate `SearchFilter` wrapper component in favor of two components and one hook, with Suspense handled by the consuming page.
- Did not implement ingredient chips or dietary filters shown in the wireframe because they were outside the ticket scope and unsupported by the API query parameters.
- Removed AI-suggested Tailwind styling pending approved designs.

**Verification / Status:**

- Reviewed the code in the editor using ESLint and addressed the reported hook-related issue.
- Components had not yet been tested because the framework and API setup were not ready.
- Remaining work: Confirm API category/search behavior, integrate components into a recipe-fetching page, add an empty state, test acceptance criteria with real data, verify keyboard/mobile behavior, run lint/type checks, and apply approved styling.

**References:**

- Ticket #14
- Branch: `feat/search-filter-14`

---

### AI-002 - Reusable Authentication Layout

**Date:** 2026-10-09

**Team Member:** Emilie Sofie Fosmo (GitHub username: Emifos)

**Related Tasks / Files:**

- Ticket #31 - Build reusable authentication layout
- Branch: `feat/auth-layout-component-31`
- `components/layout/AuthLayout.tsx`

**AI Tool / Model:** Claude (claude.ai), Sonnet 5.5

**Purpose:** Build a shared authentication layout with an image panel and content panel for the login and registration pages.

**Key Prompt(s):** _(Summary provided by team member)_

Provided Claude with the task card and login/register designs. Requested a reusable layout component accepting a heading, description, form content, and a page-specific image.

**Outcome and Decisions:**

- Used Claude's `AuthLayout.tsx` as the basis for the implementation.
- The component accepts `heading`, `description`, `imageSrc`, and `children`.
- Uses a two-column desktop layout and single-column mobile layout, with empty alt text for the decorative image.
- Implemented as a server component.
- Changed the mobile layout to display the image above the content rather than hiding it.
- Made `imageSrc` required because the pages use different images.
- Removed `main` and `min-h-screen` because the header and footer are outside the component.
- Rejected a route-group `layout.tsx` because it could not receive the required page-specific props.

**Verification / Status:**

- Testing had not yet been completed.
- Remaining work: Export images from Figma, finalize styling, test with a temporary page, run lint/type checks, and connect the layout to the login and registration pages when their forms are ready.

**References:**

- Ticket #31
- Branch: `feat/auth-layout-component-31`

---

### AI-003 - Reusable FormField Component

**Date:** 2026-10-09

**Team Member:** Thea (GitHub username: Theanordhoy)

**Related Tasks / Files:**

- Create shared FormField component for authentication forms
- `FormField.tsx`
- Pull Request #38

**AI Tool / Model:** Claude (Anthropic), Sonnet 5.5

**Purpose:** Evaluate whether login and registration forms should share components and obtain a draft of a reusable FormField component using React, Next.js, and TypeScript.

**Key Prompt(s):** _(Summary provided by team member)_

Described the ticket and asked whether login and registration should use one shared form component or separate components, given their different designs.

Provided the FormField acceptance criteria and requested a component meeting those requirements, along with a simple explanation of the code.

Follow-up questions covered integration with LoginForm, the repeat-password field in registration, and when helper text should appear.

**Outcome and Decisions:**

- Accepted the recommendation to use a shared `FormField` component for labels, inputs, helper text, and error messages, while keeping `LoginForm` and `RegisterForm` separate.
- Used the AI-generated component draft as the starting point for `FormField.tsx`.
- Kept form-specific validation, including password matching, in the individual forms rather than in `FormField`.
- Removed all AI-generated Tailwind classes.

**Verification / Status:**

- Code submitted for review against the ticket's acceptance criteria, including input types, labels, placeholders, required fields, autocomplete, helper text, validation errors, accessibility, focus states, disabled states, and password masking.
- Manual browser testing had not been completed because the relevant pages were not yet available.
- Review outcome was not confirmed in the submitted log.

**References:**

- [Pull Request #38 - Reusable FormField component](https://github.com/GroAnita/Flavorcraft_labs/pull/38)

---

### AI-004 - Login Form Component

**Date:** 2026-10-09

**Team Member:** Thea (GitHub username: Theanordhoy)

**Related Tasks / Files:**

- Login form component using the shared FormField
- `LoginForm.tsx`
- Pull Request #40

**AI Tool / Model:** Claude (Anthropic), Sonnet 5.5

**Purpose:** Adapt an existing LoginForm to use the shared FormField component and add validation, loading state, error handling, and redirect behavior.

**Key Prompt(s):** _(Summary provided by team member)_

Shared the ticket and existing LoginForm implementation, which used separate labels and inputs with one shared error message.

Asked how to integrate the shared FormField component and requested explanations of the code.

Follow-up requests covered loading state, failed-login error messages, and redirecting after successful login.

**Outcome and Decisions:**

- Replaced individual label/input blocks with the shared `FormField` component.
- Introduced per-field validation errors (`FieldErrors`) instead of one shared error message.
- Added `noValidate` to use custom validation messages instead of browser-native validation popups.
- Added an `isLoading` state to disable inputs and the submit button and prevent repeated submissions.
- Added a separate `formError` displayed with `role="alert"` for failed login attempts.
- Added navigation using `router.push` after successful login.
- Kept the API integration separate by passing an `onSubmit` callback into LoginForm.
- Postponed AuthContext, UserStatus, logout, session storage, and the API call until the authentication approach and API integration are ready.
- Changed the redirect path to a temporary placeholder, adjusted error-message wording, and used `React.SubmitEvent` instead of `React.FormEvent`.

**Verification / Status:**

- Reviewed the implementation against the ticket requirements for labeled fields, required-field validation, loading state, repeated-submission prevention, and clear error messages.
- Browser testing had not been completed because the component did not yet have a page for integration.
- API integration, session handling, and logout remained outside the scope of this entry.

**References:**

- [Pull Request #40 - Login form](https://github.com/GroAnita/Flavorcraft_labs/pull/40)

---

### AI-005 - Global Styles and Design Tokens

**Date:** 2026-10-12

**Team Member:** Alexander Lislelid (AlexanderLislelid)

**Related Tasks / Files:**

- Ticket #48 - Set up shared colors and styles
- Branch: `chore/figma-colors-48`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `docs/styles.md`

**AI Tool / Model:** Claude (Claude Code desktop app), Opus 5.5

**Purpose:** Implement the agreed Figma design values, including colors, fonts, and base styles, to establish consistent styling across the application and document their usage.

**Key Prompt(s):** _(Summary provided by team member)_

Asked Claude for a recap of custom colors in Tailwind CSS v4 and provided the ticket requirements, contributing guidelines, and screenshots of the Figma color palette (Neutrals, Yellows, Greens, and Feedback colors).

Requested help converting the palette into CSS variables, integrating Adobe Fonts and Inter in Next.js, defining a semantic border color, and documenting the styling system in `docs/styles.md`.

Also requested assistance preparing the pull request description and reviewing which ticket requirements had been completed.

**Outcome and Decisions:**

- Used Claude's `@theme` block as the basis for the color palette, including 12 colors with a 50–900 scale (Figma base color = 500) and feedback colors for error, warning, success, and information states.
- Made the colors available through Tailwind utilities such as `bg-basil-500` and `text-error-text`.
- Configured Inter using `next/font` and Aptly using Adobe Fonts in `layout.tsx`, exposing them through `font-inter` and `font-aptly`.
- Added base styles for page background, text color, and fonts, with semantic color utilities such as `bg-background`, `text-foreground`, and `border-border`.
- Used Claude's draft of `docs/styles.md` as a starting point and adapted it to match the actual project setup.
- Spot-checked hex values extracted by Claude from screenshots against Figma.
- Changed the page background from the suggested `cream-500` to `salt-500`.
- Selected `nori-500` for the border color after checking the tag stroke in Figma.
- Renamed the `next/font` variable to `--font-inter-next` to avoid a conflict with the Tailwind theme variable.
- Corrected the AI-generated PR description, moving focus styles from completed work to TODO because they had not been implemented.
- Rejected removing Tailwind's default colors using `--color-*: initial`, preserving utilities such as white and black.

**Verification / Status:**

- Hex values extracted from Figma screenshots were spot-checked against the original designs.
- Reviewed the PR description against the implemented code and corrected an inaccurate completion claim.
- Remaining work: Define heading sizes and weights, implement visible keyboard focus styles (`:focus-visible`), confirm the primary color, and add spacing, border-radius, and shadow tokens if specified in Figma.
- No additional testing or validation results were reported.

**References:**

- Ticket #48
- Branch: `chore/figma-colors-48`
- `docs/styles.md`

---

### AI-006 - SEO & Analytics Research and Planning

**Date:** 2026-10-06 to 2026-10-12

**Team Member:** Tone Gjerde (GitHub username: Tunegj)

**Related Tasks / Files:**

- Sprint 1 SEO & Analytics research and planning
- Sprint 2 SEO & Analytics ticket proposals
- `Sprint 2 - SEO & Analytics Dependencies & Handoff` (shared Google Doc)

**AI Tool / Model:** ChatGPT (OpenAI), GPT-6

**Purpose:** Research suitable SEO and analytics approaches for FlavorCraft Labs, identify implementation priorities, and plan tasks and dependencies for the development team.

**Key Prompt(s):** _(Summary of conversations; not exact original prompts)_

Asked ChatGPT to explain the responsibilities of an SEO & Analytics Lead and help identify appropriate tasks for the recipe application.

Discussed SEO metadata, OpenGraph tags, Recipe JSON-LD structured data, Lighthouse audits, and analytics tools including Microsoft Clarity, Google Analytics 4, Plausible, PostHog, and Hotjar.

Requested guidance on analytics event tracking, privacy consent requirements, testing dependencies, and how to organize and communicate Sprint 2 tasks.

**Outcome and Decisions:**

- Identified dynamic page metadata, OpenGraph tags, and Recipe JSON-LD as SEO implementation priorities.
- Selected Microsoft Clarity as the planned analytics tool for heatmaps and session recordings.
- Identified the need for appropriate user consent before loading analytics.
- Planned four custom analytics events: `recipe_searched`, `recipe_opened_from_search`, `recipe_favorited`, and `recipe_unfavorited`.
- Identified Lighthouse auditing as a necessary SEO and performance validation activity.
- Created five Sprint 2 SEO & Analytics tickets covering dynamic metadata and OpenGraph tags, Recipe JSON-LD, Microsoft Clarity, custom analytics events, and Lighthouse auditing. All five tickets were added to the project board and approved by the Scrum Master.
- Created a dependency and handoff document identifying required pages, functionality, deployment access, and consent implementation.
- Shared the handoff information with the team to coordinate upcoming work.

**Verification / Status:**

- Research and planning were reviewed against the project's requirements and implementation dependencies.
- The Sprint 2 handoff document was completed and shared with the team.
- SEO and analytics implementation, live event verification, and Lighthouse testing remained future tasks at the time of planning.
- No completed SEO implementation or analytics test results are claimed in this entry.

**References:**

- Sprint 2 SEO & Analytics tickets
- `Sprint 2 - SEO & Analytics Dependencies & Handoff`
