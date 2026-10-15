import Image from 'next/image';
import Link from 'next/link';

type CategoryItemProps = {
  name: string;
  image: string;
  href: string;
};

export function CategoryItem({ name, image, href }: CategoryItemProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
          className="object-cover"
        />
      </div>

      <span className="text-lg text-basil-500 group-focus-visible:underline">
        {name}
      </span>
    </Link>
  );
}
