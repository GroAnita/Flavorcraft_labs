"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Badge } from "@/app/components/ui/Badge";

type RecipeImageProps = {
  src?: string | null;
  alt: string;
  category?: string;
};

export function RecipeImage({ src, alt, category }: RecipeImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-2/1 w-full overflow-hidden bg-oat-300">
      {src && !hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          // Recipe images come from any host, so skip the optimizer's remotePatterns check
          unoptimized
          className="object-cover"
          onError={() => setHasError(true)}
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
