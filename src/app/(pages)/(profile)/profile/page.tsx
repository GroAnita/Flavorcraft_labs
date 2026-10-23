import type { Metadata } from "next";
import { ProfileSections } from "@/app/components/features/ProfileSections";
import { getProfile } from "@/app/lib/session";

export const metadata: Metadata = {
  title: "My profile",
};

export default async function ProfilePage() {
  // The layout has already sent visitors without a profile to the login page
  const profile = await getProfile();
  if (!profile) return null;

  return (
    <>
      <h1 className="sr-only">My profile</h1>
      <ProfileSections name={profile.name} email={profile.email} />
    </>
  );
}
