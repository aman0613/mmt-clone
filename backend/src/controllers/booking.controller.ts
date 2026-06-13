import { Request, Response } from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  cancelBooking,
} from "../services/booking.service";

export const getBookings = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const bookings = await getAllBookings();

  res.status(200).json(bookings);
};

export const getBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const bookingId = Number(req.params.id);

  const booking = await getBookingById(bookingId);

  if (!booking) {
    res.status(404).json({
      message: "Booking not found",
    });

    return;
  }

  res.status(200).json(booking);
};

export const createBookingHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log("Controller reached");
  const booking = await createBooking(req.body);
  res.status(201).json(booking);
};
export const cancelBookingHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const bookingId = Number(req.params.id);

  const booking = await cancelBooking(bookingId);

  if (!booking) {
    res.status(404).json({
      message: "Booking not found",
    });

    return;
  }

  res.status(200).json(booking);
};
