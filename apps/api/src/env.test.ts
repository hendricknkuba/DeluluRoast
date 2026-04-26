import test from "node:test";
import assert from "node:assert/strict";
import { ZodError } from "zod";
import { parseApiEnv } from "./env.js";

test("parseApiEnv accepts required backend env values", () => {
  const parsed = parseApiEnv({
    APP_ENV: "development",
    OPENAI_API_KEY: "test-key",
    OPENAI_MODEL: "gpt-4o-mini",
    OPENAI_CONTEXT_MODEL: "gpt-4.1-mini",
    OPENAI_MODERATION_MODEL: "omni-moderation-latest",
    RATE_LIMIT_MAX: "10",
    RATE_LIMIT_WINDOW_MS: "30000",
  });

  assert.equal(parsed.APP_ENV, "development");
  assert.equal(parsed.OPENAI_API_KEY, "test-key");
  assert.equal(parsed.OPENAI_MODEL, "gpt-4o-mini");
  assert.equal(parsed.OPENAI_CONTEXT_MODEL, "gpt-4.1-mini");
  assert.equal(parsed.OPENAI_MODERATION_MODEL, "omni-moderation-latest");
  assert.equal(parsed.OPENAI_REWRITE_ENABLED, true);
  assert.equal(parsed.OPENAI_REWRITE_MIN_SEVERITY, "savage");
  assert.equal(parsed.OPENAI_REWRITE_REQUIRE_CONTEXT, true);
  assert.equal(parsed.ALLOWED_ORIGIN, undefined);
  assert.equal(parsed.PORT, 3001);
  assert.equal(parsed.RATE_LIMIT_MAX, 10);
  assert.equal(parsed.RATE_LIMIT_WINDOW_MS, 30000);
});

test("parseApiEnv rejects missing ALLOWED_ORIGIN in production", () => {
  assert.throws(
    () =>
      parseApiEnv({
        APP_ENV: "production",
        OPENAI_API_KEY: "test-key",
        OPENAI_MODEL: "gpt-4o-mini",
        OPENAI_CONTEXT_MODEL: "gpt-4.1-mini",
        OPENAI_MODERATION_MODEL: "omni-moderation-latest",
      }),
    (error) => {
      assert.ok(error instanceof ZodError);
      return true;
    },
  );
});
