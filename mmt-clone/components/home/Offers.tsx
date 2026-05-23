"use client";

import { useState } from "react";

const offers = [
  {
    category: "Flights",
    title: "Flight Offer",
    desc: "Save up to ₹3000 on domestic flights",
  },

  {
    category: "Hotels",
    title: "Hotel Deal",
    desc: "Get 40% OFF on luxury stays",
  },

  {
    category: "Buses",
    title: "Bus Offer",
    desc: "Flat ₹500 OFF on buses",
  },

  {
    category: "Holidays",
    title: "Holiday Package",
    desc: "Book Goa packages at discounted prices",
  },
];

export default function Offers() {
  const [selected, setSelected] = useState("All");

  const filteredOffers =
    selected === "All"
      ? offers
      : offers.filter((offer) => offer.category === selected);

  return (
    <section className="mx-auto mt-56 max-w-7xl px-6">
      <h2 className="mb-6 text-3xl font-bold">Offers For You</h2>

      <div className="mb-8 flex gap-3">
        {["All", "Flights", "Hotels", "Buses", "Holidays"].map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`rounded-full border px-4 py-2 ${
              selected === item ? "bg-blue-500 text-white" : "bg-white"
            } `}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {filteredOffers.map((offer) => (
          <div
            key={offer.title}
            className="cursor-pointer rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold">{offer.title}</h3>

            <p className="mt-3 text-gray-500">{offer.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
