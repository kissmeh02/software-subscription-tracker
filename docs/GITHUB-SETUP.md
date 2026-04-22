# GitHub: Pages and branch protection (manual steps)

## First-time GitHub Pages (workflow source)

The repository `POST /repos/.../pages` call with `build_type: workflow` was used once to register this repo with the Pages + Actions integration. The default `GITHUB_TOKEN` in CI often **cannot** create the site; use an owner PAT or run locally:

```bash
gh api repos/OWNER/REPO/pages -X POST -f build_type=workflow
```

## Public vs private (Free plan)

- **Public repository:** Serves a world-readable **github.io** site and allows **branch protection** via the API on the Free plan (this project is configured that way while the repo stays public).
- **Private repo + public `github.io` site:** On a **Free** plan, a **private** repo usually does **not** publish a public Pages URL (often **HTTP 404**). Options: go **public** for free Pages, use **Pro**-eligible private Pages, or host `dist/` on Vercel, Netlify, or GCS+CDN. Branch protection for **private** repos can require a **paid** plan from the API.

## Example branch protection (when the API allows it)

```bash
gh api -X PUT repos/OWNER/REPO/branches/main/protection \
  -F required_status_checks[strict]=true \
  -F "required_status_checks[contexts][]=build-and-test" \
  -F enforce_admins=false \
  -F required_conversation_resolution=false \
  -F allow_force_pushes=false \
  -F allow_deletions=false
```

- **Status check name:** the CI job in `.github/workflows/ci.yml` is named `build-and-test` (it must be required after at least one successful run on `main`).

- **Admins can bypass** failed checks: leave `required_pull_request_reviews` / strict admin enforcement as default for your org; GitHub’s “include administrators” toggle controls whether admins are forced to pass checks. The snippet above does not add required reviews.
