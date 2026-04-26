import { HeartIcon, SparkleIcon } from "./AppIcons";

export function ReassuranceCard() {
  return (
    <div className="flex items-center gap-3 rounded-[24px] border border-[#f0f0f0] bg-[#ffffff] px-4 py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:gap-4 sm:rounded-[28px] sm:px-5 sm:py-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-[16px] border border-[#f0e8ff] bg-[#f6f1ff] text-[#b791ff] sm:h-14 sm:w-14 sm:rounded-[18px]">
        <SparkleIcon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="m-0 text-[0.98rem] font-semibold tracking-[-0.03em] text-[#231720] sm:text-[1.05rem]">
          Roasts are always lighthearted.
        </p>
        <p className="m-0 text-[0.9rem] text-[#7a737c] sm:text-[0.98rem]">
          We roast with love around here.
        </p>
      </div>

      <div className="pr-0.5 text-[#a66cff] sm:pr-1">
        <HeartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
    </div>
  );
}
