import { z } from "zod";

const apiEnvSchema = z.object({
  OPENAI_API_KEY: z.string().min(1, "OPENAI_API_KEY is required"),
  OPENAI_MODEL: z.string().min(1, "OPENAI_MODEL is required"),
  ALLOWED_ORIGIN: z.string().min(1, "ALLOWED_ORIGIN is required"),
  PORT: z.coerce.number().int().positive().default(3001),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(20),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

export function parseApiEnv(env: NodeJS.ProcessEnv): ApiEnv {
  return apiEnvSchema.parse(env);
}
