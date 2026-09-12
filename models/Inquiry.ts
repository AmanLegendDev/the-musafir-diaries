import mongoose, {
  Document,
  Model,
  Schema,
  Types,
} from "mongoose";

export type InquiryStatus =
  | "pending"
  | "contacted"
  | "quoted"
  | "confirmed"
  | "cancelled";

export interface IInquiry extends Document {
  inquiryNumber: string;

  fullName: string;
  phone: string;
  email: string;

  destination: Types.ObjectId;

  travelDate: Date;
  travelers: number;

  budget?: string;
  pickupLocation?: string;
  message: string;

  status: InquiryStatus;
  adminNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    inquiryNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
      uppercase: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 15,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 150,
    },

    destination: {
      type: Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
      index: true,
    },

    travelDate: {
      type: Date,
      required: true,
      index: true,
    },

    travelers: {
      type: Number,
      required: true,
      min: 1,
      max: 50,
    },

    budget: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    pickupLocation: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "contacted",
        "quoted",
        "confirmed",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    adminNotes: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  },
);

/*
 * Query indexes
 */

// Admin: latest inquiries by status
InquirySchema.index({
  status: 1,
  createdAt: -1,
});

// Admin: upcoming travel inquiries
InquirySchema.index({
  travelDate: 1,
  status: 1,
});

// Destination-specific inquiries
InquirySchema.index({
  destination: 1,
  createdAt: -1,
});

// Customer lookup
InquirySchema.index({
  email: 1,
  createdAt: -1,
});

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry ||
  mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;