import { Router } from "express";
import {
  getBookings,
  getBooking,
  createBookingHandler,
  cancelBookingHandler,
} from "../controllers/booking.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.use(requireAuth);

router.get("/", getBookings);

router.get("/:id", getBooking);

router.post("/", createBookingHandler);

router.patch("/:id/cancel", cancelBookingHandler);

export default router;
