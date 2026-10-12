import Image from "next/image";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  heading: string;
  description: string;
  imageSrc: string;
  children: ReactNode;
};

export default function AuthLayout({
  heading,
  description,
  imageSrc,
  children,
}: AuthLayoutProps) {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:py-10">
      <div className="relative aspect-2/1 overflow-hidden rounded-2xl md:aspect-3/4">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <section className="w-full md:max-w-sm">
        <h1>{heading}</h1>
        <p>{description}</p>
        <div className="mt-6">{children}</div>
      </section>
    </div>
  );
}
