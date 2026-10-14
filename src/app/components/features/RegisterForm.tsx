"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormField } from "@/app/components/ui/FormField";

type RegisterFormProps = {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
};

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^\w+$/;

export function RegisterForm({ onSubmit }: RegisterFormProps) {
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
      await onSubmit(trimmedName, trimmedEmail, password);
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
    <form onSubmit={handleSubmit} noValidate>
      <FormField
        label="Username"
        type="text"
        name="name"
        autoComplete="username"
        helperText="Letters, numbers and underscores only"
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
        helperText="Must be a @stud.noroff.no address"
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
        required
        disabled={isLoading}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />

      {formError && <p role="alert">{formError}</p>}
      {successMessage && <p role="status">{successMessage}</p>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Signing up..." : "Sign up"}
      </button>

      <p>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </form>
  );
}
