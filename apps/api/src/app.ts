import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import Fastify from "fastify";
import { resolveCorsOrigin, type ApiEnv } from "./env.js";
import { errorResponse } from "./lib/api-response.js";
import { sanitizeErrorForLog } from "./lib/log-sanitizer.js";
import { registerHealthRoute } from "./routes/health.route.js";
import { registerRoastRoute } from "./routes/roast.route.js";

type CreateAppOptions = {
  rateLimit?: {
    max: number;
    timeWindow: number | string;
  };
};

function hasStatusCode(error: unknown): error is { statusCode: number } {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    typeof error.statusCode === "number"
  );
}

export async function createApp(env: ApiEnv, options?: CreateAppOptions) {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: resolveCorsOrigin(env),
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
    if (hasStatusCode(error) && error.statusCode === 429) {
      return reply
        .status(429)
        .send(
          errorResponse(
            "RATE_LIMIT_EXCEEDED",
            "Too many roast requests. Try again later.",
          ),
        );
    }

    app.log.error(sanitizeErrorForLog(error));

    return reply
      .status(500)
      .send(errorResponse("INTERNAL_SERVER_ERROR", "Something went wrong."));
  });

  return app;
}
