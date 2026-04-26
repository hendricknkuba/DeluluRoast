import type { MouseEvent } from "react";
import { SparkleIcon } from "../components/AppIcons";
import { RoastShell } from "../components/RoastShell";
import { isPlainLeftClick, navigateTo } from "../lib/navigation";

export function NotFoundPage() {
  function handleNavigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!isPlainLeftClick(event)) {
      return;
    }

    event.preventDefault();
    navigateTo(href);
  }

  return (
    <RoastShell>
      <section className="grid min-h-[58vh] place-items-center px-3 py-8 sm:px-6 sm:py-12">
        <div className="grid w-full max-w-[760px] gap-6 rounded-[30px] border border-[#f0f0f0] bg-[#ffffff] p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:gap-7 sm:p-10">
          <div className="grid justify-items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f6f1ff] text-[#8d65ea] sm:h-20 sm:w-20">
              <SparkleIcon className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <p className="m-0 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-[#a28db7] sm:text-[0.88rem]">
              404
            </p>
          </div>

          <div className="grid gap-3">
            <h1 className="m-0 text-[2rem] font-bold tracking-[-0.03em] text-[#181318] sm:text-[3rem]">
              This page went full delulu.
            </h1>
            <p className="m-0 text-[1rem] leading-7 text-[#746d76] sm:text-[1.12rem]">
              We looked backstage, checked the fancams, and even asked the
              lightsticks. This page is not here.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-[18px] border border-[rgba(0,0,0,0.06)] bg-[#080608] px-6 text-[0.96rem] font-medium !text-white shadow-[0_12px_24px_rgba(8,6,8,0.14)]"
              href="/"
              onClick={(event) => handleNavigate(event, "/")}
            >
              Back to home
            </a>
            <a
              className="inline-flex min-h-11 items-center justify-center rounded-[18px] border border-[#eeeeee] bg-[#fafafa] px-6 text-[0.96rem] font-medium text-[#2b222c] transition-colors hover:bg-[#f5f5f5]"
              href="/examples"
              onClick={(event) => handleNavigate(event, "/examples")}
            >
              See examples instead
            </a>
          </div>
        </div>
      </section>
    </RoastShell>
  );
}
