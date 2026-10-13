import type { LoginResponse } from "../types/auth";
import { BASE_URL } from "./config";

export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  const json = await response.json();
  return json.data;
}
