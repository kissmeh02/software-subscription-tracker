# Recommendations (improvements, not defects)

- **Add create/edit form** using the same `assertValidSubscriptionInput` path, with accessible labels and `aria-*` for errors.
- **Persistence:** `localStorage` for offline-only UX, or a small REST/GraphQL API with auth when multi-user and sync are required.
- **E2E tests:** Playwright for critical flows (add → list → remove) when forms exist; keep unit tests for pure logic.
- **Internationalization:** Pass `undefined` to `Intl` locale or read `navigator.languages` for `formatCurrency`/`NumberFormat`.
- **CI:** Add `npm audit` (or **Dependabot** + **CodeQL** for TypeScript) when the app grows; optional preview deployments per PR.
- **Notion two-way sync:** If you need data in Notion, use a **Notion internal integration** with a token kept **on the server only**; the browser should never hold the full integration token for write access to arbitrary workspaces.
