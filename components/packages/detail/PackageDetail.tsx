import PackageBreadcrumb from "./PackageBreadcrumb";
import PackageHeader from "./PackageHeader";
import PackageGallery from "./PackageGallery";
import PackageOverview from "./PackageOverview";
import PackageHighlights from "./PackageHighlights";
import PackageIncludedExcluded from "./PackageIncludedExcluded";
import PackageItinerary from "./PackageItinerary";
import PackageInfo from "./PackageInfo";
import PackageFAQ from "./PackageFAQ";
import RelatedPackages from "./RelatedPackages";
import PackageCTA from "./PackageCTA";

import { Package } from "@/types/package";

interface PackageDetailProps {
  package: Package;
  relatedPackages: Package[];
}

export default function PackageDetail({
  package: pkg,
  relatedPackages,
}: PackageDetailProps) {
    
  return (
    <>
    <div className="pt-18" >
    <PackageBreadcrumb
  packageName={pkg.name}
  destinationName={pkg.destination.name}
  destinationSlug={pkg.destination.slug}
/>
   <PackageHeader
  name={pkg.name}
  destination={pkg.destination.name}
  category={pkg.category.name}
  duration={pkg.duration}
  difficulty={pkg.difficulty}
  groupSize={pkg.groupSize}
  originalPrice={pkg.originalPrice}
  discountedPrice={pkg.discountedPrice}
/>

   <PackageGallery
  heroImage={pkg.heroImage}
  gallery={pkg.gallery}
  packageName={pkg.name}
/>
      <PackageItinerary
        itinerary={pkg.itinerary}
      />

           <PackageIncludedExcluded
        included={pkg.included}
        excluded={pkg.excluded}
      />


      
    <PackageInfo
  destination={pkg.destination.name}
  category={pkg.category.name}
  duration={pkg.duration}
  difficulty={pkg.difficulty}
  groupSize={pkg.groupSize}
  discountedPrice={pkg.discountedPrice}
  childPolicy={pkg.childPolicy}
/>
      <PackageOverview
        packageName={pkg.name}
        shortDescription={pkg.shortDescription}
        description={pkg.description}
        duration={pkg.duration}
        groupSize={pkg.groupSize}
        originalPrice={pkg.originalPrice}
        discountedPrice={pkg.discountedPrice}
      />

      

      <PackageHighlights
        highlights={pkg.highlights}
      />

 




      <PackageFAQ />

      <RelatedPackages
        packages={relatedPackages}
      />

      <PackageCTA
        packageName={pkg.name}
      />
      </div>
    </>
    
  );
}