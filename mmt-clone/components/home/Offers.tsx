"use client";

import { useState } from "react";

const offers = [
  {
    category: "Flights",
    title: "Flight Offer",
    desc: "Save up to ₹3000 on domestic flights",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500",
  },

  {
    category: "Hotels",
    title: "Hotel Deal",
    desc: "Get 40% OFF on luxury stays",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
  },

  {
    category: "Buses",
    title: "Bus Offer",
    desc: "Flat ₹500 OFF on buses",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500",
  },

  {
    category: "Holidays",
    title: "Holiday Package",
    desc: "Book Goa packages at discounted prices",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500",
  },
];

export default function Offers() {
  const [selected, setSelected] = useState("All");

  const filteredOffers =
    selected === "All"
      ? offers
      : offers.filter((offer) => offer.category === selected);

  return (
    <section className="mx-auto mt-1 max-w-7xl px-6 py-3">
      <h2 className="mb-6 text-3xl font-bold">Offers For You</h2>

      {/* FILTER BUTTONS */}
      <div className="mb-8 flex flex-wrap gap-3">
        {["All", "Flights", "Hotels", "Buses", "Holidays"].map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`rounded-full border px-5 py-2 transition ${
              selected === item
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* OFFERS GRID */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredOffers.map((offer) => (
          <div
            key={offer.title}
            className="flex cursor-pointer items-center gap-5 rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="h-28 w-28 rounded-xl object-cover"
            />

            <div>
              <p className="text-sm font-medium text-blue-500">
                {offer.category}
              </p>

              <h3 className="mt-1 text-xl font-bold">{offer.title}</h3>

              <p className="mt-2 text-sm text-gray-500">{offer.desc}</p>

              <button className="mt-4 rounded-full border border-blue-500 px-4 py-1 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
