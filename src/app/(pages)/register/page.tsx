import type { Metadata } from "next";
import AuthLayout from "@/app/components/layout/AuthLayout";
import { RegisterForm } from "@/app/components/features/RegisterForm";
import AlternativeAuth from "@/app/components/ui/AlternativeAuth";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Register for FlavorCraft Labs to start saving your favorite recipes and enhance your cooking experience.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterPage() {
  return (
    <AuthLayout
      heading="Create an account"
      description="Save your favorites and find your next meal with ease."
      imageSrc="/images/categories/register-image.jpg"
    >
      <RegisterForm />
      <AlternativeAuth mode="register" />
    </AuthLayout>
  );
}
