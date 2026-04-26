import { useEffect, useState } from "react";
import { CopyIcon, ShareIcon, SparkleIcon } from "./AppIcons";

type ResultCardProps = {
  mode: string;
  roast: string;
  severity: string;
  subject: string;
};

function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function ResultCard({
  mode,
  roast,
  severity,
  subject,
}: ResultCardProps) {
  const [copyLabel, setCopyLabel] = useState("Copy");
  const [shareLabel, setShareLabel] = useState("Share");
  const [visibleRoast, setVisibleRoast] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = window.setInterval(() => {
      currentIndex += 1;
      setVisibleRoast(roast.slice(0, currentIndex));

      if (currentIndex >= roast.length) {
        window.clearInterval(intervalId);
      }
    }, 18);

    return () => window.clearInterval(intervalId);
  }, [roast]);

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
    <section className="relative grid gap-6 overflow-hidden rounded-[32px] border border-[#f0f0f0] bg-[#ffffff] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-7">
      <div className="pointer-events-none absolute right-6 top-5 text-[#efe8ff]">
        <SparkleIcon className="h-14 w-14" />
      </div>

      <div className="grid gap-3">
        <p className="m-0 flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#9a8fa4]">
          <span>DELULUROAST</span>
          <SparkleIcon className="h-3.5 w-3.5 text-[#b791ff]" />
        </p>
        <div className="w-fit rounded-full border border-[#eeeeee] bg-[#fafafa] px-3 py-1.5 text-[0.88rem] font-medium text-[#8b8490]">
          {formatLabel(severity)} • {formatLabel(mode)}
        </div>
      </div>

      <blockquote className="m-0 max-w-[16.5em] text-[1.45rem] font-medium leading-[1.45] tracking-[-0.015em] text-[#181318] sm:text-[1.72rem]">
        <span className="text-[#c4b5fd]">“</span>
        {visibleRoast}
        {visibleRoast.length < roast.length ? (
          <span className="ml-0.5 inline-block h-[1em] w-[0.08em] animate-pulse bg-[#b8afc7] align-[-0.12em]" />
        ) : null}
        <span className="text-[#c4b5fd]">”</span>
      </blockquote>

      <p className="m-0 text-[0.98rem] text-[#8b8490]">
        — generated for: {subject}
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          className="flex min-h-11 items-center gap-2 rounded-[16px] border border-[#eeeeee] bg-[#fafafa] px-4 text-[0.96rem] font-medium text-[#2b222c] transition-colors hover:bg-[#f6f6f6]"
          onClick={() => void handleCopy()}
          type="button"
        >
          <CopyIcon className="h-4.5 w-4.5" />
          {copyLabel}
        </button>
        <button
          className="flex min-h-11 items-center gap-2 rounded-[16px] border border-[#eeeeee] bg-[#fafafa] px-4 text-[0.96rem] font-medium text-[#2b222c] transition-colors hover:bg-[#f6f6f6]"
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
