const BASE_URL = "https://v2.api.noroff.dev";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export async function authFetch(
  path: string,
  accessToken: string | null,
  options: RequestInit = {}
): Promise<Response> {
  const apiKey = process.env.API_KEY;

  if (!accessToken) {
    throw new AuthError("You need to log in to do this.");
  }
  if (!apiKey) {
    throw new Error("API key is not configured.");
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  if (response.status === 401) {
    throw new AuthError("Your session has expired. Please log in again.");
  }

  return response;
}
