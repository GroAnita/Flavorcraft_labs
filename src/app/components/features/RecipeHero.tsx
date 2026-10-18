"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { RecipeImage as RecipeImageData } from "@/app/types/recipe";

type RecipeHeroProps = {
  image?: RecipeImageData | null;
  children: ReactNode;
};

export function RecipeHero({ image, children }: RecipeHeroProps) {
  // Track which URL failed so the error clears automatically when the URL changes
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = image?.url;
  const hasError = src === failedSrc;

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl md:flex-row">
      <div className="relative h-87.5 w-full bg-oat-300 md:h-auto md:w-11/20">
        {src && !hasError ? (
          <Image
            src={src}
            alt={image.alt}
            fill
            priority
            // Recipe images come from any host, so skip the optimizer's remotePatterns check
            unoptimized
            className="object-cover"
            onError={() => setFailedSrc(src)}
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center text-muted-foreground"
          >
            <ImageOff className="size-10" />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col gap-10 bg-salt-50 p-6 md:w-9/20 md:p-8">
        {children}
      </div>
    </section>
  );
}
