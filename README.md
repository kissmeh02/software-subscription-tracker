# Software Subscription Tracker

Track **software subscription** rows (cost, cycle, renewal date) in a small React + TypeScript SPA. Data is **in-memory in the browser** (demo rows optional); swap the store for an API when you add a backend.

- **Notion (footer link):** set `VITE_NOTION_URL` in `.env` to your public Notion page or product hub (see [`.env.example`](.env.example)). Open Graph metadata in `index.html` is tuned so **your deployed app URL** unfurls when pasted into Notion or chat (update `og:url` if the domain changes).
- **Live site:** intended URL [https://kissmeh02.github.io/software-subscription-tracker/](https://kissmeh02.github.io/software-subscription-tracker/). **Private repos on a Free plan** do not serve a public `github.io` copy (you will get **404**), even though the [Deploy to GitHub Pages](.github/workflows/pages.yml) workflow can still build. For a public URL on Free, the repository must be **public** or you must use **Pro**-eligible private Pages or an external host (Vercel, GCS+CDN, etc.). See [docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md).

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

## GitHub (private) & Pages

- **This repository is set to private** with Issues, Discussions, auto-merge, and delete branch on merge enabled; the Wiki is off.
- **Free + private** limitations: public **github.io** embed 404, and the **Branch protection** REST API can require a **paid** plan. Details and the exact `gh` commands: [docs/GITHUB-SETUP.md](docs/GITHUB-SETUP.md).
- **Build:** `pages.yml` sets `VITE_BASE_PATH=/<repo-name>/` for asset paths.

## Audits

- [Code & architecture](docs/CODE-AUDIT.md) — modularity, SOLID mapping, tests.
- [Security (deployment-oriented)](docs/SECURITY.md) — env, Vite, future API/DB, GCP Secret Manager, headers.
- [Recommendations](docs/RECOMMENDATIONS.md) — product and engineering improvements.
- [Vulnerability reporting](SECURITY.md)

## License

[MIT](LICENSE)
