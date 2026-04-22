import { SubscriptionList } from '../features/subscriptions/components/subscription-list.js'
import { AppFooter } from './components/app-footer.js'
import { AppHeader } from './components/app-header.js'
import './app.css'

type AppLayoutProps = {
  notionPageUrl: string
}

/**
 * Application shell. Presentation; routing and global providers stay in main.tsx.
 * @param notionPageUrl - public Notion page or hub for this project (safety docs, runbooks)
 */
export function AppLayout({ notionPageUrl }: AppLayoutProps) {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <SubscriptionList />
      </main>
      <AppFooter notionPageUrl={notionPageUrl} />
    </div>
  )
}
