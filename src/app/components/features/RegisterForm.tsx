"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { FormField } from "@/app/components/ui/FormField";
import { registerUser } from "@/app/lib/auth";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^\w+$/;

export function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    const newErrors: FieldErrors = {};
    if (!trimmedName) newErrors.name = "Username is required";
    else if (!USERNAME_PATTERN.test(trimmedName))
      newErrors.name =
        "Username can only contain letters, numbers and underscores";
    if (!trimmedEmail) newErrors.email = "Email is required";
    else if (!EMAIL_PATTERN.test(trimmedEmail))
      newErrors.email = "Enter a valid email address";
    else if (!trimmedEmail.toLowerCase().endsWith("@stud.noroff.no"))
      newErrors.email = "Email must be a @stud.noroff.no address";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    setFormError("");
    setSuccessMessage("");
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      await registerUser({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });
      setSuccessMessage("Account created! Redirecting to login...");
      router.push("/login");
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 md:gap-6"
    >
      <FormField
        label="Username"
        type="text"
        name="name"
        autoComplete="username"
        placeholder="Enter a username"
        required
        disabled={isLoading}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
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
        autoComplete="new-password"
        placeholder="At least 8 characters"
        required
        disabled={isLoading}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <FormField
        label="Confirm password"
        type="password"
        name="confirmPassword"
        autoComplete="new-password"
        placeholder="Confirm password"
        required
        disabled={isLoading}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />

      {formError && (
        <p
          role="alert"
          className="rounded-md bg-error-bg px-3 py-2 text-sm text-error-text"
        >
          {formError}
        </p>
      )}
      {successMessage && (
        <p
          role="status"
          className="rounded-md bg-success-bg px-3 py-2 text-sm text-success-text"
        >
          {successMessage}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        aria-busy={isLoading}
        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-base font-semibold text-salt-500 hover:bg-basil-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Signing up..." : "Sign up"}
        <LogIn aria-hidden="true" className="size-5" />
      </button>
    </form>
  );
}
