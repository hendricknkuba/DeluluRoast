import { useRef, useState } from "react";
import {
  type RoastMode,
  type RoastSeverity,
} from "@delulu-roast/shared";
import { ChoiceCard } from "../components/ChoiceCard";
import { MessageCard } from "../components/MessageCard";
import { PageHero } from "../components/PageHero";
import { RoastComposer } from "../components/RoastComposer";
import { ResultCard } from "../components/ResultCard";
import { RoastShell } from "../components/RoastShell";
import {
  generateRoast,
  type RoastOption,
} from "../lib/api";
import { normalizeSubjectForSubmit, sanitizeSubjectInput } from "../lib/subject";

type RoastViewState =
  | {
      kind: "idle";
    }
  | {
      kind: "roast";
      animationKey: number;
      roast: string;
      reason: "enhanced" | "fallback_local";
    }
  | {
      kind: "choice";
      options: RoastOption[];
    }
  | {
      kind: "message";
      title: string;
      message: string;
      tone?: "default" | "warning" | "soft";
    };

export function RoastGeneratorPage() {
  const genericRequestError =
    "Something went wrong. Please try again later.";
  const [mode, setMode] = useState<RoastMode>("bias");
  const [severity, setSeverity] = useState<RoastSeverity>("mild");
  const [subject, setSubject] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [requestError, setRequestError] = useState("");
  const [viewState, setViewState] = useState<RoastViewState>({ kind: "idle" });
  const [isLoading, setIsLoading] = useState(false);
  const roastAnimationKeyRef = useRef(0);

  async function submitRoast(nextSubject: string) {
    setSubjectError("");
    setRequestError("");
    setViewState({ kind: "idle" });
    setIsLoading(true);

    try {
      const result = await generateRoast({
        mode,
        severity,
        subject: nextSubject,
      });

      if (result.kind === "ambiguous") {
        setViewState({
          kind: "choice",
          options: result.options,
        });
        return;
      }

      if (result.reason === "blocked_non_kpop") {
        setViewState({
          kind: "message",
          title: "This stage is K-pop only",
          message: result.roast,
          tone: "warning",
        });
        return;
      }

      if (result.reason === "blocked_moderation") {
        setViewState({
          kind: "message",
          title: "That one can't go on stage",
          message: result.roast,
          tone: "soft",
        });
        return;
      }

      roastAnimationKeyRef.current += 1;
      setViewState({
        kind: "roast",
        animationKey: roastAnimationKeyRef.current,
        roast: result.roast,
        reason:
          result.reason === "enhanced" ? "enhanced" : "fallback_local",
      });
    } catch {
      console.error("Roast request failed.");
      setRequestError(genericRequestError);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const sanitizedSubject = normalizeSubjectForSubmit(subject);

    if (!sanitizedSubject) {
      setSubjectError("Enter a target first.");
      setViewState({ kind: "idle" });
      return;
    }

    setSubject(sanitizedSubject);
    await submitRoast(sanitizedSubject);
  }

  async function handleResolveOption(option: RoastOption) {
    const resolvedTarget = `${option.name} from ${option.group}`;
    setSubject(resolvedTarget);
    await submitRoast(resolvedTarget);
  }

  function handleSubjectChange(value: string) {
    setSubjectError("");
    setRequestError("");
    setSubject(sanitizeSubjectInput(value));
  }

  return (
    <RoastShell>
      <div className="grid gap-5 px-1 pb-1 pt-1 lg:h-full lg:grid-cols-[minmax(0,1.08fr)_minmax(620px,0.92fr)] lg:items-stretch lg:gap-8 lg:px-8 lg:pb-0 lg:pt-0">
        <PageHero />

        <section className="grid items-start justify-end gap-4 pt-1 lg:pt-10" id="studio">
          <RoastComposer
            isLoading={isLoading}
            mode={mode}
            onModeChange={setMode}
            onSeverityChange={setSeverity}
            onSubmit={(event) => void handleSubmit(event)}
            onSubjectChange={handleSubjectChange}
            severity={severity}
            subject={subject}
            subjectError={subjectError}
          />

          {requestError ? (
            <MessageCard
              message={requestError}
              title="Something went wrong"
              tone="soft"
            />
          ) : null}

          {viewState.kind === "roast" ? (
            <ResultCard
              animationKey={viewState.animationKey}
              mode={mode}
              roast={viewState.roast}
              severity={severity}
              subject={subject}
            />
          ) : null}

          {viewState.kind === "choice" ? (
            <ChoiceCard
              isLoading={isLoading}
              onSelect={(option) => void handleResolveOption(option)}
              options={viewState.options}
            />
          ) : null}

          {viewState.kind === "message" ? (
            <MessageCard
              message={viewState.message}
              title={viewState.title}
              tone={viewState.tone}
            />
          ) : null}
        </section>
      </div>
    </RoastShell>
  );
}
