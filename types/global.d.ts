// ─── Global Type Declarations ─────────────────────────────────────────────────

interface Window {
  gtag: (
    command: string,
    action: string,
    params?: Record<string, unknown>,
  ) => void
}

declare function gtag(
  command: string,
  action: string,
  params?: Record<string, unknown>,
): void
