"use client";

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chandigarh",
  "Pune",
  "Goa",
  "Kolkata",
  "Chennai",
  "Jaipur",
  "Ahmedabad",
];

type Props = {
  search: string;
  setSearch: (value: string) => void;
  setSelected: (value: string) => void;
};

export default function CityDropdown({
  search,
  setSearch,
  setSelected,
}: Props) {
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-full left-0 z-50 mt-2 w-72 rounded-2xl bg-white p-3 shadow-xl"
    >
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search city..."
        className="w-full rounded-xl border p-3 outline-none"
      />

      <div className="mt-3 max-h-60 overflow-y-auto">
        {filteredCities.length === 0 ? (
          <div className="p-3 text-sm text-gray-500">No cities found</div>
        ) : (
          filteredCities.map((city) => (
            <div
              key={city}
              onClick={() => {
                setSelected(city);
                setSearch(city);
              }}
              className="cursor-pointer rounded-lg p-3 hover:bg-gray-100"
            >
              {city}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
