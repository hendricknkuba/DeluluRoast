import type { RoastRequest } from "@delulu-roast/shared";
import { buildStructuredRoast, roastTemplates } from "../data/roast-templates.js";
import {
  classifyKpopTarget,
  moderateTargetInput,
  resolveTargetResolution,
  rewriteRoastWithOpenAI,
} from "./openai.service.js";

export const NON_KPOP_TARGET_MESSAGE =
  "This stage is K-pop only. Bring an idol, group, fandom, song, or era.";
export const BLOCKED_TARGET_MESSAGE =
  "That request cannot enter the stage. Bring a safer K-pop target.";

export type RoastResult =
  | {
      kind: "roast";
      roast: string;
      source: "local" | "openai";
      reason:
        | "enhanced"
        | "fallback_error"
        | "fallback_rejected_output"
        | "local_only_by_policy"
        | "blocked_moderation"
        | "blocked_non_kpop";
    }
  | {
      kind: "ambiguous";
      source: "local";
      reason: "needs_disambiguation";
      options: Array<{
        id: string;
        label: string;
        name: string;
        group: string;
      }>;
    };

function getTemplate(input: Pick<RoastRequest, "mode" | "severity">) {
  return roastTemplates.find(
    (item) => item.mode === input.mode && item.severity === input.severity,
  );
}

export function buildLocalRoast(
  input: RoastRequest & {
    safeContext?: string;
  },
) {
  const template = getTemplate(input);

  const structuredRoast = buildStructuredRoast({
    mode: input.mode,
    severity: input.severity,
    subject: input.subject,
    safeContext: input.safeContext,
  });

  if (structuredRoast) {
    return structuredRoast;
  }

  if (!template) {
    return "That comeback exists, but this roast template does not yet.";
  }

  return template.text.replace(/\{target\}/g, input.subject);
}

type RoastServiceDependencies = {
  moderateTargetInput: typeof moderateTargetInput;
  classifyKpopTarget: typeof classifyKpopTarget;
  resolveTargetResolution: typeof resolveTargetResolution;
  rewriteRoastWithOpenAI: typeof rewriteRoastWithOpenAI;
};

const defaultDependencies: RoastServiceDependencies = {
  moderateTargetInput,
  classifyKpopTarget,
  resolveTargetResolution,
  rewriteRoastWithOpenAI,
};

const severityRank: Record<RoastRequest["severity"], number> = {
  mild: 0,
  savage: 1,
  brutal: 2,
} as const;

function shouldUseOpenAIRewrite(input: {
  severity: RoastRequest["severity"];
  safeContext: string;
}) {
  const rewriteEnabled = process.env.OPENAI_REWRITE_ENABLED !== "false";
  const minSeverity =
    (process.env.OPENAI_REWRITE_MIN_SEVERITY as RoastRequest["severity"] | undefined) ??
    "savage";
  const requireContext = process.env.OPENAI_REWRITE_REQUIRE_CONTEXT !== "false";

  if (!rewriteEnabled) {
    return false;
  }

  if (severityRank[input.severity] < severityRank[minSeverity]) {
    return false;
  }

  if (requireContext && !input.safeContext.trim()) {
    return false;
  }

  return true;
}

export async function buildRoast(
  input: RoastRequest,
  dependencies: RoastServiceDependencies = defaultDependencies,
): Promise<RoastResult> {
  const isFlagged = await dependencies.moderateTargetInput(input.subject);

  if (isFlagged) {
    return {
      kind: "roast",
      roast: BLOCKED_TARGET_MESSAGE,
      source: "local",
      reason: "blocked_moderation",
    };
  }

  const resolution = await dependencies.resolveTargetResolution(input.subject);

  if (resolution.candidates.length > 0) {
    return {
      kind: "ambiguous",
      source: "local",
      reason: "needs_disambiguation",
      options: resolution.candidates,
    };
  }

  const resolvedSubject = resolution.resolvedTarget ?? input.subject;

  const classification = await dependencies.classifyKpopTarget(resolvedSubject);

  if (!classification.isKpopRelated) {
    return {
      kind: "roast",
      roast: NON_KPOP_TARGET_MESSAGE,
      source: "local",
      reason: "blocked_non_kpop",
    };
  }

  const draftRoast = buildLocalRoast({
    ...input,
    subject: resolvedSubject,
    safeContext: classification.safeContext,
  });

  if (
    !shouldUseOpenAIRewrite({
      severity: input.severity,
      safeContext: classification.safeContext,
    })
  ) {
    return {
      kind: "roast",
      roast: draftRoast,
      source: "local",
      reason: "local_only_by_policy",
    };
  }

  const result = await dependencies.rewriteRoastWithOpenAI({
    subject: resolvedSubject,
    draftRoast,
  });

  return {
    kind: "roast",
    roast: result.roast,
    source: result.source,
    reason: result.reason === "unavailable" ? "local_only_by_policy" : result.reason,
  };
}
