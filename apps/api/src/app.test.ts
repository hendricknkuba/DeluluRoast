import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./app.js";

test("createApp wires routes using parsed env config", async () => {
  const app = await createApp({
    APP_ENV: "development",
    OPENAI_API_KEY: "test-key",
    OPENAI_MODEL: "gpt-4o-mini",
    ALLOWED_ORIGIN: "http://localhost:5173",
    PORT: 3001,
    RATE_LIMIT_MAX: 20,
    RATE_LIMIT_WINDOW_MS: 60_000,
  });

  const response = await app.inject({
    method: "GET",
    url: "/health",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { ok: true });

  await app.close();
});

test("createApp applies the rate limit only to roast generation", async () => {
  const app = await createApp(
    {
      APP_ENV: "development",
      OPENAI_API_KEY: "test-key",
      OPENAI_MODEL: "gpt-4o-mini",
      ALLOWED_ORIGIN: "http://localhost:5173",
      PORT: 3001,
      RATE_LIMIT_MAX: 20,
      RATE_LIMIT_WINDOW_MS: 60_000,
    },
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
  const app = await createApp({
    APP_ENV: "development",
    OPENAI_API_KEY: "test-key",
    OPENAI_MODEL: "gpt-4o-mini",
    ALLOWED_ORIGIN: "http://localhost:5173",
    PORT: 3001,
    RATE_LIMIT_MAX: 20,
    RATE_LIMIT_WINDOW_MS: 60_000,
  });

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
