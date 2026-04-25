import type { FastifyInstance } from "fastify";
import { roastRequestSchema } from "../schemas/roast.schema.js";
import { buildRoast } from "../services/roast.service.js";

export async function registerRoastRoute(app: FastifyInstance) {
  app.post("/roasts/generate", async (request, reply) => {
    const parsed = roastRequestSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.status(400).send({
        error: "Invalid roast input",
        details: parsed.error.flatten(),
      });
    }

    const roast = await buildRoast(parsed.data);

    return reply.send({ roast });
  });
}

