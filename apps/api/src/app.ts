import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";
import type { ApiEnv } from "./env.js";
import { errorResponse } from "./lib/api-response.js";
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
    global: false,
    max: options?.rateLimit?.max ?? env.RATE_LIMIT_MAX,
    timeWindow: options?.rateLimit?.timeWindow ?? env.RATE_LIMIT_WINDOW_MS,
  });

  await registerHealthRoute(app);
  await registerRoastRoute(app, {
    rateLimit: {
      max: options?.rateLimit?.max ?? env.RATE_LIMIT_MAX,
      timeWindow: options?.rateLimit?.timeWindow ?? env.RATE_LIMIT_WINDOW_MS,
    },
  });

  app.setErrorHandler((error, _request, reply) => {
    if (error.statusCode === 429) {
      return reply
        .status(429)
        .send(
          errorResponse(
            "RATE_LIMIT_EXCEEDED",
            "Too many roast requests. Try again later.",
          ),
        );
    }

    app.log.error(error);

    return reply
      .status(500)
      .send(errorResponse("INTERNAL_SERVER_ERROR", "Something went wrong."));
  });

  return app;
}
