"use client";

import { useState } from "react";
import Image from "next/image";

type AvatarProps = {
  name: string;
  src?: string | null;
  // Pass "" when the name is already shown next to the avatar
  alt?: string;
};

function getInitial(name: string) {
  // Array.from keeps emoji and other multi-byte characters whole
  const first = Array.from(name.trim())[0];
  return first ? first.toUpperCase() : "?";
}

export function Avatar({ name, src, alt }: AvatarProps) {
  // Track which URL failed so the error clears automatically when the URL changes
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const label = alt ?? name;
  const isDecorative = label === "";
  const showImage = src && src !== failedSrc;

  return (
    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-primary">
      {showImage ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes="48px"
          // Avatars come from any host, so skip the optimizer's remotePatterns check
          unoptimized
          className="object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span
          {...(isDecorative
            ? { "aria-hidden": true }
            : { role: "img", "aria-label": label })}
          className="flex h-full w-full items-center justify-center text-xl text-salt-50"
        >
          {getInitial(name)}
        </span>
      )}
    </div>
  );
}
