import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

interface SocialButtonProps {
  provider: string;
  icon: ReactNode;
  onClick?: () => void | Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
}

type ProviderName = 'Google' | 'Facebook';

// Set enabled: false to hide a provider entirely.
const providerIcons: {
  name: ProviderName;
  icon: ReactNode;
  enabled: boolean;
}[] = [
  {
    name: 'Google',
    icon: <FaGoogle className="text-3xl text-basil-500" aria-hidden="true" />,
    enabled: true,
  },
  {
    name: 'Facebook',
    icon: <FaFacebook className="text-3xl text-basil-500" aria-hidden="true" />,
    enabled: true,
  },
];

export function SocialAuthButton({
  provider,
  icon,
  onClick,
  isLoading = false,
  disabled = false,
}: SocialButtonProps) {
  // A button without a handler has no provider configured behind it.
  const isUnavailable = disabled || !onClick;
  const label = isUnavailable
    ? `Continue with ${provider} (not available yet)`
    : `Continue with ${provider}`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isUnavailable || isLoading}
      aria-label={label}
      title={label}
      aria-busy={isLoading}
      className="
        flex items-center justify-center
        h-[52px] w-[186px] p-5
        rounded-2xl border border-oat-500
        transition-colors
        hover:bg-stone-100
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-green-700
        focus-visible:ring-offset-2
        disabled:opacity-50
        disabled:grayscale
        disabled:cursor-not-allowed
        disabled:hover:bg-transparent
      "
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin" size={28} aria-hidden="true" />
      ) : (
        icon
      )}
    </button>
  );
}

interface AlternativeAuthProps {
  mode: 'login' | 'register';
  // Providers without a handler are shown as disabled.
  providerHandlers?: Partial<Record<ProviderName, () => void | Promise<void>>>;
}

export default function AlternativeAuth({
  mode,
  providerHandlers = {},
}: AlternativeAuthProps) {
  const isLogin = mode === 'login';
  const visibleProviders = providerIcons.filter((provider) => provider.enabled);

  return (
    <section className="w-full mt-10">
      {visibleProviders.length > 0 && (
        <>
          {/* Divider */}
          <div className="mx-auto flex w-full max-w-[388px] items-center gap-8">
            <div className="h-px flex-1 bg-oat-500" />
            <span className="text-2xl text-thyme-500">Or</span>
            <div className="h-px flex-1 bg-oat-500" />
          </div>

          <div className="flex justify-center gap-4 mt-8">
            {visibleProviders.map((provider) => (
              <SocialAuthButton
                key={provider.name}
                provider={provider.name}
                icon={provider.icon}
                onClick={providerHandlers[provider.name]}
              />
            ))}
          </div>
        </>
      )}

      {/* Login / Register Links */}
      <p className="mt-12 text-center text-lg">
        {isLogin ? "Don't have an account yet?" : 'Already have an account?'}

        <Link
          href={isLogin ? '/register' : '/login'}
          className="ml-2 text-basil-500 underline hover:text-green-700"
        >
          {isLogin ? 'Register here!' : 'Log in here!'}
        </Link>
      </p>
    </section>
  );
}
