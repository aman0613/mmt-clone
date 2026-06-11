import { Router } from "express";
import healthRoutes from "./health.routes";
import flightRoutes from "./flight.routes";
import bookingRoutes from "./booking.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/flights", flightRoutes);
router.use("/bookings", bookingRoutes);

export default router;
