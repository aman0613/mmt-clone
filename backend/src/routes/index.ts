import { Router } from "express";
import healthRoutes from "./health.routes";
import flightRoutes from "./flight.routes";
import bookingRoutes from "./booking.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/flights", flightRoutes);
router.use("/bookings", bookingRoutes);
router.use("/auth", authRoutes);

export default router;
