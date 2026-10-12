# Styles

All global styles live in `src/app/globals.css` (Tailwind CSS v4, configured with `@theme`).

## Fonts

| Token        | Use                           |
| ------------ | ----------------------------- |
| `font-inter` | Body text (default)           |
| `font-aptly` | Headings (`h1`–`h6`) and tags |

Headings get `font-aptly` automatically from `globals.css`. Tags don't, so add `font-aptly` to them yourself.

## Colors

### Semantic colors (use these first)

Use the semantic names in components so the theme can change in one place.

| Utility suffix     | Maps to     | Use                       |
| ------------------ | ----------- | ------------------------- |
| `background`       | `salt-500`  | Page background           |
| `surface`          | `salt-50`   | Cards, inputs, panels     |
| `foreground`       | `nori-500`  | Default text              |
| `muted-foreground` | `nori-300`  | Secondary text            |
| `primary`          | `basil-500` | Primary buttons and links |
| `border`           | `nori-500`  | Borders                   |

`body` already uses `bg-background text-foreground`, so text gets `foreground` by default.
Only add a text color when you need something other than `foreground`.

Example: `bg-surface border border-border`

### Status colors

Pairs of background + text: `error`, `warning`, `success`, `info`, `note`.
Example: `bg-error-bg text-error-text`.

### Palette

The full Figma palette is available as `{name}-{50…900}`:
salt, cream, oat, thyme, butter, saffron, olive, truffle, mint, sprout, basil, nori.
Only reach for these when no semantic color fits.

## Focus styles

Every focusable element gets a visible outline on keyboard focus via `:focus-visible`
(2px `foreground` color, 2px offset). Don't remove it with `outline-none` unless you replace it
with an equally visible focus style.

## Spacing, radius and shadows

Not yet defined from Figma — Tailwind defaults are used for now.
