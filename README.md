# Flavorcraft_labs

A recipe discovery web app built with Next.js and the Noroff API – Team Alpha's three-week agency project.

**Live site:** https://flavorcraftlabs.netlify.app/

## Features

- **Browse recipes** with filters (meal type, time, difficulty, main ingredient, cuisine, diet and allergies), search and sorting. Filters, search and sort are stored in the URL, so results can be shared and survive a refresh.
- **Recipe details** with servings scaling, checkable instruction steps, a keep-screen-on toggle, sharing, similar recipes and comments.
- **Accounts:** register and log in with a Noroff account. The session is stored in an httpOnly cookie.
- **Favorites:** save recipes from recipe cards and the detail page, and see them on `/favorites`.
- **Create and edit recipes** in a modal form with validation. Only the owner can edit a recipe.
- **Pantry:** add, edit and remove pantry items, and get recipe suggestions based on what you have.
- **Profile** with stats and personal preferences (saved in the browser).
- **SEO and analytics:** page metadata, Open Graph tags, recipe JSON-LD, and Microsoft Clarity analytics that only load after the user consents.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Server Components, Server Actions)
- React 19 and TypeScript
- Tailwind CSS v4
- [Noroff API v2](https://docs.noroff.dev/docs/v2) (Recipe Book and Auth)
- [Microsoft Clarity](https://clarity.microsoft.com/) for analytics
- Radix Dialog and Lucide / React Icons

## Getting Started

### Requirements

- Node.js 20.9 or later
- A Noroff account with a `@stud.noroff.no` email address (needed to register, log in and get an API key)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/GroAnita/Flavorcraft_labs.git
```

2. Navigate to the project directory:

```bash
cd Flavorcraft_labs
```

3. Install dependencies:

```bash
npm install
```

4. Set up environment variables (see [Environment variables](#environment-variables)).

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command         | What it does                  |
| --------------- | ----------------------------- |
| `npm run dev`   | Starts the development server |
| `npm run build` | Creates a production build    |
| `npm run start` | Runs the production build     |
| `npm run lint`  | Runs ESLint                   |

`npm run lint` and `npm run build` must pass before opening a pull request.

## Environment variables

| Variable                         | Required | Used for                                                                                          |
| -------------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `API_KEY`                        | Yes      | Noroff API key. Needed for logging in, favorites, comments, pantry and creating/editing recipes   |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | No       | Microsoft Clarity project ID. If it isn't set, analytics is turned off and the app works normally |

Reading recipes is public and works without an API key.

### Get an API key

1. Register at `POST https://v2.api.noroff.dev/auth/register` (use your `@stud.noroff.no` email).
2. Log in with `POST /auth/login` and copy the `accessToken`.
3. Call `POST /auth/create-api-key` with the header `Authorization: Bearer <accessToken>`.
4. Copy the `key` from the response.

See the [Noroff API key documentation](https://docs.noroff.dev/docs/v2/auth/api-key).

### Set up locally

1. Copy the example file:

```bash
cp .env.example .env.local
```

2. Paste your key into `API_KEY` in `.env.local`. Add `NEXT_PUBLIC_CLARITY_PROJECT_ID` if you want analytics locally.

3. Restart the dev server (`npm run dev`).`.env.local` is ignored by Git. Never commit API keys.

## Deployment

The site is deployed on [Netlify](https://flavorcraftlabs.netlify.app/). `API_KEY` and `NEXT_PUBLIC_CLARITY_PROJECT_ID` are set as environment variables in the Netlify site settings.

## Project structure

```
src/app/
   (pages)/          # Pages (the folder name doesn't appear in the URL)
    (profile)/      # /profile, /profile/recipes, /profile/settings and /favorites share one layout
    login/  register/  recipes/  recipes/[id]/  pantry/  meal-plan/
  actions/          # Server Actions (auth, recipes, favorites, comments, pantry)
  components/
   features/       # Larger app-specific components (RecipeCard, RecipeForm, ...)
   layout/         # Header, Footer, MobileMenu, AuthLayout
   ui/             # Small reusable building blocks (Badge, FormField, Toast, ...)
   analytics/      # Clarity, consent and privacy policy
  docs/             # Project documentation (see below)
  hooks/            # Custom React hooks
  lib/              # API calls, session handling and helper functions
  types/             # Shared TypeScript types
  globals.css       # Tailwind theme and design tokens
```

## Documentation

| Document
| Contents
|
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Contributing guidelines](src/app/docs/contributing.md)
| Folder structure, naming, branches, commits, PRs, QA
|
| [Styles](src/app/docs/styles.md)
| Colors, fonts and design tokens
|
| [Authentication](src/app/docs/auth.md)
| How authenticated API requests work
|
| [Recipe API](src/app/docs/recipe-api.md)
| How the app uses the Noroff Recipe Book API
|
| [Clarity integration](src/app/docs/clarity-integration.md)
| Analytics, consent and custom events |
| [Lighthouse audit](src/app/docs/seo/lighthouse-audit.md)
| Performance, accessibility, best practices and SEO results
|
| SEO & Analytics report: [Google Doc](https://docs.google.com/document/d/14sTyciMN9-ZhCHyCVE428vT8btmCQ8Swg0-1A741AAM/edit) · [PDF copy](src/app/docs/seo/seo-analytics-research-and-planning.pdf)
| Customer research, SEO and analytics plans, Clarity testing, usability testing results and the SEO & Analytics handover. The Google Doc is easiest to read (foldable sections in tabs). The PDF is a permanent copy
|
| [AI usage log, condensed](AI_LOG_SHORT.md)
| **Start here:** handover summary, architecture decisions, known pitfalls and open items
|
| [AI usage log, full](AI_LOG.md)
| Every AI log entry in full |

The [Figma design](https://www.figma.com/design/oMdxPzpCg2wMrJvZqLbrUo/Agency-2?node-id=0-1&t=vy2V6XUbuabd5Sb6-1) is the source of truth for how the app should look.
The [clickable Figma prototype](https://www.figma.com/proto/oMdxPzpCg2wMrJvZqLbrUo/Agency-2?node-id=224-15951&viewport=5502%2C-1170%2C0.18&t=ydLrnrO7q2vSZqy5-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=224%3A15951&page-id=0%3A1) shows the intended user flows.

## AI usage

The team used AI tools (Claude, Claude Code, Claude Design, ChatGPT and Microsoft Clarity's built-in AI) as assistants for research, planning, design, coding, reviewing and documentation. Team members reviewed, corrected and tested all AI output. The AI usage log records what AI was asked to do, which suggestions were accepted, changed or rejected, and how the results were verified:

- [Condensed AI log](AI_LOG_SHORT.md): a short handover version, grouped by feature area. Start here.
- [Full AI log](AI_LOG.md): every entry in full.

## Future features

- **Meal planner:** `/meal-plan` is a page shell, and the "Meal planner" action on recipes only opens that page.
- **Delete recipes** for owners (editing already works).
- **Profile sections:** "My recipes" and "Settings" are placeholders.
- **Social sign-in:** the Google and Facebook buttons exist but are disabled.
- **Redirect back after login,** so users return to the page they came from.
- **Recipe wheel ("Can't decide? Spin the wheel!"):** a wheel of fortune–style randomizer. Users pick criteria such as meal type or diet (for example dinner and vegan), spin the wheel, and get a random recipe that matches. It could reuse the existing filters in `lib/recipeFilters.ts`.
- **Dynamic filter counts** that update as other filters are selected
- **Password recovery,** if the API adds support for it.
- **Mobile performance:** the header reads the session cookie, which makes every page dynamic. The [Lighthouse audit](src/app/docs/seo/lighthouse-audit.md) also lists the hero images (both are preloaded), render-blocking Adobe Fonts and unoptimized external recipe images.
- **SEO:** `sitemap.xml`, `robots.txt` and canonical URLs (especially for filtered `/recipes` URLs).

Known issues and items waiting for designer confirmation are listed under [Open items in the condensed AI log](AI_LOG_SHORT.md#open-items-checked-against-the-code-on-2026-10-23).

## Lighthouse results

Final audit of the homepage on the deployed `develop` site (22–23 October 2026):
| Device | Performance | Accessibility | Best Practices | SEO |
| ------- | -------------------------: | ------------: | -------------: | --: |
| Desktop | 98 | 97 | 100 | 100 |
| Mobile | 86 (average of three runs) | 100 | 96 | 100 |

The client target of 90+ in Performance, Accessibility and SEO is met on desktop. Mobile Performance is below 90; the causes and the work still to do are described in the [Lighthouse audit](src/app/docs/seo/lighthouse-audit.md). Mobile Accessibility was re-measured at 100 on 23 October after the color contrast fix; desktop was not re-measured.

## Team

Team Alpha:

| Name | GitHub |
| ---- | ------ |

| Gro Anita | [@GroAnita](https://github.com/GroAnita) |
| Emilie Sofie Fosmo | [@Emifos](https://github.com/Emifos) |
| Emilie Holden | [@EmilieHolden](https://github.com/EmilieHolden) |
| Helene Syre | [@Helenesyre](https://github.com/Helenesyre) |
| Thea | [@Theanordhoy](https://github.com/Theanordhoy) |
| Alexander Lislelid | [@AlexanderLislelid](https://github.com/AlexanderLislelid) |
| Lise Ervik | [@Liz-nor](https://github.com/Liz-nor) |
| Tone Gjerde | [@Tunegj](https://github.com/Tunegj) |
