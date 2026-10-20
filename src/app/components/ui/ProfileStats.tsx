import type { ProfileStatsData } from '@/app/lib/profile';

type ProfileStatsProps = {
  stats: ProfileStatsData;
};

type Stat = {
  value: number | null;
  label: string;
};

export function ProfileStats({ stats }: ProfileStatsProps) {
  const items: Stat[] = [
    { value: stats.favoritesCount, label: 'Favorites' },
    { value: stats.recipesCount, label: 'Recipes' },
    { value: stats.mealPlansCount, label: 'Meals planned' },
    { value: stats.pantryCount, label: 'Pantry items' },
  ];

  return (
    <dl className="grid w-full grid-cols-2 gap-2 align-center">
      {items.map((stat) => (
        // dt must come before dd in the markup, so flex-col-reverse puts the number on top
        <div
          key={stat.label}
          className="flex flex-col-reverse items-start gap-1 rounded-lg bg-oat-200 px-4 py-4 text-left"
        >
          <dt className="text-base text-nori-500">{stat.label}</dt>
          <dd className="font-aptly text-3xl font-semibold text-primary">
            {stat.value === null ? (
              <>
                <span aria-hidden="true">–</span>
                <span className="sr-only">Not available</span>
              </>
            ) : (
              stat.value.toLocaleString('en-US')
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
