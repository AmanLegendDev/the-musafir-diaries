import { Schema, model, models } from "mongoose";

const GallerySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "hero",
        "destination",
        "package",
        "blog",
        "team",
        "testimonial",
        "office",
        "customer",
        "general",
      ],
      default: "general",
    },

    alt: {
      type: String,
      default: "",
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Gallery || model("Gallery", GallerySchema);