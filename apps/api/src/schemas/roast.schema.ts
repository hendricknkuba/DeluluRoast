import { RoastModes, RoastSeverities, type RoastRequest } from "@delulu-roast/shared";
import { z } from "zod";

const blockedContent = [
  "slur",
  "sexual",
  "hate",
  "kill",
  "address",
  "phone",
  "email",
  "ignore previous instructions",
];

const normalizedSubjectSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/\s+/g, " "))
  .pipe(
    z
      .string()
      .min(1, "Subject is required")
      .max(80, "Subject is too long"),
  );

export const roastRequestSchema = z.object({
  mode: z.enum(RoastModes),
  severity: z.enum(RoastSeverities),
  subject: normalizedSubjectSchema
    .refine(
      (value) =>
        !blockedContent.some((term) => value.toLowerCase().includes(term)),
      "Subject contains blocked content",
    ),
}) satisfies z.ZodType<RoastRequest>;

