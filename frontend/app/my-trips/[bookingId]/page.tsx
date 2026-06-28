"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { calculateBookingAmount } from "@/app/utils/pricing";
import { Booking } from "@/types/booking";
import { BookingApiError, getBookingById } from "@/services/bookingService";
import { getAuthToken } from "@/services/authService";

type BookingDetailsPageProps = {
  params: Promise<{ bookingId: string }>;
};

const getLoginRedirectPath = (bookingId: string): string => {
  return `/login?redirect=${encodeURIComponent(`/my-trips/${bookingId}`)}`;
};

export default function BookingDetailsPage({
  params,
}: BookingDetailsPageProps) {
  const router = useRouter();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadBooking = async () => {
      const { bookingId } = await params;
      const numericBookingId = Number(bookingId);

      if (!Number.isInteger(numericBookingId) || numericBookingId <= 0) {
        setNotFoundMessage("Booking not found or you do not have access.");
        setIsLoading(false);
        return;
      }

      if (!getAuthToken()) {
        router.replace(getLoginRedirectPath(bookingId));
        return;
      }

      try {
        setIsLoading(true);
        setNotFoundMessage("");
        setErrorMessage("");

        const selectedBooking = await getBookingById(numericBookingId);

        setBooking(selectedBooking);
      } catch (error) {
        if (error instanceof BookingApiError) {
          if (error.status === 401) {
            router.replace(getLoginRedirectPath(bookingId));
            return;
          }

          if (error.status === 404) {
            setNotFoundMessage(
              "Booking not found or you do not have access to it.",
            );
            return;
          }
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to load booking details. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadBooking();
  }, [params, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] p-6">
        <p className="text-xl font-semibold">Loading booking details...</p>
      </div>
    );
  }

  if (notFoundMessage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Booking Not Found</h1>

          <p className="mt-3 text-gray-600">{notFoundMessage}</p>

          <button
            onClick={() => router.push("/my-trips")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Back to My Trips
          </button>
        </div>
      </div>
    );
  }

  if (errorMessage || !booking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Unable to Load Booking</h1>

          <p className="mt-3 text-gray-600">
            {errorMessage || "Booking details are unavailable."}
          </p>

          <button
            onClick={() => router.push("/my-trips")}
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Back to My Trips
          </button>
        </div>
      </div>
    );
  }

  const { baseFare, taxesAndFees, convenienceFee, totalAmount } =
    calculateBookingAmount(booking.price, booking.travellers?.length || 1);

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{booking.airline}</h1>

              <p className="mt-1 font-medium text-green-600">
                {booking.status}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Booking ID</p>

              <p className="font-bold">{booking.bookingId}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">Flight Information</h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{booking.departureTime}</p>

              <p className="text-gray-500">{booking.from}</p>

              <p className="mt-1 text-sm text-gray-500">
                Departure Date: {booking.departureDate || "Not available"}
              </p>
            </div>

            <div className="text-center">
              <p className="text-gray-500">{booking.duration}</p>

              <div className="my-2 h-[2px] w-40 bg-gray-300"></div>

              <p className="text-sm text-green-600">
                {booking.stops === 0 ? "Non Stop" : `${booking.stops} Stop`}
              </p>
            </div>

            <div>
              <p className="text-3xl font-bold">{booking.arrivalTime}</p>

              <p className="text-gray-500">{booking.to}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-bold">Fare Details</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Flight Fare</span>
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

            <div className="flex justify-between border-t pt-4 text-lg font-bold">
              <span>Total Paid</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {booking.travellers && booking.travellers.length > 0 && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">
              Traveller Information ({booking.travellers.length})
            </h2>

            <div className="space-y-6">
              {booking.travellers.map((traveller, index) => (
                <div key={index} className="rounded-xl border p-4">
                  <h3 className="mb-3 text-lg font-semibold">
                    Traveller {index + 1}
                  </h3>

                  <p>
                    <strong>Name:</strong> {traveller.fullName}
                  </p>

                  <p>
                    <strong>Email:</strong> {traveller.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {traveller.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {booking.bookedAt && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-bold">Booking Information</h2>

            <p>Booked On: {new Date(booking.bookedAt).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
