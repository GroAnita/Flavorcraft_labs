import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/app/types/breadcrumb';

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-base">
        {items.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={`flex items-center gap-1 ${
                isLast ? 'min-w-0' : 'shrink-0'
              }`}
            >
              {!isFirst && (
                <ChevronRight
                  aria-hidden="true"
                  size={24}
                  strokeWidth={1.5}
                  className="shrink-0 text-nori-400"
                />
              )}

              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  title={item.label}
                  className={
                    isLast
                      ? 'truncate font-semibold text-primary'
                      : 'font-medium text-nori-400'
                  }
                >
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="font-medium text-nori-400">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
