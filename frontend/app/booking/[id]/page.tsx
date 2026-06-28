"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { calculateBookingAmount } from "@/app/utils/pricing";
import { Flight } from "@/types/flight";
import { Traveller } from "@/types/traveller";
import { getFlightById } from "@/services/flightService";
import { getAuthToken } from "@/services/authService";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = params.id as string;
  const travellerCount = Number(searchParams.get("travellers") || "1");
  const departureDate = searchParams.get("departureDate");

  const [flight, setFlight] = useState<Flight | null>(null);
  const [travellers, setTravellers] = useState<Traveller[]>([]);

  useEffect(() => {
    setTravellers(
      Array.from({ length: travellerCount }, () => ({
        fullName: "",
        email: "",
        phone: "",
      })),
    );
  }, [travellerCount]);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const data = await getFlightById(id);

        setFlight(data);
      } catch (error) {
        console.error("Unable to load flight:", error);
      }
    };

    fetchFlight();
  }, [id]);

  const handleTravellerChange = (
    index: number,
    field: keyof Traveller,
    value: string,
  ) => {
    const updatedTravellers = [...travellers];

    updatedTravellers[index] = {
      ...updatedTravellers[index],
      [field]: value,
    };

    setTravellers(updatedTravellers);
  };

  const validateForm = (): boolean => {
    for (const traveller of travellers) {
      if (!traveller.fullName.trim()) {
        return false;
      }

      if (!traveller.email.includes("@")) {
        return false;
      }

      if (traveller.phone.trim().length < 10) {
        return false;
      }
    }

    return true;
  };

  const getCurrentBookingPath = (): string => {
    const queryString = searchParams.toString();

    return queryString ? `/booking/${id}?${queryString}` : `/booking/${id}`;
  };

  const handlePayment = () => {
    const isValid = validateForm();

    if (!isValid) {
      alert("Please fill all traveller details correctly");
      return;
    }

    if (!getAuthToken()) {
      const currentBookingPath = getCurrentBookingPath();

      router.push(`/login?redirect=${encodeURIComponent(currentBookingPath)}`);
      return;
    }

    localStorage.setItem(
      "selectedFlight",
      JSON.stringify({
        ...flight,
        departureDate,
      }),
    );

    localStorage.setItem("travellerDetails", JSON.stringify(travellers));

    router.push("/payment");
  };

  if (!flight) {
    return <div className="p-10 text-xl font-semibold">Loading flight...</div>;
  }

  const { baseFare, taxesAndFees, convenienceFee, totalAmount } =
    calculateBookingAmount(flight.price, travellerCount);

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-5">
              <div>
                <h2 className="text-2xl font-bold">{flight.airline}</h2>

                <p className="mt-1 text-gray-500">
                  {flight.stops === 0 ? "Non Stop" : `${flight.stops} Stop`}
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">₹{baseFare}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{flight.departureTime}</p>

                <p className="mt-1 text-gray-500">{flight.from}</p>
              </div>

              <div className="text-center">
                <p className="text-gray-500">{flight.duration}</p>

                <div className="my-2 h-[2px] w-40 bg-gray-300"></div>

                <p className="text-sm font-medium text-green-600">
                  {flight.stops === 0 ? "Non Stop" : `${flight.stops} Stop`}
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold">{flight.arrivalTime}</p>

                <p className="mt-1 text-gray-500">{flight.to}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">
              Traveller Details ({travellerCount})
            </h2>

            <div className="space-y-5">
              {travellers.map((traveller, index) => (
                <div key={index} className="mb-6 rounded-xl border p-4">
                  <h3 className="mb-4 text-lg font-bold">
                    Traveller {index + 1}
                  </h3>

                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block font-medium">
                        Full Name
                      </label>

                      <input
                        type="text"
                        value={traveller.fullName}
                        onChange={(event) =>
                          handleTravellerChange(
                            index,
                            "fullName",
                            event.target.value,
                          )
                        }
                        placeholder="Enter full name"
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-medium">
                        Email Address
                      </label>

                      <input
                        type="email"
                        value={traveller.email}
                        onChange={(event) =>
                          handleTravellerChange(
                            index,
                            "email",
                            event.target.value,
                          )
                        }
                        placeholder="Enter email"
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-medium">
                        Phone Number
                      </label>

                      <input
                        type="text"
                        value={traveller.phone}
                        onChange={(event) =>
                          handleTravellerChange(
                            index,
                            "phone",
                            event.target.value,
                          )
                        }
                        placeholder="Enter phone number"
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-5 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">Fare Summary</h2>

            <div className="space-y-4 border-b pb-5">
              <div className="flex justify-between">
                <p>Base Fare ({travellerCount} Travellers)</p>
                <p>₹{baseFare}</p>
              </div>

              <div className="flex justify-between">
                <p>Taxes & Fees</p>
                <p>₹{taxesAndFees}</p>
              </div>

              <div className="flex justify-between">
                <p>Convenience Fee</p>
                <p>₹{convenienceFee}</p>
              </div>
            </div>

            <div className="mt-5 flex justify-between text-xl font-bold">
              <p>Total Amount</p>

              <p>₹{totalAmount}</p>
            </div>

            <button
              onClick={handlePayment}
              className="mt-6 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
