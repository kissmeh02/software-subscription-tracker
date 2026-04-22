import { SubscriptionRow } from './subscription-row.js'
import { useSubscriptionList } from '../hooks/use-subscription-list.js'

/**
 * Composes the subscription list from feature hooks. Keeps data-fetch state here.
 */
export function SubscriptionList() {
  const { items, error, remove } = useSubscriptionList()

  return (
    <section className="panel" aria-labelledby="subs-heading">
      <h2 id="subs-heading">Your subscriptions</h2>
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {items.length === 0 && !error ? (
        <p className="muted">No subscriptions yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Cycle</th>
                <th scope="col">Cost / cycle</th>
                <th scope="col">Renewal</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <SubscriptionRow key={item.id} item={item} onRemove={remove} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
