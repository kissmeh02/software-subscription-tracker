# Code audit (architecture & quality)

**Scope:** as of the change to a **single `index.html`** app plus minimal Vite entry.

## Summary

- **Structure:** The product UI is one HTML document (inline CSS and JavaScript) with Chart.js and Google Fonts as CDNs, matching the intended design. `src/main.ts` exists only for the Vite build. Vitest has a small smoke test.
- **Data:** `localStorage` under `subtrkr-v2`; no server or database in this repository.
- **Stack:** No React in the dependency tree; TypeScript, ESLint, and Vite for CI and static hosting only.

## Notes

- For future maintainability, large inline scripts are harder to test and lint than module boundaries; the trade-off was chosen to match the provided single-file design exactly.
