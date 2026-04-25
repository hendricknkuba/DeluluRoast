import type { FastifyInstance } from "fastify";
import { errorResponse, okResponse } from "../lib/api-response.js";
import { roastRequestSchema } from "../schemas/roast.schema.js";
import { buildRoast } from "../services/roast.service.js";

type RoastRouteOptions = {
  rateLimit?: {
    max: number;
    timeWindow: number | string;
  };
};

export async function registerRoastRoute(
  app: FastifyInstance,
  options?: RoastRouteOptions,
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

      const roast = await buildRoast(parsed.data);

      return reply.send(
        okResponse({
          roast,
        }),
      );
    },
  );
}
