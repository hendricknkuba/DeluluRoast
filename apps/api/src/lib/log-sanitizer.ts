function redactSecrets(value: string) {
  return value
    .replace(/\b[a-z]+:\/\/[^\s)]+/gi, "[REDACTED_URL]")
    .replace(/\b(sk-[a-zA-Z0-9_-]+)\b/g, "[REDACTED_API_KEY]");
}

export function sanitizeErrorForLog(error: unknown) {
  if (!(error instanceof Error)) {
    return {
      message: "Unknown error",
    };
  }

  return {
    name: error.name,
    message: redactSecrets(error.message),
    stack: error.stack ? redactSecrets(error.stack) : undefined,
  };
}
