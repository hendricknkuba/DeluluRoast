import type { ReactNode } from "react";
import { InstagramIcon, LinkIcon, SparkleIcon, XIcon } from "./AppIcons";

const currentYear = new Date().getFullYear();

function CircleIcon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#f0f0f0] bg-[#ffffff] text-sm font-semibold text-[#1f1720] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      {children}
    </span>
  );
}

export function FooterBar() {
  return (
    <footer className="grid gap-4 rounded-[30px] border border-[#f0f0f0] bg-[#ffffff] px-4 py-4 text-sm text-[#7b747c] shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:px-6 md:grid-cols-[auto_1fr_auto] md:items-center">
      <div className="flex items-center gap-3">
        <CircleIcon>
          <SparkleIcon className="h-5 w-5" />
        </CircleIcon>
        <span>DeluluRoast © {currentYear}</span>
      </div>

      <p className="m-0 text-center text-[1.02rem]">
        Made for fun. Not for the faint of heart.
      </p>

      <div className="flex items-center justify-center gap-3 md:justify-end">
        <span className="text-[1.02rem]">Share the chaos</span>
        <CircleIcon>
          <XIcon className="h-6 w-6" />
        </CircleIcon>
        <CircleIcon>
          <InstagramIcon className="h-6 w-6" />
        </CircleIcon>
        <CircleIcon>
          <LinkIcon className="h-6 w-6" />
        </CircleIcon>
      </div>
    </footer>
  );
}
