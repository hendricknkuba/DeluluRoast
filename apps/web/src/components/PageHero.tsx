import { HeroDecorations } from "./HeroDecorations";
import { ReassuranceCard } from "./ReassuranceCard";

export function PageHero() {
  return (
    <section className="relative grid gap-4 overflow-hidden rounded-[30px] px-2 py-0.5 sm:px-4 sm:py-1 lg:h-full lg:min-h-0 lg:px-7 lg:py-3">
      <HeroDecorations />

      <div className="grid h-full content-between gap-4 sm:gap-6 lg:gap-8">
        <header className="grid max-w-[42rem] gap-3 pt-1 sm:gap-4 sm:pt-2 lg:pt-8">
          <span className="w-fit rounded-full bg-[linear-gradient(180deg,#f5ecff,#f1e7ff)] px-3 py-1.5 text-[0.76rem] font-semibold uppercase tracking-[0.02em] text-[#8d65ea] shadow-[0_8px_24px_rgba(181,124,255,0.12)] sm:px-4 sm:py-2 sm:text-[0.92rem]">
            K-pop roast studio
          </span>

          <div className="grid gap-3 sm:gap-5">
            <h1 className="m-0 text-[clamp(2.4rem,10vw,3.7rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#0f0a10] sm:text-[clamp(3.35rem,7.4vw,5.8rem)] sm:leading-[1.1] sm:tracking-[-0.02em]">
              <span className="block">Pick a target.</span>
              <span className="block">Pick a mood.</span>
            </h1>

            <p className="m-0 max-w-[29ch] text-[0.98rem] leading-7 text-[#6f6972] sm:max-w-[32ch] sm:text-[1.18rem] sm:leading-8">
              A playful K-pop roast studio for idols, groups, fandoms, songs, and
              eras. Short, dramatic, and ready to share.
            </p>
          </div>
        </header>

        <div className="max-w-[26rem] self-end pt-1 pb-1 sm:pb-3">
          <ReassuranceCard />
        </div>
      </div>
    </section>
  );
}
