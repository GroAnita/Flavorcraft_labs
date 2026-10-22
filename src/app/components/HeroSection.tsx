import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full z-10 bg-salt-500 pt-6 md:flex md:aspect-595/219 md:items-center md:pt-0 md:pb-6">
      <div className="relative z-10 container mx-auto px-6">
        <p className="text-xs uppercase tracking-wide font-medium text-basil-300 md:text-sm">
          Let&apos;s make something delicious
        </p>
        <h1 className="mt-1 text-[2.5rem] leading-tight font-bold text-basil-500 md:text-5xl">
          Good food starts here.
        </h1>
        <p className="mt-4 max-w-md text-lg leading-snug font-medium text-truffle-400 md:text-xl">
          Discover your next favourite meal, find inspiration for tonight, and
          make something delicious.
        </p>
        {/* Link navigates inside the app without reloading the whole page */}
        <Link
          href="/recipes"
          className="mt-6 inline-flex h-9 items-center rounded-md bg-basil-500 px-4 font-semibold text-salt-500 transition-colors hover:bg-basil-600"
        >
          Look at recipes
        </Link>
      </div>

      {/* Mobile */}
      <Image
        src="/Header-Image-Mobile.png"
        alt=""
        width={402}
        height={220}
        sizes="100vw"
        priority
        className="mt-2 block h-auto w-full md:hidden"
      />

      {/* Desktop */}
      <Image
        src="/Header-Image-Desktop.png"
        alt=""
        width={922}
        height={379}
        sizes="64vw"
        priority
        className="pointer-events-none absolute right-0 bottom-[-2.1vw] z-10 hidden h-auto w-[64%] md:block"
      />
    </section>
  );
}
