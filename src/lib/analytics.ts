type AnalyticsProps = Record<string, unknown> | undefined;

export function track(event: string, props?: AnalyticsProps) {
  try {
    // Hook to a real analytics service if available
    // e.g., window.gtag?.('event', event, props)
    // or window.posthog?.capture(event, props)
    // For now, log to console for visibility during development
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, props ?? {});
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("analytics track error", e);
  }
}
