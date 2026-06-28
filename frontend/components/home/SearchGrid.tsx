"use client";

import { useState, useEffect } from "react";
import CityDropdown from "../CityDropdown";
import TravellerPopup from "./TravellerPopup";

const fares = [
  "Regular",
  "Student",
  "Senior Citizen",
  "Armed Forces",
  "Doctor & Nurses",
];

type SearchGridProps = {
  fromCity: string;
  toCity: string;
  setFromCity: React.Dispatch<React.SetStateAction<string>>;
  setToCity: React.Dispatch<React.SetStateAction<string>>;
  tripType: string;

  departureDate: string;
  setDepartureDate: React.Dispatch<React.SetStateAction<string>>;

  travellers: number;
  setTravellers: React.Dispatch<React.SetStateAction<number>>;

  returnDate: string;
  setReturnDate: React.Dispatch<React.SetStateAction<string>>;

  travelClass: string;
  setTravelClass: React.Dispatch<React.SetStateAction<string>>;

  onSearch: () => void;
};

export default function SearchGrid({
  fromCity,
  toCity,
  setFromCity,
  setToCity,
  tripType,
  departureDate,
  setDepartureDate,
  travellers,
  setTravellers,
  travelClass,
  setTravelClass,
  returnDate,
  setReturnDate,
  onSearch,
}: SearchGridProps) {
  const [showFromDropdown, setShowFromDropdown] = useState(false);

  const [showToDropdown, setShowToDropdown] = useState(false);

  const [fromSearch, setFromSearch] = useState("");

  const [toSearch, setToSearch] = useState("");

  const [showTraveller, setShowTraveller] = useState(false);

  const [adults, setAdults] = useState(travellers);

  const [children, setChildren] = useState(0);

  const [infants, setInfants] = useState(0);

  const [fareType, setFareType] = useState("Regular");

  useEffect(() => {
    setTravellers(adults + children + infants);
  }, [adults, children, infants, setTravellers]);

  const swapCities = () => {
    const temp = fromCity;

    setFromCity(toCity);
    setToCity(temp);
  };
  useEffect(() => {
    if (returnDate && departureDate && returnDate < departureDate) {
      setReturnDate(departureDate);
    }
  }, [departureDate, returnDate, setReturnDate]);

  return (
    <div className="rounded-3xl bg-white p-6">
      {" "}
      <div className="relative">
        {" "}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div
            className="relative cursor-pointer rounded-2xl border p-4"
            onClick={() => {
              setFromSearch("");
              setShowFromDropdown(true);
              setShowToDropdown(false);
            }}
          >
            {" "}
            <p className="text-sm text-gray-500">From</p>
            <h2 className="mt-1 text-xl font-bold">{fromCity}</h2>
            {showFromDropdown && (
              <CityDropdown
                search={fromSearch}
                setSearch={setFromSearch}
                setSelected={(city) => {
                  setFromCity(city);
                  setFromSearch("");
                  setShowFromDropdown(false);
                }}
              />
            )}
          </div>

          <div
            className="relative cursor-pointer rounded-2xl border p-4"
            onClick={() => {
              setToSearch("");
              setShowToDropdown(true);
              setShowFromDropdown(false);
            }}
          >
            <p className="text-sm text-gray-500">To</p>

            <h2 className="mt-1 text-xl font-bold">{toCity}</h2>

            {showToDropdown && (
              <CityDropdown
                search={toSearch}
                setSearch={setToSearch}
                setSelected={(city) => {
                  setToCity(city);
                  setToSearch("");
                  setShowToDropdown(false);
                }}
              />
            )}
          </div>

          <div className="rounded-2xl border p-4">
            <p className="text-sm text-gray-500">Departure</p>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="mt-2 w-full outline-none"
            />
          </div>
          {tripType === "round" && (
            <div className="rounded-2xl border p-4">
              <p className="text-sm text-gray-500">Return</p>

              <input
                type="date"
                min={departureDate || new Date().toISOString().split("T")[0]}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="mt-2 w-full outline-none"
              />
            </div>
          )}

          <div
            className="relative cursor-pointer rounded-2xl border p-4"
            onClick={() => setShowTraveller(true)}
          >
            <p className="text-sm text-gray-500">Travellers & Class</p>

            <h2 className="mt-1 text-xl font-bold">{travellers} Traveller</h2>

            <p className="text-sm text-gray-500">{travelClass}</p>

            {showTraveller && (
              <TravellerPopup
                adults={adults}
                children={children}
                infants={infants}
                setAdults={setAdults}
                setChildren={setChildren}
                setInfants={setInfants}
                travelClass={travelClass}
                setTravelClass={setTravelClass}
                onClose={() => setShowTraveller(false)}
              />
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            swapCities();
          }}
          className="absolute top-8 left-1/4 z-20 hidden h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border bg-white shadow-md md:flex"
        >
          ⇄
        </button>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {fares.map((fare) => (
          <button
            key={fare}
            onClick={() => setFareType(fare)}
            className={`rounded-full border px-4 py-2 ${
              fareType === fare ? "bg-blue-500 text-white" : ""
            }`}
          >
            {fare}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={onSearch}
          className="rounded-full bg-blue-600 px-20 py-3 text-lg font-bold text-white"
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}
