"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Flight } from "@/types/flight";
import { Traveller } from "@/types/traveller";

export default function BookingPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [flight, setFlight] = useState<Flight | null>(null);

  const [traveller, setTraveller] = useState<Traveller>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTraveller({
      ...traveller,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {
      fullName: "",
      email: "",
      phone: "",
    };

    let isValid = true;

    if (!traveller.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!traveller.email.includes("@")) {
      newErrors.email = "Enter valid email";
      isValid = false;
    }

    if (traveller.phone.length < 10) {
      newErrors.phone = "Enter valid phone number";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handlePayment = () => {
    const isValid = validateForm();

    if (!isValid) return;

    localStorage.setItem("selectedFlight", JSON.stringify(flight));
    localStorage.setItem("travellerDetails", JSON.stringify(traveller));

    router.push("/payment");
  };

  if (!flight) {
    return <div className="p-10 text-xl font-semibold">Loading flight...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT SECTION */}
        <div className="space-y-6 lg:col-span-2">
          {/* Flight Details */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b pb-5">
              <div>
                <h2 className="text-2xl font-bold">{flight.airline}</h2>

                <p className="mt-1 text-gray-500">
                  {flight.stops === 0 ? "Non Stop" : `${flight.stops} Stop`}
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">
                  ₹{flight.price}
                </p>
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

          {/* Traveller Details */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">Traveller Details</h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block font-medium">Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={traveller.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />

                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium">Email Address</label>

                <input
                  type="email"
                  name="email"
                  value={traveller.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block font-medium">Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={traveller.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div>
          <div className="sticky top-5 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">Fare Summary</h2>

            <div className="space-y-4 border-b pb-5">
              <div className="flex justify-between">
                <p>Base Fare</p>
                <p>₹{flight.price}</p>
              </div>

              <div className="flex justify-between">
                <p>Taxes & Fees</p>
                <p>₹499</p>
              </div>

              <div className="flex justify-between">
                <p>Convenience Fee</p>
                <p>₹199</p>
              </div>
            </div>

            <div className="mt-5 flex justify-between text-xl font-bold">
              <p>Total Amount</p>

              <p>₹{flight.price + 499 + 199}</p>
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
