# Software Subscription Tracker

Track **software subscription** rows (cost, cycle, renewal date) in a small React + TypeScript SPA. Data is **in-memory in the browser** (demo rows optional); swap the store for an API when you add a backend.

- **Notion (footer link):** set `VITE_NOTION_URL` in `.env` to your public Notion page or product hub (see [`.env.example`](.env.example)). Open Graph metadata in `index.html` is tuned so **your deployed app URL** unfurls when pasted into Notion or chat (update `og:url` if the domain changes).
- **Live site:** [https://kissmeh02.github.io/software-subscription-tracker/](https://kissmeh02.github.io/software-subscription-tracker/) (GitHub **public** repo + [Deploy to GitHub Pages](.github/workflows/pages.yml)). If you set the repository **private** again, the public `github.io` URL on a Free plan may 404; see [docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md).

## Directory layout

```text
.
├── .github/
│   └── workflows/
│       ├── ci.yml              # test + lint + build
│       └── pages.yml            # static deploy to GitHub Pages
├── docs/
│   ├── CODE-AUDIT.md          # structure, SOLID mapping, test notes
│   ├── RECOMMENDATIONS.md     # optional product / tech improvements
│   └── SECURITY.md            # cloud & secrets (detailed)
├── public/                     # static assets (favicon, etc.)
├── src/
│   ├── app/                    # shell, layout, styles, main entry
│   ├── features/subscriptions/ # domain: model, services, hooks, components
│   ├── lib/                    # small shared utilities
│   └── test/                   # vitest global setup
├── index.html
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
