import type { RoastRequest } from "@delulu-roast/shared";
import { roastTemplates } from "../data/roast-templates.js";

function getTemplate(input: Pick<RoastRequest, "mode" | "severity">) {
  return roastTemplates.find(
    (item) => item.mode === input.mode && item.severity === input.severity,
  );
}

export function buildLocalRoast(input: RoastRequest) {
  const template = getTemplate(input);

  if (!template) {
    return "That comeback exists, but this roast template does not yet.";
  }

  return template.text.replace(/\{target\}/g, input.subject);
}

export async function buildRoast(input: RoastRequest) {
  return buildLocalRoast(input);
}
