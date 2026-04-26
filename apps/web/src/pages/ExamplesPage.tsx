import { RoastShell } from "../components/RoastShell";

const examples = [
  {
    meta: "Brutal • Bias",
    roast:
      "Mark hits one two-second wink and suddenly you are writing essays like missing it would erase your entire personality for the week.",
    target: "Mark (NCT)",
  },
  {
    meta: "Savage • Taste",
    roast:
      "Your taste in NewJeans feels like emotional damage disguised as clean production and an innocent playlist shuffle.",
    target: "NewJeans",
  },
  {
    meta: "Mild • Personality",
    roast:
      "Your ARMY energy says you could turn a casual opinion into a full presentation with timestamps, feelings, and a closing argument.",
    target: "ARMY",
  },
];

export function ExamplesPage() {
  return (
    <RoastShell>
      <div className="grid gap-5 px-2 pb-2 pt-1 sm:px-4 lg:gap-6 lg:px-8">
        <section className="grid gap-3 rounded-[28px] border border-[#f0f0f0] bg-[#ffffff] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-6">
          <span className="w-fit rounded-full bg-[linear-gradient(180deg,#f5ecff,#f1e7ff)] px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.02em] text-[#8d65ea] sm:text-[0.86rem]">
            Examples
          </span>

          <div className="grid gap-2.5">
            <h1 className="m-0 max-w-[12ch] text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-[#120c12]">
              A few sample roasts from the stage.
            </h1>
            <p className="m-0 max-w-[42rem] text-[0.96rem] leading-7 text-[#6f6972] sm:text-[1.02rem]">
              These examples show the tone we&apos;re aiming for: short,
              dramatic, playful, and screenshot-friendly.
            </p>
          </div>
        </section>

        <section className="grid gap-3 lg:grid-cols-3 lg:gap-4">
          {examples.map((example) => (
            <article
              key={`${example.meta}-${example.target}`}
              className="grid gap-4 rounded-[28px] border border-[#f0f0f0] bg-[#ffffff] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            >
              <p className="m-0 text-[0.85rem] font-medium text-[#8b8490]">
                {example.meta}
              </p>
              <blockquote className="m-0 text-[1.08rem] font-medium leading-7 tracking-[-0.01em] text-[#181318]">
                “{example.roast}”
              </blockquote>
              <p className="m-0 text-[0.92rem] text-[#8b8490]">
                — generated for: {example.target}
              </p>
            </article>
          ))}
        </section>
      </div>
    </RoastShell>
  );
}
