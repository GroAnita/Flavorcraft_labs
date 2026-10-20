"use client";

import { Tabs } from "@/app/components/ui/Tabs";
import { DietAllergies } from "@/app/components/features/DietAllergies";
import { ProfileGeneralForm } from "@/app/components/features/ProfileGeneralForm";

type ProfileTabsProps = {
  name: string;
  email: string;
};

function ComingSoon({ title }: { title: string }) {
  return (
    <p className="rounded-lg bg-surface p-6 text-center text-muted-foreground">
      {title} is coming soon.
    </p>
  );
}

export function ProfileTabs({ name, email }: ProfileTabsProps) {
  // Saved per user, so someone else logging in on the same browser starts fresh
  const storagePrefix = `flavorcraft_profile_${name}`;

  const general = (
    <div className="grid gap-4 2xl:grid-cols-2 2xl:items-start">
      <ProfileGeneralForm
        defaults={{ name, email, skillLevel: "" }}
        storageKey={`${storagePrefix}_general`}
      />
      <DietAllergies storageKey={`${storagePrefix}_diet`} />
    </div>
  );

  const myProfile = (
    <Tabs
      label="Profile sections"
      variant="segmented"
      tabs={[
        { id: "general", label: "General", content: general },
        {
          id: "preferences",
          label: "Preferences",
          content: <ComingSoon title="Preferences" />,
        },
      ]}
    />
  );

  return (
    <Tabs
      label="Profile"
      tabs={[
        { id: "profile", label: "My profile", content: myProfile },
        {
          id: "recipes",
          label: "My recipes",
          content: <ComingSoon title="My recipes" />,
        },
        {
          id: "favorites",
          label: "Favorites",
          content: <ComingSoon title="Favorites" />,
        },
        {
          id: "settings",
          label: "Settings",
          content: <ComingSoon title="Settings" />,
        },
      ]}
    />
  );
}
