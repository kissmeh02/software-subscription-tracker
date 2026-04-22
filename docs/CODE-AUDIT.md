# Code audit (architecture & quality)

**Scope:** `src/`, test layout, and build tooling as of the audit pass.

## Summary

- **Modularity:** UI (`app/`, `components/`), feature domain (`features/subscriptions/` with `model/`, `services/`, `hooks/`, `components/`), and shared utilities (`lib/`) are separated. Data access (in-memory store) and validation/business rules (service + validators) are not mixed with presentational components.
- **SOLID (mapping):** Single responsibility per file; services depend on abstractions (injectable `InMemorySubscriptionStore`); new persistence can be added without changing UI. Open/closed: extend via new store implementations rather than editing components.
- **File size:** All modules are under the agreed target (~200 lines); the largest output is the bundled `dist` JS, not source monoliths.
- **Error handling:** Domain validation throws `SubscriptionValidationError` with optional `field`; the hook maps errors to a user-facing string. No bare `try {} catch {}` without action.
- **DRY / constants:** Currencies, billing cycles, and limits live in one place. No duplicated validation rules between ad-hoc and service paths.
- **Circular dependencies:** None detected between `lib/`, `model/`, `services/`, and React layers (context in `.ts` + provider in `.tsx` + hook in `hooks/`).
- **Tests:** Unit tests for formatting, validation, and service behavior; a smoke render test for the list with provider. Run `npm run test:run`.

## Findings (non-blockers for localhost)

- **In-memory data only:** No persistence across reloads; acceptable for a SPA prototype, not for production. Replace with API + storage when a backend exists.
- **Add form:** Not implemented; only list + remove. Acceptable for this audit baseline; a follow-up is a `features/subscriptions` form with the same validation pipeline.

## Unusual or strong practices in use

- `verbatimModuleSyntax` and explicit `.js` import specifiers in TypeScript to match the emitted ESM.
- `vitest/config` in `vite.config.ts` so the same config serves build and test without a second `UserConfig` merge error.
