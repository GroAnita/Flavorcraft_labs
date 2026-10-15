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
    <main className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-5 py-6 md:grid-cols-2 md:items-center md:gap-16 md:px-8 md:py-10">
      <div className="relative h-45 overflow-hidden rounded-2xl md:aspect-3/4 md:h-auto">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <section className="flex w-full flex-col gap-6 md:max-w-97 md:justify-self-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl leading-none font-medium text-truffle-500 md:text-4xl">
            {heading}
          </h1>
          <p className="text-sm leading-tight text-oat-800 md:text-lg">
            {description}
          </p>
        </div>
        {children}
      </section>
    </main>
  );
}
