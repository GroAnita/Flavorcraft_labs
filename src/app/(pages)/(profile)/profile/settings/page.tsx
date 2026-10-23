import type { Metadata } from "next";
import { ProfileComingSoon } from "@/app/components/features/ProfileComingSoon";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <>
      <h1 className="sr-only">Settings</h1>
      <ProfileComingSoon title="Settings" />
    </>
  );
}
