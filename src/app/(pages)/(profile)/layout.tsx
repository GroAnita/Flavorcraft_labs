import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { ProfileNavigation } from "@/app/components/features/ProfileNavigation";
import { ProfileSidebar } from "@/app/components/features/ProfileSidebar";
import { fetchProfileStats } from "@/app/lib/profile";
import { getAccessToken, getProfile } from "@/app/lib/session";

// Shared by /profile, /profile/recipes, /profile/settings and /favorites
export default async function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [accessToken, profile] = await Promise.all([
    getAccessToken(),
    getProfile(),
  ]);
  // Sessions from before the profile was saved at login have no profile, so they log in again
  if (!accessToken || !profile) redirect("/login");

  const stats = await fetchProfileStats(accessToken, profile.name);

  return (
    <main className="flex flex-1 flex-col bg-background">
      <div className="mx-auto grid w-full max-w-screen-2xl gap-6 pb-12 lg:grid-cols-[25rem_1fr] lg:items-start lg:gap-8 lg:px-8 lg:pt-10">
        <ProfileSidebar profile={profile} stats={stats} />
        <div className="min-w-0 px-5 pt-4 lg:px-0 lg:pt-6">
          <ProfileNavigation />
          <div className="pt-6 md:pt-9">{children}</div>
        </div>
      </div>
    </main>
  );
}
