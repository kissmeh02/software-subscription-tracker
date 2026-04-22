/**
 * Thrown at validation boundaries; callers can map to user-visible messages and logs.
 */
export class SubscriptionValidationError extends Error {
  readonly field?: string
  override readonly name = 'SubscriptionValidationError'

  constructor(
    message: string,
    options?: { cause?: unknown; field?: string },
  ) {
    super(message, options)
    this.field = options?.field
  }
}
