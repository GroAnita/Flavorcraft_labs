"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { FormField } from "@/app/components/ui/FormField";
import { loginUser } from "@/app/lib/auth";

type FieldErrors = { email?: string; password?: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;

    const trimmedEmail = email.trim();

    const newErrors: FieldErrors = {};
    if (!trimmedEmail) newErrors.email = "Email is required";
    else if (!EMAIL_PATTERN.test(trimmedEmail))
      newErrors.email = "Enter a valid email address";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    setFormError("");
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      // TODO: store the session (accessToken, profile) once session handling is agreed.
      await loginUser(trimmedEmail, password);
      router.push("/");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Example@email.com"
        required
        disabled={isLoading}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="At least 8 characters"
        required
        disabled={isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />

      {formError && (
        <p
          role="alert"
          className="rounded-md bg-error-bg px-3 py-2 text-sm text-error-text"
        >
          {formError}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-white hover:bg-basil-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Logging in..." : "Login"}
        <LogIn aria-hidden="true" className="size-4" />
      </button>
    </form>
  );
}
