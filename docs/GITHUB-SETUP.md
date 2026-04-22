# GitHub: Pages and branch protection (manual steps)

## First-time GitHub Pages (workflow source)

The repository `POST /repos/.../pages` call with `build_type: workflow` was used once to register this repo with the Pages + Actions integration. The default `GITHUB_TOKEN` in CI often **cannot** create the site; use an owner PAT or run locally:

```bash
gh api repos/OWNER/REPO/pages -X POST -f build_type=workflow
```

## Private repository limits (Free plan)

- **Private repo + public `github.io` site:** A **private** repository on a **Free** plan does not publish a world-readable GitHub Pages site. Expect **HTTP 404** on the Pages URL. Options: use a **public** repository for a free public site, **GitHub Pro** (or org plan) for **private** GitHub Pages, or host `dist/` on Vercel, Netlify, or Google Cloud **Storage** + **Cloud CDN** with the repo still private.
- **Branch protection rules** on private repos may require a **paid** plan; the API can return *Upgrade to GitHub Pro or make this repository public*. When the plan allows, apply protection with the GitHub UI or `gh api` (see example below).

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
