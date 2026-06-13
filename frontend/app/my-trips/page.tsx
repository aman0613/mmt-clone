"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Booking } from "@/types/booking";
import {
  getBookings,
  cancelBooking as deleteBooking,
} from "@/services/bookingService";
export default function MyTripsPage() {
  const router = useRouter();

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      const data = await getBookings();

      setBookings(data);
    };

    loadBookings();
  }, []);

  const cancelBooking = async (bookingId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmed) return;

    await deleteBooking(bookingId);

    const updatedBookings = await getBookings();

    setBookings(updatedBookings);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-4xl font-bold">My Trips</h1>

        {bookings.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold">No Trips Found</h2>

            <p className="mt-2 text-gray-500">
              You haven't booked any flights yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{booking.airline}</h2>

                    <p className="text-green-600">{booking.status}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{booking.price}
                    </p>

                    <button
                      onClick={() =>
                        router.push(`/my-trips/${booking.bookingId}`)
                      }
                      className="mt-3 w-full cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => cancelBooking(booking.bookingId)}
                      className="mt-3 cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-semibold text-black"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">
                      {booking.departureTime}
                    </p>

                    <p className="text-gray-500">{booking.from}</p>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-500">{booking.duration}</p>

                    <div className="my-2 h-[2px] w-40 bg-gray-300"></div>

                    <p className="text-sm text-green-600">
                      {booking.stops === 0
                        ? "Non Stop"
                        : `${booking.stops} Stop`}
                    </p>
                  </div>

                  <div>
                    <p className="text-3xl font-bold">{booking.arrivalTime}</p>

                    <p className="text-gray-500">{booking.to}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
