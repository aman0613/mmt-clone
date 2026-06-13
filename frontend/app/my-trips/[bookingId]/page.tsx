"use client";

import { useEffect, useState } from "react";

import { Booking } from "@/types/booking";
import { getBookingById } from "@/services/bookingService";
export default function BookingDetailsPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const loadBooking = async () => {
      const { bookingId } = await params;

      const selectedBooking = await getBookingById(Number(bookingId));

      setBooking(selectedBooking || null);
    };
    loadBooking();
  }, [params]);

  if (!booking) {
    return <div className="p-10 text-xl">Booking not found</div>;
  }

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

          <div className="flex justify-between">
            <span>Flight Fare</span>
            <span>₹{booking.price}</span>
          </div>

          <div className="mt-4 flex justify-between border-t pt-4 text-lg font-bold">
            <span>Total Paid</span>
            <span>₹{booking.price}</span>
          </div>
        </div>
        {booking.traveller && (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold">Traveller Information</h2>

            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {booking.traveller.fullName}
              </p>

              <p>
                <strong>Email:</strong> {booking.traveller.email}
              </p>

              <p>
                <strong>Phone:</strong> {booking.traveller.phone}
              </p>
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
