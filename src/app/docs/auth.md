# Authenticated API requests

Use `authFetch()` from `src/app/lib/api.ts` for requests that require login.

## Which headers are needed

| Endpoint type                             | Access token | API key |
| ----------------------------------------- | ------------ | ------- |
| `POST /auth/register`, `POST /auth/login` | No           | No      |
| `POST /auth/create-api-key`               | Yes          | No      |
| Other requests that require login         | Yes          | Yes     |

`authFetch()` adds `Authorization: Bearer <token>` and `X-Noroff-API-Key` for you.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Replace the placeholder with your own Noroff API key (create one at https://docs.noroff.dev/docs/v2/auth/api-key).
3. Restart the dev server.

`.env.local` is ignored by Git. Never commit your key, and never log tokens or keys.

## Usage

`API_KEY` has no `NEXT_PUBLIC_` prefix, so it is only available on the server. Call `authFetch()` from Server Components or route handlers, not from `"use client"` components.

```ts
import { authFetch, AuthError } from "./lib/api";

const response = await authFetch("/some/protected/path", accessToken);
if (!response.ok) throw new Error("Request failed");
const json = await response.json();
return json.data;
```

Pass `{ method, body }` as the third argument for POST, PUT and DELETE requests.

## Errors

- `AuthError('You need to log in to do this.')`: no access token was provided.
- `AuthError('Your session has expired. Please log in again.')`: the API responded with 401.
- `Error('API key is not configured.')`: `API_KEY` is missing in `.env.local`.

Catch `AuthError` in the UI and show the message together with a link to the login page.
