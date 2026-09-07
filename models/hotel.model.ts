import mongoose, {
  Document,
  Model,
  Schema,
  Types,
} from "mongoose";

import "./destination.model";

/* -------------------------------------------------------------------------- */
/*                                  TYPES                                     */
/* -------------------------------------------------------------------------- */

export type HotelStatus = "active" | "draft";

export type HotelType =
  | "hotel"
  | "resort"
  | "boutique"
  | "homestay"
  | "villa"
  | "guesthouse"
  | "camp"
  | "other";

export interface IHotelRoomType {
  _id: Types.ObjectId;
  name: string;
  description: string;
  occupancy: string;
  bedType: string;
}

export interface IHotelPolicies {
  checkIn: string;
  checkOut: string;
  cancellation: string;
  childPolicy: string;
  other: string;
}

export interface IHotel extends Document {
  /* ---------------------------------------------------------------------- */
  /* Identity                                                               */
  /* ---------------------------------------------------------------------- */

  name: string;

  slug: string;

  /* ---------------------------------------------------------------------- */
  /* Destination Relationship                                               */
  /* ---------------------------------------------------------------------- */

  destination: Types.ObjectId;

  /* ---------------------------------------------------------------------- */
  /* Location                                                               */
  /* ---------------------------------------------------------------------- */

  area: string;

  address: string;

  city: string;

  state: string;

  country: string;

  /* ---------------------------------------------------------------------- */
  /* Classification                                                         */
  /* ---------------------------------------------------------------------- */

  starRating: number;

  hotelType: HotelType;

  /* ---------------------------------------------------------------------- */
  /* Content                                                                */
  /* ---------------------------------------------------------------------- */

  shortDescription: string;

  description: string;

  /* ---------------------------------------------------------------------- */
  /* Images                                                                  */
  /* ---------------------------------------------------------------------- */

  heroImage: string;

  gallery: string[];

  /* ---------------------------------------------------------------------- */
  /* Rooms                                                                   */
  /* ---------------------------------------------------------------------- */

  roomTypes: IHotelRoomType[];

  /* ---------------------------------------------------------------------- */
  /* Amenities                                                               */
  /* ---------------------------------------------------------------------- */

  amenities: string[];

  /* ---------------------------------------------------------------------- */
  /* Policies                                                                */
  /* ---------------------------------------------------------------------- */

  policies: IHotelPolicies;

  /* ---------------------------------------------------------------------- */
  /* Real Guest Rating                                                       */
  /* ---------------------------------------------------------------------- */

  guestRating: number | null;

  reviewCount: number;

  /* ---------------------------------------------------------------------- */
  /* CMS Settings                                                            */
  /* ---------------------------------------------------------------------- */

  featured: boolean;

  displayOrder: number;

  status: HotelStatus;

  /* ---------------------------------------------------------------------- */
  /* SEO                                                                     */
  /* ---------------------------------------------------------------------- */

  seoTitle: string;

  seoDescription: string;

  /* ---------------------------------------------------------------------- */
  /* Timestamps                                                              */
  /* ---------------------------------------------------------------------- */

  createdAt: Date;

  updatedAt: Date;
}

/* -------------------------------------------------------------------------- */
/*                              ROOM TYPE SCHEMA                              */
/* -------------------------------------------------------------------------- */

const HotelRoomTypeSchema =
  new Schema<IHotelRoomType>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
        trim: true,
      },

      occupancy: {
        type: String,
        default: "",
        trim: true,
      },

      bedType: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      _id: true,
    }
  );

/* -------------------------------------------------------------------------- */
/*                              POLICIES SCHEMA                               */
/* -------------------------------------------------------------------------- */

