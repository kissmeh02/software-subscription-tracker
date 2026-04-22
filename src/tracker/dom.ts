export function requireElement<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id)
  if (el == null) {
    throw new Error(`Missing required element #${id}`)
  }
  return el as T
}

export function queryElement<T extends HTMLElement>(selector: string): T {
  const el = document.querySelector(selector)
  if (el == null) {
    throw new Error(`Missing required element ${selector}`)
  }
  return el as T
}
