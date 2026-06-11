"use client";

import { useRouter } from "next/navigation";

type Flight = {
  id: number;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
};

type FlightCardProps = {
  flight: Flight;
  from: string | null;
  to: string | null;
};

export default function FlightCard({ flight, from, to }: FlightCardProps) {
  const router = useRouter();

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold">{flight.airline}</h2>

          <p className="text-gray-500">
            {flight.stops === 0 ? "Non Stop" : "1 Stop"}
          </p>
        </div>

        <div>
          <p className="text-xl font-bold">{flight.departureTime}</p>

          <p className="text-sm text-gray-500">{from}</p>
        </div>

        <div>{flight.duration}</div>

        <div>
          <p className="text-xl font-bold">{flight.arrivalTime}</p>

          <p className="text-sm text-gray-500">{to}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">₹{flight.price}</p>

          <button
            onClick={() => router.push(`/flights/${flight.id}`)}
            className="rounded-lg border px-4 py-2"
          >
            View Details
          </button>

          <button
            onClick={() => router.push(`/booking/${flight.id}`)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}
