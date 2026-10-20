import { cookies } from "next/headers";
import type { SessionProfile } from "@/app/types/auth";

const COOKIE_NAME = "accessToken";
const PROFILE_COOKIE_NAME = "profile";
const ONE_WEEK = 60 * 60 * 24 * 7;

const COOKIE_OPTIONS = {
  httpOnly: true, // browser JavaScript can't read it
  secure: process.env.NODE_ENV === "production", // HTTPS only when deployed
  sameSite: "lax", // not sent with requests from other websites
  path: "/", // sent on every page
  maxAge: ONE_WEEK, // removed after 7 days
} as const;

export async function createSession(
  accessToken: string,
  profile: SessionProfile
) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, accessToken, COOKIE_OPTIONS);
  // The API has no profile endpoint, so the details from the login response are kept here
  cookieStore.set(PROFILE_COOKIE_NAME, JSON.stringify(profile), COOKIE_OPTIONS);
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

// Returns null when there is no profile, for example for sessions created before it was saved
export async function getProfile(): Promise<SessionProfile | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(PROFILE_COOKIE_NAME)?.value;
  if (!value) return null;
  try {
    return JSON.parse(value) as SessionProfile;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  cookieStore.delete(PROFILE_COOKIE_NAME);
}
