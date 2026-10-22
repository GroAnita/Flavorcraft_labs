import type { Metadata } from "next";
import Link from "next/link";
import { PantryManager } from "@/app/components/features/PantryManager";
import { AuthError } from "@/app/lib/api";
import { fetchPantry } from "@/app/lib/pantry";
import { fetchRecipes } from "@/app/lib/recipe";
import { getAccessToken } from "@/app/lib/session";
import type { PantryItems, Recipe } from "@/app/types/recipe";

export const metadata: Metadata = {
  title: "Pantry | Flavorcraft",
};

const MAIN =
  "mx-auto flex w-full max-w-360 flex-1 flex-col gap-8 px-6 pt-6 pb-20 md:gap-6 md:px-10 md:pt-12";

function Message({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className={MAIN}>
      <h1 className="text-[2.5rem] leading-none font-medium tracking-[0.01em] text-truffle-500">
        Your pantry
      </h1>
      <div className="flex flex-col items-start gap-4 rounded-lg bg-salt-50 p-6">
        <h2 className="text-2xl leading-none font-medium text-nori-500">
          {title}
        </h2>
        {children}
      </div>
    </main>
  );
}

const LOGIN_LINK =
  "inline-flex h-9 items-center rounded-lg bg-basil-500 px-3 py-1.5 text-sm leading-6 font-semibold text-mint-500 hover:bg-basil-700";

export default async function PantryPage() {
  // The token stays on the server; components only get the pantry items
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return (
      <Message title="Log in to see your pantry">
        <p className="text-sm text-oat-800">
          Keep track of what you have at home and find recipes you can cook.
        </p>
        <Link href="/login" className={LOGIN_LINK}>
          Log in
        </Link>
      </Message>
    );
  }

  let items: PantryItems[];
  try {
    items = await fetchPantry(accessToken);
  } catch (error) {
    if (error instanceof AuthError) {
      return (
        <Message title="Your session has expired">
          <p className="text-sm text-oat-800">Please log in again.</p>
          <Link href="/login" className={LOGIN_LINK}>
            Log in
          </Link>
        </Message>
      );
    }
    return (
      <Message title="We couldn't load your pantry">
        <p role="alert" className="text-sm text-oat-800">
          Please try again in a moment.
        </p>
      </Message>
    );
  }

  // Used for "What can I cook?". The list is cached, so this is quick
  let recipes: Recipe[] = [];
  let recipesFailed = false;
  try {
    recipes = await fetchRecipes();
  } catch {
    recipesFailed = true;
  }

  return (
    <main className={MAIN}>
      <PantryManager
        initialItems={items}
        recipes={recipes}
        recipesFailed={recipesFailed}
      />
    </main>
  );
}
