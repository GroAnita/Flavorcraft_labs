"use client";

import { Tabs } from "@/app/components/ui/Tabs";
import { DietAllergies } from "@/app/components/features/DietAllergies";
import { ProfileComingSoon } from "@/app/components/features/ProfileComingSoon";
import { ProfileGeneralForm } from "@/app/components/features/ProfileGeneralForm";

type ProfileSectionsProps = {
  name: string;
  email: string;
};

// The General / Preferences switch on the My profile page
export function ProfileSections({ name, email }: ProfileSectionsProps) {
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

  return (
    <Tabs
      label="Profile sections"
      variant="segmented"
      tabs={[
        { id: "general", label: "General", content: general },
        {
          id: "preferences",
          label: "Preferences",
          content: <ProfileComingSoon title="Preferences" />,
        },
      ]}
    />
  );
}
