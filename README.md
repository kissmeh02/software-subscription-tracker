# Software Subscription Tracker

**Vite + TypeScript** SPA: [index.html](index.html) is a semantic shell; styles live in [src/styles/tracker.css](src/styles/tracker.css); app logic is split under [src/tracker/](src/tracker/) (types, `localStorage` persistence, render modules, modals, CSV, event mounting). **DM Sans** / **DM Mono**, **Chart.js** (npm), work vs personal categories, CAD/USD, metrics, spend trend, filters, `localStorage` key `subtrkr-v2`, CSV export, and renewal reminder texts for Notion/calendar. Inline `onclick` is avoided in favor of delegated listeners in [src/tracker/mount.ts](src/tracker/mount.ts).

- **Open Graph** meta tags in `index.html` help when you paste the **deployed** site URL in Notion; update `og:url` if the domain changes.
- **Live site:** [https://kissmeh02.github.io/software-subscription-tracker/](https://kissmeh02.github.io/software-subscription-tracker/) (GitHub **public** repo + [Deploy to GitHub Pages](.github/workflows/pages.yml)). If you set the repository **private** again, the public `github.io` URL on a Free plan may 404; see [docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md).

## Directory layout

```text
.
├── .github/workflows/
├── docs/
├── public/                 # favicon
├── src/
│   ├── main.ts             # imports CSS + mountApp
│   ├── styles/tracker.css
│   └── tracker/            # feature modules (render/, modals/, types, storage, mount)
├── index.html              # static shell + one module script
├── vite.config.ts
└── package.json
```

## Scripts

| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | Vite dev server (localhost) |
| `npm run build`  | TypeScript + Vite build    |
| `npm run test`   | Vitest (watch)             |
| `npm run test:run` | Vitest (CI once)        |
| `npm run lint`   | ESLint                     |

## GitHub & Pages

- **This repository is public** with Issues, Discussions, auto-merge, and delete branch on merge enabled; the Wiki is off.
- **Branch `main`:** required status check **`build-and-test`** (from [CI](.github/workflows/ci.yml)); no force-pushes or branch deletion. Admins are not required to use these rules (GitHub *Include administrators* off).
- **Build:** `pages.yml` sets `VITE_BASE_PATH=/<repo-name>/` for asset paths. For private-repo / paid-plan gotchas, see [docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md).

## Audits

- [Code & architecture](docs/CODE-AUDIT.md) — modularity, SOLID mapping, tests.
- [Security (deployment-oriented)](docs/SECURITY.md) — env, Vite, future API/DB, GCP Secret Manager, headers.
- [Recommendations](docs/RECOMMENDATIONS.md) — product and engineering improvements.
- [Vulnerability reporting](SECURITY.md)

## License

[MIT](LICENSE)
