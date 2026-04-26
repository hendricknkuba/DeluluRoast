import type { RoastOption } from "../lib/api";

type ChoiceCardProps = {
  isLoading: boolean;
  options: RoastOption[];
  onSelect: (option: RoastOption) => void;
};

export function ChoiceCard({
  isLoading,
  options,
  onSelect,
}: ChoiceCardProps) {
  return (
    <section className="grid gap-4 rounded-[24px] border border-[#d9c9ff] bg-[#f6f1ff] p-4 shadow-[0_24px_60px_rgba(112,89,170,0.12)] sm:rounded-[28px] sm:p-5">
      <div className="grid gap-1">
        <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[#6746b1] sm:text-xs">
          Pick the right one
        </p>
        <h2 className="m-0 text-[1.15rem] text-[#2a174d] sm:text-xl">
          Which one did you mean?
        </h2>
      </div>

      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            className="min-h-12 rounded-[18px] border border-white bg-white px-4 py-3 text-left text-[0.96rem] text-[#3e255f] shadow-[0_10px_24px_rgba(112,89,170,0.08)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-[20px] sm:text-[1rem]"
            disabled={isLoading}
            onClick={() => onSelect(option)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
