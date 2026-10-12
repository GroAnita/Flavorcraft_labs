# Styles

All global styles live in `src/app/globals.css` (Tailwind CSS v4, configured with `@theme`).

## Fonts

| Token        | Use                  |
| ------------ | -------------------- |
| `font-inter` | Body text (default)  |
| `font-aptly` | Headings (`h1`–`h6`) |

## Colors

### Semantic colors (use these first)

Use the semantic names in components so the theme can change in one place.

| Utility suffix  | Maps to       | Use                               |
| --------------- | ------------- | --------------------------------- |
| `background`    | `salt-500`    | Page background                   |
| `surface`       | `salt-50`     | Cards, inputs, panels             |
| `foreground`    | `nori-500`    | Default text                      |
| `muted`         | TODO          | Secondary text, hints             |
| `primary`       | TODO          | Primary buttons and links         |
| `primary-hover` | TODO          | Hover state for primary           |
| `on-primary`    | TODO          | Text on top of `primary`          |
| `accent`        | TODO          | Highlights, badges (not for text) |
| `border`        | TODO          | Borders and dividers              |
| `focus`         | TODO          | Keyboard focus outline            |

Example: `bg-primary text-on-primary hover:bg-primary-hover border border-border`

### Feedback colors

Pairs of background + text: `error`, `warning`, `success`, `info`, `note`.
Example: `bg-error-bg text-error-text`.

### Palette

The full Figma palette is available as `{name}-{50…900}`:
salt, cream, oat, thyme, butter, saffron, olive, truffle, mint, sprout, basil, nori.
Only reach for these when no semantic color fits.

## Focus styles

Every focusable element gets a visible outline on keyboard focus via `:focus-visible`
(2px `focus` color, 2px offset). Don't remove it with `outline-none` unless you replace it
with an equally visible focus style.

## Spacing, radius and shadows

Not yet defined from Figma — Tailwind defaults are used for now.
