"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";

interface DestinationPayload {
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
}

/* -------------------------------------------------------------------------- */
/*                               CREATE DESTINATION                           */
/* -------------------------------------------------------------------------- */

export async function createDestination(
  data: DestinationPayload
) {
  try {
    await connectDB();

    const slugExists = await Destination.findOne({
      slug: data.slug,
    });

    if (slugExists) {
      return {
        success: false,
        message: "Destination slug already exists.",
      };
    }

    const destination = await Destination.create(data);

    revalidatePath("/destinations");
    revalidatePath("/");

    return {
      success: true,
      message: "Destination created successfully.",
      data: JSON.parse(JSON.stringify(destination)),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to create destination.",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                               UPDATE DESTINATION                           */
/* -------------------------------------------------------------------------- */

export async function updateDestination(
  id: string,
  data: Partial<DestinationPayload>
) {
  try {
    await connectDB();

    const destination =
      await Destination.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!destination) {
      return {
        success: false,
        message: "Destination not found.",
      };
    }

    revalidatePath("/destinations");
    revalidatePath(`/destinations/${destination.slug}`);

    return {
      success: true,
      message: "Destination updated successfully.",
      data: JSON.parse(JSON.stringify(destination)),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update destination.",
    };
  }
}
/* -------------------------------------------------------------------------- */
/*                              DELETE DESTINATION                            */
/* -------------------------------------------------------------------------- */

export async function deleteDestination(id: string) {
  try {
    await connectDB();

    const destination = await Destination.findById(id);

    if (!destination) {
      return {
        success: false,
        message: "Destination not found.",
      };
    }

    const slug = destination.slug;

    await Destination.findByIdAndDelete(id);

    revalidatePath("/");
    revalidatePath("/destinations");
    revalidatePath(`/destinations/${slug}`);

    return {
      success: true,
      message: "Destination deleted successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete destination.",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                             TOGGLE FEATURED                                */
/* -------------------------------------------------------------------------- */

export async function toggleFeatured(id: string) {
  try {
    await connectDB();

    const destination = await Destination.findById(id);

    if (!destination) {
      return {
        success: false,
        message: "Destination not found.",
      };
    }

    destination.featured = !destination.featured;

    await destination.save();

    revalidatePath("/");
    revalidatePath("/destinations");

    return {
      success: true,
      message: `Destination ${
        destination.featured ? "featured" : "unfeatured"
      } successfully.`,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update featured status.",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                          CHANGE DESTINATION STATUS                         */
/* -------------------------------------------------------------------------- */

export async function changeDestinationStatus(
  id: string,
  status: "active" | "draft"
) {
  try {
    await connectDB();

    const destination = await Destination.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!destination) {
      return {
        success: false,
        message: "Destination not found.",
      };
    }

    revalidatePath("/");
    revalidatePath("/destinations");
    revalidatePath(`/destinations/${destination.slug}`);

    return {
      success: true,
      message: "Status updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update status.",
    };
  }
}

/* -------------------------------------------------------------------------- */
/*                         UPDATE FEATURED ORDER                              */
/* -------------------------------------------------------------------------- */

export async function updateFeaturedOrder(
  id: string,
  featuredOrder: number
) {
  try {
    await connectDB();

    const destination = await Destination.findByIdAndUpdate(
      id,
      { featuredOrder },
      { new: true }
    );

    if (!destination) {
      return {
        success: false,
        message: "Destination not found.",
      };
    }

    revalidatePath("/");
    revalidatePath("/destinations");

    return {
      success: true,
      message: "Featured order updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update featured order.",
    };
  }
}