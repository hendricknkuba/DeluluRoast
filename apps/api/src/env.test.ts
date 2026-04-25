import test from "node:test";
import assert from "node:assert/strict";
import { ZodError } from "zod";
import { parseApiEnv } from "./env.js";

test("parseApiEnv accepts required backend env values", () => {
  const parsed = parseApiEnv({
    OPENAI_API_KEY: "test-key",
    OPENAI_MODEL: "gpt-4o-mini",
    ALLOWED_ORIGIN: "http://localhost:5173",
  });

  assert.equal(parsed.OPENAI_API_KEY, "test-key");
  assert.equal(parsed.OPENAI_MODEL, "gpt-4o-mini");
  assert.equal(parsed.ALLOWED_ORIGIN, "http://localhost:5173");
  assert.equal(parsed.PORT, 3001);
});

test("parseApiEnv rejects missing required backend env values", () => {
  assert.throws(
    () =>
      parseApiEnv({
        OPENAI_API_KEY: "",
        OPENAI_MODEL: "gpt-4o-mini",
        ALLOWED_ORIGIN: "",
      }),
    (error) => {
      assert.ok(error instanceof ZodError);
      return true;
    },
  );
});
