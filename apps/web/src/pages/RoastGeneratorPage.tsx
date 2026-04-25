import { RoastModes, RoastSeverities } from "@delulu-roast/shared";
import { RoastShell } from "../components/RoastShell";
import { getApiBaseUrl } from "../lib/api";

export function RoastGeneratorPage() {
  return (
    <RoastShell>
      <div className="grid gap-[18px]">
        <header className="grid gap-2">
          <span className="w-fit rounded-full bg-[#1d1635] px-3 py-1.5 text-[12px] uppercase tracking-[0.08em] text-[#fff6fb]">
            DeluluRoast MVP
          </span>
          <h1 className="m-0 text-[clamp(2rem,8vw,3.5rem)]">
            Your K-pop delusion, professionally roasted.
          </h1>
          <p className="m-0 leading-6 text-[#5f5675]">
            Frontend base scaffold. Mode selector, form flow, and result actions
            plug into the backend next.
          </p>
        </header>

        <section className="grid gap-3 rounded-[18px] border border-[#f0dfc8] bg-[#fffaf2] p-4">
          <div>
            <strong>Modes</strong>
            <p className="mt-2 mb-0 text-[#5f5675]">
              {RoastModes.join(", ")}
            </p>
          </div>

          <div>
            <strong>Severities</strong>
            <p className="mt-2 mb-0 text-[#5f5675]">
              {RoastSeverities.join(", ")}
            </p>
          </div>

          <div>
            <strong>API base URL</strong>
            <p className="mt-2 mb-0 text-[#5f5675]">
              {getApiBaseUrl()}
            </p>
          </div>
        </section>
      </div>
    </RoastShell>
  );
}
