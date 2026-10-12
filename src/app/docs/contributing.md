# Contributing Guidelines – FlavorCraft Labs (Team Alpha)

Shared rules for how we write, review and test code, so everyone works the same way.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, ESLint

---

## 1. Folder structure and naming

```
src/app/
  (pages)/                # Route group: organizes pages, does not appear in the URL
    login/
      page.tsx            # "/login"
    register/
      page.tsx            # "/register"
    recipes/
      [id]/               # Dynamic segment: [id] is the recipe's id
        page.tsx          # "/recipes/123" (single recipe)
  components/             # Reusable React components
    features/             # Larger components tied to the app, built from ui parts
    ui/                   # Small, generic building blocks
  hooks/                  # Custom React hooks
  lib/                    # API calls and helper functions
  types/                  # Shared TypeScript types
  favicon.ico             # Browser tab icon
  globals.css             # Global styles (Tailwind)
  layout.tsx              # Root layout wrapping every page
  page.tsx                # Home page ("/")
```

- New pages go in `(pages)/`, each in its own folder with a `page.tsx`.
- Small reusable pieces (Button, Badge, Spinner) go in `components/ui/`.
- Larger app-specific components (RecipeCard, SearchBar) go in `components/features/`.

| What        | Rule             | Example           |
| ----------- | ---------------- | ----------------- |
| Components  | PascalCase       | `RecipeCard.tsx`  |
| Hooks       | Start with `use` | `useFavorites.ts` |
| Other files | camelCase        | `api.ts`          |
| Folders     | lowercase        | `components/`     |

**Component rules**

- One component per file.
- Only add `"use client"` when the component needs interactivity (state, clicks, localStorage).
- Use the `@/` alias for imports: `@/components/RecipeCard`.
- Style with Tailwind classes.
- All images need `alt` text.

---

## 2. Design

The team's [Figma design](https://www.figma.com/design/oMdxPzpCg2wMrJvZqLbrUo/Agency-2?node-id=0-1&t=vy2V6XUbuabd5Sb6-1) is the source of truth for how the app should look.

- Follow Figma for colors, fonts, spacing, layouts and components.
- Don't add new colors or fonts that aren't in Figma.
- If something is missing or unclear in Figma, ask the Lead Designer.

---

## 3. Formatting and linting

- `npm run lint` and `npm run build` must pass before you open a PR.
- Remove `console.log` before opening a PR.

---

## 4. Branches and commits

**Branch names:** `group/short-description-ticket#`

| Group    | Use for          | Example                      |
| -------- | ---------------- | ---------------------------- |
| `feat/`  | New feature      | `feat/recipe-search-4`       |
| `fix/`   | Bug fix          | `fix/duplicate-favorites-7`  |
| `docs/`  | Documentation    | `docs/contributing-guide-10` |
| `style/` | Visual changes   | `style/card-spacing-3`       |
| `chore/` | Setup and config | `chore/eslint-setup-12`      |

**Commit messages:** `type: what the change does`

```
feat: add recipe search
fix: prevent duplicate favorites
docs: add contributing guidelines
```

---

## 5. Add AI documentation

- Record AI use in the shared log AI.md.
- AI-assisted output has been reviewed, with testing or verification recorded.
- Required prompts or transcripts are retained without secrets or personal information

## 6. Pull request process

1. Create a branch from `develop` and do your work there.
2. Open a PR into `develop` and fill in the PR checklist.
3. Move the card to **In Review/QA** on the project board.
4. **QA** approves the PR.
5. **QA** tests the change and approves it. **QA** signs off with label **QA approved**.
6. Merge with **Squash and merge**.
7. Before each Sprint Review, `develop` is merged into `main` (with **Create a merge commit**) after a final QA check.

Nobody pushes directly to `main` or `develop`.

---

## 7. PR checklist

Every PR uses the template in `.github/pull_request_template.md`. It covers:

- Acceptance criteria are met
- How to test the change
- Screenshots (for visual changes)
- Lint and build pass
- Link to entry in AI.md if AI was used, if not mark with **AI not used**

---

## 8. QA checks

QA checks these before approving a PR:

- **Responsive:** works on mobile, tablet and desktop, with no horizontal scrolling
- **Keyboard:** everything can be reached with Tab, and focus is visible
- **Loading state:** something shows while data is loading
- **Error state:** a friendly message shows if the API fails
- **Empty state:** a message shows when there are no results or no favorites

---

## 9. Definition of Done **(Discuss with team)**

A task is Done when:

- [ ] Acceptance criteria are met
- [ ] Code follows these guidelines
- [ ] Lint, build and relevant tests pass
- [ ] Screen sizes and accessibility are tested
- [ ] QA has approved and signed off and all feedback is fixed
- [ ] The change is merged and works on the deployed app
