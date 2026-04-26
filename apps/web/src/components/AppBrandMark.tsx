type AppBrandMarkProps = {
  className?: string;
  iconClassName?: string;
};

export function AppBrandMark({
  className = "",
  iconClassName = "",
}: AppBrandMarkProps) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#080608] text-[#b791ff] shadow-[0_14px_32px_rgba(8,6,8,0.18)] ${className}`.trim()}
    >
      <svg
        aria-hidden="true"
        className={`h-5 w-5 ${iconClassName}`.trim()}
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4.2L13.5 8.5L17.8 10L13.5 11.5L12 15.8L10.5 11.5L6.2 10L10.5 8.5L12 4.2Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
