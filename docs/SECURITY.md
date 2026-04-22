# Security hardening (localhost → public cloud)

This project is a **static SPA** (Vite build to `dist/`). There is **no application server, database, or server-side session** in this repository yet. The following still applies for a safe public deployment.

## Current posture

- **Secrets:** `VITE_*` variables are embedded in the **client bundle** at build time. **Never** put private API keys, Notion internal tokens, or database passwords in `VITE_` variables. Use a backend that holds secrets and exposes only the minimum API to the browser.
- **`.env`:** Not committed; examples live in `.env.example`. In CI, set env vars in **GitHub Actions** or, in GCP, **Secret Manager** + workload identity, not in the repo.
- **Dependencies:** Run `npm audit` regularly; CI can add `npm audit --audit-level=high` (optional strict gate).
- **XSS:** React escapes text by default. If you add `dangerouslySetInnerHTML` or markdown rendering, sanitize (e.g. DOMPurify) at the boundary.
- **CORS / API:** When a backend is added, restrict `Access-Control-Allow-Origin` to your front-end origin, use HTTPS only, and validate every payload server-side.
- **Database:** If you add one, use parameterized queries, least-privilege DB users, and encryption in transit (TLS) and at rest per cloud defaults.

## GitHub & hosting

- **GitHub Pages:** Serves static files only. You **cannot** set custom security response headers (CSP, HSTS, `X-Frame-Options`, etc.) on `github.io` without a **CDN or reverse proxy** in front.
- **Production recommendation:** Use **CloudFront + S3**, **Cloudflare** in front of Pages, or **Firebase/Netlify/Vercel** to attach headers, WAF, and rate limits.

## Google Cloud (when chosen)

- Use **Secret Manager** for API keys, Notion integration tokens, and DB connection strings. Grant the runtime service account `secretmanager.secretAccessor` on specific secrets only.
- Prefer **Vertex / Cloud Run / GKE** with a dedicated service account per app, not shared keys in env files on laptops.

## Static meta & embeds (Notion, Slack, etc.)

- Open Graph tags in `index.html` are for **link previews** when your **deployed** URL is shared. They do not replace server-side access control. Keep `og:url` aligned with the canonical public URL after you change domains.

## Reporting

See the root [security policy](../SECURITY.md) for how to report vulnerabilities.
