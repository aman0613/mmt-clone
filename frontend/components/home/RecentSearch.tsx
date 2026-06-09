"use client";

export type RecentSearchItem = {
  from: string;
  to: string;
  departureDate: string;
  travellers: number;
  travelClass: string;
};

type RecentSearchProps = {
  searches: RecentSearchItem[];
  onSelectSearch: (search: RecentSearchItem) => void;
};

export default function RecentSearch({
  searches,
  onSelectSearch,
}: RecentSearchProps) {
  if (searches.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="mb-3 text-lg font-semibold">Recent Searches</h2>

      <div className="flex flex-wrap gap-3">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSelectSearch(search)}
            className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50"
          >
            {search.from} → {search.to}
          </button>
        ))}
      </div>
    </div>
  );
}
