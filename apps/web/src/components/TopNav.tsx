import type { MouseEvent } from "react";
import { isPlainLeftClick, navigateTo } from "../lib/navigation";
import { AppBrandMark } from "./AppBrandMark";

function getCurrentPage() {
  if (typeof window === "undefined") {
    return "home" as const;
  }

  if (window.location.pathname.startsWith("/how-it-works")) {
    return "how-it-works" as const;
  }

  if (window.location.pathname.startsWith("/examples")) {
    return "examples" as const;
  }

  return "home" as const;
}

export function TopNav() {
  const currentPage = getCurrentPage();
  const linkClassName = "transition-colors hover:text-[#120c12]";
  const activeLinkClassName =
    "!text-[#8d65ea]";

  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isPlainLeftClick(event)) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  }

  return (
    <header className="flex min-h-[64px] items-center justify-between gap-3 rounded-[999px] border border-[rgba(0,0,0,0.06)] bg-[rgba(255,255,255,0.78)] px-4 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-[18px] sm:min-h-[72px] sm:gap-6 sm:px-8 sm:py-3">
      <a
        className="flex min-w-0 items-center gap-3 sm:gap-5"
        href="/"
        onClick={(event) => handleNavigate(event, "/")}
      >
        <AppBrandMark />
        <span className="truncate text-[1.08rem] font-black tracking-[-0.04em] text-[#120c12] sm:text-[1.6rem]">
          DELULUROAST
        </span>
      </a>

      <nav className="hidden flex-1 items-center justify-end gap-14 pr-6 text-[1.05rem] text-[#7a737c] lg:flex">
        <a
          className={`${linkClassName} ${currentPage === "how-it-works" ? activeLinkClassName : ""}`.trim()}
          href="/how-it-works"
          onClick={(event) => handleNavigate(event, "/how-it-works")}
        >
          How it works
        </a>
        <a
          className={`${linkClassName} ${currentPage === "examples" ? activeLinkClassName : ""}`.trim()}
          href="/examples"
          onClick={(event) => handleNavigate(event, "/examples")}
        >
          Examples
        </a>
      </nav>

      <div className="flex items-center gap-3 sm:gap-5">
        <a
          className="inline-flex min-h-10 items-center rounded-[16px] border border-[rgba(0,0,0,0.06)] bg-[#080608] px-4 text-[0.94rem] font-normal !text-white shadow-[0_12px_24px_rgba(8,6,8,0.14)] sm:min-h-12 sm:rounded-[20px] sm:px-7 sm:text-[1.05rem] lg:px-8"
          href={currentPage === "home" ? "#studio" : "/#studio"}
          onClick={(event) =>
            handleNavigate(
              event,
              currentPage === "home" ? "/#studio" : "/#studio",
            )
          }
        >
          <span className="!text-white sm:hidden">Roast</span>
          <span className="hidden !text-white sm:inline">Get your roast</span>
        </a>
      </div>
    </header>
  );
}
