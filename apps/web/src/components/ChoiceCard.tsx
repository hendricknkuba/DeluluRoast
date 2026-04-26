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
    <section className="grid gap-4 rounded-[28px] border border-[#d9c9ff] bg-[#f6f1ff] p-5 shadow-[0_24px_60px_rgba(112,89,170,0.12)]">
      <div className="grid gap-1">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.2em] text-[#6746b1]">
          Pick the right one
        </p>
        <h2 className="m-0 text-xl text-[#2a174d]">Which one did you mean?</h2>
      </div>

      <div className="grid gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            className="rounded-[20px] border border-white bg-white px-4 py-3 text-left text-[#3e255f] shadow-[0_10px_24px_rgba(112,89,170,0.08)] transition-transform duration-150 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
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
