import cors from "@fastify/cors";
import Fastify from "fastify";
import type { ApiEnv } from "./env.js";
import { registerHealthRoute } from "./routes/health.route.js";
import { registerRoastRoute } from "./routes/roast.route.js";

export async function createApp(env: ApiEnv) {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: env.ALLOWED_ORIGIN,
  });

  await registerHealthRoute(app);
  await registerRoastRoute(app);

  return app;
}
