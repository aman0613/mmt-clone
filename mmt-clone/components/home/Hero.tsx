"use client";

import { useState } from "react";
import SearchGrid from "./SearchGrid";
import ExploreBar from "../ExploreBar";

export default function Hero() {
  const [tripType, setTripType] = useState("oneway");
  const [activeTab, setActiveTab] = useState("Flights");
  const [fareType, setFareType] = useState("Regular");

  const [fromCity, setFromCity] = useState("Delhi");
  const [toCity, setToCity] = useState("Mumbai");

  return (
    <section className="relative bg-gradient-to-b from-[#041322] to-[#123456] pt-8 pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative mx-auto mt-12 max-w-7xl rounded-2xl bg-white p-8 shadow-xl">
          {/* Trip Type */}

          <div className="mb-6 flex gap-6 text-sm font-medium">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={tripType === "oneway"}
                onChange={() => setTripType("oneway")}
              />
              One Way
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={tripType === "round"}
                onChange={() => setTripType("round")}
              />
              Round Trip
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={tripType === "multi"}
                onChange={() => setTripType("multi")}
              />
              Multi City
            </label>
          </div>

          {/* Tabs */}

          <div className="mb-6 flex gap-8 border-b pb-4">
            {["Flights", "Hotels", "Homestays", "Trains", "Buses"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 font-medium transition ${
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

          {/* Search Grid */}

          <SearchGrid
            fromCity={fromCity}
            toCity={toCity}
            setFromCity={setFromCity}
            setToCity={setToCity}
          />

          {/* Fare Type */}

          <div className="mt-6">
            <p className="mb-3 text-sm text-gray-500">Select Fare Type</p>

            <div className="flex flex-wrap gap-3">
              {[
                "Regular",
                "Student",
                "Senior Citizen",
                "Armed Forces",
                "Doctor & Nurses",
              ].map((fare) => (
                <button
                  key={fare}
                  onClick={() => setFareType(fare)}
                  className={`rounded-full border px-4 py-2 transition ${
                    fareType === fare
                      ? "bg-blue-500 text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  {fare}
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH BUTTON */}

          <button className="absolute -bottom-14 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-20 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-blue-700">
            SEARCH
          </button>
        </div>
      </div>

      {/* Explore Bar */}

      <div className="absolute -bottom-24 left-1/2 z-30 w-full -translate-x-1/2">
        <ExploreBar />
      </div>
    </section>
  );
}
