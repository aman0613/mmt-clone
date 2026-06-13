import { BookingModel } from "../models/booking.model";
import { Booking } from "../types/booking";

export class BookingRepository {
  async findAll() {
    return BookingModel.find().lean();
  }

  async findById(bookingId: number) {
    return BookingModel.findOne({ bookingId }).lean();
  }

  async create(booking: Booking) {
    console.log("Creating booking");
    const createdBooking = await BookingModel.create(booking);

    return createdBooking.toObject();
  }

  async cancel(bookingId: number) {
    return BookingModel.findOneAndUpdate(
      { bookingId },
      { status: "CANCELLED" },
      { new: true },
    ).lean();
  }
}

export const bookingRepository = new BookingRepository();
