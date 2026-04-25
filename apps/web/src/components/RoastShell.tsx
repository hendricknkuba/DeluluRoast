import type { ReactNode } from "react";

type RoastShellProps = {
  children: ReactNode;
};

export function RoastShell({ children }: RoastShellProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px 16px 48px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255, 255, 255, 0.82)",
          border: "1px solid rgba(114, 76, 138, 0.12)",
          borderRadius: 24,
          padding: 24,
          boxShadow: "0 24px 60px rgba(61, 31, 74, 0.12)",
          backdropFilter: "blur(10px)",
        }}
      >
        {children}
      </section>
    </main>
  );
}
