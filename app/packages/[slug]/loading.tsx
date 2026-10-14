import PackageDetailSkeleton from "@/components/skeletons/PackageDetailSkeleton";

export default function Loading() {
  return (
    <div className="min-h-[100svh]">
      <PackageDetailSkeleton />
    </div>
  );
}