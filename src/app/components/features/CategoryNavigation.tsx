import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    name: 'Breakfast',
    image: '/images/categories/breakfast.jpg',
    slug: 'breakfast',
  },
  {
    name: 'Lunch',
    image: '/images/categories/lunch.jpg',
    slug: 'lunch',
  },
  {
    name: 'Dinner',
    image: '/images/categories/dinner.jpg',
    slug: 'dinner',
  },
  {
    name: 'Snack',
    image: '/images/categories/snack.jpg',
    slug: 'snack',
  },
  {
    name: 'Dessert',
    image: '/images/categories/dessert.jpg',
    slug: 'dessert',
  },
  {
    name: 'Drink',
    image: '/images/categories/drink.jpg',
    slug: 'drink',
  },
];
export default function CategoryNavigation() {
  return (
    <section className="w-full py-12">
      <h2 className="mb-10 text-center text-truffle-500 text-3xl font-bold">
        What's on your plate today?
      </h2>

      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover"
                />
              </div>

              <span className="text-lg text-basil-500 group-focus-visible:underline">{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
