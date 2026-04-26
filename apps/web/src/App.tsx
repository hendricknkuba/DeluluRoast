import { useEffect, useState } from "react";
import { APP_NAVIGATE_EVENT } from "./lib/navigation";
import { ExamplesPage } from "./pages/ExamplesPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RoastGeneratorPage } from "./pages/RoastGeneratorPage";

export default function App() {
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/",
  );

  useEffect(() => {
    const updatePathname = () => {
      setPathname(window.location.pathname);

      if (window.location.hash) {
        window.requestAnimationFrame(() => {
          const target = document.querySelector(window.location.hash);

          if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }
    };

    window.addEventListener("popstate", updatePathname);
    window.addEventListener(APP_NAVIGATE_EVENT, updatePathname);

    return () => {
      window.removeEventListener("popstate", updatePathname);
      window.removeEventListener(APP_NAVIGATE_EVENT, updatePathname);
    };
  }, []);

  if (pathname === "/") {
    return <RoastGeneratorPage />;
  }

  if (pathname === "/how-it-works") {
    return <HowItWorksPage />;
  }

  if (pathname === "/examples") {
    return <ExamplesPage />;
  }

  return <NotFoundPage />;
}
