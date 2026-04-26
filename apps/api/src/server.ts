import { config as loadEnv } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.js";
import { parseApiEnv } from "./env.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

loadEnv({
  path: resolve(currentDir, "../../../.env"),
});

const env = parseApiEnv(process.env);
const app = await createApp(env);
const port = env.PORT;

try {
  await app.listen({ port, host: "0.0.0.0" });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
