import type { RoastRequest } from "@delulu-roast/shared";
import { roastTemplates } from "../data/roast-templates.js";

export async function buildRoast(input: RoastRequest) {
  const template = roastTemplates.find(
    (item) => item.mode === input.mode && item.severity === input.severity,
  );

  if (!template) {
    return "That comeback exists, but this roast template does not yet.";
  }

  return template.text.replace("{target}", input.subject.trim());
}

