import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';
import type { ReactNode } from 'react';

interface SocialButtonProps {
  provider: string;
  icon: ReactNode;
  onClick: () => void | Promise<void>;
  isLoading?: boolean;
  disabled?: boolean;
}

const providerIcons = [
  {
    name: 'Google',
    enabled: true,
  },
  {
    name: 'Facebook',
    enabled: true,
  },
  {
    name: 'Vips',
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
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={`Continue with ${provider}`}
      aria-busy={isLoading}
      className="
        flex items-center justify-center
        w-full h-12 md:h-16
        rounded-2xl border border-stone-300
        transition-colors
        hover:bg-stone-100
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-green-700
        focus-visible:ring-offset-2
        disabled:opacity-50
        disabled:cursor-not-allowed
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
}

export default function AlternativeAuth({ mode }: AlternativeAuthProps) {
  const isLogin = mode === 'login';

  return (
    <section className="w-full mt-10">
      {/* Divider */}
      <div className="flex items-center gap-16">
        <div className=" h-px flex-1 bg-[#85806C]" />
        <span className="text-2xl text-[#85806C]">Or</span>
        <div className="h-px flex-1 bg-[#85806C]" />
      </div>

      {/* Alternative authentication options can be added here */}
      <div className="flex justify-between gap-4 mt-8">
        <button
          type="button"
          aria-label="Continue with Google"
          className="flex items-center justify-center h-[52px] w-[118px] rounded-2xl border border-[#E8E3D2] p-5 hover:bg-stone-100 transition"
        >
          <span className="text-3xl text-green-900">G</span>
        </button>

        <button
          type="button"
          aria-label="Continue with Facebook"
          className="flex items-center justify-center h-[52px] w-[118px] rounded-2xl border border-[#E8E3D2] p-5 hover:bg-stone-100 transition"
        >
          <span className="text-3xl text-green-900">F</span>
        </button>

        <button
          type="button"
          aria-label="Continue with Vips"
          className="flex items-center justify-center h-[52px] w-[118px] rounded-2xl border border-[#E8E3D2] p-5 hover:bg-stone-100 transition"
        >
          <span className="text-3xl text-green-900">V</span>
        </button>
      </div>

      {/* Login / Register Links */}
      <p className="mt-12 text-center text-lg">
        {isLogin ? "Don't have an account yet?" : 'Already have an account?'}

        <Link
          href={isLogin ? '/register' : '/login'}
          className="ml-2 text-[#155535] underline hover:text-green-700"
        >
          {isLogin ? 'Register here!' : 'Log in here!'}
        </Link>
      </p>
    </section>
  );
}
