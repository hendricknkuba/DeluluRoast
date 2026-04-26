import { HeartIcon, SparkleIcon } from "./AppIcons";

export function ReassuranceCard() {
  return (
    <div className="flex items-center gap-4 rounded-[28px] border border-[#f0f0f0] bg-[#ffffff] px-5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
      <div className="flex h-14 w-14 items-center justify-center rounded-[18px] border border-[#f0e8ff] bg-[#f6f1ff] text-[#b791ff]">
        <SparkleIcon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="m-0 text-[1.05rem] font-semibold tracking-[-0.03em] text-[#231720]">
          Roasts are always lighthearted.
        </p>
        <p className="m-0 text-[0.98rem] text-[#7a737c]">
          We roast with love around here.
        </p>
      </div>

      <div className="pr-1 text-[#a66cff]">
        <HeartIcon className="h-6 w-6" />
      </div>
    </div>
  );
}
