import mongoose, {
  Schema,
  model,
  models,
  type InferSchemaType,
} from "mongoose";

const bookingSchema = new Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      required: true,
    },

    package: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    adults: {
      type: Number,
      required: true,
      min: 1,
    },

    children: {
      type: Number,
      default: 0,
      min: 0,
    },

    pickupLocation: {
      type: String,
      required: true,
      trim: true,
    },

    specialRequest: {
      type: String,
      default: "",
      trim: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "advance_paid",
        "paid",
        "refunded",
      ],
      default: "pending",
    },

    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export type BookingDocument =
  InferSchemaType<typeof bookingSchema>;

export default models.Booking ||
  model("Booking", bookingSchema);