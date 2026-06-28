"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchGrid from "../../components/home/SearchGrid";
import { getFlights } from "@/services/flightService";
import { Flight } from "@/types/flight";
import FlightCard from "../../components/flight/FlightCard";

export default function FlightsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const departure = searchParams.get("departure");
  const returnDate = searchParams.get("return");
  const travellers = searchParams.get("travellers");
  const travelClass = searchParams.get("class");

  const [fromCity, setFromCity] = useState(from || "");

  const [toCity, setToCity] = useState(to || "");

  const [departureDate, setDepartureDate] = useState(departure || "");

  const [returnFlightDate, setReturnFlightDate] = useState(returnDate || "");

  const [travellerCount, setTravellerCount] = useState(Number(travellers) || 1);

  const [selectedClass, setSelectedClass] = useState(travelClass || "Economy");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  const [nonStopOnly, setNonStopOnly] = useState(false);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("price");
  const [tripType, setTripType] = useState(
    returnFlightDate ? "round" : "oneway",
  );
  const handleSearch = () => {
    const params = new URLSearchParams({
      from: fromCity,
      to: toCity,
      departure: departureDate,
      travellers: travellerCount.toString(),
      class: selectedClass,
    });

    if (tripType === "round" && returnFlightDate) {
      params.set("return", returnFlightDate);
    }

    router.push(`/flights?${params.toString()}`);
  };
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);

        const data = await getFlights({
          from: from ?? undefined,
          to: to ?? undefined,
          stops: nonStopOnly ? 0 : undefined,
          maxPrice,
          airlines: selectedAirlines,
          sortBy: sortBy === "duration" ? "duration" : "price",
          sortOrder: sortBy === "price_desc" ? "desc" : "asc",
        });

        setFlights(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [from, to, nonStopOnly, maxPrice, selectedAirlines, sortBy]);
  useEffect(() => {
    if (tripType === "oneway") {
      setReturnFlightDate("");
    }
  }, [tripType]);

  const handleAirlineChange = (airline: string) => {
    setSelectedAirlines((currentAirlines) => {
      if (currentAirlines.includes(airline)) {
        return currentAirlines.filter(
          (selectedAirline) => selectedAirline !== airline,
        );
      }

      return [...currentAirlines, airline];
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Summary */}
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
      <SearchGrid
        fromCity={fromCity}
        toCity={toCity}
        setFromCity={setFromCity}
        setToCity={setToCity}
        tripType={tripType}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        travellers={travellerCount}
        setTravellers={setTravellerCount}
        returnDate={returnFlightDate}
        setReturnDate={setReturnFlightDate}
        travelClass={selectedClass}
        setTravelClass={setSelectedClass}
        onSearch={handleSearch}
      />

      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold">
          {fromCity} → {toCity}
        </h1>

        <p className="mt-2 text-gray-500">
          {departureDate}
          {returnFlightDate && ` → ${returnFlightDate}`} •{travellerCount}{" "}
          Traveller • {selectedClass}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-12 gap-6">
        {/* Filters */}

        <div className="col-span-3 h-fit rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-6 text-xl font-bold">Filters</h2>

          <label className="flex gap-3">
            <input
              type="checkbox"
              checked={nonStopOnly}
              onChange={() => setNonStopOnly(!nonStopOnly)}
            />
            Non Stop only
          </label>
          <div className="mt-6">
            <h3 className="mb-3 font-semibold">Airlines</h3>

            {["IndiGo", "Air India", "Vistara", "Akasa Air", "SpiceJet"].map(
              (airline) => (
                <label key={airline} className="mb-2 flex gap-3">
                  <input
                    type="checkbox"
                    checked={selectedAirlines.includes(airline)}
                    onChange={() => handleAirlineChange(airline)}
                  />
                  {airline}
                </label>
              ),
            )}
          </div>
          <div className="mt-6">
            <p>Max Price: ₹{maxPrice}</p>

            <input
              type="range"
              min="3000"
              max="10000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Results */}

        <div className="col-span-9">
          <div className="mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border p-2"
            >
              <option value="price">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>

              <option value="duration">Duration</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center">Loading flights...</div>
          ) : (
            <div className="space-y-4">
              {flights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  from={from}
                  to={to}
                  travellerCount={travellerCount}
                  departureDate={departureDate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
