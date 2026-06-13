import { Booking } from "../types/booking";
import { bookingRepository } from "../repositories/booking.repository";

export const getAllBookings = async () => {
  return bookingRepository.findAll();
};

export const getBookingById = async (bookingId: number) => {
  return bookingRepository.findById(bookingId);
};

export const createBooking = async (booking: Booking) => {
  return bookingRepository.create(booking);
};

export const cancelBooking = async (bookingId: number) => {
  return bookingRepository.cancel(bookingId);
};
