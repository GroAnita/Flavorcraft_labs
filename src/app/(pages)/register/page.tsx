import type { Metadata } from "next";
import Link from "next/link";
import AuthLayout from "@/app/components/layout/AuthLayout";
import { RegisterForm } from "@/app/components/features/RegisterForm";

export const metadata: Metadata = {
  title: "Register | FlavorCraft Labs",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      heading="Create an account"
      description="Save your favorites and find your next meal with ease."
      imageSrc="/images/categories/register-image.jpg"
    >
      <RegisterForm />

      {/* TODO: add social sign-in options (#33) here */}

      <p className="text-center text-sm leading-none text-truffle-500 md:text-base">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary underline underline-offset-2"
        >
          Login here!
        </Link>
      </p>
    </AuthLayout>
  );
}
