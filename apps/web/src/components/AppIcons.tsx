import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

function Svg({
  children,
  className = "h-4 w-4",
  viewBox = "0 0 24 24",
}: IconProps & { children: ReactNode; viewBox?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

export function SparkleIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M12 4.2L13.5 8.5L17.8 10L13.5 11.5L12 15.8L10.5 11.5L6.2 10L10.5 8.5L12 4.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </Svg>
  );
}

export function MoonIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M14.8 3.7C12.9 4.1 11.2 5.1 9.9 6.6C6.7 10.1 7 15.5 10.5 18.7C11.7 19.8 13.1 20.5 14.7 20.8C13.9 21.1 13 21.2 12.1 21.2C7.7 21.2 4.2 17.7 4.2 13.3C4.2 9.2 7.3 5.9 11.2 5.5C12.5 5.3 13.7 5.4 14.8 3.7Z"
        fill="currentColor"
      />
      <path
        d="M14 5.4C12.7 5.8 11.5 6.6 10.6 7.7C8.2 10.5 8.4 14.7 11.1 17.1C11.9 17.8 12.8 18.3 13.8 18.6C11.2 18.7 8.8 16.9 8.1 14.4C7.3 11.6 8.6 8.6 11.1 7.2C12 6.7 13 6.2 14 5.4Z"
        fill="currentColor"
        opacity="0.24"
      />
    </Svg>
  );
}

export function PersonIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M12 12.2C14.15 12.2 15.9 10.45 15.9 8.3C15.9 6.15 14.15 4.4 12 4.4C9.85 4.4 8.1 6.15 8.1 8.3C8.1 10.45 9.85 12.2 12 12.2Z"
        fill="currentColor"
      />
      <path
        d="M5.5 18.4C5.5 15.85 8.4 14.1 12 14.1C15.6 14.1 18.5 15.85 18.5 18.4V19.1H5.5V18.4Z"
        fill="currentColor"
      />
    </Svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M12 19.2L10.75 18.05C6.3 14 3.4 11.35 3.4 8.1C3.4 5.45 5.45 3.4 8.1 3.4C9.6 3.4 11.05 4.1 12 5.2C12.95 4.1 14.4 3.4 15.9 3.4C18.55 3.4 20.6 5.45 20.6 8.1C20.6 11.35 17.7 14 13.25 18.05L12 19.2Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </Svg>
  );
}

export function SmileIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.4 14.1C10.1 15.05 11 15.5 12 15.5C13 15.5 13.9 15.05 14.6 14.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <circle cx="9.4" cy="10" r="0.9" fill="currentColor" />
      <circle cx="14.6" cy="10" r="0.9" fill="currentColor" />
    </Svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path
        d="M12.2 4.2C12.7 6.4 10.9 7.8 10.9 9.6C10.9 11.1 12 12.2 13.5 12.2C15.6 12.2 17.1 10.3 16.9 8.1C18.7 9.5 19.8 11.6 19.8 13.9C19.8 17.2 17.1 19.9 13.8 19.9C10.5 19.9 7.8 17.2 7.8 13.9C7.8 10.4 9.9 7.7 12.2 4.2Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </Svg>
  );
}

export function DevilIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M8.1 6.4L6.2 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M15.9 6.4L17.8 4.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <circle cx="12" cy="12.3" r="7.3" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="9.4" cy="11.3" r="0.9" fill="currentColor" />
      <circle cx="14.6" cy="11.3" r="0.9" fill="currentColor" />
      <path d="M9.4 15.2C10.15 14.35 11 13.9 12 13.9C13 13.9 13.85 14.35 14.6 15.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </Svg>
  );
}

export function LinkIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M10.3 13.7L13.7 10.3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M9.2 16.4H7.8C5.92 16.4 4.4 14.88 4.4 13C4.4 11.12 5.92 9.6 7.8 9.6H9.2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
      <path d="M14.8 7.6H16.2C18.08 7.6 19.6 9.12 19.6 11C19.6 12.88 18.08 14.4 16.2 14.4H14.8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </Svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect height="14" rx="4" stroke="currentColor" strokeWidth="1.7" width="14" x="5" y="5" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.4" cy="7.7" r="1" fill="currentColor" />
    </Svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <Svg className={className} viewBox="0 0 20 20">
      <path d="M5 4.5L15 15.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15 4.5L5 15.5" stroke="currentColor" strokeWidth="1.8" />
    </Svg>
  );
}

export function CopyIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.7"
        width="11"
        x="8"
        y="8"
      />
      <path
        d="M6.5 15H6C4.9 15 4 14.1 4 13V6C4 4.9 4.9 4 6 4H13C14.1 4 15 4.9 15 6V6.5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </Svg>
  );
}

export function ShareIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="18" cy="5.5" fill="currentColor" r="2" />
      <circle cx="6" cy="12" fill="currentColor" r="2" />
      <circle cx="18" cy="18.5" fill="currentColor" r="2" />
      <path
        d="M7.8 11.1L16.2 6.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d="M7.8 12.9L16.2 17.6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </Svg>
  );
}
