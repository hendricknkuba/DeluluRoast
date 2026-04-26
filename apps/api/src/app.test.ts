import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./app.js";
import { toApiConfig, type ApiEnv } from "./env.js";

const testEnv: ApiEnv = {
  APP_ENV: "development" as const,
  OPENAI_API_KEY: "test-key",
  OPENAI_MODEL: "gpt-4o-mini",
  OPENAI_CONTEXT_MODEL: "gpt-4.1-mini",
  OPENAI_MODERATION_MODEL: "omni-moderation-latest",
  OPENAI_REWRITE_ENABLED: true,
  OPENAI_REWRITE_MIN_SEVERITY: "savage" as const,
  OPENAI_REWRITE_REQUIRE_CONTEXT: true,
  ALLOWED_ORIGINS: "http://localhost:5173,https://www.deluluroast.com",
  PORT: 3001,
  RATE_LIMIT_MAX: 20,
  RATE_LIMIT_WINDOW_MS: 60_000,
};
const testConfig = toApiConfig(testEnv);

test("createApp wires routes using parsed env config", async () => {
  const app = await createApp(testConfig);

  const response = await app.inject({
    method: "GET",
    url: "/health",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { ok: true });

  await app.close();
});

test("createApp allows configured origins without combining them", async () => {
  const app = await createApp(testConfig);

  const response = await app.inject({
    method: "OPTIONS",
    url: "/roasts/generate",
    headers: {
      origin: "https://www.deluluroast.com",
      "access-control-request-method": "POST",
    },
  });

  assert.equal(response.statusCode, 204);
  assert.equal(
    response.headers["access-control-allow-origin"],
    "https://www.deluluroast.com",
  );
  assert.equal(
    response.headers["access-control-allow-origin"]?.includes(","),
    false,
  );

  await app.close();
});

test("createApp applies the rate limit only to roast generation", async () => {
  const app = await createApp(
    testConfig,
    {
      rateLimit: {
        max: 1,
        timeWindow: 60_000,
      },
    },
  );

  const firstResponse = await app.inject({
    method: "POST",
    url: "/roasts/generate",
    payload: {
      mode: "bias",
      severity: "mild",
      subject: "IU",
    },
  });

  const secondResponse = await app.inject({
    method: "POST",
    url: "/roasts/generate",
    payload: {
      mode: "bias",
      severity: "mild",
      subject: "IU",
    },
  });

  const healthResponse = await app.inject({
    method: "GET",
    url: "/health",
  });

  assert.equal(firstResponse.statusCode, 200);
  assert.equal(secondResponse.statusCode, 429);
  assert.equal(healthResponse.statusCode, 200);
  assert.deepEqual(secondResponse.json(), {
    ok: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many roast requests. Try again later.",
    },
  });

  await app.close();
});

test("createApp hides internal error details behind a generic 500 response", async () => {
  const app = await createApp(testConfig);

  app.get("/test-error", async () => {
    throw new Error("database connection failed: postgres://secret-host");
  });

  const response = await app.inject({
    method: "GET",
    url: "/test-error",
  });

  assert.equal(response.statusCode, 500);
  assert.deepEqual(response.json(), {
    ok: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "Something went wrong.",
    },
  });
  assert.equal(response.body.includes("secret-host"), false);
  assert.equal(response.body.includes("database connection failed"), false);

  await app.close();
});