const HotelPoliciesSchema =
  new Schema<IHotelPolicies>(
    {
      checkIn: {
        type: String,
        default: "",
        trim: true,
      },

      checkOut: {
        type: String,
        default: "",
        trim: true,
      },

      cancellation: {
        type: String,
        default: "",
        trim: true,
      },

      childPolicy: {
        type: String,
        default: "",
        trim: true,
      },

      other: {
        type: String,
        default: "",
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

/* -------------------------------------------------------------------------- */
/*                              HOTEL SCHEMA                                  */
/* -------------------------------------------------------------------------- */

const HotelSchema = new Schema<IHotel>(
  {
    /* ---------------------------------------------------------------------- */
    /* Identity                                                               */
    /* ---------------------------------------------------------------------- */

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 180,
    },

    /* ---------------------------------------------------------------------- */
    /* Destination Relationship                                               */
    /* ---------------------------------------------------------------------- */

    destination: {
      type: Schema.Types.ObjectId,
      ref: "Destination",
      required: true,
      index: true,
    },

    /* ---------------------------------------------------------------------- */
    /* Location                                                               */
    /* ---------------------------------------------------------------------- */

    area: {
      type: String,
      default: "",
      trim: true,
      maxlength: 150,
    },

    address: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },

    city: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    state: {
      type: String,
      default: "",
      trim: true,
      maxlength: 100,
    },

    country: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    /* ---------------------------------------------------------------------- */
    /* Classification                                                         */
    /* ---------------------------------------------------------------------- */

    starRating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    hotelType: {
      type: String,
      enum: [
        "hotel",
        "resort",
        "boutique",
        "homestay",
        "villa",
        "guesthouse",
        "camp",
        "other",
      ],
      default: "hotel",
    },

    /* ---------------------------------------------------------------------- */
    /* Content                                                                */
    /* ---------------------------------------------------------------------- */

    shortDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    /* ---------------------------------------------------------------------- */
    /* Images                                                                 */
    /* ---------------------------------------------------------------------- */

    heroImage: {
      type: String,
      default: "",
      trim: true,
    },

    gallery: {
      type: [String],
      default: [],
    },

    /* ---------------------------------------------------------------------- */
    /* Rooms                                                                  */
    /* ---------------------------------------------------------------------- */

    roomTypes: {
      type: [HotelRoomTypeSchema],
      default: [],
    },

    /* ---------------------------------------------------------------------- */
    /* Amenities                                                              */
    /* ---------------------------------------------------------------------- */

    amenities: {
      type: [String],
      default: [],
    },

    /* ---------------------------------------------------------------------- */
    /* Policies                                                               */
    /* ---------------------------------------------------------------------- */

    policies: {
      type: HotelPoliciesSchema,
      default: () => ({}),
    },

    /* ---------------------------------------------------------------------- */
    /* Real Guest Rating                                                      */
    /* ---------------------------------------------------------------------- */

    guestRating: {
      type: Number,
      default: null,
      min: 0,
      max: 5,
    },

    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    /* ---------------------------------------------------------------------- */
    /* CMS Settings                                                           */
    /* ---------------------------------------------------------------------- */

    featured: {
      type: Boolean,
      default: false,
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["active", "draft"],
      default: "draft",
      index: true,
    },

    /* ---------------------------------------------------------------------- */
    /* SEO                                                                    */
    /* ---------------------------------------------------------------------- */

    seoTitle: {
      type: String,
      default: "",
      trim: true,
      maxlength: 60,
    },

    seoDescription: {
      type: String,
      default: "",
      trim: true,
      maxlength: 160,
    },
  },
  {
    timestamps: true,
  }
);

/* -------------------------------------------------------------------------- */
/*                                  INDEXES                                   */
/* -------------------------------------------------------------------------- */

/**
 * Main customer/admin listing query:
 * destination + status + display order
 */
HotelSchema.index({
  destination: 1,
  status: 1,
  displayOrder: 1,
});

/**
 * Useful for featured hotels inside a destination.
 */
HotelSchema.index({
  destination: 1,
  featured: 1,
  displayOrder: 1,
});

/* -------------------------------------------------------------------------- */
/*                              MODEL EXPORT                                  */
/* -------------------------------------------------------------------------- */

const Hotel: Model<IHotel> =
  mongoose.models.Hotel ||
  mongoose.model<IHotel>("Hotel", HotelSchema);

export default Hotel;