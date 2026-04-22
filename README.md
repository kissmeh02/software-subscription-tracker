# Software Subscription Tracker

## GitHub

This folder is a Git repository. To publish it to GitHub:

**Repository:** [github.com/kissmeh02/software-subscription-tracker](https://github.com/kissmeh02/software-subscription-tracker)

To push later updates:

```bash
cd "d:\Repository\Software Subscription Tracker"
git add -A
git commit -m "Your message"
git push
```

## Using this project in Notion

Notion does not run your app by itself, but you can connect your workflow in a few ways:

| What you want | How |
|---------------|-----|
| **Link the repo in a Notion page** | Paste the GitHub URL; Notion shows a link preview. |
| **Track the repo in Notion** | In Notion, use **Settings → Connections → GitHub** to connect your account, then you can add GitHub blocks or database properties that point at repos. |
| **Build a Notion “database” of subscriptions** | Use the [Notion API](https://developers.notion.com/) from your app: create a Notion integration, share a database with it, and sync rows from this tracker (requires coding against the API and storing `NOTION_TOKEN` only in local env, never in git). |

Add your app code to this folder, commit, and push so GitHub always reflects your project.
