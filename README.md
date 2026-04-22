# Software Subscription Tracker

Track **software subscription** rows (cost, cycle, renewal date) in a small React + TypeScript SPA. Data is **in-memory in the browser** (demo rows optional); swap the store for an API when you add a backend.

- **Notion (footer link):** set `VITE_NOTION_URL` in `.env` to your public Notion page or product hub (see [`.env.example`](.env.example)). Open Graph metadata in `index.html` is tuned so **your deployed app URL** unfurls when pasted into Notion or chat (update `og:url` if the domain changes).
- **Live site (after deploy):** [GitHub Pages](https://kissmeh02.github.io/software-subscription-tracker/) — requires Pages to be enabled and a successful [Deploy to GitHub Pages](.github/workflows/pages.yml) run.

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

- **Source:** this repo is intended to be **private**; use GitHub to manage Issues and Discussions.
- **Private repo + free GitHub plan:** *Private* GitHub Pages may require a **paid** plan; if the Pages workflow is blocked, use a public fork for Pages or upgrade—see [GitHub Pages docs](https://docs.github.com/pages/getting-started-with-github-pages/about-github-pages).
- **Deployment:** `pages.yml` builds with `VITE_BASE_PATH=/<repo-name>/` so assets resolve under the project path.

## Audits

- [Code & architecture](docs/CODE-AUDIT.md) — modularity, SOLID mapping, tests.
- [Security (deployment-oriented)](docs/SECURITY.md) — env, Vite, future API/DB, GCP Secret Manager, headers.
- [Recommendations](docs/RECOMMENDATIONS.md) — product and engineering improvements.
- [Vulnerability reporting](SECURITY.md)

## License

[MIT](LICENSE)
