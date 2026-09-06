import mongoose, {
  Document,
  Model,
  Schema,
  Types,
} from "mongoose";

import "./destination.model";
import "./category.model";

export type PackageStatus =
  | "active"
  | "inactive";

export type Difficulty =
  | "easy"
  | "moderate"
  | "difficult";

export interface IItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface IPackage
  extends Document {
  name: string;

  slug: string;

  shortDescription: string;

  description: string;

  category: Types.ObjectId;

  destination: Types.ObjectId;

  heroImage: string;

  gallery: string[];

  duration: string;

  difficulty: Difficulty;

 groupSize: string;

originalPrice: number;

discountedPrice: number;

childPolicy: {
  complimentaryBelow: number;
  halfPriceBelow: number;
  halfPricePercentage: number;
};

highlights: string[];

  included: string[];

  excluded: string[];

  itinerary: IItineraryDay[];

  seoTitle: string;

  seoDescription: string;

  featured: boolean;

  status: PackageStatus;

  createdAt: Date;

  updatedAt: Date;
}

const ItinerarySchema =
  new Schema<IItineraryDay>(
    {
      day: {
        type: Number,
        required: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        required: true,
      },
    },
    {
      _id: false,
    }
  );

const PackageSchema =
  new Schema<IPackage>(
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

      category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },

      destination: {
        type: Schema.Types.ObjectId,
        ref: "Destination",
        required: true,
      },

      heroImage: {
        type: String,
        default: "",
      },

      gallery: {
        type: [String],
        default: [],
      },

      duration: {
        type: String,
        default: "",
      },

      difficulty: {
        type: String,
        enum: [
          "easy",
          "moderate",
          "difficult",
        ],
        default: "easy",
      },

      groupSize: {
        type: String,
        default: "",
      },

   



    originalPrice: {
  type: Number,
  required: true,
  default: 0,
},

discountedPrice: {
  type: Number,
  required: true,
  default: 0,
},

childPolicy: {
  type: {
    complimentaryBelow: {
      type: Number,
      default: 5,
    },

    halfPriceBelow: {
      type: Number,
      default: 10,
    },

    halfPricePercentage: {
      type: Number,
      default: 50,
    },
  },

  default: {
    complimentaryBelow: 5,
    halfPriceBelow: 10,
    halfPricePercentage: 50,
  },

  required: true,
},

      

      highlights: {
        type: [String],
        default: [],
      },

      included: {
        type: [String],
        default: [],
      },

      excluded: {
        type: [String],
        default: [],
      },

      itinerary: {
        type: [ItinerarySchema],
        default: [],
      },

      seoTitle: {
        type: String,
        default: "",
      },

      seoDescription: {
        type: String,
        default: "",
      },

      featured: {
        type: Boolean,
        default: false,
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

const Package: Model<IPackage> =
  mongoose.models.Package ||
  mongoose.model<IPackage>(
    "Package",
    PackageSchema
  );

export default Package;