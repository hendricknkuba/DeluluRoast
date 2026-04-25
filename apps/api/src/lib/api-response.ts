export function okResponse<T>(data: T) {
  return {
    ok: true as const,
    data,
  };
}

export function errorResponse(
  code: string,
  message: string,
  details?: Record<string, unknown>,
) {
  return {
    ok: false as const,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
}
