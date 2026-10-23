// Shown while the recipes are fetched on the server.
// min-h-svh keeps it at least as tall as the screen, so Next.js scrolls to the top
// when coming from far down another page (see recipes/[id]/loading.tsx, #274)
export default function RecipesLoading() {
  return (
    <main
      aria-busy="true"
      className="flex min-h-svh flex-1 flex-col bg-salt-500"
    >
      <div className="container mx-auto flex flex-col gap-8 px-6 py-8 md:flex-row">
        <p className="sr-only" role="status">
          Loading recipes…
        </p>
        <div className="hidden h-96 rounded-lg bg-oat-300 motion-safe:animate-pulse md:block md:w-80.5 md:shrink-0" />
        <ul className="grid flex-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <li
              key={index}
              className="h-80 rounded-2xl bg-oat-300 motion-safe:animate-pulse"
            />
          ))}
        </ul>
      </div>
    </main>
  );
}
