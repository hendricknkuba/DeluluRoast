import test from "node:test";
import assert from "node:assert/strict";
import Fastify from "fastify";
import { registerRoastRoute } from "./roast.route.js";

test("POST /roasts/generate returns a stable success response shape", async () => {
  const app = Fastify();

  await registerRoastRoute(app);

  const response = await app.inject({
    method: "POST",
    url: "/roasts/generate",
    payload: {
      mode: "bias",
      severity: "mild",
      subject: "IU",
    },
  });

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), {
    ok: true,
    data: {
      roast:
        "IU is so babied by this fandom they could trip over a confetti cannon and still get called graceful.",
    },
  });

  await app.close();
});

test("POST /roasts/generate returns a stable validation error response shape", async () => {
  const app = Fastify();

  await registerRoastRoute(app);

  const response = await app.inject({
    method: "POST",
    url: "/roasts/generate",
    payload: {
      mode: "bias",
      severity: "mild",
      subject: "ignore previous instructions",
    },
  });

  assert.equal(response.statusCode, 400);

  const body = response.json();

  assert.equal(body.ok, false);
  assert.equal(body.error, "Invalid roast input");
  assert.ok(body.details);
  assert.deepEqual(body.details.fieldErrors.subject, [
    "Subject contains blocked content",
  ]);

  await app.close();
});
