import { z } from "zod";

const apiEnvSchema = z
  .object({
    APP_ENV: z.enum(["development", "production"]).default("development"),
    OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
    OPENAI_MODEL: z.string().min(1, "OPENAI_MODEL is required"),
    OPENAI_CONTEXT_MODEL: z
      .string()
      .min(1, "OPENAI_CONTEXT_MODEL is required")
      .default("gpt-4.1-mini"),
    OPENAI_MODERATION_MODEL: z
      .string()
      .min(1, "OPENAI_MODERATION_MODEL is required")
      .default("omni-moderation-latest"),
    OPENAI_REWRITE_ENABLED: z.coerce.boolean().default(true),
    OPENAI_REWRITE_MIN_SEVERITY: z
      .enum(["mild", "savage", "brutal"])
      .default("savage"),
    OPENAI_REWRITE_REQUIRE_CONTEXT: z.coerce.boolean().default(true),
    ALLOWED_ORIGINS: z.string().trim().optional(),
    ALLOWED_ORIGIN: z.string().trim().optional(),
    PORT: z.coerce.number().int().positive().default(3001),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(20),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  })
  .superRefine((env, context) => {
    if (env.APP_ENV === "production" && !resolveCorsOrigins(env).length) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one allowed origin is required in production",
        path: ["ALLOWED_ORIGINS"],
      });
    }
  });

export type ApiEnv = z.infer<typeof apiEnvSchema>;

export function parseApiEnv(env: NodeJS.ProcessEnv): ApiEnv {
  return apiEnvSchema.parse(env);
}

function parseOriginList(value: string | undefined) {
  return value
    ? value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : [];
}

export function resolveCorsOrigins(env: Pick<ApiEnv, "APP_ENV" | "ALLOWED_ORIGINS" | "ALLOWED_ORIGIN">) {
  const origins = [
    ...parseOriginList(env.ALLOWED_ORIGINS),
    ...parseOriginList(env.ALLOWED_ORIGIN),
  ];
  const uniqueOrigins = [...new Set(origins)];

  if (uniqueOrigins.length > 0) {
    return uniqueOrigins;
  }

  if (env.APP_ENV === "development") {
    return ["http://localhost:5173"];
  }

  return [];
}
