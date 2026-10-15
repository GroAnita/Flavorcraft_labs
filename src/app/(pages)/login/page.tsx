import type { Metadata } from "next";
import Link from "next/link";
import AuthLayout from "@/app/components/layout/AuthLayout";
import { LoginForm } from "@/app/components/features/LoginForm";

export const metadata: Metadata = {
  title: "Login | FlavorCraft Labs",
};

export default function LoginPage() {
  return (
    <AuthLayout
      heading="Hi, welcome back!"
      description="Sign in to pick up where you left off and keep your favorite recipes close."
      imageSrc="/images/categories/login-image.jpg"
    >
      <LoginForm />

      {/* TODO: add social sign-in options (#33) here */}

      <p className="mt-8 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-primary underline">
          Register here!
        </Link>
      </p>
    </AuthLayout>
  );
}
