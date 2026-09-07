import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type FAQStatus = "active" | "draft";

export interface IFAQ extends Document {
  question: string;
  answer: string;

  destination?: Types.ObjectId | null;
  package?: Types.ObjectId | null;
  hotel?: Types.ObjectId | null;

  category?: string;

  featured: boolean;
  displayOrder: number;
  status: FAQStatus;

  seoTitle?: string;
  seoDescription?: string;

  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<IFAQ>(
  {
    /* =========================================================
       CONTENT
    ========================================================= */

    question: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 300,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },

    /* =========================================================
       OPTIONAL RELATIONSHIPS
       ========================================================= */

    destination: {
      type: Schema.Types.ObjectId,
      ref: "Destination",
      default: null,
      index: true,
    },

    package: {
      type: Schema.Types.ObjectId,
      ref: "Package",
      default: null,
      index: true,
    },

    hotel: {
      type: Schema.Types.ObjectId,
      ref: "Hotel",
      default: null,
      index: true,
    },

    /* =========================================================
       CATEGORY
       ========================================================= */

    category: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    /* =========================================================
       CMS
       ========================================================= */

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "draft"],
      default: "draft",
      index: true,
    },

    /* =========================================================
       SEO
       ========================================================= */

    seoTitle: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },

    seoDescription: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

/* =========================================================
   INDEXES
   ========================================================= */

FAQSchema.index({
  status: 1,
  displayOrder: 1,
  createdAt: -1,
});

FAQSchema.index({
  destination: 1,
  status: 1,
  displayOrder: 1,
});

FAQSchema.index({
  package: 1,
  status: 1,
  displayOrder: 1,
});

FAQSchema.index({
  hotel: 1,
  status: 1,
  displayOrder: 1,
});

FAQSchema.index({
  featured: 1,
  status: 1,
  displayOrder: 1,
});

const FAQ: Model<IFAQ> =
  mongoose.models.FAQ ||
  mongoose.model<IFAQ>("FAQ", FAQSchema);

export default FAQ;