import { useEffect, useState } from "react";
import { CopyIcon, ShareIcon, SparkleIcon } from "./AppIcons";

type ResultCardProps = {
  animationKey: number;
  mode: string;
  roast: string;
  severity: string;
  subject: string;
};

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ResultCard({
  animationKey,
  mode,
  roast,
  severity,
  subject,
}: ResultCardProps) {
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [shareLabel, setShareLabel] = useState("Share");
  const [visibleRoast, setVisibleRoast] = useState("");

  useEffect(() => {
    setVisibleRoast("");

    let currentIndex = 0;
    const intervalId = window.setInterval(() => {
      currentIndex += 1;
      setVisibleRoast(roast.slice(0, currentIndex));

      if (currentIndex >= roast.length) {
        window.clearInterval(intervalId);
      }
    }, 18);

    return () => window.clearInterval(intervalId);
  }, [animationKey, roast]);

  async function handleCopy() {
    await navigator.clipboard.writeText(roast);
    setCopyLabel("Copied");
    window.setTimeout(() => setCopyLabel("Copy"), 1400);
  }

  async function handleShare() {
    const shareText = `${roast}\n\n— generated for: ${subject}`;

    if (navigator.share) {
      await navigator.share({
        text: shareText,
        title: "DeluluRoast",
      });
      setShareLabel("Shared");
      window.setTimeout(() => setShareLabel("Share"), 1400);
      return;
    }

    await navigator.clipboard.writeText(shareText);
    setShareLabel("Copied");
    window.setTimeout(() => setShareLabel("Share"), 1400);
  }

  return (
    <section className="relative grid gap-5 overflow-hidden rounded-[28px] border border-[#f0f0f0] bg-[#ffffff] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:gap-6 sm:rounded-[32px] sm:p-7">
      <div className="pointer-events-none absolute right-4 top-4 text-[#efe8ff] sm:right-6 sm:top-5">
        <SparkleIcon className="h-11 w-11 sm:h-14 sm:w-14" />
      </div>

      <div className="grid gap-2.5 sm:gap-3">
        <p className="m-0 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#9a8fa4] sm:text-[0.78rem]">
          <span>DELULUROAST</span>
          <SparkleIcon className="h-3.5 w-3.5 text-[#b791ff]" />
        </p>
        <div className="w-fit rounded-full border border-[#eeeeee] bg-[#fafafa] px-3 py-1.5 text-[0.82rem] font-medium text-[#8b8490] sm:text-[0.88rem]">
          {formatLabel(severity)} • {formatLabel(mode)}
        </div>
      </div>

      <blockquote className="m-0 max-w-full text-[1.25rem] font-medium leading-[1.5] tracking-[-0.015em] text-[#181318] sm:max-w-[16.5em] sm:text-[1.72rem] sm:leading-[1.45]">
        <span className="text-[#c4b5fd]">“</span>
        {visibleRoast}
        {visibleRoast.length < roast.length ? (
          <span className="ml-0.5 inline-block h-[1em] w-[0.08em] animate-pulse bg-[#b8afc7] align-[-0.12em]" />
        ) : null}
        <span className="text-[#c4b5fd]">”</span>
      </blockquote>

      <p className="m-0 text-[0.9rem] text-[#8b8490] sm:text-[0.98rem]">
        — generated for: {subject}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
        <button
          className="flex min-h-11 items-center justify-center gap-2 rounded-[16px] border border-[#eeeeee] bg-[#fafafa] px-4 text-[0.92rem] font-medium text-[#2b222c] transition-colors hover:bg-[#f6f6f6] sm:justify-start sm:text-[0.96rem]"
          onClick={() => void handleCopy()}
          type="button"
        >
          <CopyIcon className="h-4.5 w-4.5" />
          {copyLabel}
        </button>
        <button
          className="flex min-h-11 items-center justify-center gap-2 rounded-[16px] border border-[#eeeeee] bg-[#fafafa] px-4 text-[0.92rem] font-medium text-[#2b222c] transition-colors hover:bg-[#f6f6f6] sm:justify-start sm:text-[0.96rem]"
          onClick={() => void handleShare()}
          type="button"
        >
          <ShareIcon className="h-4.5 w-4.5" />
          {shareLabel}
        </button>
      </div>
    </section>
  );
}
