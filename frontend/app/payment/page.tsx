"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Flight } from "@/types/flight";
import { Traveller } from "@/types/traveller";
import { Booking } from "@/types/booking";
import { calculateBookingAmount } from "@/app/utils/pricing";
import { BookingApiError, createBooking } from "@/services/bookingService";
import { getAuthToken } from "@/services/authService";

const LOGIN_REDIRECT_PATH = "/login?redirect=%2Fpayment";

export default function PaymentPage() {
  const router = useRouter();

  const [flight, setFlight] = useState<Flight | null>(null);
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!getAuthToken()) {
      router.replace(LOGIN_REDIRECT_PATH);
      return;
    }

    try {
      const storedFlight = localStorage.getItem("selectedFlight");
      const storedTravellers = localStorage.getItem("travellerDetails");

      if (!storedFlight || !storedTravellers) {
        router.replace("/flights");
        return;
      }

      const parsedFlight = JSON.parse(storedFlight) as Flight;
      const parsedTravellers = JSON.parse(storedTravellers) as Traveller[];

      if (!Array.isArray(parsedTravellers) || parsedTravellers.length === 0) {
        router.replace("/flights");
        return;
      }

      setFlight(parsedFlight);
      setTravellers(parsedTravellers);
    } catch {
      localStorage.removeItem("selectedFlight");
      localStorage.removeItem("travellerDetails");
      router.replace("/flights");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handlePayment = async () => {
    if (!flight || travellers.length === 0) {
      return;
    }

    if (!getAuthToken()) {
      router.replace(LOGIN_REDIRECT_PATH);
      return;
    }

    try {
      setIsPaying(true);
      setErrorMessage("");

      const flightData = { ...(flight as Flight & { _id?: string }) };

      delete flightData._id;

      const newBooking: Booking = {
        bookingId: Date.now(),
        ...flightData,
        travellers,
        status: "ACTIVE",
        bookedAt: new Date().toISOString(),
      };

      const createdBooking = await createBooking(newBooking);

      localStorage.removeItem("selectedFlight");
      localStorage.removeItem("travellerDetails");

      router.push(`/payment/success?bookingId=${createdBooking.bookingId}`);
    } catch (error) {
      if (error instanceof BookingApiError && error.status === 401) {
        router.replace(LOGIN_REDIRECT_PATH);
        return;
      }

      if (error instanceof BookingApiError && error.status === 409) {
        setErrorMessage(
          "Unable to create booking because this booking ID already exists. Please click Pay again.",
        );
        return;
      }

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Payment could not be completed. Please try again.",
      );
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] p-6">
        <p className="text-xl font-semibold">Loading payment details...</p>
      </div>
    );
  }

  if (!flight || travellers.length === 0) {
    return null;
  }

  const { baseFare, taxesAndFees, convenienceFee, totalAmount } =
    calculateBookingAmount(flight.price, travellers.length);

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
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
                <span>Travellers</span>
                <span>{travellers.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₹{baseFare}</span>
              </div>

              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>₹{taxesAndFees}</span>
              </div>

              <div className="flex justify-between">
                <span>Convenience Fee</span>
                <span>₹{convenienceFee}</span>
              </div>

              <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
                <span>Total Amount</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {errorMessage && (
              <p className="mt-5 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            <button
              onClick={handlePayment}
              disabled={isPaying}
              className="mt-6 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPaying ? "Processing..." : `Pay ₹${totalAmount}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
