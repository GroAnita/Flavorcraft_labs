"use client";

import { useState } from "react";
import Image from "next/image";

type ProfileBannerProps = {
  src?: string | null;
  // Decorative by default, since the profile details are shown as text below it
  alt?: string;
};

export function ProfileBanner({ src, alt = "" }: ProfileBannerProps) {
  // Track which URL failed so the error clears automatically when the URL changes
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = src && src !== failedSrc;

  return (
    // The gradient is the fallback when there is no cover image or it fails to load
    <div
      className="relative h-[124px] w-full"
      style={{
        background:
          "radial-gradient(ellipse at 68% 18%, #efb33b 0%, transparent 38%), radial-gradient(ellipse at 95% 48%, #215b3c 0%, transparent 35%), radial-gradient(ellipse at 41% 100%, #b7d38d 0%, transparent 60%), linear-gradient(115deg, #f8f7ed 0%, #edf0d8 50%, #fff 100%)",
      }}
    >
      {showImage && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 322px, 100vw"
          // Banners come from any host, so skip the optimizer's remotePatterns check
          unoptimized
          className="object-cover"
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}
