"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import type { RecipeFormSectionProps } from "@/app/types/recipeForm";
import { RecipeFormSection } from "@/app/components/features/RecipeFormSection";
import { FormField } from "@/app/components/ui/FormField";
import { TextAreaField } from "@/app/components/ui/TextAreaField";

// Only http and https URLs are previewed, so text like "pizza" doesn't try to load
function isImageUrl(value: string) {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function RecipeFormBasics({ values, onChange }: RecipeFormSectionProps) {
  // Track which URL failed so the error clears automatically when the URL changes
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const src = values.imageUrl.trim();
  const showPreview = isImageUrl(src) && src !== failedSrc;
  const hasFailed = isImageUrl(src) && src === failedSrc;

  return (
    <RecipeFormSection title="Basics">
      <div className="flex flex-col gap-6">
        {/* One column on mobile, two columns of 348px with 24px between on desktop */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <FormField
              size="sm"
              label="Title"
              required
              placeholder="E.g. Pizza"
              value={values.title}
              onChange={(e) => onChange({ title: e.target.value })}
            />
            <TextAreaField
              label="Short description"
              required
              rows={3}
              placeholder="One or two sentences about the dish"
              value={values.description}
              onChange={(e) => onChange({ description: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              size="sm"
              label="Image URL"
              type="url"
              inputMode="url"
              placeholder="https://"
              value={values.imageUrl}
              onChange={(e) => onChange({ imageUrl: e.target.value })}
            />

            <div className="relative flex h-[145px] items-center justify-center overflow-hidden rounded-lg bg-mint-500">
              {showPreview ? (
                <Image
                  src={src}
                  // The preview only shows the image the user just pasted,
                  // so it doesn't need its own description
                  alt=""
                  fill
                  sizes="(min-width: 768px) 348px, 100vw"
                  // Recipe images come from any host, same as RecipeHero
                  unoptimized
                  className="object-cover"
                  onError={() => setFailedSrc(src)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 px-4 text-center text-xs leading-none text-primary md:text-sm">
                  <ImagePlus aria-hidden="true" className="size-6" />
                  {/* Read by screen readers when it changes, e.g. when the image fails */}
                  <p role="status">
                    {hasFailed
                      ? "Couldn't load the image. Check the URL."
                      : "Paste an image URL to see a preview"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <FormField
          size="sm"
          label="Image description"
          placeholder="E.g. Pasta in a white bowl with lemon"
          helperText="Helps people using screen readers. Describe the dish."
          value={values.imageAlt}
          onChange={(e) => onChange({ imageAlt: e.target.value })}
        />
      </div>
    </RecipeFormSection>
  );
}
