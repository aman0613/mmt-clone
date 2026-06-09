"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import SearchGrid from "./SearchGrid";
import RecentSearch, { RecentSearchItem } from "./RecentSearch";
import ExploreBar from "../ExploreBar";

export default function Hero() {
  const [tripType, setTripType] = useState("oneway");
  const [activeTab, setActiveTab] = useState("Flights");

  const router = useRouter();

  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

  const [fromCity, setFromCity] = useState("Delhi");
  const [toCity, setToCity] = useState("Mumbai");

  const [departureDate, setDepartureDate] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");

  useEffect(() => {
    const searches: RecentSearchItem[] = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );

    setRecentSearches(searches);
  }, []);
  const handleRecentSearchClick = (search: RecentSearchItem) => {
    setFromCity(search.from);
    setToCity(search.to);
    setDepartureDate(search.departureDate);
    setTravellers(search.travellers);
    setTravelClass(search.travelClass);
  };
  const [returnDate, setReturnDate] = useState("");
  const handleSearch = () => {
    const newSearch: RecentSearchItem = {
      from: fromCity,
      to: toCity,
      departureDate,
      travellers,
      travelClass,
    };

    const existingSearches: RecentSearchItem[] = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );

    const filteredSearches = existingSearches.filter(
      (search) =>
        !(search.from === newSearch.from && search.to === newSearch.to),
    );

    const updatedSearches = [newSearch, ...filteredSearches].slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

    setRecentSearches(updatedSearches);

    router.push(
      `/flights?from=${fromCity}&to=${toCity}&departure=${departureDate}&return=${returnDate}&travellers=${travellers}&class=${travelClass}`,
    );
  };

  return (
    <section className="relative bg-gradient-to-b from-[#041322] to-[#123456] pt-8 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative mx-auto mt-12 max-w-7xl rounded-2xl bg-white p-8 shadow-xl">
          {/* Trip Type */}

          <div className="mb-6 flex gap-6 text-sm font-medium">
            {["oneway", "round", "multi"].map((type) => (
              <label key={type} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={tripType === type}
                  onChange={() => setTripType(type)}
                />

                {type === "oneway"
                  ? "One Way"
                  : type === "round"
                    ? "Round Trip"
                    : "Multi City"}
              </label>
            ))}
          </div>

          {/* Tabs */}

          <div className="mb-6 border-b border-gray-300">
            <div className="flex gap-8 px-2 pb-4">
              {["Flights", "Hotels", "Homestays", "Trains", "Buses"].map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 font-medium ${
                      activeTab === tab
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {tab}
                  </button>
                ),
              )}
            </div>
          </div>

          <SearchGrid
            fromCity={fromCity}
            toCity={toCity}
            setFromCity={setFromCity}
            setToCity={setToCity}
            tripType={tripType}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            travellers={travellers}
            setTravellers={setTravellers}
            travelClass={travelClass}
            setTravelClass={setTravelClass}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
            onSearch={handleSearch}
          />

          <RecentSearch
            searches={recentSearches}
            onSelectSearch={handleRecentSearchClick}
          />
        </div>
      </div>

      <div className="absolute -bottom-24 left-1/2 z-30 w-full -translate-x-1/2">
        <ExploreBar />
      </div>
    </section>
  );
}
