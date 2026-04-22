export type BillingCycle = 'monthly' | 'annual' | 'weekly'

export type Category = 'work' | 'personal'

export type Status = 'active' | 'paused' | 'cancelled'

export type Subscription = {
  id: number
  name: string
  cost: number
  cycle: BillingCycle
  cat: Category
  status: Status
  renewal: string | null
  icon: string
  notes: string
}

export type Currency = 'CAD' | 'USD'
