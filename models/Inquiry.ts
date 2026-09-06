import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IInquiry extends Document {
  fullName: string;

  phone: string;

  email: string;

  destination: mongoose.Types.ObjectId;

  travelDate: Date;

  travelers: number;

  budget?: string;

  pickupLocation?: string;

  message: string;

  status:
    | "pending"
    | "contacted"
    | "quoted"
    | "confirmed"
    | "cancelled";

  adminNotes?: string;

  createdAt: Date;

  updatedAt: Date;
}

const InquirySchema =
  new Schema<IInquiry>(
    {
      fullName: {
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

      destination: {
        type: Schema.Types.ObjectId,
        ref: "Destination",
        required: true,
      },

      travelDate: {
        type: Date,
        required: true,
      },

      travelers: {
        type: Number,
        required: true,
        min: 1,
      },

      budget: {
        type: String,
        default: "",
        trim: true,
      },

      pickupLocation: {
        type: String,
        default: "",
        trim: true,
      },

      message: {
        type: String,
        required: true,
        trim: true,
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
      },

      adminNotes: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry ||
  mongoose.model<IInquiry>(
    "Inquiry",
    InquirySchema
  );

export default Inquiry;