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
    icon: <FaGoogle className="size-7 text-basil-500" aria-hidden="true" />,
    enabled: true,
  },
  {
    name: 'Facebook',
    icon: <FaFacebook className="size-7 text-basil-500" aria-hidden="true" />,
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
        flex flex-1 items-center justify-center
        px-2 py-3
        rounded-xl border border-oat-500 bg-salt-300
        transition-colors
        enabled:hover:bg-salt-500
        disabled:cursor-not-allowed
      "
    >
      {isLoading ? (
        <LoaderCircle className="size-7 animate-spin" aria-hidden="true" />
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
    <section className="flex w-full flex-col gap-6 md:mt-6 md:gap-12">
      {visibleProviders.length > 0 && (
        <div className="flex flex-col gap-6">
          {/* Divider */}
          <div className="flex w-full items-center gap-4">
            <div className="h-px flex-1 bg-oat-500" />
            <span className="text-sm leading-none text-thyme-500 md:text-base">
              Or
            </span>
            <div className="h-px flex-1 bg-oat-500" />
          </div>

          <div className="flex gap-4">
            {visibleProviders.map((provider) => (
              <SocialAuthButton
                key={provider.name}
                provider={provider.name}
                icon={provider.icon}
                onClick={providerHandlers[provider.name]}
              />
            ))}
          </div>
        </div>
      )}

      {/* Login / Register Links */}
      <p className="text-center text-sm leading-none text-truffle-500 md:text-base">
        {isLogin ? "Don't have an account yet?" : 'Already have an account?'}

        <Link
          href={isLogin ? '/register' : '/login'}
          className="ml-2 text-basil-500 underline underline-offset-2 hover:text-basil-700"
        >
          {isLogin ? 'Register here!' : 'Login here!'}
        </Link>
      </p>
    </section>
  );
}
