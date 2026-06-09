import { Booking } from "@/types/booking";

const BOOKINGS_KEY = "bookings";

export const getBookings = (): Booking[] => {
  return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
};

export const createBooking = (booking: Booking): void => {
  const bookings = getBookings();

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify([...bookings, booking]));
};

export const getBookingById = (bookingId: number): Booking | undefined => {
  const bookings = getBookings();

  return bookings.find((booking) => booking.bookingId === bookingId);
};

export const cancelBooking = (bookingId: number): void => {
  const bookings = getBookings();

  const updatedBookings = bookings.filter(
    (booking) => booking.bookingId !== bookingId,
  );

  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
};
