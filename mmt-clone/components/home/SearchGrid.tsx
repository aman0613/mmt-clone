"use client";

import { useState } from "react";

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chandigarh",
  "Pune",
];

type SearchGridProps = {
  fromCity: string;
  toCity: string;
  setFromCity: React.Dispatch<React.SetStateAction<string>>;
  setToCity: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchGrid({
  fromCity,
  toCity,
  setFromCity,
  setToCity,
}: SearchGridProps) {
  const [departureDate, setDepartureDate] = useState("2026-05-25");
  const [travellers, setTravellers] = useState("1 Adult");

  return (
    <div className="mt-6 grid h-[95px] grid-cols-4 overflow-visible rounded-xl border border-gray-300">
      {/* FROM */}

      <div className="relative border-r px-4 py-4 transition hover:bg-gray-50">
        <p className="text-xs text-gray-500">From</p>

        <select
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
          className="mt-2 w-full cursor-pointer appearance-none bg-transparent text-3xl font-bold outline-none"
        >
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>

        <button
          onClick={() => {
            const temp = fromCity;
            setFromCity(toCity);
            setToCity(temp);
          }}
          className="absolute top-1/2 right-[-16px] z-20 h-8 w-8 -translate-y-1/2 rounded-full border bg-white shadow-md"
        >
          ⇄
        </button>
      </div>

      {/* TO */}

      <div className="border-r px-4 py-4 hover:bg-gray-50">
        <p className="text-xs text-gray-500">To</p>

        <select
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
          className="mt-2 w-full appearance-none bg-transparent text-3xl font-bold outline-none"
        >
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* DATE */}

      <div className="border-r px-4 py-5 hover:bg-gray-50">
        <p className="text-xs text-gray-500">Departure</p>

        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="mt-3 text-2xl font-bold outline-none"
        />
      </div>

      {/* TRAVELLERS */}

      <div className="px-4 py-5 hover:bg-gray-50">
        <p className="text-xs text-gray-500">Travellers & Class</p>

        <select
          value={travellers}
          onChange={(e) => setTravellers(e.target.value)}
          className="mt-3 appearance-none bg-transparent text-3xl font-bold outline-none"
        >
          <option>1 Adult</option>
          <option>2 Adults</option>
          <option>3 Adults</option>
          <option>4 Adults</option>
        </select>

        <p className="mt-1 text-xs text-gray-500">Economy</p>
      </div>
    </div>
  );
}
