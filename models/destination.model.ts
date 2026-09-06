import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IDestination extends Document {
  name: string;

  slug: string;

  shortDescription: string;

  description: string;

  country: string;

  state: string;

  city: string;

  bestTime: string;

  altitude: string;

  heroImage: string;

  gallery: string[];

  startingPrice: number;

  duration: string;

  rating: number;

  reviewCount: number;

  featured: boolean;

  featuredOrder: number;

  seoTitle: string;

  seoDescription: string;

status: "active" | "draft";

  createdAt: Date;

  updatedAt: Date;
}

const DestinationSchema =
  new Schema<IDestination>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },

      shortDescription: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        default: "",
        trim: true,
      },

      city: {
        type: String,
        default: "",
        trim: true,
      },

      bestTime: {
        type: String,
        default: "",
      },

      altitude: {
        type: String,
        default: "",
      },

      heroImage: {
        type: String,
        default: "",
      },

      gallery: {
        type: [String],
        default: [],
      },

      // Homepage

      startingPrice: {
        type: Number,
        default: 0,
        min: 0,
      },

      duration: {
        type: String,
        default: "",
      },

      rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5,
      },

      reviewCount: {
        type: Number,
        default: 0,
        min: 0,
      },

      featured: {
        type: Boolean,
        default: false,
      },

      featuredOrder: {
        type: Number,
        default: 0,
      },

      seoTitle: {
        type: String,
        default: "",
      },

      seoDescription: {
        type: String,
        default: "",
      },
status: {
  type: String,
  enum: ["active", "draft"],
  default: "draft",
},
    },
    {
      timestamps: true,
    }
  );

const Destination: Model<IDestination> =
  mongoose.models.Destination ||
  mongoose.model<IDestination>(
    "Destination",
    DestinationSchema
  );

export default Destination;