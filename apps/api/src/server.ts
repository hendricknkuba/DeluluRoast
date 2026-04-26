import { config as loadEnv } from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createApp } from "./app.js";
import { createApiConfig } from "./env.js";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = dirname(currentFilePath);

loadEnv({
  path: resolve(currentDir, "../../../.env"),
});

const config = createApiConfig(process.env);
const app = await createApp(config);
const port = config.PORT;

try {
  await app.listen({ port, host: "0.0.0.0" });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
