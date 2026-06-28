import { Request, Response } from "express";
import { getFlights, getFlightById } from "../services/flight.service";

export const getAllFlights = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const from = req.query.from as string | undefined;
  const to = req.query.to as string | undefined;
  const airlinesQuery = req.query.airlines as string | undefined;

  const airlines = airlinesQuery
    ? airlinesQuery.split(",").filter(Boolean)
    : undefined;

  const stopsQuery = req.query.stops as string | undefined;
  const stops = stopsQuery !== undefined ? Number(stopsQuery) : undefined;
  const maxPriceQuery = req.query.maxPrice as string | undefined;

  const maxPrice =
    maxPriceQuery !== undefined ? Number(maxPriceQuery) : undefined;
  const sortByQuery = req.query.sortBy as string | undefined;
  const sortBy =
    sortByQuery === "price" || sortByQuery === "duration"
      ? sortByQuery
      : undefined;

  const sortOrderQuery = req.query.sortOrder as string | undefined;
  const sortOrder =
    sortOrderQuery === "asc" || sortOrderQuery === "desc"
      ? sortOrderQuery
      : undefined;

  const flights = await getFlights({
    from,
    to,
    stops,
    airlines,
    sortBy,
    sortOrder,
    maxPrice,
  });

  res.status(200).json(flights);
};

export const getSingleFlight = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = Number(req.params.id);

  const flight = await getFlightById(id);

  if (!flight) {
    res.status(404).json({
      message: "Flight not found",
    });

    return;
  }

  res.status(200).json(flight);
};
