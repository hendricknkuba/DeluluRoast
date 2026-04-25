import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";
import type { ApiEnv } from "./env.js";
import { registerHealthRoute } from "./routes/health.route.js";
import { registerRoastRoute } from "./routes/roast.route.js";

type CreateAppOptions = {
  rateLimit?: {
    max: number;
    timeWindow: number | string;
  };
};

export async function createApp(env: ApiEnv, options?: CreateAppOptions) {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: env.ALLOWED_ORIGIN,
  });

  await app.register(rateLimit, {
    global: true,
    max: options?.rateLimit?.max ?? 20,
    timeWindow: options?.rateLimit?.timeWindow ?? "1 minute",
  });

  await registerHealthRoute(app);
  await registerRoastRoute(app);

  return app;
}
