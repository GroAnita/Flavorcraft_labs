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
      <section className="w-full md:max-w-sm md:justify-self-center">
        <h1 className="text-3xl md:text-4xl">{heading}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6">{children}</div>
      </section>
    </main>
  );
}
