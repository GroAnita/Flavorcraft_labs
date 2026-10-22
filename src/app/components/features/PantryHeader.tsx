'use client';

import { useId } from 'react';
import { Search } from 'lucide-react';

type PantryHeaderProps = {
  totalCount: number;
  outOfStockCount: number;
  search: string;
  onSearchChange: (value: string) => void;
};

export function PantryHeader({
  totalCount,
  outOfStockCount,
  search,
  onSearchChange,
}: PantryHeaderProps) {
  const searchId = useId();

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-[2.5rem] leading-none font-medium tracking-[0.01em] text-truffle-500">
          Your pantry
        </h1>
        <p className="text-base leading-6 text-nori-400">
          {totalCount} {totalCount === 1 ? 'item' : 'items'} &bull;{' '}
          {outOfStockCount} out of stock
        </p>
      </div>

      <div className="relative w-full md:w-140">
        <label htmlFor={searchId} className="sr-only">
          Search pantry items
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-nori-500"
        />
        <input
          id={searchId}
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search items"
          autoComplete="off"
          className="h-11 w-full rounded-lg bg-salt-100 py-3 pr-3 pl-9 text-sm leading-none tracking-[0.01em] text-nori-500 inset-shadow-sm placeholder:text-nori-500"
        />
      </div>
    </div>
  );
}
