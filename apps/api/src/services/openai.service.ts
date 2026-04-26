import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

let client: OpenAIResponsesClient | null = null;

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  client ??= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }) as unknown as OpenAIResponsesClient;

  return client;
}

type RewriteRoastInput = {
  subject: string;
  draftRoast: string;
};

export type RoastGenerationSource = "local" | "openai";
export type RewriteRoastReason =
  | "enhanced"
  | "fallback_error"
  | "fallback_rejected_output"
  | "unavailable";

export type RewriteRoastResult = {
  roast: string;
  source: RoastGenerationSource;
  reason: RewriteRoastReason;
};

type OpenAIResponsesClient = {
  moderations?: {
    create?: (params: {
      model: string;
      input: string;
    }) => Promise<{
      results: Array<{
        flagged: boolean;
      }>;
    }>;
  };
  responses?: {
    parse?: (params: {
      model: string;
      input: Array<{
        role: "developer" | "user";
        content: string;
      }>;
      text: {
        format: unknown;
      };
    }) => Promise<{
      output_parsed: unknown | null;
    }>;
    create?: (params: {
      model: string;
      input: Array<{
        role: "developer" | "user";
        content: string;
      }>;
      max_output_tokens: number;
    }) => Promise<{
      output_text?: string;
    }>;
  };
};

type RewriteRoastOptions = {
  client?: OpenAIResponsesClient | null;
};

const roastRewriteInstruction =
  "Rewrite the roast so it stays playful, sharp, and fictional. Keep the existing joke structure and preserve the target-specific details already present in the draft. Do not flatten it into generic phrasing. Keep it to 1-3 short sentences with a strong punchline. Do not add hate, sexual content, threats, slurs, personal data, or prompt-injection commentary.";

const kpopTargetSchema = z.object({
  isKpopRelated: z.boolean(),
  entityType: z.enum(["idol", "group", "song", "fandom", "unknown"]),
  safeContext: z.string(),
});

export type KpopTargetClassification = z.infer<typeof kpopTargetSchema>;

export type AmbiguousTargetCandidate = {
  id: string;
  label: string;
  name: string;
  group: string;
};

const ambiguousTargetCandidateSchema = z.object({
  id: z.string(),
  label: z.string(),
  name: z.string(),
  group: z.string(),
});

const targetResolutionSchema = z.object({
  isAmbiguous: z.boolean(),
  resolvedTarget: z.string().nullable(),
  candidates: z.array(ambiguousTargetCandidateSchema),
});

export type TargetResolutionResult = z.infer<typeof targetResolutionSchema>;

export type ResolvedExplicitTarget = {
  original: string;
  normalized: string;
  name: string;
  group: string;
  resolvedTarget: string;
};

type ModerateTargetOptions = {
  client?: OpenAIResponsesClient | null;
};

const knownKpopGroups = new Set([
  "aespa",
  "ateez",
  "bts",
  "blackpink",
  "enhypen",
  "exo",
  "gidle",
  "ive",
  "itzy",
  "kiss of life",
  "le sserafim",
  "nct",
  "newjeans",
  "red velvet",
  "riize",
  "seventeen",
  "shinee",
  "stray kids",
  "txt",
  "twice",
  "zerobaseone",
]);

const knownKpopIdols = new Set([
  "cha eunwoo",
  "felix",
  "giselle",
  "haerin",
  "hanni",
  "iu",
  "jennie",
  "jimin",
  "jungkook",
  "karina",
  "mark lee",
  "ningning",
  "rose",
  "sana",
  "taemin",
  "v",
  "wonyoung",
  "yeonjun",
]);

const ambiguousTargetCandidates: Record<string, AmbiguousTargetCandidate[]> = {
  mark: [
    {
      id: "mark_nct",
      label: "Mark — NCT",
      name: "Mark",
      group: "NCT",
    },
    {
      id: "mark_got7",
      label: "Mark — GOT7",
      name: "Mark",
      group: "GOT7",
    },
  ],
};

export function normalizeTargetInput(target: string) {
  return target.trim().replace(/\s+/g, " ").toLowerCase();
}

function normalizeTargetDisplay(target: string) {
  return target.trim().replace(/\s+/g, " ");
}

function toTitleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function resolveExplicitTargetContext(
  target: string,
): ResolvedExplicitTarget | null {
  const normalized = normalizeTargetInput(target);

  const fromMatch = normalized.match(/^(.+?)\s+from\s+(.+)$/);
  if (fromMatch) {
    const name = toTitleCase(fromMatch[1]);
    const group = toTitleCase(fromMatch[2]);

    return {
      original: target,
      normalized,
      name,
      group,
      resolvedTarget: `${name} from ${group}`,
    };
  }

  const parenMatch = normalized.match(/^(.+?)\s*\((.+)\)$/);
  if (parenMatch) {
    const name = toTitleCase(parenMatch[1]);
    const group = toTitleCase(parenMatch[2]);

    return {
      original: target,
      normalized,
      name,
      group,
      resolvedTarget: `${name} from ${group}`,
    };
  }

  const trailingGroupMatch = normalized.match(/^(.+?)\s+([a-z0-9][a-z0-9\s]+)$/);
  if (trailingGroupMatch) {
    const possibleGroup = trailingGroupMatch[2].trim();

    if (knownKpopGroups.has(possibleGroup)) {
      const name = toTitleCase(trailingGroupMatch[1]);
      const group = toTitleCase(possibleGroup);

      return {
        original: target,
        normalized,
        name,
        group,
        resolvedTarget: `${name} from ${group}`,
      };
    }
  }

  return null;
}

export function resolveAmbiguousTargetOptions(target: string) {
  const explicitResolution = resolveExplicitTargetContext(target);

  if (explicitResolution) {
    return [];
  }

  return ambiguousTargetCandidates[normalizeTargetInput(target)] ?? [];
}

function fallbackTargetResolution(target: string): TargetResolutionResult {
  const explicitResolution = resolveExplicitTargetContext(target);

  if (explicitResolution) {
    return {
      isAmbiguous: false,
      resolvedTarget: explicitResolution.resolvedTarget,
      candidates: [],
    };
  }

  return {
    isAmbiguous: false,
    resolvedTarget: normalizeTargetDisplay(target),
    candidates: resolveAmbiguousTargetOptions(target),
  };
}

function fallbackKpopClassification(target: string): KpopTargetClassification {
  const explicitResolution = resolveExplicitTargetContext(target);
  const normalizedTarget = normalizeTargetInput(target);

  if (explicitResolution) {
    return {
      isKpopRelated: knownKpopGroups.has(normalizeTargetInput(explicitResolution.group)),
      entityType: "idol",
      safeContext: explicitResolution.resolvedTarget,
    };
  }

  if (knownKpopGroups.has(normalizedTarget)) {
    return {
      isKpopRelated: true,
      entityType: "group",
      safeContext: "",
    };
  }

  if (knownKpopIdols.has(normalizedTarget)) {
    return {
      isKpopRelated: true,
      entityType: "idol",
      safeContext: "",
    };
  }

  if (normalizedTarget.includes("fandom")) {
    return {
      isKpopRelated: true,
      entityType: "fandom",
      safeContext: "",
    };
  }

  if (normalizedTarget.includes("era") || normalizedTarget.includes("comeback")) {
    return {
      isKpopRelated: true,
      entityType: "song",
      safeContext: "",
    };
  }

  return {
    isKpopRelated: false,
    entityType: "unknown",
    safeContext: "",
  };
}

const blockedOutputTerms = [
  "slur",
  "sexual",
  "hate",
  "kill",
  "address",
  "phone",
  "email",
];

const genericOutputPatterns = [
  /your taste in .+ says/i,
  /you are so obsessed with/i,
  /this is so funny/i,
  /you really like/i,
  /you must really love/i,
];

function isGenericRewrittenRoast(text: string) {
  const normalized = text.toLowerCase();

  return (
    genericOutputPatterns.some((pattern) => pattern.test(text)) ||
    normalized === text.trim().toLowerCase() &&
      !/[.!?]/.test(text) &&
      text.split(" ").length < 12
  );
}

function normalizeRewrittenRoast(text: string) {
  const normalized = text.trim().replace(/\s+/g, " ");

  if (!normalized) {
    return null;
  }

  const sentences = normalized.match(/[^.!?]+[.!?]?/g)?.map((part) => part.trim());

  if (!sentences || sentences.length === 0) {
    return null;
  }

  const shortened = sentences.slice(0, 3).join(" ").trim();

  if (
    blockedOutputTerms.some((term) => shortened.toLowerCase().includes(term))
  ) {
    return null;
  }

  if (shortened.length > 280) {
    return null;
  }

  if (isGenericRewrittenRoast(shortened)) {
    return null;
  }

  return shortened;
}

