import { Request, Response } from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
  cancelBooking,
} from "../services/booking.service";

export const getBookings = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const bookings = await getAllBookings(req.userId!);

  res.status(200).json(bookings);
};

export const getBooking = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const bookingId = Number(req.params.id);

  const booking = await getBookingById(bookingId, req.userId!);

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
  try {
    const booking = await createBooking(req.body, req.userId!);

    res.status(201).json(booking);
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        message: "Booking ID already exists",
      });
      return;
    }

    console.error("Create booking failed:", error);

    res.status(500).json({
      message: "Failed to create booking",
    });
  }
};

export const cancelBookingHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const bookingId = Number(req.params.id);

  const booking = await cancelBooking(bookingId, req.userId!);

  if (!booking) {
    res.status(404).json({
      message: "Booking not found",
    });
    return;
  }

  res.status(200).json(booking);
};
