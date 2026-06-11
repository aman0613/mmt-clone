import { Request, Response } from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  cancelBooking,
} from "../services/booking.service";

export const getBookings = (_req: Request, res: Response): void => {
  const bookings = getAllBookings();

  res.status(200).json(bookings);
};

export const getBooking = (req: Request, res: Response): void => {
  const bookingId = Number(req.params.id);

  const booking = getBookingById(bookingId);

  if (!booking) {
    res.status(404).json({
      message: "Booking not found",
    });

    return;
  }

  res.status(200).json(booking);
};

export const createBookingHandler = (req: Request, res: Response): void => {
  const booking = createBooking(req.body);

  res.status(201).json(booking);
};

export const cancelBookingHandler = (req: Request, res: Response): void => {
  const bookingId = Number(req.params.id);

  const booking = cancelBooking(bookingId);

  if (!booking) {
    res.status(404).json({
      message: "Booking not found",
    });

    return;
  }

  res.status(200).json(booking);
};
