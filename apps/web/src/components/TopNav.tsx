import { SparkleIcon } from "./AppIcons";

function BrandMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#080608] text-[#b791ff] shadow-[0_14px_32px_rgba(8,6,8,0.18)]">
      <SparkleIcon className="h-5 w-5" />
    </div>
  );
}

export function TopNav() {
  return (
    <header className="flex min-h-[72px] items-center justify-between gap-6 rounded-[999px] border border-[rgba(0,0,0,0.06)] bg-[rgba(255,255,255,0.78)] px-6 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur-[18px] sm:px-8">
      <div className="flex items-center gap-4 sm:gap-5">
        <BrandMark />
        <span className="text-[1.35rem] font-black tracking-[-0.04em] text-[#120c12] sm:text-[1.6rem]">
          DELULUROAST
        </span>
      </div>

      <nav className="hidden flex-1 items-center justify-end gap-14 pr-6 text-[1.05rem] text-[#7a737c] lg:flex">
        <a href="#how-it-works">How it works</a>
        <a href="#examples">Examples</a>
      </nav>

      <div className="flex items-center gap-4 sm:gap-5">
        <a
          className="hidden min-h-12 items-center rounded-[20px] border border-[rgba(0,0,0,0.06)] bg-[#080608] px-7 text-[1.05rem] font-normal !text-white shadow-[0_12px_24px_rgba(8,6,8,0.14)] md:flex lg:px-8"
          href="#studio"
        >
          <span className="!text-white">Get your roast</span>
        </a>
      </div>
    </header>
  );
}
