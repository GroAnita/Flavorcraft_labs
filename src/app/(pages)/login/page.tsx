import type { Metadata } from "next";
import AuthLayout from "@/app/components/layout/AuthLayout";
import { LoginForm } from "@/app/components/features/LoginForm";
import AlternativeAuth from "@/app/components/ui/AlternativeAuth";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to FlavorCraft Labs to access your favorite recipes and continue your cooking journey.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Hi, welcome back!"
      description="Sign in to pick up where you left off and keep your favorite recipes close."
      imageSrc="/images/categories/login-image.jpg"
    >
      <LoginForm />
      <AlternativeAuth mode="login" />
    </AuthLayout>
  );
}
