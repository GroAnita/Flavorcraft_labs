import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center text-center mx-4 my-32">
      <Image
        src="/404-image.svg"
        alt="404"
        width={301}
        height={114}
        loading="eager"
        className="mb-6"
      />
      <h1 className="text-[40px] text-truffle-500">
        We couldn&apos;t find that page
      </h1>
      <p className="text-nori-400 text-sm my-4">
        The recipe may have been removed, or the link has a typo.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 ">
        <Link
          className="inline-flex items-center gap-2 text-sm text-salt-500 bg-basil-500 rounded-lg py-2 px-4 transition-colors hover:bg-basil-700"
          href="/"
        >
          <ArrowLeft className="size-4" /> Go back home
        </Link>
        <Link
          className="inline-flex items-center gap-2 text-sm text-basil-500 rounded-lg py-2 px-4 border-2 border-basil-500 transition-colors hover:bg-basil-50"
          href="/favorites"
        >
          <Heart className="size-4" /> Open favorites
        </Link>
      </div>
    </div>
  );
}
