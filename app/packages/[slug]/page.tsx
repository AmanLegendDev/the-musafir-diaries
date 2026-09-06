import { notFound } from "next/navigation";

import PackageDetail from "@/components/packages/detail/PackageDetail";

import {
  getPackageBySlug,
  getRelatedPackages,
} from "@/lib/queries/package.queries";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);
  console.log("PACKAGE:", JSON.stringify(pkg, null, 2));

  if (!pkg) {
    return {
      title: "Package Not Found",
    };
  }

  return {
    title: `${pkg.name} | Altitude Escapes`,
    description: pkg.shortDescription,
    openGraph: {
      title: pkg.name,
      description: pkg.shortDescription,
      images: pkg.heroImage ? [pkg.heroImage] : [],
    },
  };
}

export default async function PackagePage({
  params,
}: PageProps) {
  const { slug } = await params;

  const pkg = await getPackageBySlug(slug);

  if (!pkg) {
    notFound();
  }

  const relatedPackages = await getRelatedPackages(
    pkg.destination._id.toString(),
    pkg.slug,
    3
  );

  return (
    <PackageDetail
      package={pkg}
      relatedPackages={relatedPackages}
    />
  );
}