import { useEffect, useState } from "react";
import {
  RoastModes,
  RoastSeverities,
  type RoastMode,
  type RoastSeverity,
} from "@delulu-roast/shared";
import {
  DevilIcon,
  FlameIcon,
  HeartIcon,
  PersonIcon,
  SmileIcon,
  SparkleIcon,
} from "./AppIcons";
import { OptionPillGroup } from "./OptionPillGroup";
import { SubjectField } from "./SubjectField";

type RoastComposerProps = {
  mode: RoastMode;
  severity: RoastSeverity;
  subject: string;
  subjectError?: string;
  isLoading: boolean;
  onModeChange: (value: RoastMode) => void;
  onSeverityChange: (value: RoastSeverity) => void;
  onSubjectChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export function RoastComposer({
  mode,
  severity,
  subject,
  subjectError,
  isLoading,
  onModeChange,
  onSeverityChange,
  onSubjectChange,
  onSubmit,
}: RoastComposerProps) {
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);

  const modeLabels: Record<RoastMode, string> = {
    bias: "Bias",
    taste: "Taste",
    personality: "Personality",
  };

  const severityLabels: Record<RoastSeverity, string> = {
    mild: "Mild",
    savage: "Savage",
    brutal: "Brutal",
  };

  const loadingPhrases = [
    "warming up the stage",
    "aiming carefully",
    "drafting emotional damage",
    "checking the fancams",
    "reading the room",
    "tuning the sarcasm",
    "preparing the side-eye",
    "finding the right amount of chaos",
    "composing a dramatic line",
    "adding a little extra shade",
    "making it short and painful",
    "rehearsing the final blow",
  ];
  const activeLoadingPhraseIndex = isLoading ? loadingPhraseIndex : 0;

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setLoadingPhraseIndex((current) => (current + 1) % loadingPhrases.length);
    }, 1100);

    return () => window.clearInterval(intervalId);
  }, [isLoading, loadingPhrases.length]);

  return (
    <form
      className="grid max-w-[41rem] gap-4 rounded-[28px] border border-[#f0f0f0] bg-[#ffffff] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:gap-5 sm:rounded-[32px] sm:p-6 lg:min-h-[35rem] lg:p-7"
      onSubmit={onSubmit}
    >
      <OptionPillGroup
        getDisplayLabel={(value) => modeLabels[value]}
        getIcon={(value) => {
          if (value === "bias") {
            return <PersonIcon className="h-6 w-6 text-[#a970ff]" />;
          }

          if (value === "taste") {
            return <HeartIcon className="h-6 w-6 text-[#ff5f8f]" />;
          }

          return <SparkleIcon className="h-6 w-6 text-[#6c8dff]" />;
        }}
        label="What kind of roast?"
        onChange={onModeChange}
        options={RoastModes}
        selected={mode}
        step={1}
      />

      <OptionPillGroup
        getDisplayLabel={(value) => severityLabels[value]}
        getIcon={(value) => {
          if (value === "mild") {
            return <SmileIcon className="h-6 w-6 text-[#49c97f]" />;
          }

          if (value === "savage") {
            return <FlameIcon className="h-6 w-6 text-[#ffbf47]" />;
          }

          return <DevilIcon className="h-6 w-6 text-[#a970ff]" />;
        }}
        label="How far should we go?"
        onChange={onSeverityChange}
        options={RoastSeverities}
        selected={severity}
        step={2}
      />

      <SubjectField
        error={subjectError}
        onChange={onSubjectChange}
        value={subject}
      />

      <button
        className="mt-1 min-h-13 rounded-[18px] bg-[linear-gradient(90deg,#6d5dfc_0%,#a78bfa_100%)] px-4 py-3 text-[0.98rem] font-semibold text-white opacity-90 shadow-[0_16px_28px_rgba(109,93,252,0.18)] transition-transform duration-150 hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:min-h-14 sm:rounded-[20px] sm:px-5 sm:text-[1.05rem]"
        disabled={isLoading}
        type="submit"
      >
        <span className="inline-flex items-center justify-center gap-2.5">
          <span className="relative flex h-5 w-5 items-center justify-center">
            {isLoading ? (
              <>
                <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-white/20" />
                <SparkleIcon className="relative h-5 w-5 animate-pulse text-white" />
              </>
            ) : (
              <SparkleIcon className="h-5 w-5 text-white" />
            )}
          </span>

          <span className="relative text-center">
            {isLoading ? (
              <span
                key={loadingPhrases[activeLoadingPhraseIndex]}
                className="inline-block animate-loading-phrase"
              >
                {loadingPhrases[activeLoadingPhraseIndex]}
              </span>
            ) : (
              <span className="inline-block">Generate Roast</span>
            )}
          </span>
        </span>
      </button>
    </form>
  );
}
