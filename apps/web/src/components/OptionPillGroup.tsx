import type { ReactNode } from "react";

type OptionPillGroupProps<T extends string> = {
  label: string;
  options: readonly T[];
  selected: T;
  onChange: (value: T) => void;
  step: number;
  getDisplayLabel?: (value: T) => string;
  getIcon?: (value: T, isActive: boolean) => ReactNode;
};

export function OptionPillGroup<T extends string>({
  label,
  options,
  selected,
  onChange,
  step,
  getDisplayLabel = defaultLabel,
  getIcon,
}: OptionPillGroupProps<T>) {
  return (
    <div className="grid gap-3">
      <p className="m-0 text-[1rem] font-semibold tracking-[-0.03em] text-[#171117] sm:text-[1.2rem]">
        {step}. {label}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
        {options.map((option) => {
          const isActive = selected === option;
          const icon = getIcon?.(option, isActive);

          return (
            <button
              key={option}
              className={`flex min-h-12 items-center justify-center gap-2 rounded-[18px] border px-3 py-2.5 text-[0.96rem] font-medium capitalize transition-all duration-150 sm:min-h-13 sm:gap-2.5 sm:rounded-[20px] sm:px-4 sm:py-3 sm:text-[1.02rem] ${
                isActive
                  ? "border-[#141014] bg-[#141014] text-white shadow-[0_18px_34px_rgba(20,16,20,0.18)]"
                  : "border-[#efebe5] bg-white text-[#5e5960] shadow-[0_8px_20px_rgba(31,23,32,0.05)] hover:-translate-y-0.5"
              }`}
              onClick={() => onChange(option)}
              type="button"
            >
              {icon ? (
                <span aria-hidden="true">
                  {icon}
                </span>
              ) : null}
              {getDisplayLabel(option)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function defaultLabel(value: string) {
  return value;
}
