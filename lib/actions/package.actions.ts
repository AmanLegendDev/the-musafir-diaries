"use server";

import { revalidatePath } from "next/cache";

import connectDB from "@/lib/db";
import Package from "@/models/package.model";

/* ---------------------------------------- */
/* Create Package */
/* ---------------------------------------- */

export async function createPackage(data: any) {
  try {
    await connectDB();

    const existingPackage =
      await Package.findOne({
        slug: data.slug,
      });

    if (existingPackage) {
      return {
        success: false,
        message:
          "Package with this slug already exists.",
      };
    }

    const packageData =
      await Package.create(data);

    revalidatePath("/packages");

    return {
      success: true,
      message:
        "Package created successfully.",
      data: JSON.parse(
        JSON.stringify(packageData)
      ),
    };
  } catch (error) {
    console.error(
      "Create Package Error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to create package.",
    };
  }
}

/* ---------------------------------------- */
/* Update Package */
/* ---------------------------------------- */

export async function updatePackage(
  id: string,
  data: any
) {
  try {
    await connectDB();

    const packageData =
      await Package.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!packageData) {
      return {
        success: false,
        message:
          "Package not found.",
      };
    }

    revalidatePath("/packages");
    revalidatePath(
      `/packages/${packageData.slug}`
    );

    return {
      success: true,
      message:
        "Package updated successfully.",
      data: JSON.parse(
        JSON.stringify(packageData)
      ),
    };
  } catch (error) {
    console.error(
      "Update Package Error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to update package.",
    };
  }
}

/* ---------------------------------------- */
/* Delete Package */
/* ---------------------------------------- */

export async function deletePackage(
  id: string
) {
  try {
    await connectDB();

    const packageData =
      await Package.findByIdAndDelete(id);

    if (!packageData) {
      return {
        success: false,
        message:
          "Package not found.",
      };
    }

    revalidatePath("/packages");

    return {
      success: true,
      message:
        "Package deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Delete Package Error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to delete package.",
    };
  }
}

/* ---------------------------------------- */
/* Toggle Featured */
/* ---------------------------------------- */

export async function toggleFeaturedPackage(
  id: string
) {
  try {
    await connectDB();

    const packageData =
      await Package.findById(id);

    if (!packageData) {
      return {
        success: false,
        message:
          "Package not found.",
      };
    }

    packageData.featured =
      !packageData.featured;

    await packageData.save();

    revalidatePath("/packages");
    revalidatePath(
      `/packages/${packageData.slug}`
    );

    return {
      success: true,
      message:
        packageData.featured
          ? "Package marked as featured."
          : "Package removed from featured.",
    };
  } catch (error) {
    console.error(
      "Toggle Featured Error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to update featured status.",
    };
  }
}

/* ---------------------------------------- */
/* Update Status */
/* ---------------------------------------- */

export async function updatePackageStatus(
  id: string,
  status: "active" | "inactive"
) {
  try {
    await connectDB();

    const packageData =
      await Package.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

    if (!packageData) {
      return {
        success: false,
        message:
          "Package not found.",
      };
    }

    revalidatePath("/packages");
    revalidatePath(
      `/packages/${packageData.slug}`
    );

    return {
      success: true,
      message:
        "Status updated successfully.",
    };
  } catch (error) {
    console.error(
      "Update Status Error:",
      error
    );

    return {
      success: false,
      message:
        "Failed to update status.",
    };
  }
}