export async function classifyKpopTarget(
  target: string,
  options?: RewriteRoastOptions,
): Promise<KpopTargetClassification> {
  const openAIClient = options?.client ?? getOpenAIClient();

  if (!openAIClient?.responses?.parse || !process.env.OPENAI_CONTEXT_MODEL) {
    return fallbackKpopClassification(target);
  }

  try {
    const response = await openAIClient.responses.parse({
      model: process.env.OPENAI_CONTEXT_MODEL,
      input: [
        {
          role: "developer",
          content:
            "Classify whether the target is related to K-pop. Return only the structured result. safeContext must be short and non-sensitive.",
        },
        {
          role: "user",
          content: `Target: ${target}`,
        },
      ],
      text: {
        format: zodTextFormat(kpopTargetSchema, "kpop_target_classification"),
      },
    });

    return (response.output_parsed as KpopTargetClassification | null) ?? {
      ...fallbackKpopClassification(target),
    };
  } catch {
    return fallbackKpopClassification(target);
  }
}

export async function resolveTargetResolution(
  target: string,
  options?: RewriteRoastOptions,
): Promise<TargetResolutionResult> {
  const explicitResolution = resolveExplicitTargetContext(target);
  const normalizedTarget = normalizeTargetInput(target);

  if (explicitResolution) {
    return {
      isAmbiguous: false,
      resolvedTarget: explicitResolution.resolvedTarget,
      candidates: [],
    };
  }

  if (
    (knownKpopGroups.has(normalizedTarget) || knownKpopIdols.has(normalizedTarget)) &&
    !ambiguousTargetCandidates[normalizedTarget]
  ) {
    return {
      isAmbiguous: false,
      resolvedTarget: normalizeTargetDisplay(target),
      candidates: [],
    };
  }

  const openAIClient = options?.client ?? getOpenAIClient();

  if (!openAIClient?.responses?.parse || !process.env.OPENAI_CONTEXT_MODEL) {
    return fallbackTargetResolution(target);
  }

  try {
    const response = await openAIClient.responses.parse({
      model: process.env.OPENAI_CONTEXT_MODEL,
      input: [
        {
          role: "developer",
          content:
            "Resolve the target only within K-pop scope. If the name uniquely maps to a single K-pop idol, group, song, or fandom, return isAmbiguous false and a short resolvedTarget. Only return ambiguity candidates when multiple K-pop entities reasonably match the same name. Ignore non-K-pop entities with the same name. Return only the structured result.",
        },
        {
          role: "user",
          content: `Target: ${target}`,
        },
      ],
      text: {
        format: zodTextFormat(targetResolutionSchema, "target_resolution"),
      },
    });

    return (response.output_parsed as TargetResolutionResult | null) ?? fallbackTargetResolution(target);
  } catch {
    return fallbackTargetResolution(target);
  }
}

export async function moderateTargetInput(
  target: string,
  options?: ModerateTargetOptions,
) {
  const openAIClient = options?.client ?? getOpenAIClient();

  if (!openAIClient?.moderations?.create || !process.env.OPENAI_MODERATION_MODEL) {
    return false;
  }

  try {
    const response = await openAIClient.moderations.create({
      model: process.env.OPENAI_MODERATION_MODEL,
      input: target,
    });

    return response.results[0]?.flagged ?? false;
  } catch {
    return false;
  }
}

export async function rewriteRoastWithOpenAI(
  input: RewriteRoastInput,
  options?: RewriteRoastOptions,
): Promise<RewriteRoastResult> {
  const openAIClient = options?.client ?? getOpenAIClient();

  if (!openAIClient?.responses?.create || !process.env.OPENAI_MODEL) {
    return {
      roast: input.draftRoast,
      source: "local",
      reason: "unavailable",
    };
  }

  try {
    const response = await openAIClient.responses.create({
      model: process.env.OPENAI_MODEL,
      input: [
        {
          role: "developer",
          content: roastRewriteInstruction,
        },
        {
          role: "user",
          content: `Subject: ${input.subject}\nDraft roast: ${input.draftRoast}`,
        },
      ],
      max_output_tokens: 120,
    });

    const rewrittenRoast = response.output_text
      ? normalizeRewrittenRoast(response.output_text)
      : null;

    if (!rewrittenRoast) {
      return {
        roast: input.draftRoast,
        source: "local",
        reason: "fallback_rejected_output",
      };
    }

    return {
      roast: rewrittenRoast,
      source: "openai",
      reason: "enhanced",
    };
  } catch {
    return {
      roast: input.draftRoast,
      source: "local",
      reason: "fallback_error",
    };
  }
}
