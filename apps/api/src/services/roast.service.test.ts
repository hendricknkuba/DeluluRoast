import test from "node:test";
import assert from "node:assert/strict";
import { buildLocalRoast, buildRoast } from "./roast.service.js";

test("buildLocalRoast injects the subject into the matching template", () => {
  const roast = buildLocalRoast({
    mode: "taste",
    severity: "mild",
    subject: "TXT",
  });

  assert.match(roast, /TXT/);
  assert.match(roast, /photocard set/);
});

test("buildLocalRoast returns a fallback when no template exists", () => {
  const roast = buildLocalRoast({
    mode: "taste",
    severity: "missing" as never,
    subject: "TXT",
  });

  assert.equal(
    roast,
    "That comeback exists, but this roast template does not yet.",
  );
});

test("buildRoast falls back to the local roast when OpenAI is unavailable", async () => {
  const originalApiKey = process.env.OPENAI_API_KEY;
  const originalModel = process.env.OPENAI_MODEL;

  delete process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_MODEL;

  const roast = await buildRoast({
    mode: "taste",
    severity: "mild",
    subject: "TXT",
  });

  assert.match(roast, /TXT/);
  assert.match(roast, /photocard set/);

  if (originalApiKey) {
    process.env.OPENAI_API_KEY = originalApiKey;
  }

  if (originalModel) {
    process.env.OPENAI_MODEL = originalModel;
  }
});
