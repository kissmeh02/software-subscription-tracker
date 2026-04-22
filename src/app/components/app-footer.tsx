type AppFooterProps = {
  /**
   * Link to your Notion project hub, runbook, or product brief. Not a secret.
   */
  notionPageUrl: string
}

/**
 * Secondary links. Uses rel="noreferrer" for third-party Notion.
 */
export function AppFooter({ notionPageUrl }: AppFooterProps) {
  return (
    <footer className="app-footer">
      <p>
        <a
          href={notionPageUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          Open in Notion
        </a>
      </p>
    </footer>
  )
}
