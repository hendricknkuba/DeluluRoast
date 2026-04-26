import { HeroDecorations } from "./HeroDecorations";
import { ReassuranceCard } from "./ReassuranceCard";

export function PageHero() {
  return (
    <section className="relative grid gap-6 overflow-hidden rounded-[30px] px-4 py-1 lg:h-full lg:min-h-0 lg:px-7 lg:py-3">
      <HeroDecorations />

      <div className="grid h-full content-between gap-6 lg:gap-8">
        <header className="grid max-w-[42rem] gap-4 pt-2 lg:pt-8">
          <span className="w-fit rounded-full bg-[linear-gradient(180deg,#f5ecff,#f1e7ff)] px-4 py-2 text-[0.92rem] font-semibold uppercase tracking-[0.02em] text-[#8d65ea] shadow-[0_8px_24px_rgba(181,124,255,0.12)]">
            K-pop roast studio
          </span>

          <div className="grid gap-5">
            <h1 className="m-0 text-[clamp(3.35rem,7.4vw,5.8rem)] font-bold leading-[1.1] tracking-[-0.02em] text-[#0f0a10]">
              <span className="block whitespace-nowrap">Pick a target.</span>
              <span className="block whitespace-nowrap">Pick a mood.</span>
            </h1>

            <p className="m-0 max-w-[30ch] text-[1.05rem] leading-8 text-[#6f6972] sm:max-w-[32ch] sm:text-[1.18rem]">
              A playful K-pop roast studio for idols, groups, fandoms, songs, and
              eras. Short, dramatic, and ready to share.
            </p>
          </div>
        </header>

        <div className="max-w-[26rem] self-end pb-3">
          <ReassuranceCard />
        </div>
      </div>
    </section>
  );
}
