type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

// No-ops when analytics is not configured, so callers never need to guard.
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", event, params);
}
