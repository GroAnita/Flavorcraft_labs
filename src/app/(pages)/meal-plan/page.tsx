import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meal planner | Flavorcraft",
};

export default function MealPlannerPage() {
  return (
    // flex-1 fills the space between the header and footer, so the footer
    // stays at the bottom on short pages, and the page grows with its content
    <main className="mx-auto flex w-full max-w-327.5 flex-1 flex-col px-4 pt-17 pb-20 md:pt-30">
      <h1 className="text-center text-[2rem] font-medium leading-none tracking-[0.01em] text-truffle-500 md:text-[40px]">
        Meal planner
      </h1>

      {/* The meal planner content goes here */}
    </main>
  );
}
