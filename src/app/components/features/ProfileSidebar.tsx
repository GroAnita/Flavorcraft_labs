import Link from 'next/link';
import { LogOut, SquarePen } from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { ProfileStats } from '@/app/components/ui/ProfileStats';
import { Avatar } from '@/app/components/ui/Avatar';
import { ProfileBanner } from '@/app/components/ui/ProfileBanner';

export type ProfileSidebarData = {
  name: string;
  email: string;
  bio?: string | null;
  avatar?: { url?: string | null; alt?: string | null } | null;
  banner?: { url?: string | null; alt?: string | null } | null;
};

type ProfileSidebarProps = {
  profile: ProfileSidebarData;
  favoritesCount: number;
  recipesCount: number;
};

const BUTTON_CLASSES =
  'inline-flex min-h-[36px] w-full max-w-[353px] items-center justify-center gap-2 rounded-lg border border-basil-500 px-4 py-1 font-inter text-sm font-semibold leading-6 tracking-normal text-center text-basil-500 transition-all duration-200 hover:bg-mint-200 hover:shadow-[0_0_12px_0_#00000040] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-basil-500 cursor-pointer motion-reduce:transition-none';

export function ProfileSidebar({
  profile,
  favoritesCount,
  recipesCount,
}: ProfileSidebarProps) {
  return (
    <aside
      aria-label="Your profile"
      className="mx-auto w-full max-w-none px-0 py-2 sm:max-w-[401px] sm:py-6"
    >
      <section className="overflow-hidden rounded-none bg-white shadow-sm sm:rounded-lg">
        <div className="relative">
          <ProfileBanner
            src={profile.banner?.url}
            alt={profile.banner?.alt ?? ''}
          />
          <div className="absolute -bottom-11 left-6 rounded-xl border-[3px] border-white">
            <Avatar
              name={profile.name}
              src={profile.avatar?.url}
              alt=""
              size="xl"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 px-6 pb-4 pt-16">
          <header>
            <h2 className="font-aptly text-3xl font-semibold text-nori-500">
              {profile.name}
            </h2>
            <p className="text-sm text-primary">{profile.email}</p>
          </header>

          <p className="text-sm text-muted-foreground text-oat-800">
            {profile.bio?.trim() || 'No profile description yet.'}
          </p>

          <ProfileStats
            favoritesCount={favoritesCount}
            recipesCount={recipesCount}
          />

          <div className="flex flex-col gap-2">
            <Link href="/profile/edit" className={BUTTON_CLASSES}>
              Edit profile
              <SquarePen aria-hidden="true" className="size-[18px]" />
            </Link>
            <form action={logout}>
              <button type="submit" className={BUTTON_CLASSES}>
                Log out
                <LogOut aria-hidden="true" className="size-[18px]" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </aside>
  );
}
