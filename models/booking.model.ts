import mongoose, {
  Schema,
  model,
  models,
  type InferSchemaType,
} from "mongoose";

const packageSnapshotSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    discountedPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const pricingSchema = new Schema(
  {
    adultTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    childTotal: {
      type: Number,
      required: true,
      min: 0,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  },
);

const bookingSchema = new Schema(
  {
    bookingNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },

    package: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      required: true,
      index: true,
    },

    /*
     * Immutable snapshot of the package information
     * used when this booking request was created.
     *
     * This protects historical booking data if the
     * package is edited later.
     */
    packageSnapshot: {
      type: packageSnapshotSchema,
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 150,
    },

    travelDate: {
      type: Date,
      required: true,
      index: true,
    },

    adults: {
      type: Number,
      required: true,
      min: 1,
      max: 20,
    },

    children: {
      type: Number,
      default: 0,
      min: 0,
      max: 20,
    },

    childrenAges: {
      type: [Number],
      default: [],
    },

    pickupLocation: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    specialRequest: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    /*
     * Server-calculated pricing.
     *
     * Never trust frontend totalPrice.
     */
    pricing: {
      type: pricingSchema,
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
      index: true,
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
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

/*
 * Useful admin/query indexes.
 */
bookingSchema.index({
  bookingStatus: 1,
  createdAt: -1,
});

bookingSchema.index({
  paymentStatus: 1,
  createdAt: -1,
});

bookingSchema.index({
  travelDate: 1,
  bookingStatus: 1,
});

export type BookingDocument =
  InferSchemaType<typeof bookingSchema>;

export default models.Booking ||
  model("Booking", bookingSchema);