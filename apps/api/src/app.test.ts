import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./app.js";

test("createApp wires routes using parsed env config", async () => {
  const app = await createApp({
    OPENAI_API_KEY: "test-key",
    OPENAI_MODEL: "gpt-4o-mini",
    ALLOWED_ORIGIN: "http://localhost:5173",
    PORT: 3001,
  });

  const response = await app.inject({
    method: "GET",
    url: "/health",
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { ok: true });

  await app.close();
});
