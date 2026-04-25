import type { FastifyInstance } from "fastify";
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
        return reply.status(400).send({
          ok: false,
          error: "Invalid roast input",
          details: parsed.error.flatten(),
        });
      }

      const roast = await buildRoast(parsed.data);

      return reply.send({
        ok: true,
        data: {
          roast,
        },
      });
    },
  );
}
