import { formatCurrency } from '../../../lib/index.js'
import type { Subscription } from '../model/index.js'

type SubscriptionRowProps = {
  item: Subscription
  onRemove: (id: string) => void
}

/**
 * Renders a single table row. Presentation only: no fetches.
 */
export function SubscriptionRow({ item, onRemove }: SubscriptionRowProps) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.billingCycleMonths} mo</td>
      <td>{formatCurrency(item.costPerCycle, item.currency)}</td>
      <td>{item.renewalDate}</td>
      <td>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="btn-danger"
        >
          Remove
        </button>
      </td>
    </tr>
  )
}
