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
    ALLOWED_ORIGIN: z.string().trim().optional(),
    PORT: z.coerce.number().int().positive().default(3001),
    RATE_LIMIT_MAX: z.coerce.number().int().positive().default(20),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
  })
  .superRefine((env, context) => {
    if (env.APP_ENV === "production" && !env.ALLOWED_ORIGIN) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "ALLOWED_ORIGIN is required in production",
        path: ["ALLOWED_ORIGIN"],
      });
    }
  });

export type ApiEnv = z.infer<typeof apiEnvSchema>;

export function parseApiEnv(env: NodeJS.ProcessEnv): ApiEnv {
  return apiEnvSchema.parse(env);
}

export function resolveCorsOrigin(env: ApiEnv) {
  return env.ALLOWED_ORIGIN || "http://localhost:5173";
}
