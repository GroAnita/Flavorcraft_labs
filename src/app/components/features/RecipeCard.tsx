"use client"

import { useState } from "react"
import Link from "next/link"
import type { Recipe } from "@/app/types/recipe"
import { RecipeImage } from "@/app/components/ui/RecipeImage"
import { RecipeMeta } from "@/app/components/features/RecipeMeta"
import { TagList } from "@/app/components/features/TagList"
import { FavoriteButton } from "@/app/components/ui/FavoriteButton"

type RecipeCardProps = {
  recipe: Pick<
    Recipe,
    | "id"
    | "title"
    | "description"
    | "image"
    | "category"
    | "prepTime"
    | "cookTime"
    | "servings"
    | "difficulty"
    | "tags"
  >
  isLoggedIn?: boolean
}

export function RecipeCard({ recipe, isLoggedIn = false }: RecipeCardProps) {
  // Placeholder: saving and removing likes is a separate issue
  const [isLiked, setIsLiked] = useState(false)

  const href = `/recipes/${recipe.id}`
  const title = recipe.title?.trim() || "Untitled recipe"
  const description = recipe.description?.trim()

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-primary">
      <RecipeImage image={recipe.image} category={recipe.category} />

      {/* z-10 keeps the heart above the clickable area of the title link */}
      <FavoriteButton
        className="z-10"
        isLiked={isLiked}
        onToggle={() => setIsLiked((value) => !value)}
        isLoggedIn={isLoggedIn}
      />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <RecipeMeta
          prepTime={recipe.prepTime}
          cookTime={recipe.cookTime}
          servings={recipe.servings}
          difficulty={recipe.difficulty}
        />

        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="-my-1.25 line-clamp-2 wrap-break-word text-2xl font-medium leading-tight text-foreground">
              {/* The ::after layer makes the whole card clickable */}
              <Link
                href={href}
                className="after:absolute after:inset-0 focus-visible:outline-none"
              >
                {title}
              </Link>
            </h3>

            {description && (
              <p className="line-clamp-2 wrap-break-word text-sm leading-5 text-oat-800">
                {description}
              </p>
            )}
          </div>

          <div className="mt-auto">
            <TagList tags={recipe.tags} />
          </div>
        </div>
      </div>
    </article>
  )
}
