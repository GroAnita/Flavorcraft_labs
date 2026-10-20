'use client';

import { useState } from 'react';
import Image from 'next/image';

type AvatarSize = 'md' | 'lg' | 'xl';

type AvatarProps = {
  name: string;
  src?: string | null;
  // Pass "" when the name is already shown next to the avatar
  alt?: string;
  size?: AvatarSize;
};

const sizeStyles: Record<
  AvatarSize,
  { box: string; text: string; px: string }
> = {
  md: { box: 'size-12 rounded-lg', text: 'text-xl', px: '48px' },
  lg: { box: 'size-14 rounded-xl', text: 'text-2xl', px: '56px' },
  xl: { box: 'size-22 rounded-xl', text: 'text-4xl', px: '88px' },
};

function getInitial(name: string) {
  // Array.from keeps emoji and other multi-byte characters whole
  const first = Array.from(name.trim())[0];
  return first ? first.toUpperCase() : '?';
}

export function Avatar({ name, src, alt, size = 'md' }: AvatarProps) {
  // Track which URL failed so the error clears automatically when the URL changes
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const label = alt ?? name;
  const isDecorative = label === '';
  const showImage = src && src !== failedSrc;
  const styles = sizeStyles[size];

  return (
    <div
      className={`relative font-aptly shrink-0 overflow-hidden bg-primary ${styles.box}`}
    >
      {showImage ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes={styles.px}
          // Avatars come from any host, so skip the optimizer's remotePatterns check
          unoptimized
          className="object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span
          {...(isDecorative
            ? { 'aria-hidden': true }
            : { role: 'img', 'aria-label': label })}
          className={`flex h-full w-full items-center justify-center text-salt-50 ${styles.text}`}
        >
          {getInitial(name)}
        </span>
      )}
    </div>
  );
}
