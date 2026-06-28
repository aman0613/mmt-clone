import { Schema, model } from "mongoose";

const travellerSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { _id: false },
);

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    bookingId: { type: Number, required: true, unique: true },
    id: { type: Number, required: true },
    airline: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    departureTime: { type: String, required: true },
    departureDate: { type: String },
    arrivalTime: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    stops: { type: Number, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "CANCELLED"],
      required: true,
    },
    bookedAt: { type: String },
    travellers: {
      type: [travellerSchema],
      required: true,
    },
  },
  { versionKey: false },
);

export const BookingModel = model("Booking", bookingSchema);
