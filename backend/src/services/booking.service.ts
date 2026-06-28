import { Booking } from "../types/booking";
import { bookingRepository } from "../repositories/booking.repository";

export const getAllBookings = async (userId: string) => {
  return bookingRepository.findAllByUserId(userId);
};

export const getBookingById = async (bookingId: number, userId: string) => {
  return bookingRepository.findByIdAndUserId(bookingId, userId);
};

export const createBooking = async (booking: Booking, userId: string) => {
  return bookingRepository.create(booking, userId);
};

export const cancelBooking = async (bookingId: number, userId: string) => {
  return bookingRepository.cancelByIdAndUserId(bookingId, userId);
};
