# CLAUDE.md

## What this repo is

`frontend-app-gamification` — the learner-facing Gamification Dashboard MFE (points,
streak, badges, opt-in ranking), built on `@edx/frontend-platform` + `@openedx/paragon`.
Consumes the REST API in `platform-plugin-gamification`. Deployed via the sibling
`tutor-contrib-gamification` Tutor plugin, which registers it through `tutor-mfe`.

## Gotchas

- **`AppProvider` (from `@edx/frontend-platform/react`) already wraps its children in its
  own `BrowserRouter`**, with `basename` derived from `PUBLIC_PATH`. Never add another
  `<BrowserRouter>` in `src/index.tsx` — it throws "You cannot render a <Router> inside
  another <Router>" at runtime only (tests, `tsc`, and lint all pass fine either way).
- **Paragon's utility CSS is Bootstrap 4-flavored**: `.mr-*`/`.ml-*`/`.pr-*` etc. exist;
  Bootstrap 5's `.gap-*`/`.me-*`/`.ms-*` do not. A `gap-4` class silently applies no rule at
  all — no error, just missing spacing.
- **Every test file using `@testing-library/jest-dom` matchers** (`toBeInTheDocument`,
  `toBeDisabled`, etc.) needs its own `import '@testing-library/jest-dom';` at the top, even
  though `src/setupTest.js` also imports it — otherwise `jest` fails the whole file with
  `TS2339: Property '...' does not exist`.
- **Paragon's `Form.Switch` exposes `role="switch"`**, not `role="checkbox"` — use
  `screen.getByRole('switch')` in RTL tests.

## Debugging a real Tutor deployment

- Production MFE builds set webpack `devtool: false` (in Tutor's generated
  `webpack.prod-tutor.config.js`) — crashes show only minified stack traces with no
  file/line info, and React's own dev-mode component-stack logging is stripped entirely.
- For a real error, use the dev image instead: `tutor images build <app-id>-dev` (must be
  built locally first — it's never on a public registry, so a bare `tutor dev start` fails
  with "pull access denied"), then `tutor dev start lms <app-id>`. This reuses a separate
  dev-mode LMS/DB from `tutor local`, so free the ports first (`tutor local stop`).
- **Dev builds ignore `env.config.jsx` entirely** (`env.config (ignored)` in the webpack
  output) — any Tutor-injected plugin-slot override (e.g. a themed logo) only applies in
  prod builds, never in dev.
