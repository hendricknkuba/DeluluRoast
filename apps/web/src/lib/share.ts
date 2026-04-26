const APP_SHARE_TEXT = "DeluluRoast — Pick a target. Pick a mood. Receive emotional damage.";

export function getAppShareUrl() {
  return window.location.origin;
}

export function getAppShareText() {
  return APP_SHARE_TEXT;
}

export async function copyAppLink() {
  await navigator.clipboard.writeText(getAppShareUrl());
}

export function openXShare() {
  const intentUrl = new URL("https://twitter.com/intent/tweet");
  intentUrl.searchParams.set("text", APP_SHARE_TEXT);
  intentUrl.searchParams.set("url", getAppShareUrl());
  window.open(intentUrl.toString(), "_blank", "noopener,noreferrer");
}

export async function shareApp() {
  const shareData = {
    title: "DeluluRoast",
    text: APP_SHARE_TEXT,
    url: getAppShareUrl(),
  };

  if (navigator.share) {
    await navigator.share(shareData);
    return "shared" as const;
  }

  await copyAppLink();
  return "copied" as const;
}
