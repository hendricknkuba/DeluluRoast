import test from "node:test";
import assert from "node:assert/strict";
import { rewriteRoastWithOpenAI } from "./openai.service.js";

test("rewriteRoastWithOpenAI falls back to the local draft when OpenAI is unavailable", async () => {
  const originalApiKey = process.env.OPENAI_API_KEY;
  const originalModel = process.env.OPENAI_MODEL;

  delete process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_MODEL;

  const roast = await rewriteRoastWithOpenAI({
    subject: "IU",
    draftRoast:
      "IU is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
  });

  assert.equal(
    roast,
    "IU is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
  );

  if (originalApiKey) {
    process.env.OPENAI_API_KEY = originalApiKey;
  }

  if (originalModel) {
    process.env.OPENAI_MODEL = originalModel;
  }
});
