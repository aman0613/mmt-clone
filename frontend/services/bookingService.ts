import { Booking } from "@/types/booking";
import { API_BASE_URL } from "./api";

export const getBookings = async (): Promise<Booking[]> => {
  const response = await fetch(`${API_BASE_URL}/bookings`);

  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return response.json();
};

export const getBookingById = async (bookingId: number): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`);

  if (!response.ok) {
    throw new Error("Booking not found");
  }

  return response.json();
};

export const createBooking = async (booking: Booking): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    throw new Error("Failed to create booking");
  }

  return response.json();
};

export const cancelBooking = async (bookingId: number): Promise<Booking> => {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}/cancel`, {
    method: "PATCH",
  });

  if (!response.ok) {
    throw new Error("Failed to cancel booking");
  }

  return response.json();
};
