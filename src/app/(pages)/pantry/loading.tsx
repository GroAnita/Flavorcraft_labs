// Shown while the pantry loads, so an empty pantry is never shown by mistake
export default function PantryLoading() {
  return (
    <main
      aria-busy="true"
      className="mx-auto flex w-full max-w-360 flex-1 flex-col gap-6 px-4 pt-8 pb-20 md:px-10 md:pt-12"
    >
      <p className="sr-only" role="status">
        Loading your pantry…
      </p>
      <div className="h-10 w-48 rounded-lg bg-oat-300 motion-safe:animate-pulse" />
      <div className="h-40 rounded-lg bg-oat-300 motion-safe:animate-pulse" />
      <div className="h-96 rounded-lg bg-oat-300 motion-safe:animate-pulse" />
    </main>
  );
}
