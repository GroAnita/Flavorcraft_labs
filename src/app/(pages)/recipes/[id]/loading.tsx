// Shown while the recipe is fetched on the server.
// Without this file, the loading.tsx for the recipes grid would be shown instead.
// min-h-svh keeps it at least as tall as the screen. A shorter loading screen pulls the
// scroll position up to its bottom, where its top is still visible, so Next.js skips
// scrolling to the top and the recipe opens at the comments (#274)
export default function RecipeLoading() {
  return (
    <main aria-busy="true" className="flex min-h-svh flex-1 flex-col bg-salt-500">
      <div className="mx-auto flex w-full max-w-359.5 flex-col gap-6 pt-6 pb-20 md:gap-9 md:px-8 md:pt-8 lg:px-16">
        <p className="sr-only" role="status">
          Loading recipe…
        </p>
        <div className="mx-6 h-6 w-64 rounded bg-oat-300 motion-safe:animate-pulse md:mx-0" />
        <div className="flex flex-col overflow-hidden rounded-2xl md:flex-row">
          <div className="h-87.5 w-full bg-oat-300 motion-safe:animate-pulse md:h-111.25 md:w-11/20" />
          <div className="flex w-full flex-col gap-4 bg-salt-50 p-6 md:w-9/20 md:p-8">
            <div className="h-7 w-48 rounded bg-oat-300 motion-safe:animate-pulse" />
            <div className="h-10 w-3/4 rounded bg-oat-300 motion-safe:animate-pulse" />
            <div className="h-5 w-full rounded bg-oat-300 motion-safe:animate-pulse" />
            <div className="h-5 w-2/3 rounded bg-oat-300 motion-safe:animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
