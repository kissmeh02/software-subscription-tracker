import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createSubscriptionService, InMemorySubscriptionStore } from '../features/subscriptions/services/index.js'
import { SubscriptionServiceProvider } from '../features/subscriptions/subscription-service-provider.js'
import { AppLayout } from './app-layout.js'
import './index.css'

const defaultNotionUrl = 'https://www.notion.so/'

const notionPageUrl: string = import.meta.env.VITE_NOTION_URL ?? defaultNotionUrl
const useDemoData = (import.meta.env.VITE_DEMO_DATA ?? 'true') === 'true'

const store = new InMemorySubscriptionStore()
const service = createSubscriptionService(store, { shouldSeedDefaults: useDemoData })

const root = document.getElementById('root')
if (root == null) {
  throw new Error('Root element #root not found')
}

createRoot(root).render(
  <StrictMode>
    <SubscriptionServiceProvider service={service}>
      <AppLayout notionPageUrl={notionPageUrl} />
    </SubscriptionServiceProvider>
  </StrictMode>,
)
