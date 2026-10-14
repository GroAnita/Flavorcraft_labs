import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-salt-500 pt-6 md:flex md:aspect-[595/219] md:items-center md:pt-0 md:pb-6">
      <div className="relative z-10 container mx-auto px-6">
        <p className="text-sm uppercase tracking-wide font-500 text-basil-300">
          Let&apos;s make something delicious
        </p>
        <h1 className="mt-1 text-[2.75rem] leading-tight font-700 text-basil-500">
          Good food starts here.
        </h1>
        <p className="mt-4 max-w-md font-500 text-truffle-400">
          Discover your next favourite meal, find inspiration for tonight, and
          make something delicious.
        </p>
        <a
          href="/recipes"
          className="mt-6 inline-flex h-9 items-center rounded-md bg-basil-500 px-4 font-semibold text-white transition-colors hover:bg-basil-600"
        >
          Look at recipes
        </a>
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
        sizes="56vw"
        priority
        className="absolute right-0 bottom-0 hidden h-auto w-[56%] md:block"
      />
    </section>
  );
}
