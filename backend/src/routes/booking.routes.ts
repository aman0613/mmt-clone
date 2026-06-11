import { Router } from "express";
import {
  getBookings,
  getBooking,
  createBookingHandler,
  cancelBookingHandler,
} from "../controllers/booking.controller";

const router = Router();

router.get("/", getBookings);

router.get("/:id", getBooking);

router.post("/", createBookingHandler);

router.patch("/:id/cancel", cancelBookingHandler);

export default router;
