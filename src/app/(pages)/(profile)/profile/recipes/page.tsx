import type { Metadata } from "next";
import { ProfileComingSoon } from "@/app/components/features/ProfileComingSoon";

export const metadata: Metadata = {
  title: "My recipes",
};

export default function MyRecipesPage() {
  return (
    <>
      <h1 className="sr-only">My recipes</h1>
      <ProfileComingSoon title="My recipes" />
    </>
  );
}
