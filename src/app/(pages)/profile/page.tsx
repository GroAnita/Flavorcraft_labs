import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfileSidebar } from "@/app/components/features/ProfileSidebar";
import { ProfileTabs } from "@/app/components/features/ProfileTabs";
import { fetchProfileStats } from "@/app/lib/profile";
import { getAccessToken, getProfile } from "@/app/lib/session";

export const metadata: Metadata = {
  title: "My profile",
};

export default async function ProfilePage() {
  const [accessToken, profile] = await Promise.all([
    getAccessToken(),
    getProfile(),
  ]);
  // Sessions from before the profile was saved at login have no profile, so they log in again
  if (!accessToken || !profile) redirect("/login");

  const stats = await fetchProfileStats(accessToken, profile.name);

  return (
    <main className="flex flex-1 flex-col bg-background">
      <h1 className="sr-only">My profile</h1>
      <div className="mx-auto grid w-full max-w-screen-2xl gap-6 pb-12 lg:grid-cols-[25rem_1fr] lg:items-start lg:gap-8 lg:px-8 lg:pt-10">
        <ProfileSidebar profile={profile} stats={stats} />
        <div className="min-w-0 px-5 pt-4 lg:px-0 lg:pt-6">
          <ProfileTabs name={profile.name} email={profile.email} />
        </div>
      </div>
    </main>
  );
}
