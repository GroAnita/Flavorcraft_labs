import { logout } from "@/app/actions/auth";
import { getAccessToken } from "@/app/lib/session";

export async function LogoutButton() {
  if (!(await getAccessToken())) return null;

  return (
    <form action={logout}>
      <button type="submit">Log out</button>
    </form>
  );
}
