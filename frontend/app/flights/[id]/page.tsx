"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FlightDetails from "@/components/flight/FlightDetails";
import BaggageInfo from "@/components/flight/BaggageInfo";
import FareSummary from "@/components/flight/FareSummary";
import CancellationPolicy from "@/components/flight/CancellationPolicy";

interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
}

export default function FlightDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [flight, setFlight] = useState<Flight | null>(null);

  useEffect(() => {
    const fetchFlight = async () => {
      const res = await fetch("/api/flights");
      const data = await res.json();

      const selectedFlight = data.find(
        (item: Flight) => item.id === Number(id),
      );

      setFlight(selectedFlight);
    };

    fetchFlight();
  }, [id]);

  if (!flight) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <FlightDetails flight={flight} />

      <BaggageInfo />

      <FareSummary price={flight.price} />

      <CancellationPolicy />

      <button
        onClick={() => router.push(`/booking/${flight.id}`)}
        className="rounded-lg bg-blue-600 px-6 py-3 text-white"
      >
        Book Now
      </button>
    </div>
  );
}
