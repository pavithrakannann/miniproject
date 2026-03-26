export function getReadableError(error, fallbackMessage) {
  const payload = error?.response?.data;

  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  if (payload?.message && typeof payload.message === "string") {
    return payload.message;
  }

  if (error?.message && typeof error.message === "string" && error.message !== "Network Error") {
    return error.message;
  }

  if (error?.message === "Network Error") {
    return "Cannot reach the server. Please make sure the backend is running on port 8080.";
  }

  return fallbackMessage;
}
