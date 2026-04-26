import { MAX_SUBJECT_LENGTH } from "../lib/subject";

type SubjectFieldProps = {
  error?: string;
  value: string;
  onChange: (value: string) => void;
};

const examples = [
  "BTS",
  "Lisa",
  "ARMY",
  "Love Dive",
  "NCT",
  "Seventeen",
  "Stray Kids",
  "NewJeans",
];

export function SubjectField({ error, value, onChange }: SubjectFieldProps) {
  return (
    <label className="grid gap-2.5 sm:gap-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[1rem] font-semibold tracking-[-0.03em] text-[#171117] sm:text-[1.2rem]">
          3. Who&apos;s on stage tonight?
        </span>
        <span className="text-[0.82rem] font-medium text-[#8a8390] sm:text-sm">
          {value.length}/{MAX_SUBJECT_LENGTH}
        </span>
      </div>

      <input
        className={`min-h-13 rounded-[999px] border bg-[#fafafa] px-5 py-3 text-[0.96rem] text-[#25111c] outline-none transition-shadow placeholder:text-[#aeabb5] sm:min-h-14 sm:px-6 sm:text-[1rem] ${
          error
            ? "border-[#d25a7a] shadow-[0_0_0_4px_rgba(210,90,122,0.12)]"
            : "border-[#eeeeee] shadow-[0_6px_18px_rgba(0,0,0,0.03)] focus:shadow-[0_0_0_4px_rgba(92,59,76,0.12)]"
        }`}
        maxLength={MAX_SUBJECT_LENGTH}
        onChange={(event) => onChange(event.target.value)}
        placeholder="e.g. Mark, BLACKPINK, ARMY, Love Dive..."
        value={value}
      />

      <div className="flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={example}
            className="rounded-full border border-transparent bg-[#f4f4f4] px-3.5 py-2 text-[13px] font-medium text-[#68626b] shadow-none sm:px-4 sm:text-[14px]"
            onClick={() => onChange(example)}
            type="button"
          >
            {example}
          </button>
        ))}
      </div>

      {error ? <p className="m-0 text-sm text-[#b1325b]">{error}</p> : null}
    </label>
  );
}
