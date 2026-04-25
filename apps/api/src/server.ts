import cors from "@fastify/cors";
import Fastify from "fastify";
import { registerHealthRoute } from "./routes/health.route.js";
import { registerRoastRoute } from "./routes/roast.route.js";

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: process.env.ALLOWED_ORIGIN || true,
});

await registerHealthRoute(app);
await registerRoastRoute(app);

const port = Number(process.env.PORT || 3001);

try {
  await app.listen({ port, host: "0.0.0.0" });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}

