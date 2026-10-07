import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white text-black flex flex-col items-center my-auto text-center">
      <h1 className="text-[28px] font-bold">We couldn't find that page</h1>
      <p className="text-gray-600">
        The recipe may have been removed, or the link has a typo.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Link
          className="text-white bg-black hover:bg-gray-800 rounded-sm py-2 px-4"
          href="/"
        >
          Back to home
        </Link>
        <Link
          className="rounded-sm py-2 px-4 border-2 border-black hover:border-gray-800 "
          href="/favorites"
        >
          Open favorites
        </Link>
      </div>
    </div>
  );
}
