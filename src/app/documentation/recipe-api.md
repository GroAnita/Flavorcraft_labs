# Base URL and endpoints

- The v2 base URL is `https://v2.api.noroff.dev/`, and the recipe list is at
  `GET /recipe-book-recipes`, with a single recipe at
  `GET /recipe-book/recipes/<id>`.
  Furthermore

## Overview

- The recipe API provides CRUD operations for recipes in the Flavorcraft labs.
- Recipes can be viewed without authentication.
- The feed, search and filters needs read only.

## Authentication

- Creating, updating and deleting recipes requires authentication.
- Updating and deleting also require ownership of the recipe

| Operation             | Authentication required | Owner only |
| --------------------- | ----------------------- | ---------- |
| Get recipes           | No                      | No         |
| Get single recipe     | No                      | No         |
| Create recipe         | Yes                     | No         |
| Update recipe         | Yes                     | Yes        |
| Delete recipe         | Yes                     | Yes        |
| Pantry items          | Yes                     | No         |
| Create pantry item    | Yes                     | Yes        |
| Update pantry item    | Yes                     | Yes        |
| Delete pantry item    | Yes                     | Yes        |
| Add favorite          | Yes                     | No         |
| Get all favorites     | Yes                     | No         |
| Remove from favorites | Yes                     | No         |

## Fields

- A recipe has id, title, description, prepTime, cookTime, servings, difficulty, category, ingredients (object of name, quantity, unit), instructions (array of strings), tags, image (url and alt), owner, comments, \_count (favorites), created/updated dates.
- Adding a comment uses id, text, recipeId, author, created/updated dates

## Pagination and sorting

- Pagination: limit default at 100 and page default at 1.
- Sorting: sort is available by any property, and sortOrder can be asc or the default desc.
- The response includes a meta object with currentPage, nextPage, pageCount, totalCount and isLastPage, which will be needed for "load more" or page buttons.

## Search

- Potential searchable fields:

- `title`
- `description`
- `category`
- `tags`

API-side search support still needs to be verified.

## Category filtering

The `category` field can be used for category filtering.

It still needs to be verified whether the API provides server-side category filtering or whether recipes must be retrieved and filtered locally.
