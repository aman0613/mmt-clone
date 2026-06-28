import { BookingModel } from "../models/booking.model";
import { Booking } from "../types/booking";

export class BookingRepository {
  async findAllByUserId(userId: string) {
    return BookingModel.find({ userId }).lean();
  }

  async findByIdAndUserId(bookingId: number, userId: string) {
    return BookingModel.findOne({ bookingId, userId }).lean();
  }

  async create(booking: Booking, userId: string) {
    const createdBooking = await BookingModel.create({
      ...booking,
      userId,
    });

    return createdBooking.toObject();
  }

  async cancelByIdAndUserId(bookingId: number, userId: string) {
    return BookingModel.findOneAndUpdate(
      { bookingId, userId },
      { status: "CANCELLED" },
      { new: true },
    ).lean();
  }
}

export const bookingRepository = new BookingRepository();
