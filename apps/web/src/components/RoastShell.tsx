import type { ReactNode } from "react";
import { FooterBar } from "./FooterBar";
import { TopNav } from "./TopNav";

type RoastShellProps = {
  children: ReactNode;
};

export function RoastShell({ children }: RoastShellProps) {
  return (
    <main className="min-h-screen px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
      <section className="mx-auto grid w-full max-w-[1490px] gap-5 rounded-[36px] border border-[rgba(255,255,255,0.85)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(255,255,255,0.72))] p-4 shadow-[0_30px_90px_rgba(31,23,32,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur sm:p-5 lg:gap-4 lg:p-6">
        <TopNav />
        {children}
        <FooterBar />
      </section>
    </main>
  );
}
