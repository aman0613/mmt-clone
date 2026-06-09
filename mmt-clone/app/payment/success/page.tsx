"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f2f2] p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 text-center shadow-sm">
        <div className="mb-4 text-7xl">🎉</div>

        <h1 className="text-3xl font-bold text-green-600">Booking Confirmed</h1>

        <p className="mt-4 text-gray-600">
          Your flight booking has been completed successfully.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Booking ID: MMT{Date.now().toString().slice(-6)}
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <Link
            href="/my-trips"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            View My Trips
          </Link>

          <Link href="/" className="rounded-xl border px-6 py-3 font-semibold">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}
