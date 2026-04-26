import { RoastShell } from "../components/RoastShell";

const steps = [
  {
    title: "Pick your roast setup",
    description:
      "Choose a mode, choose how far you want to go, and name the idol, group, fandom, song, or era you want on stage.",
  },
  {
    title: "We check the vibe first",
    description:
      "The app filters unsafe targets, catches non-K-pop inputs, and asks for clarification when a name could mean more than one artist.",
  },
  {
    title: "The roast gets built",
    description:
      "A short roast is created from our controlled backend flow, keeping it playful, dramatic, and easy to share.",
  },
  {
    title: "You copy, share, repeat",
    description:
      "When the roast lands, you get a clean result card made for screenshots, copy-paste, and sending to your friends.",
  },
];

export function HowItWorksPage() {
  return (
    <RoastShell>
      <div className="grid gap-5 px-2 pb-2 pt-1 sm:px-4 lg:gap-6 lg:px-8">
        <section className="grid gap-3 rounded-[28px] border border-[#f0f0f0] bg-[#ffffff] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-6">
          <span className="w-fit rounded-full bg-[linear-gradient(180deg,#f5ecff,#f1e7ff)] px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.02em] text-[#8d65ea] sm:text-[0.86rem]">
            How it works
          </span>

          <div className="grid gap-2.5">
            <h1 className="m-0 max-w-[13ch] text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-[#120c12]">
              The roast flow, without the mystery.
            </h1>
            <p className="m-0 max-w-[42rem] text-[0.96rem] leading-7 text-[#6f6972] sm:text-[1.02rem]">
              DeluluRoast keeps things short, safe, and fun. Here&apos;s what
              happens between your input and the final emotional damage.
            </p>
          </div>
        </section>

        <section className="grid gap-3 lg:grid-cols-2 lg:gap-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="grid gap-2.5 rounded-[26px] border border-[#f0f0f0] bg-[#ffffff] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#141014] text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h2 className="m-0 text-[1.04rem] font-semibold tracking-[-0.02em] text-[#1f1820] sm:text-[1.14rem]">
                  {step.title}
                </h2>
              </div>
              <p className="m-0 text-[0.94rem] leading-6 text-[#6f6972]">
                {step.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-2.5 rounded-[26px] border border-[#f0f0f0] bg-[#ffffff] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-5">
          <h2 className="m-0 text-[1.08rem] font-semibold tracking-[-0.02em] text-[#1f1820] sm:text-[1.18rem]">
            What this means for the user
          </h2>
          <p className="m-0 max-w-[48rem] text-[0.94rem] leading-6 text-[#6f6972]">
            You should get a fast, readable roast experience that feels playful
            instead of messy: clear choices, clean feedback when something
            needs clarification, and a final card worth screenshotting.
          </p>
        </section>
      </div>
    </RoastShell>
  );
}
