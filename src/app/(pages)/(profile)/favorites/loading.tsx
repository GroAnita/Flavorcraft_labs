// Shown inside the profile layout while the favorites load
export default function FavoritesLoading() {
  return (
    <>
      <p role="status" className="sr-only">
        Loading your favorites…
      </p>
      <ul aria-hidden="true" className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <li
            key={item}
            className="flex animate-pulse flex-col overflow-hidden rounded-2xl bg-surface motion-reduce:animate-none"
          >
            <div className="aspect-2/1 bg-oat-300" />
            <div className="flex flex-col gap-4 p-4">
              <div className="h-5 w-2/3 rounded bg-oat-300" />
              <div className="h-7 w-4/5 rounded bg-oat-300" />
              <div className="h-4 w-full rounded bg-oat-200" />
              <div className="flex gap-2">
                <div className="h-6 w-14 rounded-full bg-oat-200" />
                <div className="h-6 w-14 rounded-full bg-oat-200" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
