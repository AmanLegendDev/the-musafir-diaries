import connectDB from "@/lib/db";
import Destination from "@/models/destination.model";
export async function getAllDestinations() {
  await connectDB();

  const destinations = await Destination.find({
    status: "active",
  })
    .sort({
      featuredOrder: 1,
      featured: -1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(destinations));
}

export async function getFeaturedDestinations(limit = 6) {
  await connectDB();

  const destinations = await Destination.find({
    status: "active",
    featured: true,
  })
    .sort({
      featuredOrder: 1,
    })
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(destinations));
}

export async function getDestinationBySlug(slug: string) {
  await connectDB();

  const destination = await Destination.findOne({
    slug,
    status: "active",
  }).lean();

  if (!destination) {
    return null;
  }

  return JSON.parse(JSON.stringify(destination));
}

export async function getDestinationsByState(state: string) {
  await connectDB();

  const destinations = await Destination.find({
    status: "active",
    state,
  })
    .sort({
      featuredOrder: 1,
    })
    .lean();

  return JSON.parse(JSON.stringify(destinations));
}

export async function getRelatedDestinations(
  state: string,
  currentSlug: string,
  limit = 3
) {
  await connectDB();

  const destinations = await Destination.find({
    status: "active",
    state,
    slug: { $ne: currentSlug },
  })
    .sort({
      featuredOrder: 1,
      featured: -1,
      rating: -1,
    })
    .limit(limit)
    .lean();

  return JSON.parse(JSON.stringify(destinations));
}