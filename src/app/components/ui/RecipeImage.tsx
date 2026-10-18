"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";
import type { RecipeImage as RecipeImageData } from "@/app/types/recipe";

type RecipeImageProps = {
  image?: RecipeImageData | null;
  category?: string;
};

export function RecipeImage({ image, category }: RecipeImageProps) {
  // Track which URL failed so the error clears automatically when the URL changes
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = image?.url;
  const hasError = src === failedSrc;

  return (
    <div className="relative h-46.5 w-full overflow-hidden bg-oat-300">
      {src && !hasError ? (
        <Image
          src={src}
          alt={image.alt}
          fill
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
          <ImageOff className="h-10 w-10" />
        </div>
      )}

      {category && (
        <div className="absolute inset-x-3 top-3 flex">
          <Badge variant="category">{category}</Badge>
        </div>
      )}
    </div>
  );
}
