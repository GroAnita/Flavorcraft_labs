# Base URL and endpoints

- `https://v2.api.noroff.dev/`

## Overview

- The recipe API provides CRUD operations for recipes in the Flavorcraft labs.
- Recipes can be viewed without authentication.
- The feed, search and filters needs read only.

## Authentication

- Creating, updating and deleting recipes requires authentication.
- Updating and deleting also require ownership of the recipe

| Method | Endpoint                    | Operation         | Authentication required | Owner only |
| ------ | --------------------------- | ----------------- | ----------------------- | ---------- |
| GET    | `/recipe-book/recipes`      | Get recipes       | No                      | No         |
| GET    | `/recipe-book/recipes/<id>` | Get single recipe | No                      | No         |
| POST   | `/recipe-book/recipes`      | Create recipe     | Yes                     | No         |
| PUT    | `/recipe-book/recipes/<id>` | Update recipe     | Yes                     | Yes        |
| DELETE | `/recipe-book/recipes/<id>` | Delete recipe     | Yes                     | Yes        |

Other:
| Method | Endpoint | Operation | Authentication required | Owner only |
| ------ | ------------------------------------------ | --------------------- | ----------------------- | ---------- |
| GET | `/recipe-book/recipes/<recipeId>/comments` | Retrieve comments | No | No |
| POST | `/recipe-book/recipes/<recipeId>/comments` | Create comment | Yes | No |
| GET | `/recipe-book/pantry` | Get pantry items | Yes | No |
| POST | `/recipe-book/pantry` | Create pantry items | Yes | Yes |
| PUT | `/recipe-book/pantry/<id>` | Update pantry item | Yes | Yes |
| DELETE | `/recipe-book/pantry/<id>` | Delete pantry item | Yes | Yes |
| GET | `/recipe-book/favorites ` | Get all favorites | Yes | No |
| POST | `/recipe-book/favorites ` | Add to favorite | Yes | No |
| DELETE | `/recipe-book/favorites` | Remove from favorites | Yes | No |
| PUT | `/recipe-book/comments/<id>` | Update comment | Yes | Yes |
| DELETE | `/recipe-book/comments/<id>` | Delete comment | Yes | Yes |
| GET | `/recipe-book/meal-plans` | Get all meal plans | Yes | No |
| POST | `/recipe-book/meal-plans` | Create meal plan | Yes | No |
| DELETE | `/recipe-book/meal-plans` | Delete meal plan | Yes | Yes |

## Fields

- Recipe: id, title, description, prepTime, cookTime, servings, difficulty, category, ingredients (object of name, quantity, unit), instructions (array of strings), tags, image (url and alt), owner, comments, \_count (favorites), created/updated dates.
- Comment: id, text, recipeId, author, created/updated dates.
- Pantry: id, name, quantity, unit, category, owner, created/updated dates.
- Favorites: id, recipeId, recipe, owner, created.
- Meal Plans: id, recipeId, recipe, date, mealType, owner, created

## Pagination and sorting

- Pagination: limit default at 100 and page default at 1.
- Sorting: sort is available by any property, and sortOrder can be asc or the default desc.
- The response includes a meta object with currentPage, nextPage, pageCount, totalCount and isLastPage, which will be needed for "load more" or page buttons.

## Search

- Searchable fields:

- `title`
- `description`
- `category`
- `tags`

API-side search support still needs to be verified.

## Category filtering

The `category` field can be used for category filtering.

## Fetching recipes

Use `fetchRecipes()` from `src/app/lib/recipe.ts` to get the recipe list.

```ts
import { fetchRecipes } from './lib/recipe';
```

- **Returns:** `Promise<Recipe[]>`, the array of recipes (the `Recipe` type is in `src/app/types/recipe.ts`).
- **Authentication:** none. The endpoint is public.
- **Errors:** throws `Error('Failed to fetch recipes')` if the API responds with a non-OK status.
- **Response wrapper:** the API responds with `{ data, meta }`. The function returns only `data`, so `meta` (pagination info) is not available yet.
- **Limit:** it fetches one page with the API default of 100 recipes. Pagination, sorting and search are not supported yet.

### Example: list recipes on a page

Call it from a Server Component. Make the component `async` and `await` the result:

```tsx
// src/app/page.tsx
import { fetchRecipes } from './lib/recipe';

export default async function RecipeList() {
  const recipes = await fetchRecipes();
  return (
    <ul>
      {recipes.map((r) => (
        <li key={r.id}>{r.title}</li>
      ))}
    </ul>
  );
}
```

### Things to watch out for

- **`image` can be `null`.** Some recipes have no image, so always check `recipe.image?.url` before using it. Otherwise the page crashes with `Cannot read properties of null (reading 'url')`.
- **Use `<img>`, not `next/image`.** Image URLs are submitted by users and come from many different hosts. `next/image` only allows hosts listed in `next.config.ts`.
- **Some image URLs are broken.** For example, one recipe links to an Imgur album page instead of an image file.
