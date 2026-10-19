type ProfileStatsProps = {
  favoritesCount: number;
  recipesCount: number;
};

type Stat = {
  value: number;
  label: string;
};

export function ProfileStats({
  favoritesCount,
  recipesCount,
}: ProfileStatsProps) {
  const stats: Stat[] = [
    { value: favoritesCount, label: 'Favorites' },
    { value: recipesCount, label: 'Recipes' },
  ];

  return (
    <dl className="grid w-full max-w-[353px] grid-cols-2 gap-2 align-center">
      {stats.map((stat) => (
        // dt must come before dd in the markup, so flex-col-reverse puts the number on top
        <div
          key={stat.label}
          className="flex flex-col-reverse items-start gap-1 rounded-lg bg-oat-200 px-4 py-4 text-left"
        >
          <dt className="text-base text-muted-foreground text-nori-500">
            {stat.label}
          </dt>
          <dd className="font-aptly text-3xl font-semibold text-primary">
            {stat.value.toLocaleString('en-US')}
          </dd>
        </div>
      ))}
    </dl>
  );
}
