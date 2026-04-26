import type { FastifyInstance } from "fastify";
import type { ApiConfig } from "../env.js";
import { errorResponse, okResponse } from "../lib/api-response.js";
import { roastRequestSchema } from "../schemas/roast.schema.js";
import { buildRoast } from "../services/roast.service.js";

type RoastRouteOptions = {
  config: ApiConfig;
  rateLimit?: {
    max: number;
    timeWindow: number | string;
  };
};

export async function registerRoastRoute(
  app: FastifyInstance,
  options: RoastRouteOptions,
) {
  app.post(
    "/roasts/generate",
    {
      config: {
        rateLimit: options?.rateLimit,
      },
    },
    async (request, reply) => {
      const parsed = roastRequestSchema.safeParse(request.body);

      if (!parsed.success) {
        return reply
          .status(400)
          .send(
            errorResponse("VALIDATION_ERROR", "Invalid roast input", {
              fieldErrors: parsed.error.flatten().fieldErrors,
            }),
          );
      }

      const roast = await buildRoast(parsed.data, undefined, options.config);

      if (roast.kind === "ambiguous") {
        return reply.send(
          okResponse({
            meta: {
              source: roast.source,
              reason: roast.reason,
            },
            options: roast.options,
          }),
        );
      }

      return reply.send(
        okResponse({
          roast: roast.roast,
          meta: {
            source: roast.source,
            reason: roast.reason,
          },
        }),
      );
    },
  );
}
