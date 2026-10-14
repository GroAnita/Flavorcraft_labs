import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center my-auto text-center mx-4">
      <Image
        src="/404-image.svg"
        alt="404"
        width={301}
        height={114}
        loading="eager"
        className="mb-6"
      />
      <h1 className="text-[40px] text-truffle-500">
        We couldn't find that page
      </h1>
      <p className="text-oat-800">
        The recipe may have been removed, or the link has a typo.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Link
          className="inline-flex items-center gap-2 text-salt-500 bg-basil-500 rounded-lg py-2 px-4 hover:"
          href="/"
        >
          <ArrowLeft className="size-4" /> Go back home
        </Link>
        <Link
          className="inline-flex items-center gap-2 text-basil-500 rounded-lg py-2 px-4 border-2 border-basil-500 "
          href="/favorites"
        >
          <Heart className="size-4" /> Open favorites
        </Link>
      </div>
    </div>
  );
}
