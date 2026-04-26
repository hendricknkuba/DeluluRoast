import { SparkleIcon } from "./AppIcons";

export function HeroDecorations() {
  return (
    <>
      <div className="pointer-events-none absolute right-[10%] top-[37%] hidden text-[#b791ff]/80 lg:block">
        <SparkleIcon className="h-9 w-9" />
      </div>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-[17%] top-[69%] hidden h-12 w-28 opacity-70 lg:block"
        fill="none"
        viewBox="0 0 112 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 18C18 36 38 42 58 34C73 28 82 16 86 8"
          stroke="#d8d0dc"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
        <path
          d="M84 8C84 18 91 24 101 24C106 24 109 21 109 16"
          stroke="#d8d0dc"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </svg>
    </>
  );
}
