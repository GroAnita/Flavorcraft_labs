import { CategoryItem } from "../ui/CategoryItem";

const categories = [
  {
    name: "Breakfast",
    image: "/images/categories/breakfast.jpg",
    slug: "breakfast",
  },
  {
    name: "Lunch",
    image: "/images/categories/lunch.jpg",
    slug: "lunch",
  },
  {
    name: "Dinner",
    image: "/images/categories/dinner.jpg",
    slug: "dinner",
  },
  {
    name: "Snack",
    image: "/images/categories/snack.jpg",
    slug: "snack",
  },
  {
    name: "Dessert",
    image: "/images/categories/dessert.jpg",
    slug: "dessert",
  },
  {
    name: "Drink",
    image: "/images/categories/drink.jpg",
    slug: "drink",
  },
];
export default function CategoryNavigation() {
  return (
    <section className="w-full py-12">
      <h2 className="mb-10 text-center text-truffle-500 text-3xl font-bold">
        What&apos;s on your plate today?
      </h2>

      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <li key={category.slug}>
            <CategoryItem
              name={category.name}
              image={category.image}
              href={`/categories/${category.slug}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
