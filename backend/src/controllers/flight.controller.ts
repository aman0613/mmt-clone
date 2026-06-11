import { Request, Response } from "express";
import { getFlights, getFlightById } from "../services/flight.service";

export const getAllFlights = (req: Request, res: Response): void => {
  const from = req.query.from as string | undefined;
  const to = req.query.to as string | undefined;
  console.log("from:", from);
  console.log("to:", to);
  const flights = getFlights(from, to);

  res.status(200).json(flights);
};

export const getSingleFlight = (req: Request, res: Response): void => {
  const id = Number(req.params.id);

  const flight = getFlightById(id);

  if (!flight) {
    res.status(404).json({
      message: "Flight not found",
    });

    return;
  }

  res.status(200).json(flight);
};
