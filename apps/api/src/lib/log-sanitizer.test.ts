import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeErrorForLog } from "./log-sanitizer.js";

test("sanitizeErrorForLog redacts sensitive values", () => {
  const error = new Error(
    "database connection failed: postgres://secret-host sk-secret123",
  );

  const sanitized = sanitizeErrorForLog(error);

  assert.deepEqual(sanitized.name, "Error");
  assert.equal(
    sanitized.message,
    "database connection failed: [REDACTED_URL] [REDACTED_API_KEY]",
  );
  assert.match(String(sanitized.stack), /\[REDACTED_URL\]/);
  assert.match(String(sanitized.stack), /\[REDACTED_API_KEY\]/);
});
