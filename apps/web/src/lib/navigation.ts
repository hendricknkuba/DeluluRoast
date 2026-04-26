import type { MouseEvent } from "react";

export const APP_NAVIGATE_EVENT = "app:navigate";

export function navigateTo(href: string) {
  window.history.pushState({}, "", href);
  window.dispatchEvent(new Event(APP_NAVIGATE_EVENT));
}

export function isPlainLeftClick(event: MouseEvent<HTMLAnchorElement>) {
  return !(
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  );
}
