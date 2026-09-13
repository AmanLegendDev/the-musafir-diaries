import connectDB from "@/lib/db";
import Package from "@/models/package.model";

import PackageListing from "@/components/admin/packages/PackageListing";

export const dynamic = "force-dynamic";

async function getPackages() {
  await connectDB();

  const packages = await Package.find({})
    .populate("destination", "name slug")
    .populate("category", "name slug")
    .sort({
      featured: -1,
      createdAt: -1,
    })
    .lean();

  return JSON.parse(JSON.stringify(packages));
}

export default async function PackagesPage() {
  const packages = await getPackages();

  return <PackageListing initialPackages={packages} />;
}