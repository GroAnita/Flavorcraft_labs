import { cookies } from "next/headers";

const COOKIE_NAME = "accessToken";
const ONE_WEEK = 60 * 60 * 24 * 7;

export async function createSession(accessToken: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, accessToken, {
    httpOnly: true, // browser JavaScript can't read it
    secure: process.env.NODE_ENV === "production", // HTTPS only when deployed
    sameSite: "lax", // not sent with requests from other websites
    path: "/", // sent on every page
    maxAge: ONE_WEEK, // removed after 7 days
  });
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value ?? null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
