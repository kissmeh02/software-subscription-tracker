# Software Subscription Tracker

Single-page app in the root [index.html](index.html): **DM Sans** / **DM Mono**, work vs personal categories, CAD/USD toggle, metrics, **Chart.js** spend trend, filters, `localStorage` persistence (`subtrkr-v2`), CSV export, and Notion-style renewal reminders. A tiny [src/main.ts](src/main.ts) is only the Vite build entry; all UI and behavior are inline in `index.html`.

- **Open Graph** meta tags in `index.html` help when you paste the **deployed** site URL in Notion; update `og:url` if the domain changes.
- **Live site:** [https://kissmeh02.github.io/software-subscription-tracker/](https://kissmeh02.github.io/software-subscription-tracker/) (GitHub **public** repo + [Deploy to GitHub Pages](.github/workflows/pages.yml)). If you set the repository **private** again, the public `github.io` URL on a Free plan may 404; see [docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md).

## Directory layout

```text
.
├── .github/workflows/   # ci.yml, pages.yml
├── docs/                # security, setup notes, audit
├── public/              # favicon (copied to dist root)
├── src/
│   ├── main.ts         # Vite entry (no UI logic)
│   └── smoke.test.ts
├── index.html          # full app: styles, layout, and script
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
