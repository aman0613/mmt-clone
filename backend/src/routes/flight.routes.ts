import { Router } from "express";
import {
  getAllFlights,
  getSingleFlight,
} from "../controllers/flight.controller";

const router = Router();

router.get("/", getAllFlights);

router.get("/:id", getSingleFlight);

export default router;
