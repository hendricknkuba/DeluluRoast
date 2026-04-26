import type { RoastRequest } from "@delulu-roast/shared";

export function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_URL?.trim();

  if (!configured) {
    return "http://localhost:3001";
  }

  const trimmed = configured.replace(/\/+$/, "");

  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const scheme = /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/i.test(trimmed)
    ? "http"
    : "https";

  return `${scheme}://${trimmed}`;
}

export type RoastOption = {
  id: string;
  label: string;
  name: string;
  group: string;
};

export type GenerateRoastResult =
  | {
      kind: "roast";
      roast: string;
      reason:
        | "enhanced"
        | "fallback_local"
        | "blocked_moderation"
        | "blocked_non_kpop";
    }
  | {
      kind: "ambiguous";
      options: RoastOption[];
      reason: "needs_disambiguation";
    };

type RoastResultReason =
  | "enhanced"
  | "fallback_local"
  | "blocked_moderation"
  | "blocked_non_kpop";

type GenerateRoastSuccess = {
  ok: true;
  data: {
    roast?: string;
    options?: RoastOption[];
    meta: {
      source: "local" | "openai";
      reason:
        | "enhanced"
        | "fallback_local"
        | "blocked_moderation"
        | "blocked_non_kpop"
        | "needs_disambiguation";
    };
  };
};

type GenerateRoastError = {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: {
      fieldErrors?: Record<string, string[]>;
    };
  };
};

export async function generateRoast(payload: RoastRequest) {
  const response = await fetch(`${getApiBaseUrl()}/roasts/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    const fallbackText = await response.text();
    throw new Error(
      `API returned a non-JSON response (${response.status}). ${fallbackText.slice(0, 120)}`,
    );
  }

  const body = (await response.json()) as
    | GenerateRoastSuccess
    | GenerateRoastError;

  if (!response.ok || !body.ok) {
    const fieldError = body.ok
      ? null
      : body.error.details?.fieldErrors?.subject?.[0] || null;

    throw new Error(fieldError || (body.ok ? "Request failed" : body.error.message));
  }

  if (body.data.options?.length) {
    return {
      kind: "ambiguous",
      options: body.data.options,
      reason: "needs_disambiguation",
    } satisfies GenerateRoastResult;
  }

  return {
    kind: "roast",
    roast: body.data.roast || "",
    reason: body.data.meta.reason as RoastResultReason,
  } satisfies GenerateRoastResult;
}
