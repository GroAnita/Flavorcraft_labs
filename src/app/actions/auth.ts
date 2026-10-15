"use server";

import { redirect } from "next/navigation";
import { loginUser } from "@/app/lib/auth";
import { createSession, deleteSession } from "@/app/lib/session";

export async function login(email: string, password: string) {
  try {
    const user = await loginUser(email, password);
    await createSession(user.accessToken);
  } catch {
    return { error: "Invalid email or password" };
  }
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
