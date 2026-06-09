"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flight } from "@/types/flight";
import { Traveller } from "@/types/traveller";
import { createBooking } from "@/services/bookingService";
import { Booking } from "@/types/booking";

export default function PaymentPage() {
  const router = useRouter();

  const [flight, setFlight] = useState<Flight | null>(null);
  const [traveller, setTraveller] = useState<Traveller>();

  const [paymentMethod, setPaymentMethod] = useState("upi");

  useEffect(() => {
    const storedFlight = localStorage.getItem("selectedFlight");
    const storedTraveller = localStorage.getItem("travellerDetails");

    if (storedFlight) {
      setFlight(JSON.parse(storedFlight));
    }

    if (storedTraveller) {
      setTraveller(JSON.parse(storedTraveller));
    }
  }, []);

  const handlePayment = () => {
    if (!flight || !traveller) return;

    const newBooking: Booking = {
      bookingId: Date.now(),
      ...flight,
      traveller,
      status: "Confirmed",
      bookedAt: new Date().toISOString(),
    };

    createBooking(newBooking);

    router.push("/payment/success");
  };

  if (!flight || !traveller) {
    return <div className="p-10 text-xl">Loading payment details...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT */}

        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          <h1 className="mb-6 text-3xl font-bold">Payment</h1>

          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              UPI
            </label>

            <label className="flex items-center gap-3">
              <input
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Credit / Debit Card
            </label>
          </div>

          {paymentMethod === "upi" && (
            <div className="mt-6">
              <input
                type="text"
                placeholder="Enter UPI ID"
                className="w-full rounded-xl border p-3"
              />
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full rounded-xl border p-3"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="rounded-xl border p-3"
                />

                <input
                  type="text"
                  placeholder="CVV"
                  className="rounded-xl border p-3"
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}

        <div>
          <div className="sticky top-5 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold">Fare Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Airline</span>
                <span>{flight.airline}</span>
              </div>

              <div className="flex justify-between">
                <span>Route</span>
                <span>
                  {flight.from} → {flight.to}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Fare</span>
                <span>₹{flight.price}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700"
            >
              Pay ₹{flight.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
