import { bookings } from "../data/bookings";
import { Booking } from "../types/booking";

export const getAllBookings = (): Booking[] => {
  return bookings;
};

export const getBookingById = (bookingId: number): Booking | undefined => {
  return bookings.find((booking) => booking.bookingId === bookingId);
};

export const createBooking = (booking: Booking): Booking => {
  bookings.push(booking);

  return booking;
};

export const cancelBooking = (bookingId: number): Booking | undefined => {
  const booking = bookings.find((booking) => booking.bookingId === bookingId);

  if (!booking) {
    return undefined;
  }

  booking.status = "CANCELLED";

  return booking;
};
